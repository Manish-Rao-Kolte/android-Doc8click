import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useRef } from 'react';
import Header from '../../components/Header';
import HomeHeader from '../../components/HomeHeader';
import Carousel from '../../components/Carousel';
import SpecialitySection from '../../components/home/SpecialitySection';
import TopDoctorSection from '../../components/home/TopDoctorSection';
import { RootNavParamList, RootScreenProps } from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
import { MAIN_BG_COLOR } from '../../utils/colors';
import { authSelector } from '../../redux/reducers/authSlice/authSlice';
import { useSelector } from 'react-redux';

const carouselData = [
  require('../../images/carousel-image/carousel1.jpg'),
  require('../../images/carousel-image/carousel2.jpg'),
  require('../../images/carousel-image/carousel3.jpg'),
];
const doctorSpecialties = [
  {
    specialty: 'Genral',
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


const Home = ({ navigation }: RootScreenProps<'Home'>) => {
  const scrollViewRef = useRef(null);
  const user = useSelector(authSelector);
  return (
    <SafeScreen>
      <View style={styles.homeContainer}>
        <Header isHome={true} title={'Home'} navigation={navigation} />
        <ScrollView ref={scrollViewRef}>
          <HomeHeader />
          <Carousel data={carouselData} />
          <View style={styles.homeMainCont}>
            <SpecialitySection doctorSpecialties={doctorSpecialties} />
            <TopDoctorSection
              doctorSpecialties={doctorSpecialties}
              scrollViewRef={scrollViewRef}
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
  },
});
