import {StyleSheet, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {vw, vh} from '../../utils/dimensions';

export const styles = StyleSheet.create({
  mainControlContainerStyle: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: vw(15),
  },
  transparentContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    paddingHorizontal: vw(15),
  },
  playNpauseButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: vh(10),
  },
  pauseNpalyIconStyle: {
    height: vh(25),
    width: vh(25),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  playNpauseControlsViewStyle: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    width: '60%',
    height: vw(80),
    justifyContent: 'space-between',
  },
  skipBackwardStyle: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipForwardButtonStyle: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekbarStyle: {
    width: '100%',
  },
  SliderViewStyle: {
    width: '100%',
    alignSelf: 'flex-end',
    paddingBottom: vw(10),
  },
  timeAndFullScreenIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? vw(-10) : 0,
  },
  videoDuration: {
    fontFamily: 'Poppins-Medium',
    fontSize: vw(12),
    color: Colors.white,
  },
  loaderStyle: {
    position: 'absolute',
    height: vw(110),
    width: vw(110),
    zIndex: 1,
  },
  fullscreenButton: {
    height: vw(20),
    width: vw(20),
  },
  fullscreenIcon: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain',
  },
  backButton: {
    top: vw(10),
    left: vw(10),
    width: vw(30),
    height: vw(30),
    position: 'absolute',
  },
  topVideoIconstyle: {
    height: vw(30),
    width: vw(30),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  topVideoIconstylex: {
    height: vw(25),
    width: vw(25),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  optionButtonStyle: {
    top: vw(10),
    right: vw(10),
    width: vw(30),
    height: vw(30),
    position: 'absolute',
  },
});
