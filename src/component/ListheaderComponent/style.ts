import {StyleSheet} from 'react-native';
import Colors from '../../themes/colors';
import {vh, vw} from '../../utils/dimensions';

export const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  videoTitleStyle: {
    fontWeight: '800',
    color: Colors.black,
    marginVertical: vh(10),
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    marginBottom: vh(10),
  },
  description: {
    textAlign: 'justify',
  },
  listContainer: {
    marginTop: vh(20),
    flexDirection: 'row',
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    paddingHorizontal: vw(10),
    flex: 1,
  },
  itemText: {
    fontSize: vh(12),
    marginTop: vh(10),
  },
  mainSubsViewStyle: {
    borderTopWidth: 1,
    marginTop: vh(30),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: vh(15),
    paddingHorizontal: vw(15),
    marginHorizontal: vw(-20),
    borderColor: Colors.lightGrey,
    justifyContent: 'space-between',
  },
  channelDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelImageSTyle: {
    height: vw(50),
    width: vw(50),
    borderRadius: vw(50),
  },
  channelNameStyle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: vh(16),
  },
  textViewStyle: {
    marginLeft: vw(10),
  },
  subsTextStyle: {
    marginTop: vh(5),
    fontSize: vh(14),
    opacity: 0.7,
  },
  subsButtonStyle: {
    backgroundColor: Colors.tabColor,
    paddingHorizontal: vw(30),
    paddingVertical: vh(8),
    borderRadius: vw(20),
    maxWidth: vw(150),
    alignItems: 'center',
  },
  renderButtonImageStyle: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain',
  },
  subsButtonTextStyle: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  commentImageStyle: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'cover',
    borderRadius: vw(10),
  },
  commentMainViewStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
    marginHorizontal: vw(-20),
  },
  commentInnerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentsTotalStyle: {
    flexDirection: 'row',
  },
  commentTextStyle: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  commenntNumberStyle: {
    marginLeft: vw(10),
  },
  userCommentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: vw(290),
    marginVertical: vh(10),
  },
  userCommentStyle: {
    marginLeft: vw(10),
    fontSize: vh(12),
  },
  smillarVideoTextStyle: {
    marginTop: vh(15),
    fontWeight: 'bold',
  },
  mainContainerStyleX: {
    marginHorizontal: vw(20),
  },
});
