import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import localeImage from '../../utils/localeInImage';
import {normalize, vh, vw} from '../../utils/dimensions';
import Colors from '../../themes/colors';
interface Props {
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
      style={[styles.cardTouchStyle, props.cardViewStyle]}>
      <Image
        style={[styles.cardImageStyle, props.cardImageeStyle]}
        source={props?.source || localeImage.happyWomen}
      />
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
          source={localeImage.cahannelImage}
        />
        <Text style={styles.channelNameTextStyle}>{'Rachel Geller'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardTouchStyle: {
    marginVertical: vh(10),
    marginHorizontal: vw(20),
    borderRadius: normalize(10),
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
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
    height: vw(180),
    width: '100%',
    resizeMode: 'cover',
  },
  videoTitleStyle: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: normalize(20),
    marginHorizontal: vw(15),
    marginVertical: normalize(10),
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
    resizeMode: 'contain',
    backgroundColor: 'red',
    borderRadius: normalize(15),
  },
  channelNameTextStyle: {
    opacity: 0.7,
    marginLeft: vw(10),
    color: Colors.black,
    fontSize: normalize(16),
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    fontSize: normalize(16),
    marginHorizontal: vw(15),
  },
});
