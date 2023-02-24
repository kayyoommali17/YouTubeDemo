import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {vw} from '../../utils/dimensions';
import localeImage from '../../utils/localeInImage';
interface ImageProps {
  source: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
const TouchableImage = (props: ImageProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={[props.touchableStyle]}
      hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
      <Image
        style={props.imageStyle || styles.imagestyle}
        source={props.source || localeImage.play}
      />
    </TouchableOpacity>
  );
};

export default TouchableImage;

const styles = StyleSheet.create({
  imagestyle: {
    height: vw(50),
    width: vw(50),
  },
});
