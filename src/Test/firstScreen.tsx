import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import localeImage from '../utils/localeInImage';
import {SafeAreaView} from 'react-native';

const firstScreen = () => {
  const [showIcon, setShowIcon] = useState(true);
  const timeout = useRef<any>([]);
  console.log('first>>>>>>', timeout);

  React.useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    timeout.current.push(timeout1);
  }, []);

  console.log('second', timeout);

  const onPressIconContainer = () => {
    setShowIcon(true);
    const timeout2 = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    console.log('jhihihi', timeout2);
    timeout.current.push(timeout2);
  };

  console.log('third', timeout);

  const onPressIcons = () => {
    setShowIcon(true);
    while (timeout.current.length) {
      clearTimeout(timeout.current.pop());
    }
    const timeout3 = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    timeout.current.push(timeout3);
  };

  console.log('fourth', timeout);
  return (
    <View style={{flex: 1, marginTop: 90}}>
      <Image
        style={{
          height: 200,
          width: '100%',
          borderWidth: 1,
        }}
        source={localeImage.happyWomen}
      />

      <TouchableOpacity
        onPress={onPressIconContainer}
        style={{
          height: 200,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
        }}>
        {showIcon && (
          <React.Fragment>
            <TouchableOpacity onPress={onPressIcons}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30, tintColor: 'red'}}
                source={localeImage.skipBkrwd}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressIcons}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30, tintColor: 'red'}}
                source={localeImage.skipBkrwd}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressIcons}>
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30, tintColor: 'red'}}
                source={localeImage.skipBkrwd}
              />
            </TouchableOpacity>
          </React.Fragment>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default firstScreen;

const styles = StyleSheet.create({});
