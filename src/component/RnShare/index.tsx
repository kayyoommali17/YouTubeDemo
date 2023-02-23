import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Share from 'react-native-share';

const ShareButton = ({message, title, url}: any) => {
  const shareMessage = async () => {
    try {
      const result: any = await Share.open({
        message: message,
        title: title,
        url: url,
      });
      if (result.action === Share?.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(`Error sharing: ${error.message}`);
    }
  };

  return (
    <TouchableOpacity onPress={shareMessage}>
      <Text>Share</Text>
    </TouchableOpacity>
  );
};

export default ShareButton;
