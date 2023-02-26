import React from 'react';
import Shimmering from './shimmering';
import {vh, vw} from '../../utils/dimensions';
import {Dimensions, StyleSheet, View, FlatList} from 'react-native';

const {width: screenWidth} = Dimensions.get('screen');
const width = screenWidth * 0.92 - vh(30);
const list = new Array(10).fill(undefined).map((val, index) => ({
  id: index,
  name: 'name',
}));
const ShimmerForVideoPlayer = () => {
  /**
   *
   * @renderItem function that returns a component
   * @returns uniqueness  component
   */
  const renderItem = () => {
    return (
      <View style={styles.profileWrapper}>
        <Shimmering wrapperStyle={styles.titleAndViewStyle} />
        <Shimmering wrapperStyle={styles.descriptionShimmerStyle} />
        <View style={styles.innerContainerStyle}>
          <Shimmering wrapperStyle={styles.renderButtomShimmerStyle} />
          <Shimmering wrapperStyle={styles.renderButtomShimmerStyle} />
          <Shimmering wrapperStyle={styles.renderButtomShimmerStyle} />
          <Shimmering wrapperStyle={styles.renderButtomShimmerStyle} />
          <Shimmering wrapperStyle={styles.renderButtomShimmerStyle} />
        </View>
        <View style={styles.channelViewStyle}>
          <Shimmering wrapperStyle={styles.profileShimmerStyle} />
          <Shimmering wrapperStyle={styles.channelShimmerStyle} />
          <Shimmering wrapperStyle={styles.subscribeButtonSimmerStyle} />
        </View>
      </View>
    );
  };

  /**
   *
   * @keyExtractor Function
   * @returns uniqueness
   */
  const keyExtractor = (item: any) => item?.id?.toString();

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      style={styles.container}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: vw(20),
  },
  profileWrapper: {
    marginTop: vh(30),
  },
  descriptionShimmerStyle: {
    width: '100%',
    height: vh(100),
    borderRadius: vh(10),
    borderTopEndRadius: vh(10),
    borderTopLeftRadius: vh(10),
    marginTop: vh(10),
  },
  innerContainerStyle: {
    marginTop: vh(20),
    marginVertical: vh(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  subscribeButtonSimmerStyle: {
    height: vh(25),
    width: width * 0.3,
    borderRadius: vh(5),
    marginTop: vh(15),
    marginLeft: vh(40),
  },
  renderButtomShimmerStyle: {
    width: vh(40),
    marginTop: vh(15),
    height: vh(40),
    borderRadius: vh(20),
  },
  titleAndViewStyle: {
    height: vh(25),
    width: width * 0.5,
    borderRadius: vh(5),
    marginLeft: vh(3),
  },
  channelViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default React.memo(ShimmerForVideoPlayer);
