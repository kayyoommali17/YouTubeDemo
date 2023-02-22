import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header/Header';
import CustomCard from '../../component/CustomCard';
import renderdata from '../../utils/constantData';

const Video = () => {
  const [data, setData] = useState(renderdata);

  const _renderItem = ({item}: any) => {
    console.log('item', item?.thumb);
    return <CustomCard videoTitle={item?.title} source={0} />;
  };
  return (
    <View style={{flex: 1}}>
      <FlatList data={data} renderItem={_renderItem} />
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({});
