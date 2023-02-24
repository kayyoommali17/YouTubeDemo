import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import localeImage from '../../utils/localeInImage';
import {SCREEN_WIDTH} from '../../utils/dimensions';
import Colors from '../../themes/colors';
const VideoPlayer = () => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoRef, setVideoRef] = useState<any>('');
  //   const [orientation, setOrientation] = useState('portrait');
  const [load, setIsload] = useState<boolean>(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const secondsToHHMMSS = (seconds: number | string) => {
    // credits - https://stackoverflow.com/a/37096512
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

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Video
        resizeMode="cover"
        paused={paused}
        fullscreenAutorotate={false}
        fullscreen={isFullScreen}
        fullscreenOrientation={'all'}
        style={{height: 200, width: '100%', borderWidth: 1}}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        ref={(ref: any) => setVideoRef(ref)}
        onProgress={obj => setcurrentTime(obj.currentTime)}
        onLoad={obj => {
          console.log('obg', obj);

          setDuration(obj.duration);
        }}
      />

      <View
        style={{
          height: 200,
          width: '100%',
          borderWidth: 1,
          position: 'absolute',
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            left: 10,
            top: 10,
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              tintColor: Colors.white,
            }}
            source={localeImage.back}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => videoRef.seek(currentTime - 10)}>
            <Image
              resizeMode="contain"
              style={{height: 30, width: 30}}
              source={localeImage.skipBkrwd}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              maxWidth: 40,
            }}
            onPress={() => setPaused(!paused)}>
            <Image
              resizeMode="contain"
              style={{height: 30, width: 30}}
              source={paused ? localeImage.play : localeImage.pause}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => videoRef.seek(currentTime + 10)}>
            <Image
              resizeMode="contain"
              style={{height: 30, width: 30}}
              source={localeImage.skipFrwd}
            />
          </TouchableOpacity>
        </View>
        <Slider
          tapToSeek
          minimumValue={0}
          value={currentTime}
          maximumValue={duration}
          onSlidingComplete={value => {
            value = Array.isArray(value) ? value[0] : value;
            setcurrentTime(value);
            videoRef.seek(value);
          }}
          style={{
            width: '95%',
            height: 10,
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            bottom: 10,
            right: 10,
          }}>
          <Image source={localeImage.fullScreen} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: 'Poppins-Black',
        }}>
        {'jljklkhjklkjbh'}
      </Text>
    </View>
  );
};

export default VideoPlayer;

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
