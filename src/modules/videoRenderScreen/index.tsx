import {vh} from '../../utils/dimensions';
import React, {useEffect, useState} from 'react';
import routesNames from '../../utils/routesNames';
import CustomCard from '../../component/CustomCard';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import renderData from '../../utils/constantData';
import ShimmerApp from '../../component/CustomShimmer/Shimmer';
const PAGE_SIZE = 3;
const TOTAL_ITEMS = 10;
const VideoRenderScreen = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [shimmerLoading, setShimmerLoading] = useState(true);

  useEffect(() => {
    // Simulate shimmerLoading data
    setTimeout(() => {
      setData(renderData);
      setShimmerLoading(false);
    }, 2000);

    setTimeout(() => {
      const startIndex = (page - 1) * PAGE_SIZE;
      const endIndex = Math.min(startIndex + PAGE_SIZE, TOTAL_ITEMS);
      const pageItems = Array.from({length: endIndex - startIndex}, (_, i) => ({
        id: startIndex + i + 1,
        name: `Item ${startIndex + i + 1}`,
      }));

      setIsLoading(false);
      setData([...data, ...pageItems]);
    }, 1000);
  }, []);
  /**
   *
   * @_renderItem component
   * @returns all the Customcard
   */
  const _renderItem = ({item}: any) => {
    return (
      <CustomCard
        onPress={() => {
          navigation.navigate(routesNames.videoPlayer, {
            renderdata: item,
          });
        }}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
        channelName={item?.channelName}
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
      return <ShimmerApp />;
    } else {
      // Show message if there is no data
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      );
    }
  };

  /**
   * @renderFooter Component
   * @returns loder to pagination
   */
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        style={{marginBottom: 20}}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
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
});
