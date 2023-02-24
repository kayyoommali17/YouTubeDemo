import React from 'react';
import {Dimensions, StyleSheet, View, FlatList} from 'react-native';
import {vh, vw} from '../../utils/dimensions';
import Shimmering from './shimmering';

const {width: screenWidth} = Dimensions.get('screen');
const width = screenWidth * 0.92 - vh(30);
const list = new Array(10).fill(undefined).map((val, index) => ({
  id: index,
  name: 'name',
}));
const ShimmerApp = () => {
  // const fetching = true;

  const renderItem = ({item, index}: any) => {
    return (
      <View style={styles.profileWrapper}>
        <Shimmering wrapperStyle={styles.mainShimmerContainerStyle} />
        <Shimmering wrapperStyle={styles.innerContainerStyle} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Shimmering wrapperStyle={styles.profileShimmerStyle} />
          <Shimmering wrapperStyle={styles.channelShimmerStyle} />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  profileWrapper: {
    marginTop: vh(20),
  },
  profile: {
    marginHorizontal: vh(10),
  },
  postWrapper: {
    marginVertical: vh(10),
  },
  mainShimmerContainerStyle: {
    width: '100%',
    height: 200,
    borderRadius: vh(10),
    borderTopEndRadius: vh(10),
    borderTopLeftRadius: vh(10),
  },
  innerContainerStyle: {
    width: width * 0.9,
    height: vh(30),
    borderRadius: vh(5),
    marginTop: vh(5),
  },
  profileShimmerStyle: {
    width: vh(30),
    marginTop: vh(15),
    height: vh(30),
    borderRadius: vh(15),
  },
  channelShimmerStyle: {
    height: vh(25),
    width: width * 0.5,
    borderRadius: vh(5),
    marginTop: vh(15),
    marginLeft: vh(10),
  },
});

export default React.memo(ShimmerApp);
