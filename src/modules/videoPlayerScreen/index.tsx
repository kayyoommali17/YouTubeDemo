import Colors from '../../themes/colors';
import {vh, vw} from '../../utils/dimensions';
import React, {useRef, useState} from 'react';
import CustomCard from '../../component/CustomCard';
import {renderData} from '../../utils/constantData';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import VideoPlayerComponent from '../../component/videoComponet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListHeaderComponent from '../../component/ListheaderComponent/index';
import ShimmerForVideoPlayer from '../../component/CustomShimmer/ShimmerForVideoPlayer';
/**
 *
 *
 * @VideoPlayer componnet
 * @description return simillar videos
 */

const VideoPlayer = () => {
  const route = useRoute<any>();
  let backData = route?.params;
  const listRef = useRef<any>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [details, setDetails] = useState(backData?.renderdata);

  let myNewData = renderData.filter(
    (item: any) => item?.sources !== details?.sources,
  );

  console.log('rerender at player');

  /**
   *
   *
   */
  React.useEffect(() => {
    // Simulate shimmerLoading data
    setTimeout(() => {
      setShimmerLoading(false);
    }, 1000);
  }, [details]);

  /**
   *
   * @_renderItem component
   * @description return cardto the video list
   */

  const _renderItem = ({item}: any) => {
    const onPress = () => {
      setDetails(item);
      setShimmerLoading(true);
      listRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
      setTimeout(() => {
        setShimmerLoading(false);
      }, 2000);
    };
    return (
      <CustomCard
        onPress={onPress}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
      />
    );
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  /**
   *
   * @_listHeaderComponent componnet
   * @description return header for the flatlist
   */
  const _listHeaderComponent = () => {
    if (shimmerLoading) {
      return <ShimmerForVideoPlayer />;
    } else {
      return <ListHeaderComponent details={details} />;
    }
  };

  return (
    <View
      style={[
        styles.mainContainerStyle,
        {
          paddingTop: insets.top,
        },
      ]}>
      <VideoPlayerComponent
        onPressBackButton={onPressBack}
        source={{uri: details?.sources}}
      />
      <FlatList
        ref={listRef}
        bounces={false}
        renderItem={_renderItem}
        data={myNewData?.splice(0, 5)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={_listHeaderComponent}
        contentContainerStyle={{paddingBottom: 20}}
        keyExtractor={item => item?.id?.toString()}
        scrollEnabled={shimmerLoading ? false : true}
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
    marginVertical: vh(10),
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    fontSize: vh(16),
    marginBottom: vh(10),
  },
  description: {
    textAlign: 'justify',
  },
  listContainer: {
    marginTop: vh(20),
    flexDirection: 'row',
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
    marginLeft: vw(20),
    marginTop: vh(15),
    fontWeight: 'bold',
  },
});
