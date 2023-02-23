import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomCard from './src/component/CustomCard';
import VideoPlayer from './src/component/video';
import CustomApp from './src/routes/AppNavigator';
import AppNavigator from './src/routes/AppNavigator';
import CustomVideoPlayer from './src/Test/test';
import RenderCard from './src/Test/test';
import CustomTabBar from './src/Test/test';

const App = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    // <AppNavigator />
    /* </SafeAreaView> */
    // <CustomVideoPlayer />
    <VideoPlayer />
  );
};

export default App;

const styles = StyleSheet.create({});
