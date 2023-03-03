import {styles} from '../videoComponet/style';
import localeImage from '../../utils/localeInImage';
import LoadingIndicator from '../ActivityIndicator';
import {formatTime, videoRef} from '../../utils/common';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import RnVideoControls from '../RnVideoControls/RnVideoControls';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Video, {OnBufferData, OnProgressData} from 'react-native-video';
import {View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
interface Props {
  ref?: any;
  source: any;
  onPressBackButton?: any;
  muted?: boolean | undefined;
  videoStyles?: StyleProp<ViewStyle>;
  resizeMode?: 'stretch' | 'cover' | 'contain' | 'none' | undefined;
}

interface BufferConfig {
  minBufferMs: number;
  maxBufferMs: number;
  bufferForPlaybackMs: number;
  bufferForPlaybackAfterRebufferMs: number;
}

const BUFFER_CONFIG: BufferConfig = {
  minBufferMs: 15000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 5000,
};
const VideoPlayerComponent = (props: Props) => {
  const clearTime = useRef<any>([]);
  const navigation = useNavigation<any>();
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const [videoStyle, setVideoStyle] = useState<any>(styles.initialVideoStyle);

  console.log('rerender');

  React.useEffect(() => {
    setPaused(false);
  }, [props?.source]);

  React.useEffect(() => {
    const firstTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(firstTime);
    return () => {
      setPaused(true);
    };
  }, []);

  const isOreintation = currOrientation?.includes('LANDSCAPE');

  /**
   * @description as screen render setting oreintation
   */
  React.useEffect(() => {
    Orientation.getOrientation(orientation => {
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeLockListener(handleOreinTation);
    };
  }, []);

  /**
   * @handleOreinTation Function
   * @description handle fullscreen mode
   */
  const handleOreinTation = () => {
    if (isOreintation) {
      Orientation.lockToPortrait();
      setVideoStyle(styles.initialVideoStyle);
    } else {
      Orientation.lockToLandscape();
      setVideoStyle(styles.nextVideoOreintationStyle);
    }
  };

  /**
   * @clearTimeOut function
   * @description to clear timeOut
   */
  const clearTimeOut = () => {
    while (clearTime?.current?.length) {
      clearTimeout(clearTime?.current?.pop());
    }
  };

  /**
   * @_skipForward function
   * @description skip forward 10 sec
   */
  const _skipForward = () => {
    videoRef?.current?.seek(currentTime + 10);
    setShowIcon(true);
    clearTimeOut();
    const secondTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(secondTime);
  };

  /**
   * @_skipBackward function
   * @description skip backward 10 sec
   */
  const _skipBackward = () => {
    videoRef?.current?.seek(currentTime - 10);
    setShowIcon(true);
    clearTimeOut();
    const thirdTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(thirdTime);
  };

  /**
   * @_onSlidingComplete function
   * @description setting current time onsliding sekkbar
   */
  const _onSlidingComplete = useCallback(
    (value: any) => {
      value = Array.isArray(value) ? value[0] : value;
      setcurrentTime(value);
      videoRef?.current?.seek(value);
      const sixthTimer = setTimeout(() => {
        setShowIcon(false);
      }, 3000);
      clearTime?.current?.push(sixthTimer);
    },
    [currentTime],
  );

  /**
   * @_onLoad function
   * @description seting duration
   */
  const _onLoad = useCallback(
    (obj: any) => {
      setIsLoading(false);
      setDuration(obj.duration);
    },
    [duration, isLoading],
  );

  /**
   * @_togglePlayPaused function
   * @description seting toggle
   */
  const _togglePlayPaused = useCallback(() => {
    clearTimeOut();
    setPaused(prev => {
      if (prev === false) {
        setShowIcon(true);
      } else {
        const fifthTimer = setTimeout(() => {
          setShowIcon(false);
        }, 3000);
        clearTime?.current?.push(fifthTimer);
      }
      return !prev;
    });
  }, [paused]);

  /**
   * @_onBuffer function
   * @description checking if buffering or not then setting loading activityindicator
   */
  const _onBuffer = useCallback(
    (data: OnBufferData) => {
      if (isLoading !== data.isBuffering) {
        setIsLoading(data.isBuffering);
      }
    },
    [isLoading],
  );

  /**
   * @_onLoadStart function
   * @description seting loading true if loading start
   */
  const _onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, [isLoading]);

  /**
   * @onPressBack Function
   *
   */
  const _onPressBack = () => {
    setPaused(true);
    // props.onPressBackButton();
    if (isOreintation) {
      Orientation.lockToPortrait();
      setVideoStyle(styles.initialVideoStyle);
    } else {
      navigation.goBack();
    }
  };

  /**
   * @_onProgress Function
   * @description setting current time
   */
  const _onProgress = useCallback((value: OnProgressData) => {
    setcurrentTime(value.currentTime);
  }, []);

  /**
   * @onPressIconContainer Function
   * @description use for showing icon
   */
  const onPressIconContainer = () => {
    setShowIcon(true);
    const timeout2 = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(timeout2);
  };

  /**
   * @getTime function
   * @description format time
   */
  const getTime = useCallback(() => {
    return `${formatTime(currentTime)}/${formatTime(duration)}`;
  }, [currentTime]);

  /**
   * @_onValueChange Function
   * @description to seek video using seekbar
   */
  const _onValueChange = (value: number) => {
    console.log('onvluechange');

    videoRef?.current?.seek(value);
    setPaused(false);
  };

  /**
   * @isFullscreen Function
   * @description returns boolean
   */
  const isFullscreen = useMemo(() => {
    return Object.keys(videoStyle)?.includes('position');
  }, [videoStyle]);
  return (
    <View>
      <Video
        repeat={true}
        paused={paused}
        onLoad={_onLoad}
        muted={props.muted}
        onBuffer={_onBuffer}
        source={props.source}
        playInBackground={false}
        playWhenInactive={false}
        onProgress={_onProgress}
        onLoadStart={_onLoadStart}
        ref={props?.ref || videoRef}
        bufferConfig={BUFFER_CONFIG}
        fullscreenOrientation={'all'}
        style={[videoStyle, props?.videoStyles]}
        resizeMode={isOreintation ? 'contain' : 'cover'}
        // fullscreen={isOreintation ? true : false}
      />

      <TouchableOpacity
        style={styles.overlayTouchableStyle}
        onPress={onPressIconContainer}>
        {showIcon && (
          <RnVideoControls
            maximumValue={duration}
            currentTime={currentTime}
            isFullscreen={isFullscreen}
            videoDuration={getTime()}
            onValueChange={_onValueChange}
            onPressBackButton={_onPressBack}
            onPressSkipForward={_skipForward}
            onPressSkipBackward={_skipBackward}
            handleOreinTation={handleOreinTation}
            onPressPlayNpause={_togglePlayPaused}
            onSlidingComplete={_onSlidingComplete}
            PlayNPauseIcon={!paused ? localeImage.pause : localeImage.play}
          />
        )}
      </TouchableOpacity>
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

export default React.memo(VideoPlayerComponent);
