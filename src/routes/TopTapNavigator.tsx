import Video from '../modules/video';
import Articles from '../modules/articles';
import Channels from '../modules/channels';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import routesNames from '../utils/routesNames';
import {Text, View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function MyTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        {
          // tabBarLabel: ({focused}) => {
          //   return (
          //     <View style={{backgroundColor: focused ? 'red' : 'yellow'}}>
          //       {/* <Text>{}</Text> */}
          //     </View>
          //   );
          // },
        }
      }
      initialRouteName={routesNames.videos}>
      <Tab.Screen name={routesNames.channels} component={Channels} />
      <Tab.Screen name={routesNames.videos} component={Video} />
      <Tab.Screen name={routesNames.articles} component={Articles} />
    </Tab.Navigator>
  );
}
