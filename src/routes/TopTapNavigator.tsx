import React from 'react';
import Video from '../modules/videoRenderScreen';
import Colors from '../themes/colors';
import Articles from '../modules/articles';
import Channels from '../modules/channels';
import {normalize} from '../utils/dimensions';
import routesNames from '../utils/routesNames';
import VideoRenderScreen from '../modules/videoRenderScreen';
import VideoPlayer from '../modules/videoPlayerScreen';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function MyTopTabs() {
  // const TabNavigationRef = React.useRef(null);
  // // const dispatch=
  // const jumpToIndex = ({route}: any) => {
  //   if (route.name === routesNames.articles) {
  //     TabNavigationRef.current?.dispatch({
  //       ...TabActions.jumpTo('Third'),
  //     });
  //   }
  // };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarPressColor: Colors.white,
        // tabBarOnPress

        tabBarLabel: ({focused}) => {
          return (
            <View
              style={[
                styles.tabbarStyle,
                {
                  backgroundColor: focused ? Colors.tabColor : Colors.white,
                },
              ]}>
              <Text
                style={
                  focused
                    ? {
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Colors.white,
                        fontSize: normalize(14),
                      }
                    : {
                        fontWeight: 'bold',
                        color: Colors.black,
                        fontSize: normalize(14),
                      }
                }>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarIndicatorStyle: {
          width: 0,
        },
        lazy: false,
      })}
      initialRouteName={routesNames.videos}>
      <Tab.Screen name={routesNames.channels} component={VideoPlayer} />
      <Tab.Screen name={routesNames.videos} component={VideoRenderScreen} />
      <Tab.Screen name={routesNames.articles} component={Articles} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbarStyle: {
    width: normalize(100),
    alignItems: 'center',
    padding: normalize(5),
    borderRadius: normalize(20),
  },
});
