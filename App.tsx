import React from 'react';
import {StyleSheet} from 'react-native';
import ShimmerForVideoPlayer from './src/component/CustomShimmer/ShimmerForVideoPlayer';
import RnShare from './src/component/RnShare';
import VideoPlayerComponent from './src/component/videoComponet';
import AppNavigator from './src/routes/AppNavigator';
import YouTubePlayer from './src/Test/firstScreen';
import VideoScreen from './src/Test/ScreenA';
import MyVideoTesting from './src/Test/ScreenB';
const App = () => {
  return (
    <AppNavigator />
    // <>
    //   <VideoPlayerComponent
    //     source={{
    //       uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     }}
    //   />
    // </>
    // <MyVideoTesting />
    // <YouTubePlayer />
    // <RnShare />
    // <ShimmerForVideoPlayer />
  );
};

export default App;

const styles = StyleSheet.create({});
