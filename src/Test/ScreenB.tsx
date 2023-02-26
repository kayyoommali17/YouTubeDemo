import Slider from '@react-native-community/slider';
import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video, {OnLoadData} from 'react-native-video';

interface VideoBufferEvent {
  isBuffering: boolean;
  canPlayFastForward: boolean;
  canPlayReverse: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  error?: {
    code: number;
    domain: string;
  };
}

interface OnLoadStartData {
  isNetwork: boolean;
  uri: string;
  type: string;
}

interface LoadData {
  canPlayFastForward: boolean;
  canPlayReverse: boolean;
  canPlaySlowForward: boolean;
  canPlaySlowReverse: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  duration: number;
  naturalSize: {
    height: number;
    orientation: 'portrait' | 'landscape';
    width: number;
  };
}

interface ProgressData {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

interface OnBufferEvent {
  isBuffering: boolean;
}

interface OnLoadEventData {
  naturalSize: {
    height: number;
    orientation: 'portrait' | 'landscape';
    width: number;
  };
  source: {
    mainVer: number;
    microVer: number;
    miniVer: number;
    package: string;
    protocol: string;
    uri: string;
  };
}

type Props = {};

interface BufferConfig {
  minBufferMs: number;
  maxBufferMs: number;
  bufferForPlaybackMs: number;
  bufferForPlaybackAfterRebufferMs: number;
}

const BUFFER_CONFIG: BufferConfig = {
  minBufferMs: 15000,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 2500,
  bufferForPlaybackAfterRebufferMs: 5000,
};

const MyVideoTesting: React.FC<Props> = () => {
  const videoPlayer = useRef<Video>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);

  console.log('<>>><><><><>is loading>', isLoading);
  console.log('isbuffering>>', isBuffering);

  const onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
    // console.log('bufeerr', isBuffering);
    setIsBuffering(isBuffering);
    if (isBuffering) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const onLoadStart = () => {
    console.log('bonloadStart');
    // console.log('first');
    setIsLoading(true);
    setIsBuffering(true);
  };

  const onLoad = (data: OnLoadData) => {
    console.log('bufeerr', data.duration);

    setTotalDuration(data.duration);
    setIsLoading(false);
  };

  const onProgress = ({currentTime}: {currentTime: number}) => {
    if (!isSeeking) {
      setCurrentTime(currentTime);
    }
  };

  const onSeek = (value: number) => {
    if (videoPlayer.current) {
      videoPlayer.current.seek(value);
      setCurrentTime(value);
      setIsSeeking(false);
    }
  };

  const onSlidingStart = () => {
    setIsSeeking(true);
  };

  const onSlidingComplete = (value: number) => {
    onSeek(value);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderActivityIndicator = () => {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        ref={videoPlayer}
        onBuffer={onBuffer}
        onLoad={onLoad}
        resizeMode="cover"
        paused={!isPlaying}
        onProgress={onProgress}
        style={styles.videoPlayer}
        onLoadStart={onLoadStart}
        bufferConfig={BUFFER_CONFIG}
      />

      {isLoading && renderActivityIndicator()}
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause}>
          <Text style={styles.controlButton}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
        <Slider
          style={styles.seekBar}
          minimumValue={0}
          maximumValue={totalDuration}
          value={currentTime}
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#fff"
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
        />
        <Text style={styles.duration}>
          {currentTime.toFixed(0)} / {totalDuration.toFixed(0)}
        </Text>
        {isBuffering && !isLoading && (
          <View style={styles.seekBar}>
            <ActivityIndicator size="small" color="red" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    paddingTop: 50,
  },
  videoPlayer: {
    height: 200,
    width: '100%',
  },
  controls: {
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderWidth: 3,
  },
  seekBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  duration: {
    color: '#fff',
    marginLeft: 10,
  },
  controlButton: {
    color: '#fff',
    fontSize: 20,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default React.memo(MyVideoTesting);
