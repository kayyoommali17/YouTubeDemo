import React, {useRef, useState} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const CustomVideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const videoRef = useRef<any>(null);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const {width}: any = StyleSheet.flatten(styles.progressBar);
        const position = gestureState.dx / width;
        const time = position * duration;
        setCurrentTime(time);
        setIsSeeking(true);
        videoRef.current.seek(time);
      },
      onPanResponderRelease: () => {
        setIsSeeking(false);
      },
    }),
  ).current;

  const handleLoad = (meta: any) => {
    setDuration(meta.duration);
  };

  const handleProgress = ({currentTime}: any) => {
    if (!isSeeking) {
      setCurrentTime(currentTime);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        paused={false}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={styles.videoPlayer}
        onLoad={handleLoad}
        onProgress={handleProgress}
        resizeMode="contain"
        controls
      />
      <View style={styles.progressBar} {...panResponder.panHandlers}>
        <View
          style={[
            styles.progress,
            {width: `${(currentTime / duration) * 100}%`},
          ]}
        />
        <View
          style={[
            styles.seekThumb,
            {left: `${(currentTime / duration) * 100}%`},
          ]}
        />
      </View>
    </View>
  );
};

export default CustomVideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayer: {
    // flex: 1,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    marginTop: 170,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#f00',
  },
  seekThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f00',
    position: 'absolute',
  },
});
