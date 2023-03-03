import {
  Text,
  View,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {styles} from './style';
import Colors from '../../themes/colors';
import TouchableImage from '../TouchImage/index';
import Slider from '@react-native-community/slider';
import localeImage from '../../utils/localeInImage';
interface Controls {
  maximumValue?: number | undefined;
  PlayNPauseIcon: ImageSourcePropType;
  videoDuration?: string;
  onPressBackButton?: ((event: GestureResponderEvent) => void) | undefined;
  onValueChange?: ((value: number) => void) | undefined;
  currentTime?: number | undefined;
  onPressPlayNpause?: ((event: GestureResponderEvent) => void) | undefined;
  isFullscreen: any;
  onPressSkipBackward?: ((event: GestureResponderEvent) => void) | undefined;
  onPressSkipForward?: ((event: GestureResponderEvent) => void) | undefined;
  onSlidingComplete?: ((value: number) => void) | undefined;
  onSlidingStart?: ((value: number) => void) | undefined;
  handleOreinTation?: ((event: GestureResponderEvent) => void) | undefined;
}
const RnVideoControls = (props: Controls) => {
  return (
    <View style={styles.mainControlContainerStyle}>
      <TouchableImage
        onPress={props?.onPressBackButton}
        touchableStyle={styles.backButton}
        imageStyle={styles.topVideoIconstyle}
        source={localeImage.back}
      />
      <TouchableImage
        touchableStyle={styles.optionButtonStyle}
        imageStyle={styles.topVideoIconstylex}
        source={localeImage.option}
      />
      <View style={[styles.playNpauseControlsViewStyle]}>
        <TouchableImage
          onPress={props?.onPressSkipBackward}
          touchableStyle={styles.skipBackwardStyle}
          imageStyle={styles.pauseNpalyIconStyle}
          source={localeImage.skipBkrwd}
        />
        <TouchableImage
          onPress={props?.onPressPlayNpause}
          touchableStyle={styles.playNpauseButtonStyle}
          imageStyle={styles.pauseNpalyIconStyle}
          source={props?.PlayNPauseIcon}
        />
        <TouchableImage
          onPress={props?.onPressSkipForward}
          touchableStyle={styles.skipForwardButtonStyle}
          imageStyle={styles.pauseNpalyIconStyle}
          source={localeImage.skipFrwd}
        />
      </View>
      <View style={styles.SliderViewStyle}>
        <Slider
          step={1}
          tapToSeek={true}
          minimumValue={0}
          style={styles.seekbarStyle}
          value={props?.currentTime}
          thumbImage={localeImage.dot}
          maximumValue={props?.maximumValue}
          onValueChange={props.onValueChange}
          maximumTrackTintColor={Colors.white}
          onSlidingStart={props?.onSlidingStart}
          minimumTrackTintColor={Colors.tabColor}
          onSlidingComplete={props?.onSlidingComplete}
        />
        <View style={styles.timeAndFullScreenIconViewStyle}>
          <Text style={styles.videoDuration}>{props?.videoDuration}</Text>
          <TouchableImage
            onPress={props?.handleOreinTation}
            touchableStyle={styles.fullscreenButton}
            imageStyle={styles.fullscreenIcon}
            source={props?.isFullscreen || localeImage.fullScreen}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(RnVideoControls);
