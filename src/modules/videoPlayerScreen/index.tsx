import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Colors from '../../themes/colors';
import data from '../../utils/constantData';
import {vh, vw} from '../../utils/dimensions';
import {useRoute} from '@react-navigation/native';
import CustomCard from '../../component/CustomCard';
import localeImage from '../../utils/localeInImage';
import {localeString} from '../../utils/localString';

/**
 * @metaData data
 * @description render button of like,dislike and etc.
 */
const metaData = [
  {
    id: 1,
    title: '50',
    image: localeImage.like,
  },
  {
    id: 2,
    title: '50',
    image: localeImage.dislike,
  },
  {
    id: 3,
    title: 'Share',
    image: localeImage.share,
  },
  {
    id: 4,
    title: 'Favorite',
    image: localeImage.favorite,
  },
  {
    id: 5,
    title: 'Donate',
    image: localeImage.donate,
  },
];

/**
 *
 * @VideoPlayer componnet
 * @description return simillar videos
 */

const VideoPlayer = () => {
  // const [play, setPlay] = useState(false);
  // const {itemId, title, description} = route?.params;
  // console.log('routes', item);
  const route = useRoute<any>();
  // const {itemId, title, description} = route?.params;

  let backData = route?.params;

  console.log('routes data', backData);

  const _renderItem = ({item}: any) => {
    return (
      <View>
        <CustomCard videoTitle={item?.title} source={{uri: item?.thumb}} />
      </View>
    );
  };

  /**
   *
   * @_buttonsRenderItem componnet
   * @description return feature button
   */

  const _buttonsRenderItem = (item: any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Image style={styles.renderButtonImageStyle} source={item.image} />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  /**
   *
   * @_listHeaderComponent componnet
   * @description return header for the flatlist
   */

  const _listHeaderComponent = () => {
    return (
      <View>
        {<Text style={styles.videoTitleStyle}>{backData?.title}</Text>}
        <Text style={styles.metaInfoStyle}>{localeString.views}</Text>
        <Text style={styles.description}>{backData?.description}</Text>
        <View style={styles.listContainer}>
          {metaData.map(_buttonsRenderItem)}
        </View>
        <View style={styles.mainSubsViewStyle}>
          <View style={styles.channelDetailsViewStyle}>
            <Image
              resizeMode="cover"
              style={styles.channelImageSTyle}
              source={localeImage.cahannelImage}
            />
            <View style={styles.textViewStyle}>
              <Text style={styles.channelNameStyle}>
                {localeString.channelName}
              </Text>
              <Text style={styles.subsTextStyle}>{localeString.totalSubs}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.subsButtonStyle}>
            <Text style={styles.subsButtonTextStyle}>{localeString.subs}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentMainViewStyle}>
          <View style={styles.commentInnerViewStyle}>
            <View style={styles.commentsTotalStyle}>
              <Text style={styles.commentTextStyle}>
                {localeString.totalComment}
              </Text>
              <Text style={styles.commenntNumberStyle}>
                {localeString.allCommet}
              </Text>
            </View>
            <Image
              resizeMode="contain"
              style={styles.commentImageStyle}
              source={localeImage.unfold}
            />
          </View>
          <View style={styles.userCommentViewStyle}>
            <Image
              resizeMode="cover"
              style={styles.commentImageStyle}
              source={localeImage.cahannelImage}
            />
            <Text style={styles.userCommentStyle}>{localeString.comment}</Text>
          </View>
        </View>
        <Text style={styles.smillarVideoTextStyle}>
          {localeString.smillarVideo}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainContainerStyle}>
      <Video
        paused={true}
        resizeMode={'cover'}
        style={{width: '100%', height: 200}}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        controls
      />
      <FlatList
        bounces={false}
        maxToRenderPerBatch={5}
        data={data.slice(0, 5)}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={_listHeaderComponent}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
    </View>
  );
};

export default React.memo(VideoPlayer);

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  videoTitleStyle: {
    fontWeight: '800',
    color: Colors.black,
    fontSize: vh(16),
    marginHorizontal: vw(15),
    marginVertical: vh(10),
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    fontSize: vh(16),
    marginHorizontal: vw(15),
    marginBottom: vh(10),
  },
  description: {
    marginHorizontal: vw(15),
    textAlign: 'justify',
  },
  listContainer: {
    marginTop: vh(20),
    flexDirection: 'row',
    marginHorizontal: vh(15),
  },
  itemContainer: {
    alignItems: 'center',
    paddingHorizontal: vw(20),
  },
  itemText: {
    fontSize: vh(12),
    marginTop: vh(10),
  },
  mainSubsViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(15),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: vw(10),
    marginTop: vh(30),
    borderColor: Colors.lightGrey,
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
  },
  subsButtonStyle: {
    backgroundColor: Colors.tabColor,
    paddingHorizontal: vw(30),
    paddingVertical: vh(8),
    borderRadius: vw(20),
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
  },
  commentMainViewStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: vh(10),
    paddingHorizontal: vw(20),
  },
  commentInnerViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginLeft: vw(20),
    marginTop: vh(15),
    fontWeight: 'bold',
  },
});

{
  /* <Video
        paused={play}
        resizeMode="contain"
        style={{height: 200, width: '100%'}}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
      />
      <Button title="play" onPress={() => setPlay(!play)} /> */
}
