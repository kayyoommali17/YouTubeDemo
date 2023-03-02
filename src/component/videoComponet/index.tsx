import {
  View,
  Image,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../themes/colors';
import TouchableImage from '../TouchImage';
import {hitSlop} from '../../utils/constant';
import {vh, vw} from '../../utils/dimensions';
import Slider from '@react-native-community/slider';
import localeImage from '../../utils/localeInImage';
import LoadingIndicator from '../ActivityIndicator';
import {formatTime, videoRef} from '../../utils/common';
import Orientation from 'react-native-orientation-locker';
import React, {useCallback, useRef, useState} from 'react';
import Video, {OnBufferData, OnProgressData} from 'react-native-video';

interface Props {
  source: any;
  onPressBackButton?: any;
  videoStyles?: StyleProp<ViewStyle>;
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
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const [videoStyle, setVideoStyle] = useState<any>({
    height: vh(200),
    width: '100%',
  });

  console.log('rerender');

  React.useEffect(() => {
    setPaused(false);
    setcurrentTime(0);
  }, [props.source]);

  React.useEffect(() => {
    const firstTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(firstTime);
    return () => {
      setPaused(true);
    };
  }, []);

  const isOreintation = currOrientation.includes('LANDSCAPE');
  const dynamicHieghtWidth = isOreintation ? vh(40) : vh(30);

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
   * @description as screen render setting oreintation
   */
  React.useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation.includes('PORTRAIT')) {
        setVideoStyle({
          width: '100%',
          height: vh(200),
        });
      } else {
        setVideoStyle({
          height: '100%',
          width: '100%',
        });
      }
    });
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
      Orientation.removeDeviceOrientationListener(orientation => {
        if (orientation === 'PORTRAIT') {
          setVideoStyle({
            width: '100%',
            height: vh(200),
          });
        } else {
          setVideoStyle({
            width: '100%',
            height: '100%',
          });
        }
      });
    };
  }, []);

  /**
   * @handleOreinTation Function
   * @description handle fullscreen mode
   */
  const handleOreinTation = () => {
    if (isOreintation) {
      Orientation.lockToPortrait();
      setVideoStyle({
        width: '100%',
        height: vh(200),
      });
    } else {
      Orientation.lockToLandscape();
      setVideoStyle({
        height: '100%',
        width: '100%',
      });
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

  const onSlidindStart = () => {
    clearTimeOut();
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
  const onPressBack = () => {
    setPaused(true);
    props.onPressBackButton();
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

  return (
    <View>
      <Video
        repeat={true}
        ref={videoRef}
        paused={paused}
        onLoad={_onLoad}
        resizeMode="cover"
        onBuffer={_onBuffer}
        source={props.source}
        playInBackground={false}
        playWhenInactive={false}
        onProgress={_onProgress}
        onLoadStart={_onLoadStart}
        fullscreenAutorotate={true}
        fullscreenOrientation={'all'}
        bufferConfig={BUFFER_CONFIG}
        style={[videoStyle, props.videoStyles]}
        fullscreen={isOreintation ? true : false}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={hitSlop}
        onPress={onPressIconContainer}
        style={[
          styles.videoControlStyle,
          {height: isOreintation ? '100%' : '100%'},
        ]}>
        {showIcon && (
          <>
            {!isOreintation ? (
              <TouchableImage
                onPress={onPressBack}
                source={localeImage.back}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
                touchableStyle={[
                  styles.backButtonStyle,
                  {
                    top: isOreintation ? vh(20) : vh(10),
                    left: isOreintation ? vh(20) : vh(10),
                  },
                ]}
              />
            ) : null}
            <View style={styles.skipAndPausedStyle}>
              <TouchableImage
                onPress={_skipBackward}
                source={localeImage.skipBkrwd}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
              />
              {!isLoading && (
                <TouchableImage
                  onPress={_togglePlayPaused}
                  imageStyle={[
                    styles.backImageStyle,
                    {
                      height: dynamicHieghtWidth,
                      width: dynamicHieghtWidth,
                    },
                  ]}
                  source={paused ? localeImage.play : localeImage.pause}
                />
              )}
              <TouchableImage
                onPress={_skipForward}
                source={localeImage.skipFrwd}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
              />
            </View>
            <Slider
              minimumValue={0}
              tapToSeek={true}
              value={currentTime}
              maximumValue={duration}
              thumbTintColor={Colors.white}
              onSlidingStart={onSlidindStart}
              maximumTrackTintColor={Colors.white}
              minimumTrackTintColor={Colors.tabColor}
              style={[
                styles.sliderStyle,
                {
                  bottom: isOreintation ? vh(20) : vh(5),
                },
              ]}
              onSlidingComplete={_onSlidingComplete}
            />
            <Text
              style={[
                styles.timeStyleText,
                {
                  left: isOreintation ? vw(40) : vw(16),
                  bottom: isOreintation
                    ? vw(20)
                    : Platform.OS == 'android'
                    ? vw(10)
                    : vh(15),
                },
              ]}>
              {getTime()}
            </Text>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={handleOreinTation}
              style={[
                styles.fullNexitIconStyle,
                {
                  bottom: isOreintation
                    ? vh(20)
                    : Platform.OS == 'android'
                    ? vh(8)
                    : vh(15),
                  right: isOreintation ? vh(40) : vh(15),
                },
              ]}>
              <Image
                style={styles.fullScreenImageStyle}
                source={localeImage.fullScreen}
              />
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity>
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

export default React.memo(VideoPlayerComponent);

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: vh(200),
  },
  videoControlStyle: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backButtonStyle: {
    alignSelf: 'flex-start',
  },
  backImageStyle: {
    height: vh(30),
    width: vh(30),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  skipAndPausedStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  skipIconStyle: {
    height: vh(30),
    width: vh(30),
  },
  sliderStyle: {
    borderColor: 'red',
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? '95%' : '100%',
  },
  fullNexitIconStyle: {
    alignSelf: 'flex-end',
  },
  pauseedIconStyle: {
    maxWidth: vh(40),
  },
  timeStyleText: {
    fontSize: vh(12),
    fontWeight: 'bold',
    color: Colors.white,
    position: 'absolute',
  },
  activityIndicator: {
    top: 0,
    left: 0,
    right: 7,
    bottom: 9,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullScreenImageStyle: {
    resizeMode: 'contain',
  },
});
