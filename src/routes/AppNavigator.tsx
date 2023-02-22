import * as React from 'react';
import Video from '../modules/video';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routesNames from '../utils/routesNames';
import MyTopTabs from './TopTapNavigator';
import HeaderNavigation from '../component/Header/Header';
import VideoPlayer from '../modules/videoplayer';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            header: () => <HeaderNavigation screenText={'Favrouites'} />,
          }}
          name={routesNames.topTaps}
          component={MyTopTabs}
        />
        <Stack.Screen name={routesNames.videoPlayer} component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;