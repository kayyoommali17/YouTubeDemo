import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';

function SubscribeButton(props: any) {
  const [showModal, setShowModal] = useState(false);
  const {onOptionSelect} = props;

  const handleOptionSelect = (option: any) => {
    onOptionSelect(option);
  };

  return (
    <View
      style={{
        height: 100,
        width: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity onPress={() => handleOptionSelect('unsubscribe')}>
        <Text>Unsubscribe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionSelect('all')}>
        <Text>All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionSelect('personalized')}>
        <Text>Personalized</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SubscribeButton;
