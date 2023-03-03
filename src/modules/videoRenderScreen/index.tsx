import {ViewToken} from 'react-native';
import {vh} from '../../utils/dimensions';
import routesNames from '../../utils/routesNames';
import CustomCard from '../../component/CustomCard';
import {renderData} from '../../utils/constantData';
import {useNavigation} from '@react-navigation/native';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import LoadingIndicator from '../../component/ActivityIndicator';
import SkelTon from '../../component/CustomShimmer/ShimmerSkelton';
import React, {useCallback, useEffect, useRef, useState} from 'react';

const PAGE_SIZE = 3;
const VideoRenderScreen = () => {
  const [page, setPage] = useState(1);
  const flatlistRef = useRef<any>();
  const navigation = useNavigation<any>();
  const [data, setData] = useState<any>([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [foucusedIndexToPlay, setfoucusedIndexToPlay] = React.useState<
    number | null
  >(null);
  console.log('rerender at render screen');

  useEffect(() => {
    // Simulate shimmerLoading data
    setTimeout(() => {
      setData(renderData);
      setShimmerLoading(false);
    }, 2000);
  }, []);

  /**
   * @fetchMoreData Function
   * @description setting page after 100
   */
  const fetchMoreData = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setfoucusedIndexToPlay(0);
    }, 5000);
  }, []);

  const shouldShowLoader = renderData.length > page * PAGE_SIZE;

  /**
   *
   * @_renderItem component
   * @returns all the Customcard
   */
  const _renderItem = ({item, index}: any) => {
    const onPress = () => {
      navigation.navigate(routesNames.videoPlayer, {
        renderdata: item,
      });
    };
    return (
      <CustomCard
        onPress={onPress}
        currentIndex={index}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
        channelName={item?.channelName}
        videoSource={{uri: item?.sources}}
        foucusedIndexToPlay={foucusedIndexToPlay}
      />
    );
  };

  /**
   *
   * @renderEmptyComponent  component
   * @description renturn shimmer effect
   */
  const renderEmptyComponent = () => {
    if (shimmerLoading) {
      // Show shimmer effect while data is being loaded
      return <SkelTon />;
    } else {
      // Show message if there is no data
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      );
    }
  };

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      setTimeout(() => {
        setfoucusedIndexToPlay(viewableItems[0]?.index);
      }, 1000);
    },
    [],
  );

  const viewabilityConfigCallbackPairs = React.useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  /**
   * @renderFooter Component
   * @returns loder to pagination
   */
  const renderFooter = () => {
    return <LoadingIndicator />;
  };

  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        ref={flatlistRef}
        renderItem={_renderItem}
        maxToRenderPerBatch={3}
        style={{marginBottom: 20}}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        data={data.slice(0, (page + 1) * PAGE_SIZE)}
        ListFooterComponent={shouldShowLoader ? renderFooter : null}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs?.current}
      />
    </View>
  );
};

export default React.memo(VideoRenderScreen);

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    marginTop: vh(10),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loaderContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});
