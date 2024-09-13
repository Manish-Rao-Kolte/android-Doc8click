import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

type CarouselComponentProps = {
  data: Array<any>;
};

const CarouselComponent = ({ data }: CarouselComponentProps) => {
  return (
    <View style={styles.caroouselCont}>
      <Carousel
        loop
        width={420}
        height={200}
        autoPlay={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 80,
        }}
        data={[...data]}
        scrollAnimationDuration={2000}
        renderItem={({ item, index }) => (
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
    height: 200,
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
