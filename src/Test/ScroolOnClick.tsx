// import {
//   FlatList,
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import localeImage from '../utils/localeInImage';

// const metaData = [
//   {
//     id: 1,
//     title: '50',
//     image: require('../assets/images/maxresdefault_2.png'),
//   },
//   {
//     id: 2,
//     title: '50',
//     image: localeImage.happyWomen,
//   },
//   {
//     id: 3,
//     title: 'Share',
//     image: require('../assets/images/maxresdefault_2.png'),
//   },
//   {
//     id: 4,
//     title: 'Favorite',
//     image: require('../assets/images/maxresdefault_2.png'),
//   },
//   {
//     id: 5,
//     title: 'Donate',
//     image: require('../assets/images/maxresdefault_2.png'),
//   },
// ];

// const renderItem = ({item}: any) => {
//   return (
//     <TouchableOpacity style={{borderWidth: 1, height: 400}}>
//       <Image style={{width: 375, height: 400}} source={item.image} />
//     </TouchableOpacity>
//   );
// };

// const ScrollOnClick = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [scrollOffset, setScrollOffset] = useState(0);
//   console.log('active ', activeIndex);
//   const ITEM_WIDTH = 375;
//   const ITEM_SPACING = 10;
//   const flatListRef = React.useRef<any>(null);

//   //   const handleNext = () => {
//   //     const nextIndex = (activeIndex + 1) % metaData.length;
//   //     setActiveIndex(nextIndex);
//   //     flatListRef.current.scrollToIndex({
//   //       index: nextIndex,
//   //       animated: true,
//   //     });
//   //   };
//   const handleNext = () => {
//     const itemWidth = ITEM_WIDTH + ITEM_SPACING;

//     const nextIndex = Math.round((scrollOffset + itemWidth) / itemWidth);
//     setActiveIndex(nextIndex);

//     flatListRef.current.scrollToOffset({
//       offset: nextIndex * itemWidth,
//       animated: true,
//     });
//   };

//   const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
//     setActiveIndex(viewableItems[0]?.index ?? 0);
//   }, []);
//   const onMomentumScrollEnd = (event: any) => {
//     const viewSize = event.nativeEvent.layoutMeasurement.width;
//     const contentOffset = event.nativeEvent.contentOffset.x;
//     const activeIndex = Math.floor(contentOffset / viewSize);
//     setActiveIndex(activeIndex);
//   };

//   const handleScroll = useCallback((event: any) => {
//     const {contentOffset} = event.nativeEvent;
//     const itemWidth = ITEM_WIDTH + ITEM_SPACING;
//     const index = Math.round(contentOffset / itemWidth);
//     setActiveIndex(index);
//     setScrollOffset(contentOffset);
//   }, []);

//   return (
//     <View style={{marginTop: 60, justifyContent: 'center'}}>
//       <FlatList
//         pagingEnabled
//         horizontal
//         ref={flatListRef}
//         data={metaData}
//         renderItem={renderItem}
//         // onMomentumScrollEnd={onMomentumScrollEnd}
//         // onViewableItemsChanged={onViewableItemsChanged}
//         // viewabilityConfig={{itemVisiblePercentThreshold: 50}}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         snapToInterval={ITEM_WIDTH + ITEM_SPACING}
//         contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
//       />

//       <View style={styles.dotContainer}>
//         {metaData.map((item, index) => (
//           <View
//             key={item.id}
//             style={[styles.dot, index === activeIndex && styles.activeDot]}
//           />
//         ))}
//       </View>
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPress={handleNext}
//         style={{
//           backgroundColor: 'purple',
//           marginHorizontal: 20,
//           alignItems: 'center',
//           paddingVertical: 10,
//           marginTop: 30,
//         }}>
//         <Text>{'Next'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ScrollOnClick;

// const styles = StyleSheet.create({
//   dotContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'red',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: 'blue',
//   },
// });
import React, {useState, useRef} from 'react';
import {View, Image, FlatList, TouchableOpacity, Text} from 'react-native';

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/id/1018/300',
  },
  {
    id: '2',
    image: 'https://picsum.photos/id/1015/300',
  },
  {
    id: '3',
    image: 'https://picsum.photos/id/1019/300',
  },
];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  const handleNext = () => {
    const nextIndex = activeIndex + 1;
    console.log('1', nextIndex);

    if (nextIndex >= data.length) {
      setActiveIndex(0);
      flatListRef.current.scrollToIndex({index: 0});
    } else {
      console.log('2', nextIndex);
      setActiveIndex(nextIndex);
      flatListRef.current.scrollToIndex({index: nextIndex});
    }
  };

  const getItemLayout = (_t: any, index: any) => ({
    length: 300,
    offset: 375 * index,
    index,
  });

  const renderItem = ({item, index}: any) => (
    <Image
      source={{uri: item.image}}
      style={{width: 375, height: 375, marginHorizontal: 10}}
    />
  );

  const renderDot = (index: any) => (
    <View
      style={[
        {width: 10, height: 10, borderRadius: 5, marginHorizontal: 5},
        {backgroundColor: index === activeIndex ? 'blue' : 'red'},
      ]}
    />
  );

  return (
    <View style={{marginTop: 60}}>
      <FlatList
        horizontal
        data={data}
        ref={flatListRef}
        pagingEnabled={true}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = event?.nativeEvent?.contentOffset?.x / 300;
          setActiveIndex(Math.floor(index));
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {data.map((item, index) => renderDot(index))}
      </View>
      <TouchableOpacity
        onPress={handleNext}
        style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{fontSize: 18, color: 'blue'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageCarousel;
