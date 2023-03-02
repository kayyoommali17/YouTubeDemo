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
import {styles} from './style';
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
