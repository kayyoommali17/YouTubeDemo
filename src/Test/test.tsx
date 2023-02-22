import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

function CustomTabBar({state, descriptors, navigation}: any) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = index => {
    setSelectedTab(index);
    navigation.navigate(state.routes[index].name);
  };

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = selectedTab === index;

        const onPress = () => {
          handleTabPress(index);
        };

        return (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: isFocused ? 2 : 0,
              borderColor: 'blue',
            }}
            onPress={onPress}>
            <Text style={{color: isFocused ? 'blue' : 'gray'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
