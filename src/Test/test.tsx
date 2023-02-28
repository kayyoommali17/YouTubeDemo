import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TouchableImage from '../component/TouchImage';
import localeImage from '../utils/localeInImage';
import Orientation from 'react-native-orientation-locker';
import {vh} from '../utils/dimensions';

const TestX = () => {
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const [videoStyle, setVideoStyle] = useState<any>({
    height: vh(875 / 4.3),
    width: '100%',
  });
  /**
   * @description as screen render setting oreintation
   */
  React.useEffect(() => {
    Orientation.getOrientation(orientation => {
      console.log(orientation.includes('LANDSCAPE'));
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeLockListener(handleOreinTation);
    };
  }, []);

  /**
   * @handleOreinTation Function
   * @description handle fullscreen mode
   */
  const handleOreinTation = () => {
    if (currOrientation.includes('LANDSCAPE')) {
      Orientation.lockToPortrait();
      setVideoStyle({
        height: 200,
        width: '100%',
      });
    } else {
      Orientation.lockToLandscape();
      setVideoStyle({
        height: '100%',
        width: '100%',
      });
    }
    console.log('currrrr', currOrientation);
  };
  const isOreintation = currOrientation.includes('LANDSCAPE');
  return (
    <View style={{}}>
      <View style={videoStyle}></View>
      <View
        style={{
          height: isOreintation ? '100%' : vh(875 / 4.3),
          position: 'absolute',
          backgroundColor: 'yellow',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            backgroundColor: 'purple',
          }}>
          <TouchableImage source={localeImage.back} />
          <TouchableImage source={localeImage.back} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderWidth: 1,
            alignItems: 'center',
            height: '33%',
            backgroundColor: 'blue',
          }}>
          <TouchableImage
            imageStyle={{height: 30, width: 30, resizeMode: 'contain'}}
            source={localeImage.back}
          />
          <TouchableImage
            imageStyle={{height: 30, width: 30, resizeMode: 'contain'}}
            source={localeImage.back}
          />
          <TouchableImage
            imageStyle={{height: 30, width: 30, resizeMode: 'contain'}}
            source={localeImage.back}
          />
        </View>
        <View
          style={{
            height: 10,
            width: '100%',
            backgroundColor: 'red',
            borderWidth: 1,
            marginTop: 20,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
          }}>
          <TouchableImage
            imageStyle={{height: 30, width: 30, resizeMode: 'contain'}}
            source={localeImage.back}
          />
          <TouchableImage
            imageStyle={{height: 30, width: 30, resizeMode: 'contain'}}
            onPress={handleOreinTation}
            source={localeImage.back}
          />
        </View>
      </View>
    </View>
  );
};

export default TestX;

const styles = StyleSheet.create({});
