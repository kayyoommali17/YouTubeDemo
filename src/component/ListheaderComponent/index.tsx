import React, {useState} from 'react';
import Share from 'react-native-share';
import Colors from '../../themes/colors';
import {hitSlop} from '../../utils/constant';
import {vh, vw} from '../../utils/dimensions';
import localeImage from '../../utils/localeInImage';
import {localeString} from '../../utils/localString';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {metaData} from '../../utils/constantData';

const ListHeaderComponent = ({details}: any) => {
  const [showMore, setShowMore] = useState(true);
  const [subsCribition, setsubsCribition] = useState({
    isTrue: true,
    vlaue: localeString.subs,
  });

  /**
   * @CustomShare Function
   * @description returns react native share
   */
  const CustomShare = async () => {
    const myCustomShare = {
      message: 'This is test message',
    };
    try {
      const ShareResponse = await Share.open(myCustomShare)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
      console.log('share response', ShareResponse);
    } catch (error) {
      console.log('error at share', error);
    }
  };

  /**
   * @onPresShare Function
   * @description onPress to active react native share
   */
  const onPresShare = (id: any) => {
    if (id === 3) {
      CustomShare();
    } else {
      console.log('not share');
    }
  };

  /**
   * @_buttonsRenderItem componnet
   * @description return feature button
   */
  const _buttonsRenderItem = (item: any, index: number) => (
    <View key={index} style={styles.itemContainer}>
      <TouchableOpacity hitSlop={hitSlop} onPress={() => onPresShare(item.id)}>
        <Image style={styles.renderButtonImageStyle} source={item.image} />
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const onPress = () => {
    if (subsCribition.isTrue) {
      setsubsCribition({
        isTrue: false,
        vlaue: localeString.subscribed,
      });
    } else {
      setsubsCribition({
        isTrue: true,
        vlaue: localeString.subs,
      });
    }
  };
  return (
    <View style={styles.mainContainerStyleX}>
      {<Text style={styles.videoTitleStyle}>{details?.subtitle}</Text>}
      <Text style={styles.metaInfoStyle}>{localeString.views}</Text>
      <Text numberOfLines={showMore ? 2 : undefined} style={styles.description}>
        {details?.description}
      </Text>
      {details?.description.length > 100 && (
        <Text
          style={{color: Colors.grey}}
          onPress={() => setShowMore(!showMore)}>
          {showMore ? 'see more' : 'see less'}
        </Text>
      )}

      <View style={styles.listContainer}>
        {metaData.map(_buttonsRenderItem)}
      </View>
      <View style={styles.mainSubsViewStyle}>
        <View style={styles.channelDetailsViewStyle}>
          <Image
            resizeMode="cover"
            style={styles.channelImageSTyle}
            source={{uri: details?.thumb}}
          />
          <View style={styles.textViewStyle}>
            <Text style={styles.channelNameStyle}>
              {details?.title.slice(0, 15) + '..'}
            </Text>
            <Text style={styles.subsTextStyle}>{localeString.totalSubs}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          hitSlop={hitSlop}
          style={[
            styles.subsButtonStyle,
            {
              backgroundColor: subsCribition.isTrue
                ? Colors.tabColor
                : Colors.grey,
            },
          ]}>
          <Text style={styles.subsButtonTextStyle}>{subsCribition.vlaue}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentMainViewStyle}>
        <View style={styles.commentInnerViewStyle}>
          <View style={styles.commentsTotalStyle}>
            <Text style={styles.commentTextStyle}>
              {localeString.totalComment}
            </Text>
            <Text style={styles.commenntNumberStyle}>
              {localeString.allCommet}
            </Text>
          </View>
          <Image
            resizeMode="contain"
            source={localeImage.unfold}
            style={styles.commentImageStyle}
          />
        </View>
        <View style={styles.userCommentViewStyle}>
          <Image
            resizeMode="cover"
            style={styles.commentImageStyle}
            source={localeImage.cahannelImage}
          />
          <Text style={styles.userCommentStyle}>{localeString.comment}</Text>
        </View>
      </View>
      <Text style={styles.smillarVideoTextStyle}>
        {localeString.smillarVideo}
      </Text>
    </View>
  );
};

export default React.memo(ListHeaderComponent);

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  videoTitleStyle: {
    fontWeight: '800',
    color: Colors.black,
    marginVertical: vh(10),
  },
  metaInfoStyle: {
    opacity: 0.7,
    color: Colors.black,
    marginBottom: vh(10),
  },
  description: {
    textAlign: 'justify',
  },
  listContainer: {
    marginTop: vh(20),
    flexDirection: 'row',
    flex: 1,
  },
  itemContainer: {
    alignItems: 'center',
    paddingHorizontal: vw(10),
    flex: 1,
  },
  itemText: {
    fontSize: vh(12),
    marginTop: vh(10),
  },
  mainSubsViewStyle: {
    borderTopWidth: 1,
    marginTop: vh(30),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: vh(15),
    paddingHorizontal: vw(15),
    marginHorizontal: vw(-20),
    borderColor: Colors.lightGrey,
    justifyContent: 'space-between',
  },
  channelDetailsViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelImageSTyle: {
    height: vw(50),
    width: vw(50),
    borderRadius: vw(50),
  },
  channelNameStyle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: vh(16),
  },
  textViewStyle: {
    marginLeft: vw(10),
  },
  subsTextStyle: {
    marginTop: vh(5),
    fontSize: vh(14),
  },
  subsButtonStyle: {
    backgroundColor: Colors.tabColor,
    paddingHorizontal: vw(30),
    paddingVertical: vh(8),
    borderRadius: vw(20),
    maxWidth: vw(150),
    alignItems: 'center',
  },
  renderButtonImageStyle: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'contain',
  },
  subsButtonTextStyle: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  commentImageStyle: {
    height: vw(20),
    width: vw(20),
    resizeMode: 'cover',
    borderRadius: vw(10),
  },
  commentMainViewStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
    marginHorizontal: vw(-20),
  },
  commentInnerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentsTotalStyle: {
    flexDirection: 'row',
  },
  commentTextStyle: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  commenntNumberStyle: {
    marginLeft: vw(10),
  },
  userCommentViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: vw(290),
    marginVertical: vh(10),
  },
  userCommentStyle: {
    marginLeft: vw(10),
    fontSize: vh(12),
  },
  smillarVideoTextStyle: {
    marginLeft: vw(20),
    marginTop: vh(15),
    fontWeight: 'bold',
  },
  mainContainerStyleX: {
    marginHorizontal: vw(20),
  },
});
