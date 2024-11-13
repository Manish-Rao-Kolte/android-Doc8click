import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

type CarouselComponentProps = {
  data: Array<any>;
  width: number;
  height: number;
  autoPlay?: boolean;
  mode?: any;
};

const CarouselComponent = ({
  data,
  width,
  height,
  mode = 'parallax',
  autoPlay = true,
}: CarouselComponentProps) => {
  return (
    <View style={styles.caroouselCont}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={autoPlay}
        mode={mode}
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 78,
        }}
        data={[...data]}
        scrollAnimationDuration={2500}
        renderItem={({item, index}) => (
          <View style={styles.carouselItem}>
            <Image style={styles.carouselImg} source={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  caroouselCont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10,
  },
  carouselImg: {
    width: '100%',
    objectFit: 'contain',
    borderRadius: 15,
  },
});
