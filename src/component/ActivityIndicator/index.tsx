import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import Colors from '../../themes/colors';
import {normalize, SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/dimensions';

const LoadingIndicator = ({
  size,
  color,
  title,
  loaderContainer,
  animating,
}: any) => {
  return (
    <View style={[styles.container, loaderContainer]}>
      <ActivityIndicator size={size} color={color} animating={animating} />
      <Text style={[styles.titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    position: 'absolute',
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
  },
  titleStyle: {
    marginTop: normalize(13),
    fontSize: normalize(20),
    fontWeight: 'bold',
    letterSpacing: 0.8,
    color: Colors.red,
  },
});

export default LoadingIndicator;
