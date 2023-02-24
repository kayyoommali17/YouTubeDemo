import React, {useState} from 'react';
import Video from 'react-native-video';
import Colors from '../../themes/colors';
import {vh} from '../../utils/dimensions';
import TouchableImage from '../TouchImage';
import Slider from '@react-native-community/slider';
import localeImage from '../../utils/localeInImage';
import Orientation from 'react-native-orientation-locker';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
const VideoPlayer = () => {
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [videoRef, setVideoRef] = useState<any>('');
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const [videoStyle, setVideoStyle] = useState<any>({
    position: 'absolute',
    height: 200,
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

  // React.useEffect(() => {
  //   setPaused(false);
  //   return () => {
  //     setPaused(true);
  //   };
  // }, []);

  // Orientation.getOrientation(res => {
  //   setOrientation(res);
  // });

  /**
   * @description as screen render setting oreintation
   */
  React.useEffect(() => {
    Orientation.getOrientation(orientation => {
      console.log(orientation.includes('LANDSCAPE'));
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
    return () => {
      Orientation.removeLockListener(handleFullScreen);
    };
  }, []);

  /**
   * @handleFullScreen Function
   * @description handle fullscreen mode
   */
  const handleFullScreen = () => {
    console.log('curreOtnsdf-->', currOrientation);
    if (currOrientation.includes('LANDSCAPE')) {
      Orientation.lockToPortrait();
      setVideoStyle({
        position: 'absolute',
        top: 50,
        height: 200,
        width: '100%',
      });
    } else {
      Orientation.lockToLandscape();
      setVideoStyle({
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
      });
    }
    console.log('currrrr', currOrientation);
  };

  /**
   * @_skipForward function
   * @description skip forward 10 sec
   */
  const _skipForward = () => {
    videoRef.seek(currentTime + 10);
  };

  /**
   * @_skipBackward function
   * @description skip backward 10 sec
   */
  const _skipBackward = () => {
    videoRef.seek(currentTime - 10);
  };

  /**
   * @_onSlidingComplete function
   * @description setting current time onsliding sekkbar
   */
  const _onSlidingComplete = (value: any) => {
    value = Array.isArray(value) ? value[0] : value;
    setcurrentTime(value);
    videoRef.seek(value);
  };

  /**
   * @_onLoad function
   * @description seting duration
   */
  const _onLoad = (obj: any) => {
    console.log('obg', obj);
    setDuration(obj.duration);
  };

  const _togglePlayPaused = () => {
    setPaused(!paused);
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 60,
      }}>
      <Video
        resizeMode="cover"
        paused={paused}
        style={styles.videoStyle}
        // fullscreenAutorotate={false}
        // fullscreenOrientation={'all'}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        onLoad={_onLoad}
        ref={(ref: any) => setVideoRef(ref)}
        onProgress={value => setcurrentTime(value.currentTime)}
      />

      <View style={styles.videoControlStyle}>
        <TouchableImage
          imageStyle={styles.backImageStyle}
          source={localeImage.back}
          touchableStyle={styles.backButtonStyle}
        />
        <View style={styles.skipAndPausedStyle}>
          <TouchableImage
            onPress={_skipBackward}
            imageStyle={styles.backImageStyle}
            source={localeImage.skipBkrwd}
          />
          <TouchableImage
            onPress={_togglePlayPaused}
            imageStyle={styles.backImageStyle}
            source={paused ? localeImage.play : localeImage.pause}
          />
          <TouchableImage
            onPress={_skipForward}
            source={localeImage.skipFrwd}
            imageStyle={styles.backImageStyle}
          />
        </View>
        <Slider
          tapToSeek
          minimumValue={0}
          value={currentTime}
          maximumValue={duration}
          onSlidingComplete={_onSlidingComplete}
          style={styles.sliderStyle}
        />
        <TouchableOpacity
          onPress={handleFullScreen}
          style={styles.fullNexitIconStyle}>
          <Image source={localeImage.fullScreen} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    borderWidth: 4,
    height: vh(200),
  },
  videoControlStyle: {
    width: '100%',
    borderWidth: 1,
    position: 'absolute',
    height: vh(200),
  },
  backButtonStyle: {
    alignSelf: 'flex-start',
    left: vh(10),
    top: vh(10),
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
    width: '95%',
    height: vh(10),
    alignSelf: 'center',
    marginBottom: vh(10),
  },
  fullNexitIconStyle: {
    right: vh(10),
    bottom: vh(10),
    alignSelf: 'flex-end',
  },
  pauseedIconStyle: {
    maxWidth: vh(40),
  },
});
{
  /* <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={videoRef.current ? videoRef.current.duration : 0}
        value={currentTime}
        minimumTrackTintColor="#0000ff"
        maximumTrackTintColor="#000000"
        thumbTintColor="#0000ff"
        onSlidingComplete={handleSliderChange}
      /> */
}

{
  /* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          width: 385,
          alignSelf: 'center',
        }}>
        <Text style={{color: 'black'}}>{secondsToHHMMSS(currentTime)}</Text>
        <Text style={{color: 'black'}}>{secondsToHHMMSS(duration)}</Text>
        <Text onPress={() => videoRef.seek(currentTime + 10)}>
          10SecForward
        </Text>
        <Text onPress={() => videoRef.seek(currentTime - 10)}>
          10SecBackward
        </Text>
        <Text
          onPress={() => {
            setFullScreen(!isFullScreen);
          }}>
          Orientation
        </Text>
      </View> */
}
