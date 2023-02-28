import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Colors from '../../themes/colors';
import TouchableImage from '../TouchImage';
import {vh, vw} from '../../utils/dimensions';
import localeImage from '../../utils/localeInImage';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import {
  View,
  Image,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {hitSlop} from '../../utils/constant';

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
  const [videoRef, setVideoRef] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const [videoStyle, setVideoStyle] = useState<any>({
    height: vh(200),
    width: '100%',
  });

  /**
   *
   * @secondToHoursMinutesSeconds Function
   * @description convert second to format of HH:MM:SS
   */
  const secondToHoursMinutesSeconds = (seconds: number | string) => {
    seconds = Number(seconds);
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = Math.floor((seconds % 3600) % 60);
    const hours = hour > 0 ? (hour < 10 ? `0${hour}:` : `${hour}:`) : '';
    const minutes =
      minute > 0 ? (minute < 10 ? `0${minute}:` : `${minute}:`) : '00:';
    const secnds = second > 0 ? (second < 10 ? `0${second}` : second) : '00';
    return `${hours}${minutes}${secnds}`;
  };

  React.useEffect(() => {
    const firstTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(firstTime);
    return () => {
      setPaused(true);
    };
  }, []);

  React.useEffect(() => {
    setPaused(false);
  }, []);

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
    if (currOrientation.includes('LANDSCAPE')) {
      Orientation.lockToPortrait();
      setVideoStyle({
        height: 200,
        width: '100%',
      });
    } else {
      Orientation.lockToLandscape();
      setVideoStyle({
        height: '100%',
        width: '100%',
      });
    }
  };

  const isOreintation = currOrientation.includes('LANDSCAPE');
  const dynamicHieghtWidth = isOreintation ? vh(40) : vh(30);

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
    videoRef.seek(currentTime + 10);
    setShowIcon(true);
    clearTimeOut();
    const secondTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(secondTime);
  };

  // };
  /**
   * @_skipBackward function
   * @description skip backward 10 sec
   */
  const _skipBackward = () => {
    videoRef.seek(currentTime - 10);
    setShowIcon(true);
    clearTimeOut();
    const thirdTime = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(thirdTime);
  };

  const onSlidindStart = () => {
    // while (clearTime.current.length) {
    //   clearTimeout(timeout?.current?.pop());
    // }
    clearTimeOut();
  };

  /**
   * @_onSlidingComplete function
   * @description setting current time onsliding sekkbar
   */
  const _onSlidingComplete = (value: any) => {
    value = Array.isArray(value) ? value[0] : value;
    setcurrentTime(value);
    videoRef.seek(value);
    const sixthTimer = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime?.current?.push(sixthTimer);
  };

  /**
   * @_onLoad function
   * @description seting duration
   */
  const _onLoad = (obj: any) => {
    setDuration(obj.duration);
  };

  /**
   * @_togglePlayPaused function
   * @description seting toggle
   */
  const _togglePlayPaused = () => {
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
  };

  /**
   * @_onBuffer function
   * @description checking if buffering or not then setting loading activityindicator
   */
  const _onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
    setIsLoading(isBuffering);
    // if (isBuffering) {
    //   setIsLoading(true);
    // } else {
    //   setIsLoading(false);
    // }
  };

  /**
   * @_onLoadStart function
   * @description seting loading true if loading start
   */
  const _onLoadStart = () => {
    setIsLoading(true);
  };

  /**
   * @_renderActivityIndicator function
   * @description return activity indicator
   */
  const _renderActivityIndicator = () => {
    return (
      <View style={[styles.activityIndicator, {}]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  const onPressIconContainer = () => {
    setShowIcon(true);
    const timeout2 = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    clearTime.current.push(timeout2);
  };

  return (
    <View>
      <Video
        paused={paused}
        onLoad={_onLoad}
        resizeMode="cover"
        onBuffer={_onBuffer}
        source={props.source}
        playInBackground={false}
        playWhenInactive={false}
        onLoadStart={_onLoadStart}
        fullscreenAutorotate={true}
        fullscreenOrientation={'all'}
        bufferConfig={BUFFER_CONFIG}
        ref={(ref: any) => setVideoRef(ref)}
        style={[videoStyle, props.videoStyles]}
        fullscreen={isOreintation ? true : false}
        onProgress={value => setcurrentTime(value.currentTime)}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={hitSlop}
        onPress={onPressIconContainer}
        style={[
          styles.videoControlStyle,
          {height: isOreintation ? '100%' : vh(200)},
        ]}>
        {showIcon && (
          <>
            {!currOrientation.includes('LANDSCAPE') ? (
              <TouchableImage
                onPress={() => {
                  props.onPressBackButton();
                  setPaused(true);
                }}
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
              tapToSeek
              minimumValue={0}
              value={currentTime}
              maximumValue={duration}
              onSlidingStart={onSlidindStart}
              thumbTintColor={Colors.white}
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
              {secondToHoursMinutesSeconds(currentTime)}
              {'/'}
              {secondToHoursMinutesSeconds(duration)}
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
      {isLoading && _renderActivityIndicator()}
    </View>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: vh(200),
  },
  videoControlStyle: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    height: vh(200),
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
