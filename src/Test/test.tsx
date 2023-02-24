// import React, {useRef, useState} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import Video from 'react-native-video';
// import Slider from '@react-native-community/slider';

// const VideoPlayerTest = () => {
//   const videoRef = useRef<any>(null);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [paused, setPaused] = useState(true);
//   const [fullscreen, setFullscreen] = useState(false);

//   const onProgress = (data: any) => {
//     setCurrentTime(data.currentTime);
//   };

//   const onLoad = (data: any) => {
//     setDuration(data.duration);
//   };

//   const onEnd = () => {
//     setPaused(true);
//     setCurrentTime(0);
//     videoRef.current.seek(0);
//   };

//   const toggleFullscreen = () => {
//     setFullscreen(!fullscreen);
//   };

//   const togglePlayPause = () => {
//     setPaused(!paused);
//   };

//   const onSliderValueChange = (value: any) => {
//     videoRef.current.seek(value);
//     setCurrentTime(value);
//   };

//   const formatTime = (time: any) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Video
//         ref={videoRef}
//         source={{
//           uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//         }}
//         paused={paused}
//         onProgress={onProgress}
//         onLoad={onLoad}
//         onEnd={onEnd}
//         style={{flex: fullscreen ? 1 : 0, height: 200, width: '100%'}}
//       />
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <Text>{formatTime(currentTime)}</Text>
//         <Slider
//           style={{flex: 1}}
//           minimumValue={0}
//           maximumValue={duration}
//           value={currentTime}
//           onValueChange={onSliderValueChange}
//         />
//         <Text>{formatTime(duration)}</Text>
//         <TouchableOpacity onPress={toggleFullscreen}>
//           <Text>{fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity onPress={togglePlayPause}>
//         <Text>{paused ? 'Play' : 'Pause'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default VideoPlayerTest;

import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation';

const VideoPlayer = () => {
  const videoRef = useRef<any>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration);
  };

  const onEnd = () => {
    setPaused(true);
    setCurrentTime(0);
    videoRef.current.seek(0);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    if (!fullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const onSliderValueChange = (value: any) => {
    videoRef.current.seek(value);
    setCurrentTime(value);
  };

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const onBuffer = (data: any) => {
    setLoading(!loading);
  };

  const onLoadStart = () => {
    setLoading(!loading);
  };
  const onReadyForDisplay = () => {
    setLoading(false);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Video
        ref={videoRef}
        source={{
          // uri: 'your-video-source-here'
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        paused={paused}
        onProgress={onProgress}
        fullscreenAutorotate
        onLoad={onLoad}
        onEnd={onEnd}
        style={{
          flex: fullscreen ? 1 : 0,
          height: 200,
          width: '100%',
          // transform: [{rotate: fullscreen ? '90deg' : '0deg'}],
        }}
        onBuffer={onBuffer}
        onLoadStart={onLoadStart}
        onReadyForDisplay={onReadyForDisplay}
        // fullscreenOrientation={fullscreen?'landscape':'portrait'}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color="red" />
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{formatTime(currentTime)}</Text>
        <Slider
          style={{flex: 1}}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={onSliderValueChange}
        />
        <Text>{formatTime(duration)}</Text>
        <TouchableOpacity onPress={toggleFullscreen}>
          <Text>{fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={togglePlayPause}>
        <Text>{paused ? 'Play' : 'Pause'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayer;
