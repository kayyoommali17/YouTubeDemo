import React from 'react';
import {vh} from '../../utils/dimensions';
import renderdata from '../../utils/constantData';
import routesNames from '../../utils/routesNames';
import CustomCard from '../../component/CustomCard';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, View} from 'react-native';
const VideoRenderScreen = () => {
  const navigation = useNavigation<any>();

  const _renderItem = ({item}: any) => {
    console.log('item', item?.id);
    return (
      <CustomCard
        onPress={() => {
          navigation.navigate(routesNames.videoPlayer, {
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
  return (
    <View style={styles.mainContainerStyle}>
      <FlatList
        data={renderdata}
        renderItem={_renderItem}
        style={{marginBottom: 20}}
        contentContainerStyle={{paddingBottom: 20}}
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
});
