import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
const RnShare = ({message}: any) => {
  const CustomShare = async () => {
    const myCustomShare = {
      message: message || 'This is test message',
    };
    try {
      const ShareResponse = await Share.open(myCustomShare)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      console.log('share response', ShareResponse);
    } catch (error) {
      console.log('error at share', error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={CustomShare}>
        <Text>RnShare</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RnShare;

const styles = StyleSheet.create({});
