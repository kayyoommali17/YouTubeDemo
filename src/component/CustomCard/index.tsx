import {
  View,
  Text,
  Image,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ImageSourcePropType,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {styles} from './style';
import {hitSlop} from '../../utils/constant';
import localeImage from '../../utils/localeInImage';
import {useIsFocused} from '@react-navigation/native';
import Video, {OnProgressData} from 'react-native-video';
import TouchImage from '../TouchImage';
import Slider from '@react-native-community/slider';
import Colors from '../../themes/colors';
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
  foucusedIndexToPlay?: any;
  currentIndex?: number;
  videoSource?: any;
}
const CustomCard = (props: Props) => {
  const isFocused = useIsFocused();
  const autoVideoPlayRef = React.createRef<any>();
  const [muteUnmute, setMuteUnmute] = useState(true);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    isFocused && autoVideoPlayRef?.current?.seek(0);
  }, [isFocused]);

  /**
   * @_onValueChange Function
   * @description to seek video using seekbar
   */
  const _onValueChange = (value: number) => {
    console.log('onvluechange');

    autoVideoPlayRef?.current?.seek(value);
    // setPaused(false);
  };

  /**
   * @_onSlidingComplete function
   * @description setting current time onsliding sekkbar
   */
  const _onSlidingComplete = useCallback(
    (value: any) => {
      value = Array.isArray(value) ? value[0] : value;
      setcurrentTime(value);
      autoVideoPlayRef?.current?.seek(value);
    },
    [currentTime],
  );

  /**
   * @_onLoad function
   * @description seting duration
   */
  const _onLoad = useCallback(
    (obj: any) => {
      // setIsLoading(false);
      setDuration(obj.duration);
    },
    [duration],
  );

  const conditionONVideo =
    props?.foucusedIndexToPlay === props?.currentIndex && props.videoSource;

  /**
   * @_onProgress Function
   * @description setting current time
   */
  const _onProgress = useCallback((value: OnProgressData) => {
    setcurrentTime(value.currentTime);
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props?.onPress}
      hitSlop={hitSlop}
      style={[styles.cardTouchStyle, props?.cardViewStyle]}>
      {conditionONVideo && (
        <TouchImage
          onPress={() => {
            setMuteUnmute(!muteUnmute);
          }}
          touchableStyle={styles.muteUnmuteTouchStyle}
          imageStyle={styles.muteUnmuteIconStyle}
          source={muteUnmute ? localeImage.mute : localeImage.unmute}
        />
      )}
      <View style={styles.viewHoverPlay}>
        {conditionONVideo && (
          <Video
            muted={muteUnmute}
            ref={autoVideoPlayRef}
            resizeMode={'contain'}
            onLoad={_onLoad}
            onProgress={_onProgress}
            source={props?.videoSource}
            style={styles.videoOnHovePlay}
          />
        )}
        <Image
          style={[styles.cardImageStyle, props?.cardImageeStyle]}
          source={props?.source || localeImage.happyWomen}
        />
        {conditionONVideo && (
          <Slider
            step={1}
            tapToSeek={true}
            minimumValue={0}
            value={currentTime}
            maximumValue={duration}
            style={styles.seekbarStyle}
            thumbImage={Platform.OS == 'ios' ? localeImage.dot : null}
            onValueChange={_onValueChange}
            thumbTintColor={Colors.darkRed}
            maximumTrackTintColor={Colors.grey}
            minimumTrackTintColor={Colors.darkRed}
            onSlidingComplete={_onSlidingComplete}
          />
        )}
        <Image style={styles.PalyIconStyle} source={localeImage.play} />
        <Text style={styles.durationTextStyle}>{props.duration || '5:50'}</Text>
      </View>

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
