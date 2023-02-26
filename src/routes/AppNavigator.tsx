import * as React from 'react';
import MyTopTabs from './TopTapNavigator';
import routesNames from '../utils/routesNames';
import VideoPlayer from '../modules/videoPlayerScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
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
      style={styles.touchStyle}
      onPress={() => navigation.goBack()}>
      <Image source={localeImage.back} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerLeft: headerIcon,
          headerTitle: 'Favourites',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        })}>
        <Stack.Screen name={routesNames.topTaps} component={MyTopTabs} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routesNames.videoPlayer}
          component={VideoPlayer}
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
