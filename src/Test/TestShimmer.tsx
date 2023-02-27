// import React, {useState, useEffect} from 'react';
// import {View, Animated, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const ShimmerEffect = ({visible = true, width = 200, height = 250}: any) => {
//   const [animation] = useState(new Animated.Value(0));

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 1200,
//         useNativeDriver: false,
//       }),
//     ).start();
//   }, [animation]);

//   const translateX = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [-width, width],
//   });

//   return (
//     <View style={{width, height}}>
//       {visible && (
//         <Animated.View
//           style={[
//             StyleSheet.absoluteFill,
//             {backgroundColor: '#fff'},
//             {transform: [{translateX}]},
//           ]}>
//           <LinearGradient
//             colors={['#fff', '#e4e4e4', '#fff']}
//             style={StyleSheet.absoluteFill}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 0}}
//           />
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// export default ShimmerEffect;

import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../utils/dimensions';
const {width, height} = Dimensions.get('screen');
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const list = new Array(10).fill(undefined).map((val, index) => ({
  id: index,
}));
const ShimmerLoader = () => {
  // Handle animation
  const avatarRef = React.createRef<any>();
  const firstLineRef = React.createRef<any>();
  const secondLineRef = React.createRef<any>();
  const thirdLineRef = React.createRef<any>();

  // React.useEffect(() => {
  //   const facebookAnimated = Animated.stagger(400, [
  //     avatarRef.current.getAnimated(),
  //     Animated.parallel([
  //       firstLineRef.current.getAnimated(),
  //       secondLineRef.current.getAnimated(),
  //       thirdLineRef.current.getAnimated(),
  //     ]),
  //   ]);
  //   Animated.loop(facebookAnimated).start();
  // }, []);

  const renderItem = () => {
    return (
      <View style={styles.profileWrapper}>
        <ShimmerPlaceholder
          style={{
            width: '100%',
            height: 200,
            borderRadius: vh(10),
            borderTopEndRadius: vh(10),
            borderTopLeftRadius: vh(10),
          }}
        />
        <ShimmerPlaceholder style={styles.innerContainerShimmerStyle} />
        <View style={styles.innerContainerStyle}>
          <ShimmerPlaceholder
            style={{
              height: vh(40),
              width: vh(40),
              borderRadius: vh(20),
            }}
          />
          <ShimmerPlaceholder
            style={{
              width: width * 0.4,
              height: vh(30),
              borderRadius: vh(5),
              marginLeft: vh(10),
            }}
          />
        </View>
      </View>
    );
  };

  /**
   *
   * @keyExtractor Function
   * @returns uniqueness
   */
  const keyExtractor = (item: any) => item?.id?.toString();

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      style={styles.container}
      keyExtractor={keyExtractor}
    />
  );
};

export default ShimmerLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  profileWrapper: {
    marginTop: vh(20),
  },
  profile: {
    marginHorizontal: vh(10),
  },
  postWrapper: {
    marginVertical: vh(10),
  },
  mainShimmerContainerStyle: {
    width: '100%',
    height: 200,
    borderRadius: vh(10),
    borderTopEndRadius: vh(10),
    borderTopLeftRadius: vh(10),
  },
  innerContainerShimmerStyle: {
    width: width * 0.7,
    height: vh(30),
    borderRadius: vh(5),
    marginTop: vh(5),
  },
  profileShimmerStyle: {
    width: vh(30),
    marginTop: vh(15),
    height: vh(30),
    borderRadius: vh(15),
  },
  channelShimmerStyle: {
    height: vh(25),
    width: width * 0.5,
    borderRadius: vh(5),
    marginTop: vh(15),
    marginLeft: vh(10),
  },
  innerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(10),
  },
});
