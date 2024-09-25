import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {RootNavParamList, RootScreenProps} from '../types/navigation';
import {BLUE_COLOR1} from '../utils/colors';
import {doctor} from '../types/schemas/doctor/doctor';

type DocCardProps = {
  doc: doctor;
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
};

const DocCard = ({doc, navigation}: DocCardProps) => {
  const navigateToBookAppointment = () => {
    navigation.navigate('BookAppointment', {doctor: doc});
  };
  return (
    <View style={styles.docCardContainer}>
      <Image
        style={styles.docCardImg}
        source={require('../images/doctors-image/doctor1-icon.png')}
      />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardName}>
        {doc.name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardSpl}>
        {doc.specialty}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardRat}>
        Rating: {doc.rating}
      </Text>
      <TouchableOpacity
        style={styles.docCardBookBtn}
        onPress={navigateToBookAppointment}>
        <Text style={{color: '#fff', fontSize: 20}}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocCard;

const styles = StyleSheet.create({
  docCardContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: BLUE_COLOR1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 5,
  },
  docCardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'contain',
  },
  docCardName: {
    fontSize: 18,
    fontWeight: '700',
  },
  docCardSpl: {
    fontSize: 16,
    fontWeight: '500',
  },
  docCardRat: {
    fontSize: 14,
    fontWeight: '500',
  },
  docCardBookBtn: {
    borderWidth: 2,
    borderColor: BLUE_COLOR1,
    borderRadius: 10,
    backgroundColor: BLUE_COLOR1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 5,
  },
});
