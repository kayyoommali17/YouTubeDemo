import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import localeImage from '../../utils/localeInImage';

const Channels = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Channels</Text>
      <Image
        resizeMode="contain"
        style={{height: 200, width: 200, borderWidth: 1}}
        // source={localeImage.happyWomen}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    </View>
  );
};

export default Channels;

const styles = StyleSheet.create({});
