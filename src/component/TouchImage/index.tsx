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
import {hitSlop} from '../../utils/constant';
interface ImageProps {
  source: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
const TouchableImage = (props: ImageProps) => {
  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      activeOpacity={0.7}
      onPress={props.onPress}
      style={[props.touchableStyle]}>
      <Image
        style={props.imageStyle || styles.imagestyle}
        source={props.source || localeImage.play}
      />
    </TouchableOpacity>
  );
};

export default React.memo(TouchableImage);

const styles = StyleSheet.create({
  imagestyle: {
    height: vw(50),
    width: vw(50),
  },
});
