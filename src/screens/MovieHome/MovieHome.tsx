import {StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {RootScreenProps} from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
import {MAIN_BG_COLOR} from '../../utils/colors';
import {getMovies} from '../../services/movies';
import {movie} from '../../types/schemas/movie/movie';
// import VideoPlayer from '../../components/atoms/VideoPlayer/VideoPlayer';

// const carouselCard = ({item}: {item: movie}) => {
//   return (
//     <View>
//       <Text>{item.title}</Text>
//     </View>
//   );
// };

const MovieHome = ({navigation}: RootScreenProps) => {
  const [movies, setMovies] = useState<movie[]>([]);
  const videoSrc =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  useLayoutEffect(() => {
    getMovies().then(movies => {
      // console.log(movies)
    });
  }, []);

  return <SafeScreen>{/* <VideoPlayer src={videoSrc} /> */}</SafeScreen>;
};

export default MovieHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_BG_COLOR,
  },
});
