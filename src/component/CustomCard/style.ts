import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';
import {DESIGN_WIDTH, vh, vw} from '../../utils/dimensions';

export const styles = StyleSheet.create({
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
  videoOnHovePlay: {
    width: '100%',
    aspectRatio: 1 / 0.563,
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    backgroundColor: Colors.black,
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
    bottom: vh(10),
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

  viewHoverPlay: {
    width: '100%',
    overflow: 'hidden',
    borderTopRightRadius: vh(10),
    borderTopLeftRadius: vh(10),
  },
  muteUnmuteTouchStyle: {
    position: 'absolute',
    right: vw(10),
    zIndex: 1,
    top: vh(10),
  },
  muteUnmuteIconStyle: {
    height: vh(20),
    width: vh(20),
    tintColor: Colors.white,
  },
  seekbarStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: vh(40),
    bottom: vh(0),
    zIndex: 99,
  },
});
