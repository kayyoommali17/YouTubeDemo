import React, {useEffect, useState} from 'react';
import {vh} from '../../utils/dimensions';
import renderdata from '../../utils/constantData';
import routesNames from '../../utils/routesNames';
import CustomCard from '../../component/CustomCard';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ShimmerEffect from '../../Test/TestShimmer';
import ShimmerApp from '../../component/CustomShimmer/Shimmer';
const VideoRenderScreen = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setData(renderdata);
      setLoading(false);
    }, 2000);
  }, []);
  /**
   *
   * @_renderItem component
   * @returns all the Customcard
   */
  const _renderItem = ({item}: any) => {
    console.log('item', item?.id);
    return (
      <CustomCard
        onPress={() => {
          navigation.navigate(routesNames.videoPlayer, {
            renderdata: item,
            itemId: item?.id,
            title: item?.title,
            description: item?.description,
          });
        }}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
      />
    );
  };

  /**
   *
   * @renderEmptyComponent  component
   * @description renturn shimmer effect
   */
  const renderEmptyComponent = () => {
    if (loading) {
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

  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        style={{marginBottom: 20}}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={renderEmptyComponent}
        keyExtractor={(item: any, index: number) => item.id.toString()}
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
