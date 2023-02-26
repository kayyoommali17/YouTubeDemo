import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import localeImage from '../utils/localeInImage';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const MyComponent = () => {
  const [isPressed, setIsPressed] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setIsPressed(!isPressed);
    Animated.timing(translateY, {
      toValue: isPressed ? 0 : -50,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity style={{marginTop: 100}} onPress={handlePress}>
      <AnimatedImage
        source={localeImage.happyWomen}
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderWidth: 1,
  },
});

export default MyComponent;
