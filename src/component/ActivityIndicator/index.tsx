import React from 'react';
import {vh} from '../../utils/dimensions';
import Colors from '../../themes/colors';
const {width, height} = Dimensions.get('screen');
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
const LoadingIndicator = ({size, color}: any) => {
  return (
    <View
      style={[
        styles.activityIndicator,
        {
          bottom: width > height ? vh(0) : vh(0),
        },
      ]}>
      <ActivityIndicator
        style={styles.activityIndicatorr}
        size={size || 'large'}
        color={color || Colors.tabColor}
        animating={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  activityIndicatorr: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: width > height ? vh(50) : vh(18),
  },
});

export default LoadingIndicator;
