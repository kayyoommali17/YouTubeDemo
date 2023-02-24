import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import localeImage from '../utils/localeInImage';
const VideoScreen = (props: any) => {
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<any>(null);
  const handlePlayPause = () => {
    setPaused(!paused);
  };

  const handleProgress = (progress: any) => {
    setCurrentTime(progress.currentTime);
  };

  const handleSkip = (seconds: any) => {
    const newTime = currentTime + seconds;
    videoRef.current.seek(newTime);
    setCurrentTime(newTime);
  };

  const handleOrientationChange = (orientation: any) => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientationChange);
    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  const renderLandscapeControls = () => {
    return (
      <View style={styles.landscapeControls}>
        <TouchableOpacity onPress={() => handleSkip(-10)}>
          {/* <Icon name="backward" size={25} color="#FFF" /> */}
          <Image source={localeImage.cahannelImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          {/* <Icon name={paused ? 'play' : 'pause'} size={25} color="#FFF" /> */}
          <Image source={localeImage.cahannelImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSkip(10)}>
          {/* <Icon name="forward" size={25} color="#FFF" /> */}
          <Image source={localeImage.cahannelImage} />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: isFullscreen
        ? Dimensions.get('screen').height
        : Dimensions.get('window').width,
      height: isFullscreen
        ? Dimensions.get('screen').width
        : Dimensions.get('window').width * 0.5625,
      backgroundColor: '#000',
    },
    landscapeControls: {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    portraitControls: {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 5,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });

  useEffect(() => {
    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        }}
        style={styles.video}
        resizeMode="contain"
        paused={paused}
        onProgress={handleProgress}
        onLoad={data => setDuration(data.duration)}
      />
      {isFullscreen && renderLandscapeControls()}
      {!isFullscreen && (
        <View style={styles.portraitControls}>
          <TouchableOpacity
            style={{borderWidth: 1}}
            onPress={handleOrientationChange}>
            {/* <Icon name={paused ? 'play' : 'pause'} size={25} color="#FFF" /> */}
            <Image source={localeImage.cahannelImage} />
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth: 4}} onPress={handlePlayPause}>
            {/* <Icon name={paused ? 'play' : 'pause'} size={25} color="#FFF" /> */}
            <Image source={localeImage.cahannelImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSkip(-15)}>
            {/* <Icon name="backward" size={25} color="#FFF" /> */}
            <Image source={localeImage.cahannelImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSkip(15)}>
            {/* <Icon name="forward" size={25} color="#FFF" /> */}
            <Image source={localeImage.cahannelImage} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoScreen;
