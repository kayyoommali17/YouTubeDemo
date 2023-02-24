import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Shimmering from './shimmering';
const {width: screenWidth} = Dimensions.get('screen');
const width = screenWidth * 0.92 - 30;
const list = new Array(10).fill(undefined).map((val, index) => ({
  id: index,
  name: 'name',
}));
const ShimmerApp = () => {
  //   const [fetching, setFetching] = useState(true);
  const fetching = true;

  const renderList = () => {
    return list.map((val, index) => (
      <React.Fragment key={index}>
        <View style={styles.profileWrapper}>
          <Shimmering
            wrapperStyle={{
              width: '100%',
              height: 200,
              borderRadius: 10,
              borderTopEndRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
          <Shimmering
            wrapperStyle={{
              width: width * 0.9,
              height: 30,
              borderRadius: 5,
              marginTop: 5,
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Shimmering
              wrapperStyle={{
                width: 30,
                marginTop: 15,
                height: 30,
                borderRadius: 15,
              }}
            />
            <Shimmering
              wrapperStyle={{
                width: width * 0.5,
                height: 25,
                borderRadius: 5,
                marginTop: 15,
                marginLeft: 10,
              }}
            />
          </View>
        </View>
      </React.Fragment>
    ));
  };
  return (
    <ScrollView style={styles.container}>
      {fetching ? (
        renderList()
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Hello React Native</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  profileWrapper: {
    marginTop: 30,
  },
  profile: {
    marginHorizontal: 10,
  },
  postWrapper: {
    marginVertical: 10,
  },
});

export default ShimmerApp;
