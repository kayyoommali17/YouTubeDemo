import * as React from 'react';
import Colors from '../themes/colors';
import {vw} from '../utils/dimensions';
import MyTopTabs from './TopTapNavigator';
import routesNames from '../utils/routesNames';
import VideoPlayer from '../modules/videoPlayerScreen';
import HeaderNavigation from '../component/Header/Header';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Stack = createNativeStackNavigator();

const headerIcon: any = () => {
  return <HeaderNavigation />;
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerLeft: headerIcon,
          headerTitle: 'Favourite',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name={routesNames.topTaps} component={MyTopTabs} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          component={VideoPlayer}
          name={routesNames.videoPlayer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  touchStyle: {
    width: vw(30),
    height: vw(30),
  },
  imageStyle: {
    height: vw(30),
    width: vw(30),
    tintColor: Colors.black,
  },
});
