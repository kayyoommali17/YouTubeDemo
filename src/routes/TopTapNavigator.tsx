import Video from '../modules/video';
import Articles from '../modules/articles';
import Channels from '../modules/channels';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import routesNames from '../utils/routesNames';
import {StyleSheet, Text, View} from 'react-native';
import {normalize} from '../utils/dimensions';
import Colors from '../themes/colors';

const Tab = createMaterialTopTabNavigator();

export default function MyTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarPressColor: Colors.white,
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
                        fontSize: normalize(16),
                      }
                    : {
                        fontWeight: 'bold',
                        color: Colors.black,
                        fontSize: normalize(16),
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
      })}
      initialRouteName={routesNames.videos}>
      <Tab.Screen name={routesNames.channels} component={Channels} />
      <Tab.Screen name={routesNames.videos} component={Video} />
      <Tab.Screen name={routesNames.articles} component={Articles} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbarStyle: {
    width: normalize(100),
    alignItems: 'center',
    padding: normalize(10),
    borderRadius: normalize(20),
  },
});
