import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header/Header';
import CustomCard from '../../component/CustomCard';
import renderdata from '../../utils/constantData';
import {useNavigation} from '@react-navigation/native';
import routesNames from '../../utils/routesNames';

const VideoRenderScreen = () => {
  // const [data, setData] = useState(renderdata);
  const navigation = useNavigation<any>();
  const _renderItem = ({item}: any) => {
    console.log('item', item?.thumb);
    return (
      <CustomCard
        onPress={() => {
          navigation.navigate(routesNames.videoPlayer);
        }}
        videoTitle={item?.title}
        source={{uri: item?.thumb}}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={renderdata}
        renderItem={_renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

export default VideoRenderScreen;

const styles = StyleSheet.create({});
