import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppNavigator from './src/routes/AppNavigator';
import TestShimmer from './src/Test/TestShimmer';
import ShimmerApp from '../YouTubeDemo/src/component/CustomShimmer/Shimmer';
import ShimmerForVideoPlayer from './src/component/CustomShimmer/ShimmerForVideoPlayer';
import SkelTon from './src/component/CustomShimmer/ShimmerSkelton';
const App = () => {
  return (
    <AppNavigator />
    // <ShimmerForVideoPlayer />
    // <ShimmerForVideoPlayer />
  );
};

export default App;

const styles = StyleSheet.create({});
