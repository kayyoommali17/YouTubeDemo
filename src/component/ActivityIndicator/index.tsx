import React from 'react';
import {vh} from '../../utils/dimensions';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const LoadingIndicator = ({size, color}: any) => {
  // const isOreintation = currOrientation.includes('LANDSCAPE');
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
        color={color || '#fff'}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
