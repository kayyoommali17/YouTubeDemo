import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Share from 'react-native-share';
import Colors from '../../themes/colors';
import {vh, vw} from '../../utils/dimensions';
import renderData from '../../utils/constantData';
import CustomCard from '../../component/CustomCard';
import localeImage from '../../utils/localeInImage';
import {localeString} from '../../utils/localString';
import {useNavigation, useRoute} from '@react-navigation/native';
import VideoPlayerComponent from '../../component/videoComponet';
import ShimmerForVideoPlayer from '../../component/CustomShimmer/ShimmerForVideoPlayer';

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
  const route = useRoute<any>();
  let backData = route?.params;
  const navigation = useNavigation<any>();
  const [details, setDetails] = useState(backData?.renderdata);
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [title, setTitle] = useState<any>(backData?.renderdata?.title);
  let myNewData = renderData.filter(
    (item: any) => item?.sources !== details?.sources,
  );
  React.useEffect(() => {
    // Simulate shimmerLoading data
    setTimeout(() => {
      setShimmerLoading(false);
    }, 1200);
  }, [details]);

  /**
   *
   * @_renderItem component
   * @description return cardto the video list
   */
  const _renderItem = ({item}: any) => {
    return (
      <View>
        <CustomCard
          onPress={() => {
            setDetails(item);
          }}
          videoTitle={item?.title}
          source={{uri: item?.thumb}}
        />
      </View>
    );
  };

  /**
   * @CustomShare Function
   * @description returns react native share
   */
  const CustomShare = async () => {
    const myCustomShare = {
      message: 'This is test message',
    };
    try {
      const ShareResponse = await Share.open(myCustomShare)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      console.log('share response', ShareResponse);
    } catch (error) {
      console.log('error at share', error);
    }
  };

  /**
   * @onPresShare Function
   * @description onPress to active react native share
   */
  const onPresShare = (id: any) => {
    if (id === 3) {
      CustomShare();
    } else {
      console.log('not share');
    }
  };

  /**
   * @_buttonsRenderItem componnet
   * @description return feature button
   */
  const _buttonsRenderItem = (item: any, index: number) => (
    <View key={index} style={styles.itemContainer}>
      <TouchableOpacity onPress={() => onPresShare(item.id)}>
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
    if (shimmerLoading) {
      return <ShimmerForVideoPlayer />;
    } else {
      return (
        <View>
          {<Text style={styles.videoTitleStyle}>{details?.subtitle}</Text>}
          <Text style={styles.metaInfoStyle}>{localeString.views}</Text>
          <Text style={styles.description}>{details?.description}</Text>
          <View style={styles.listContainer}>
            {metaData.map(_buttonsRenderItem)}
          </View>
          <View style={styles.mainSubsViewStyle}>
            <View style={styles.channelDetailsViewStyle}>
              <Image
                resizeMode="cover"
                style={styles.channelImageSTyle}
                source={{uri: details?.thumb}}
              />
              <View style={styles.textViewStyle}>
                <Text style={styles.channelNameStyle}>{details?.title}</Text>
                <Text style={styles.subsTextStyle}>
                  {localeString.totalSubs}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.subsButtonStyle}>
              <Text style={styles.subsButtonTextStyle}>
                {localeString.subs}
              </Text>
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
                source={localeImage.unfold}
                style={styles.commentImageStyle}
              />
            </View>
            <View style={styles.userCommentViewStyle}>
              <Image
                resizeMode="cover"
                style={styles.commentImageStyle}
                source={localeImage.cahannelImage}
              />
              <Text style={styles.userCommentStyle}>
                {localeString.comment}
              </Text>
            </View>
          </View>
          <Text style={styles.smillarVideoTextStyle}>
            {localeString.smillarVideo}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.mainContainerStyle}>
      <SafeAreaView></SafeAreaView>
      <VideoPlayerComponent
        onPressBackButton={() => {
          navigation.goBack();
        }}
        source={{uri: details?.sources}}
      />
      <FlatList
        bounces={false}
        renderItem={_renderItem}
        data={myNewData.splice(0, 5)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={_listHeaderComponent}
        contentContainerStyle={{paddingBottom: 20}}
        keyExtractor={item => item?.id?.toString()}
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
    borderTopWidth: 1,
    marginTop: vh(30),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: vh(15),
    paddingHorizontal: vw(10),
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
    borderRadius: vw(10),
  },
  commentMainViewStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: vh(10),
    paddingHorizontal: vw(20),
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
    marginLeft: vw(20),
    marginTop: vh(15),
    fontWeight: 'bold',
  },
});
