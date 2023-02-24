import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomCard from './src/component/CustomCard';
import VideoPlayer from './src/component/video';
import CustomApp from './src/routes/AppNavigator';
import AppNavigator from './src/routes/AppNavigator';
import Shimmering from './src/component/CustomShimmer/shimmering';
import ShimmerApp from './src/component/CustomShimmer/Shimmer';
import VideoPlayerTest from './src/Test/test';
import CustomVideoPlayer from './src/Test/test';
import RenderCard from './src/Test/test';
import CustomTabBar from './src/Test/test';
import ShimmerEffect from './src/Test/TestShimmer';

const App = () => {
  return (
    <AppNavigator />
    // <CustomVideoPlayer />
    // <VideoPlayer />
    // <VideoPlayerTest />r
    // <ShimmerApp />
    // <ShimmerEffect />
    // <Shimmering />
  );
};

export default App;

const styles = StyleSheet.create({});
