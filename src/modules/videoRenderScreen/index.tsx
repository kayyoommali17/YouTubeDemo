import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {vh} from '../../utils/dimensions';
import React, {useEffect, useState} from 'react';
import routesNames from '../../utils/routesNames';
import CustomCard from '../../component/CustomCard';
import {renderData} from '../../utils/constantData';
import {useNavigation} from '@react-navigation/native';
import SkelTon from '../../component/CustomShimmer/ShimmerSkelton';

const PAGE_SIZE = 3;
const VideoRenderScreen = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation<any>();
  const [data, setData] = useState<any>([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);

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

  const shouldShowLoader = renderData.length > page * PAGE_SIZE;

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

  /**
   * @renderFooter Component
   * @returns loder to pagination
   */
  const renderFooter = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        renderItem={_renderItem}
        style={{marginBottom: 20}}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        data={data.slice(0, (page + 1) * PAGE_SIZE)}
        ListFooterComponent={shouldShowLoader ? renderFooter : null}
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
