import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header/Header';
import CustomCard from '../../component/CustomCard';
import renderdata from '../../utils/constantData';
import {useNavigation} from '@react-navigation/native';
import routesNames from '../../utils/routesNames';
import {vh} from '../../utils/dimensions';
const PAGE_SIZE = 5;
const VideoRenderScreen = () => {
  // const [data, setData] = useState(renderdata);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const navigation = useNavigation<any>();

  // const fetchItems = pageNumber => {
  //   setIsLoading(true);

  //   // Simulate fetching data from an API
  //   setTimeout(() => {
  //     const startIndex = (pageNumber - 1) * PAGE_SIZE;
  //     const endIndex = startIndex + PAGE_SIZE;
  //     const newItems = renderdata.slice(startIndex, endIndex);

  //     setIsLoading(false);
  //     setIsRefreshing(false);
  //     setPage(pageNumber);
  //     setItems(prevItems =>
  //       pageNumber === 1 ? newItems : [...prevItems, ...newItems],
  //     );
  //   }, 1500);
  // };

  // React.useEffect(() => {
  //   fetchItems(1);
  // }, []);
  const _renderItem = ({item}: any) => {
    console.log('item', item?.thumb);
    return (
      <CustomCard
        onPress={() => {
          navigation.navigate(routesNames.videoPlayer, {item});
        }}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
      />
    );
  };
  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        data={renderdata}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

export default VideoRenderScreen;

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    marginTop: vh(10),
  },
});
