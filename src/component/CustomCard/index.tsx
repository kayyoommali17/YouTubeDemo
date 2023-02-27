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
import localeImage from '../../utils/localeInImage';
import {SCREEN_WIDTH, vh, vw} from '../../utils/dimensions';
import {hitSlop} from '../../utils/constant';
interface Props {
  thumb?: any;
  channelName?: string;
  videoTitle?: string;
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
      onPress={props.onPress}
      hitSlop={hitSlop}
      style={[styles.cardTouchStyle, props.cardViewStyle]}>
      <Image
        style={[styles.cardImageStyle, props.cardImageeStyle]}
        source={props?.source || localeImage.happyWomen}
      />
      <Image style={styles.PalyIconStyle} source={localeImage.play} />
      <Text style={styles.durationTextStyle}>{'5:50'}</Text>
      <Text style={[styles.videoTitleStyle, props.titleStyle]}>
        {props.videoTitle || 'How to make yourself happy?'}
      </Text>
      <Text style={styles.metaInfoStyle}>
        {'94k views'}
        {'. 3 days ago'}
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
    fontWeight: '600',
    color: Colors.black,
    fontSize: vh(20),
    marginHorizontal: vw(15),
    marginVertical: vh(4),
    fontFamily: 'Poppins-Bold',
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
    right: vw(10),
    bottom: vh(120),
    fontWeight: 'bold',
    position: 'absolute',
    color: Colors.white,
  },
  PalyIconStyle: {
    height: vw(30),
    width: vw(30),
    top: vh(80),
    position: 'absolute',
    resizeMode: 'contain',
    left: SCREEN_WIDTH / 2 - 40,
  },
});
