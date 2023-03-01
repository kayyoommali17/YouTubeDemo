import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Colors from '../../themes/colors';
import {
  normalize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  vh,
} from '../../utils/dimensions';
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
    position: 'absolute',
    bottom: vh(18),
    top: 0,
    left: 0,
    right: 0,
  },
});

export default LoadingIndicator;
