import * as React from 'react';
import MyTopTabs from './TopTapNavigator';
import routesNames from '../utils/routesNames';
import VideoPlayer from '../modules/videoPlayerScreen';
import Orientation from 'react-native-orientation-locker';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {vw} from '../utils/dimensions';
import Colors from '../themes/colors';
import localeImage from '../utils/localeInImage';
import SecondScreen from '../Test/secondScreen';
import FirstScreen from '../Test/firstScreen';

interface Props {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Stack = createNativeStackNavigator();

const headerIcon: any = (props: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.touchStyle}
      onPress={() => navigation.goBack()}>
      <Image source={localeImage.back} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};

function AppNavigator() {
  const [currOrientation, setOrientation] = React.useState('PORTRAIT');

  /**
   * @description as screen render setting oreintation
   */
  React.useEffect(() => {
    Orientation.getOrientation(orientation => {
      console.log(orientation.includes('LANDSCAPE'));
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerLeft: headerIcon,
          headerTitle: 'Favourites',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerShown: currOrientation.includes('LANDSCAPE') ? false : true,
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
