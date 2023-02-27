import React from 'react';
import Colors from '../../themes/colors';
import {vh, vw} from '../../utils/dimensions';
import {Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const {width: screenWidth} = Dimensions.get('screen');
const width = screenWidth * 0.92 - vh(30);
var array = [1, 2, 3, 4, 5];
const ShimmerForVideoPlayer = () => {
  return (
    <View style={styles.profileWrapper}>
      <ShimmerPlaceholder style={styles.titleAndViewStyle} />
      <ShimmerPlaceholder style={styles.descriptionShimmerStyle} />
      <View style={styles.innerContainerStyle}>
        {array.map(index => {
          return (
            <ShimmerPlaceholder
              key={index}
              style={styles.renderButtomShimmerStyle}
            />
          );
        })}
      </View>
      <View style={styles.channelViewStyle}>
        <ShimmerPlaceholder style={styles.profileShimmerStyle} />
        <ShimmerPlaceholder style={styles.channelShimmerStyle} />
        <ShimmerPlaceholder style={styles.subscribeButtonSimmerStyle} />
      </View>
      <View style={styles.commentViewStyle}>
        <ShimmerPlaceholder
          style={[styles.titleAndViewStyle, {height: vh(18)}]}
        />
        <View style={styles.commentShimmerStyle}>
          <ShimmerPlaceholder style={styles.commetProfileShimmerStyle} />
          <ShimmerPlaceholder
            style={[
              styles.channelShimmerStyle,
              {
                width: width * 0.9,
              },
            ]}
          />
        </View>
      </View>
      <ShimmerPlaceholder style={styles.videoPlayerStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWrapper: {
    marginTop: vh(0),
    marginHorizontal: vw(20),
  },
  descriptionShimmerStyle: {
    width: '100%',
    height: vh(100),
    borderRadius: vh(10),
    borderTopEndRadius: vh(10),
    borderTopLeftRadius: vh(10),
    marginTop: vh(10),
  },
  videoPlayerStyle: {
    width: '100%',
    height: vh(200),
    borderRadius: vh(10),
    borderTopEndRadius: vh(10),
    borderTopLeftRadius: vh(10),
    marginTop: vh(10),
  },
  innerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileShimmerStyle: {
    width: vh(40),
    height: vh(40),
    borderRadius: vh(20),
  },
  commetProfileShimmerStyle: {
    width: vh(30),
    height: vh(30),
    borderRadius: vh(15),
  },
  channelShimmerStyle: {
    height: vh(25),
    width: width * 0.5,
    borderRadius: vh(5),
    marginLeft: vh(10),
  },
  subscribeButtonSimmerStyle: {
    height: vh(25),
    width: width * 0.3,
    borderRadius: vh(5),
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
    marginTop: vh(10),
  },
  channelViewStyle: {
    borderTopWidth: 1,
    marginTop: vh(10),
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: vh(10),
    justifyContent: 'center',
    marginHorizontal: vw(-20),
    borderColor: Colors.lightGrey,
  },
  commentViewStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: vh(10),
    marginHorizontal: vw(-20),
    paddingHorizontal: vw(20),
    borderColor: Colors.lightGrey,
  },
  commentShimmerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vh(15),
  },
});

export default React.memo(ShimmerForVideoPlayer);
