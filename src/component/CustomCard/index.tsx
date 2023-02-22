import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import localeImage from '../../utils/localeInImage';
import {normalize, vh, vw} from '../../utils/dimensions';
import Colors from '../../themes/colors';
interface Props {
  videoTitle?: string;
  source: ImageSourcePropType;
}
const CustomCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.cardTouchStyle}>
      <Image
        style={styles.cardImageStyle}
        source={props.source || localeImage.happyWomen}
      />
      <Text style={styles.videoTitleStyle}>
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
    // </SafeAreaView>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardTouchStyle: {
    marginVertical: vh(20),
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
  },
  videoTitleStyle: {
    fontWeight: '600',
    fontSize: normalize(20),
    marginVertical: normalize(10),
    marginHorizontal: vw(15),
    color: Colors.black,
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
    marginLeft: vw(20),
    color: Colors.black,
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    fontSize: normalize(16),
    marginHorizontal: vw(15),
  },
});
