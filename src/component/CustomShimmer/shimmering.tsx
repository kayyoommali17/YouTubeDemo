import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  colors?: Array<string>;
  gradientStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle> & {width: any; height: any};
}

const GREY = 'rgb(234, 234, 234)';
const shimmeringAnimatedValue = new Animated.Value(0);
const ShimmringAnimation = Animated.loop(
  Animated.timing(shimmeringAnimatedValue, {
    useNativeDriver: false,
    delay: 1000,
    duration: 750,
    toValue: 1,
  }),
);

const Shimmering: React.FC<IProps> = ({
  colors,
  gradientStyle,
  wrapperStyle,
}) => {
  const [viewWidth, setViewWidth] = useState(-1);
  const animation = useRef(ShimmringAnimation).current;

  /**
   * @returns Start animation as screen render
   */
  useEffect(() => {
    startAnimation();
    return () => {
      animation.stop();
    };
  }, []);

  /**
   *
   * @startAnimation function
   * @returns start animation
   */
  const startAnimation = () => {
    animation.start();
  };

  /**
   *
   * @_onLayoutChange Function
   * @returns  set the ViewWidth as layout changes
   */
  const _onLayoutChange = (event: LayoutChangeEvent) => {
    setViewWidth(event?.nativeEvent?.layout?.width);
  };

  /**
   *
   * @_getLeftValue Function
   * @returns an interpolated value based on the current value of a shimmeringAnimatedValue object.
   */
  const _getLeftValue = () => {
    return shimmeringAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-viewWidth, viewWidth],
    });
  };

  /**
   * @returns constants
   */
  const width = Dimensions.get('screen').width;
  const loadingStyle = {backgroundColor: GREY};
  const left = _getLeftValue();

  return (
    <View
      style={{
        width: wrapperStyle?.width ?? width,
        height: wrapperStyle?.height ?? 80,
      }}>
      <View
        style={[styles.container, loadingStyle, wrapperStyle]}
        onLayout={_onLayoutChange}>
        <Animated.View
          style={[
            {
              flex: 1,
              left,
            },
            gradientStyle,
          ]}>
          <LinearGradient
            colors={colors || [GREY, '#fff', GREY]}
            start={{x: 0.3, y: 0.2}}
            end={{x: 0.8, y: 0.5}}
            style={{flex: 1}}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default React.memo(Shimmering);
