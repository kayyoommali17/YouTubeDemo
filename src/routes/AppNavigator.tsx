import * as React from 'react';
import MyTopTabs from './TopTapNavigator';
import routesNames from '../utils/routesNames';
import VideoPlayer from '../modules/videoPlayerScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Colors from '../themes/colors';
import {vw} from '../utils/dimensions';
import {hitSlop} from '../utils/constant';
import localeImage from '../utils/localeInImage';
import TouchableImage from '../component/TouchImage';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Stack = createNativeStackNavigator();

const headerIcon: any = () => {
  return (
    <TouchableImage imageStyle={styles.imageStyle} source={localeImage?.back} />
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerLeft: headerIcon,
          headerTitle: 'Favourite',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        })}>
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
