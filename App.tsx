import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomCard from './src/component/CustomCard';
import CustomApp from './src/routes/AppNavigator';
import AppNavigator from './src/routes/AppNavigator';
import CustomTabBar from './src/Test/test';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
    // <CustomCard source={0} />
  );
};

export default App;

const styles = StyleSheet.create({});
