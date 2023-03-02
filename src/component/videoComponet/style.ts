import {StyleSheet, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {vh} from '../../utils/dimensions';

export const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: vh(200),
  },
  videoControlStyle: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backButtonStyle: {
    alignSelf: 'flex-start',
  },
  backImageStyle: {
    height: vh(30),
    width: vh(30),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  skipAndPausedStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  skipIconStyle: {
    height: vh(30),
    width: vh(30),
  },
  sliderStyle: {
    borderColor: 'red',
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? '95%' : '100%',
  },
  fullNexitIconStyle: {
    alignSelf: 'flex-end',
  },
  pauseedIconStyle: {
    maxWidth: vh(40),
  },
  timeStyleText: {
    fontSize: vh(12),
    fontWeight: 'bold',
    color: Colors.white,
    position: 'absolute',
  },
  activityIndicator: {
    top: 0,
    left: 0,
    right: 7,
    bottom: 9,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullScreenImageStyle: {
    resizeMode: 'contain',
  },
});
