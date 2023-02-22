import React from 'react';
import Colors from '../../themes/colors';
import localeImage from '../../utils/localeInImage';
import {normalize, vh, vw} from '../../utils/dimensions';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress?: any;
  screenText: string;
  backgroundColor?: string;
}
const HeaderNavigation = (props: Props) => {
  return (
    <View style={styles.mainViewStyle}>
      <TouchableOpacity activeOpacity={0.7} style={styles.touchStyle}>
        <Image source={localeImage.back} style={styles.imageStyle} />
      </TouchableOpacity>
      <Text style={styles.screenTextStyle}>
        {props?.screenText || 'screenName'}
      </Text>
    </View>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: vh(20),
    paddingHorizontal: vw(20),
    backgroundColor: Colors.white,
  },
  screenTextStyle: {
    fontWeight: 'bold',
    marginLeft: vw(100),
    // textAlign: 'center',
    color: Colors.black,
    fontSize: normalize(18),
  },
  touchStyle: {
    width: vw(30),
    height: vw(30),
  },
  imageStyle: {
    height: vw(30),
    width: vw(30),
    tintColor: Colors.black,
  },
});
