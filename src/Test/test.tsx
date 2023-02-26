import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Video, {OnLoadData, VideoProperties} from 'react-native-video';

// interface Props extends VideoProperties {
//   durationToPreload: number;
// }

const VideoNewTest = () => {
  const videoRef = useRef<Video>(null);
  const [isBuffering, setIsBuffering] = useState<boolean>(true);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const durationToPreload = 10;
  const onLoad = (data: OnLoadData) => {
    // Start preloading the video after some time
    setTimeout(() => {
      videoRef.current?.seek(1); // seek to 1 second to preload
    }, durationToPreload * 1000);

    setIsVideoReady(true);
  };

  const onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
    setIsBuffering(isBuffering);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        controls
        onLoad={onLoad}
        style={styles.video}
        resizeMode="contain"
        onBuffer={onBuffer}
      />
      {(!isVideoReady || isBuffering) && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VideoNewTest;
