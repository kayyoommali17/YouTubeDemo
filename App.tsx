import React from 'react';
import {StyleSheet} from 'react-native';
import AppNavigator from './src/routes/AppNavigator';
import ScrollOnClick from './src/Test/ScroolOnClick';
const App = () => {
  return (
    <AppNavigator />
    // <ScrollOnClick />
  );
};

export default App;

const styles = StyleSheet.create({});
