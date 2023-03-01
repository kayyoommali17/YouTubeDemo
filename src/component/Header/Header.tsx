import React from 'react';
import Colors from '../../themes/colors';
import localeImage from '../../utils/localeInImage';
import {normalize, vh, vw} from '../../utils/dimensions';
import {
  Image,
  StyleProp,
  StyleSheet,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {hitSlop} from '../../utils/constant';

interface Props {
  onPress?: any;
  source?: any;
  backgroundColor?: string;
  IconStyle?: StyleProp<ImageStyle>;
}
const BackButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props?.onPress}
      hitSlop={hitSlop}
      activeOpacity={0.7}
      style={styles.touchStyle}>
      <Image
        source={props?.source || localeImage.back}
        style={props?.IconStyle || styles.imageStyle}
      />
    </TouchableOpacity>
  );
};

export default React.memo(BackButton);

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: vh(10),
    paddingHorizontal: vw(20),
    backgroundColor: Colors.white,
  },
  screenTextStyle: {
    fontWeight: 'bold',
    marginLeft: vw(100),
    color: Colors.black,
    fontSize: normalize(18),
  },
  touchStyle: {
    width: vw(30),
    height: vw(30),
  },
  imageStyle: {
    height: vw(30),
    width: vw(30),
    tintColor: Colors.black,
  },
});
