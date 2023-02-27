import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';

const SmoothLoader = ({size = 40, color = '#999'}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = spinValue.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [1, 0.6, 0.3, 1],
  });

  const spinnerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: color,
    borderWidth: size / 10,
    transform: [{rotate}, {scale}],
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View style={spinnerStyle} />
    </View>
  );
};

export default SmoothLoader;
