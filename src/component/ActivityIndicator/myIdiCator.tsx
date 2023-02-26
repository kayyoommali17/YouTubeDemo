// import React, {useState, useEffect} from 'react';
// import {View, Animated, Easing, StyleSheet} from 'react-native';

// const CustomActivityIndicator = () => {
//   const [rotation] = useState(new Animated.Value(0));

//   useEffect(() => {
//     const animate = Animated.loop(
//       Animated.timing(rotation, {
//         toValue: 1,
//         duration: 1500,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }),
//     );
//     animate.start();
//     return () => {
//       animate.stop();
//     };
//   }, [rotation]);

//   const rotateInterpolation = rotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={{transform: [{rotate: rotateInterpolation}]}}>
//         <View style={styles.circle} />
//         <View style={[styles.circle, {transform: [{rotate: '45deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '90deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '135deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '180deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '225deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '270deg'}]}]} />
//         <View style={[styles.circle, {transform: [{rotate: '315deg'}]}]} />
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 80,
//     width: 80,
//   },
//   circle: {
//     position: 'absolute',
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#000',
//     opacity: 0.4,
//   },
// });

// export default CustomActivityIndicator;

import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle1} />
      <Animated.View style={[styles.circle2, {transform: [{rotate}]}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'relative',
  },
  circle1: {
    backgroundColor: '#DDDDDD',
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
  },
  circle2: {
    backgroundColor: '#FF0000',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
});

export default Loader;
