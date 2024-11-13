import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootNavParamList, RootScreenProps} from '../../types/navigation';
import {useDispatch} from 'react-redux';
import {setSpecialty} from '../../redux/reducers/doctorSlice/doctorSlice';
import {FlatList} from 'react-native-gesture-handler';

interface SpecialitySectionProps {
  doctorSpecialties: {specialty: string; image: any}[];
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
}

const SpecialitySection: React.FC<SpecialitySectionProps> = ({
  doctorSpecialties,
  navigation,
}) => {
  const dispatch = useDispatch();

  const handleSpecialtyPress = (specialty: string) => {
    dispatch(setSpecialty(specialty));
    navigation.navigate('SpecialtyDoctors', {specialty});
  };
  return (
    <View style={styles.specialitySec}>
      <View style={styles.specialitySecHdr}>
        <Text style={styles.specialitySecHdrTxt}>Doctor Speciality</Text>
        <TouchableOpacity>
          <Text style={styles.specialitySecHdrLink}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={doctorSpecialties}
        numColumns={4}
        keyExtractor={item => item.specialty}
        scrollEnabled={false}
        contentContainerStyle={styles.specialitySecContent}
        renderItem={({item, index}) => {
          if (index < 7) {
            return (
              <View style={styles.specialitySecItem} key={index}>
                <TouchableOpacity
                  style={styles.specialitySecItemImgCont}
                  onPress={() => handleSpecialtyPress(item.specialty)}>
                  <Image
                    style={styles.specialitySecItemImg}
                    source={item.image}
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.specialitySecItemTxt}>
                  {item.specialty}
                </Text>
              </View>
            );
          } else if (index === 7) {
            return (
              <View style={styles.specialitySecItem} key={index}>
                <TouchableOpacity style={styles.specialitySecItemImgCont}>
                  <Image
                    style={styles.specialitySecItemImg}
                    source={require('../../images/speciality-icon/more-icon.png')}
                  />
                </TouchableOpacity>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.specialitySecItemTxt}>
                  More
                </Text>
              </View>
            );
          } else {
            return null;
          }
        }}
      />
    </View>
  );
};

export default SpecialitySection;

const styles = StyleSheet.create({
  specialitySec: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 10,
  },
  specialitySecHdr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specialitySecHdrTxt: {
    fontSize: 20,
    fontFamily: 'Nunito-ExtraBold',
    fontWeight: '900',
    color: '#2B2A2A',
  },
  specialitySecHdrLink: {
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Nunito-Medium',
    color: '#2B70FD',
  },
  specialitySecContent: {
    gap: 10,
  },
  specialitySecItem: {
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    gap: 6,
  },
  specialitySecItemImgCont: {
    width: (Dimensions.get('window').width / 4) * 0.5,
    height: (Dimensions.get('window').width / 4) * 0.5,
    borderRadius: ((Dimensions.get('window').width / 4) * 0.5) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(239,244,255)',
  },
  specialitySecItemImg: {
    width: (Dimensions.get('window').width / 4) * 0.35,
    height: (Dimensions.get('window').width / 4) * 0.35,
    objectFit: 'contain',
    tintColor: '#4380FF',
  },
  specialitySecItemTxt: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    fontWeight: '600',
    textAlign: 'center',
  },
});
