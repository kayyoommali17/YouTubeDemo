import {
  View,
  Text,
  Image,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import Colors from '../../themes/colors';
import {hitSlop} from '../../utils/constant';
import localeImage from '../../utils/localeInImage';
import {DESIGN_WIDTH, normalize, vh, vw} from '../../utils/dimensions';
interface Props {
  thumb?: any;
  duration?: string;
  totalViews?: string;
  videoTitle?: string;
  channelName?: string;
  uplodedTime?: string;
  source: ImageSourcePropType;
  titleStyle?: StyleProp<TextStyle>;
  cardViewStyle?: StyleProp<ViewStyle>;
  cardImageeStyle?: StyleProp<ImageStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
const CustomCard = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props?.onPress}
      hitSlop={hitSlop}
      style={[styles.cardTouchStyle, props?.cardViewStyle]}>
      <Image
        style={[styles.cardImageStyle, props?.cardImageeStyle]}
        source={props?.source || localeImage.happyWomen}
      />
      <Image style={styles.PalyIconStyle} source={localeImage.play} />
      <Text style={styles.durationTextStyle}>{props.duration || '5:50'}</Text>
      <Text style={[styles.videoTitleStyle, props?.titleStyle]}>
        {props?.videoTitle || 'How to make yourself happy?'}
      </Text>
      <Text style={styles.metaInfoStyle}>
        {props.totalViews || '94k views'}
        {props.uplodedTime || ' . 3 days ago'}
      </Text>
      <View style={styles.channelInfoViewStyle}>
        <Image
          style={styles.channelLogoStyle}
          source={props?.source || localeImage.cahannelImage}
        />
        <Text style={styles.channelNameTextStyle}>
          {props?.channelName || 'Rachel Geller'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CustomCard);

const styles = StyleSheet.create({
  cardTouchStyle: {
    marginVertical: vh(10),
    marginHorizontal: vw(20),
    borderRadius: vh(10),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8.3,
    elevation: 13,
  },
  cardImageStyle: {
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
    height: vw(180),
    width: '100%',
    resizeMode: 'cover',
  },
  videoTitleStyle: {
    fontSize: vh(16),
    color: Colors.black,
    marginVertical: vh(10),
    marginHorizontal: vw(15),
    fontFamily: 'Poppins-SemiBold',
  },
  channelInfoViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: vw(15),
    marginVertical: vh(10),
  },
  channelLogoStyle: {
    height: vw(30),
    width: vw(30),
    resizeMode: 'cover',
    borderRadius: vh(15),
  },
  channelNameTextStyle: {
    opacity: 0.7,
    marginLeft: vw(10),
    color: Colors.black,
    fontSize: vh(16),
    fontFamily: 'Poppins-Medium',
  },
  metaInfoStyle: {
    opacity: 0.6,
    color: Colors.black,
    fontSize: vh(15),
    marginHorizontal: vw(15),
    fontFamily: 'Poppins-Medium',
  },
  durationTextStyle: {
    padding: 4,
    opacity: 0.5,
    right: vw(10),
    bottom: vh(120),
    fontSize: vh(12),
    position: 'absolute',
    color: Colors.white,
    backgroundColor: Colors.black,
  },
  PalyIconStyle: {
    height: vw(30),
    width: vw(30),
    top: vh(80),
    position: 'absolute',
    resizeMode: 'contain',
    left: DESIGN_WIDTH / 2 - 40,
  },
});
