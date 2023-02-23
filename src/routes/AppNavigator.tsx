import * as React from 'react';
import Video from '../modules/video';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import routesNames from '../utils/routesNames';
import MyTopTabs from './TopTapNavigator';
import HeaderNavigation from '../component/Header/Header';
import VideoPlayer from '../modules/videoplayer';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {vw} from '../utils/dimensions';
import Colors from '../themes/colors';
import localeImage from '../utils/localeInImage';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Stack = createNativeStackNavigator();

const headerIcon: any = (props: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.goBack()}
      style={styles.touchStyle}>
      <Image source={localeImage.back} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerTitle: 'Favourites',
          headerLeft: headerIcon,
          headerShadowVisible: false,
        })}>
        <Stack.Screen name={routesNames.topTaps} component={MyTopTabs} />
        <Stack.Screen name={routesNames.videoPlayer} component={VideoPlayer} />
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
