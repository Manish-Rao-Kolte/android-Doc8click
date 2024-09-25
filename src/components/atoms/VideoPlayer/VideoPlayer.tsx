import {StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Video, {VideoRef} from 'react-native-video';
import {UIManager} from 'react-native';

const VideoPlayer = ({src}: {src: string}) => {
  const videoRef = useRef<VideoRef>(null);
  const background = {
    uri: src,
  };
  console.log(UIManager.getViewManagerConfig('RCTVideo'));

  return (
    <Video
      // Can be a URL or a local file.
      source={background}
      // Store reference
      ref={videoRef}
      // Callback when remote video is buffering
      //   onBuffer={(buffer: any) => console.log(buffer)}
      // Callback when video cannot be loaded
      //   onError={(error: any) => console.log(error)}
      style={styles.backgroundVideo}
    />
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
