import React, {useState, useEffect} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerEffect = ({visible = true, width = 200, height = 250}: any) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ).start();
  }, [animation]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={{width, height}}>
      {visible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {backgroundColor: '#fff'},
            {transform: [{translateX}]},
          ]}>
          <LinearGradient
            colors={['#fff', '#e4e4e4', '#fff']}
            style={StyleSheet.absoluteFill}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default ShimmerEffect;
