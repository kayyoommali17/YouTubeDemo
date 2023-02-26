// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import localeImage from '../utils/localeInImage';

// const SecondScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const [showIcons, setShowIcons] = useState(true);
//   const [isPressing, setIsPressing] = useState(false);

//   useEffect(() => {
//     if (!isPressing) {
//       const timer = setTimeout(() => {
//         setShowIcons(false);
//         setLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showIcons, isPressing]);

//   const handleIconPress = () => {
//     setShowIcons(true);
//   };

//   const handleImagePress = () => {
//     setShowIcons(true);
//     if (!isPressing) {
//       setTimeout(() => {
//         setShowIcons(false);
//       }, 3000);
//     } else {
//       setIsPressing(true);
//     }
//   };

//   const onPresIcon = () => {
//     setLoading(false);
//     setShowIcons(true);
//   };

//   const handlelongPress = () => {
//     setShowIcons(true);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={{width: '100%'}} onPress={handleImagePress}>
//         <Image
//           style={styles.image}
//           //   source={{
//           //     uri: 'https://picsum.photos/200',
//           //   }}
//           source={localeImage.happyWomen}
//           //   onLoad={() => setLoading(false)
//           // }
//         />
//       </TouchableOpacity>
//       {loading && <ActivityIndicator style={styles.loader} />}
//       {!loading && showIcons && (
//         <TouchableOpacity
//           style={styles.iconsContainer}
//           onPress={handleIconPress}>
//           <TouchableOpacity onPress={onPresIcon} style={styles.icon}>
//             {/* Add your skip backward icon here */}

//             <Image
//               style={{height: 30, width: 30}}
//               source={localeImage.skipBkrwd}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onPresIcon} style={styles.icon}>
//             {/* Add your play icon here */}
//             <Image style={{height: 30, width: 30}} source={localeImage.pause} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={onPresIcon} style={styles.icon}>
//             {/* Add your skip forward icon here */}
//             <Image
//               style={{height: 30, width: 30}}
//               source={localeImage.skipFrwd}
//             />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'black',
//   },
//   image: {
//     width: '100%',
//     height: 300,
//   },
//   iconsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     right: 0,
//     borderWidth: 3,
//     padding: 30,
//   },
//   icon: {
//     padding: 10,
//     // borderRadius: 50,
//     backgroundColor: 'blue',
//     borderWidth: 2,
//   },
//   loader: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{translateX: -20}, {translateY: -20}],
//   },
// });

// export default SecondScreen;

import React, {useState, useEffect, useRef} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import localeImage from '../utils/localeInImage';

export default function MyScreen() {
  const [loading, setLoading] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const timeoutRef = useRef<any>(null);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    // Set a timeout to hide the icons after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowIcons(false);
    }, 2000);

    // Clear the timeout on unmount to prevent memory leaks
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [showIcons]);

  const handleSkipForward = () => {
    setShowIcons(true);
    clearTimeout(timeoutRef.current);
  };

  const handleSkipBackward = () => {
    if (isPressing === false) {
      setTimeout(() => {
        setShowIcons(false);
        setIsPressing(false);
      }, 2000);
    } else {
      setShowIcons(true);
    }
  };

  const handlePlayPause = () => {
    setShowIcons(true);
    clearTimeout(timeoutRef.current);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowIcons(true)}
      activeOpacity={1}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://picsum.photos/200',
        }}
        onLoad={() => setLoading(false)}
      />

      {loading && (
        <View style={styles.loader}>
          {/* Replace this with your own loader component */}

          <Image
            style={{height: 30, width: 30}}
            source={localeImage.skipBkrwd}
          />
        </View>
      )}

      {showIcons && (
        <View style={{flexDirection: 'row', backgroundColor: 'red'}}>
          <TouchableOpacity onPress={handleSkipBackward}>
            <Image
              style={{height: 30, width: 30}}
              source={localeImage.skipBkrwd}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlayPause}>
            <Image
              style={{height: 30, width: 30}}
              source={localeImage.skipBkrwd}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkipForward}>
            <Image
              style={{height: 30, width: 30}}
              source={localeImage.skipBkrwd}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -16}, {translateY: -16}],
  },
});
