import * as React from 'react';
import Video from '../modules/video';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routesNames from '../utils/routesNames';
import MyTopTabs from './TopTapNavigator';
import HeaderNavigation from '../component/Header/Header';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          //   headerShown: false,
          header: () => <HeaderNavigation screenText={'Favrouites'} />,
        }}>
        <Stack.Screen name={routesNames.topTaps} component={MyTopTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
