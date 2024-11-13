import {ScrollView, StyleSheet, View} from 'react-native';
import React, {Suspense, useRef, lazy, useState} from 'react';
import {MAIN_BG_COLOR} from '../../utils/colors';
import {RootScreenProps} from '../../types/navigation';
import {
  HomeHeader,
  Carousel,
  SafeScreen,
  SpecialitySection,
  TopDoctorSection,
  Header,
} from '../../components/components';
const carouselData = [
  require('../../images/carousel-image/carousel1.jpg'),
  require('../../images/carousel-image/carousel2.jpg'),
  require('../../images/carousel-image/carousel3.jpg'),
];
const doctorSpecialties = [
  {
    specialty: 'General',
    image: require('../../images/speciality-icon/genral-icon.png'),
  },
  {
    specialty: 'Dentist',
    image: require('../../images/speciality-icon/dentist-icon.png'),
  },
  {
    specialty: 'Cardiologist',
    image: require('../../images/speciality-icon/cardio-icon.png'),
  },
  {
    specialty: 'Dermatologist',
    image: require('../../images/speciality-icon/dermeto-icon.png'),
  },
  {
    specialty: 'Neurologist',
    image: require('../../images/speciality-icon/neuro-icon.png'),
  },
  {
    specialty: 'Pediatrician',
    image: require('../../images/speciality-icon/pedia-icon.png'),
  },
  {
    specialty: 'Orthopedic Surgeon',
    image: require('../../images/speciality-icon/ortho-icon.png'),
  },
  {
    specialty: 'Ophthalmologist',
    image: 'https://via.placeholder.com/150x150.png?text=Ophthalmologist',
  },
  {
    specialty: 'Psychiatrist',
    image: 'https://via.placeholder.com/150x150.png?text=Psychiatrist',
  },
  {
    specialty: 'Endocrinologist',
    image: 'https://via.placeholder.com/150x150.png?text=Endocrinologist',
  },
  {
    specialty: 'Gynecologist',
    image: 'https://via.placeholder.com/150x150.png?text=Gynecologist',
  },
  {
    specialty: 'Oncologist',
    image: 'https://via.placeholder.com/150x150.png?text=Oncologist',
  },
];

const Home = ({navigation}: RootScreenProps<'Home'>) => {
  const scrollViewRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 200,
  });
  const handleDimensionsChange = (e: {
    nativeEvent: {layout: {width: number; height: number}};
  }) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  return (
    <SafeScreen>
      <View style={styles.homeContainer} onLayout={handleDimensionsChange}>
        <Header isHome={true} title="Home" navigation={navigation} />
        <ScrollView ref={scrollViewRef}>
          <HomeHeader />
          <Carousel
            data={carouselData}
            width={dimensions.width}
            height={(23 * dimensions.height) / 100}
          />
          <View style={styles.homeMainCont}>
            <SpecialitySection
              doctorSpecialties={doctorSpecialties}
              navigation={navigation}
            />
            <TopDoctorSection
              doctorSpecialties={doctorSpecialties}
              scrollViewRef={scrollViewRef}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: MAIN_BG_COLOR,
  },
  homeMainCont: {
    padding: 15,
    gap: 10,
  },
});
