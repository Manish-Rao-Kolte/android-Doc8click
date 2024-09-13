import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface SpecialitySectionProps {
  doctorSpecialties: { specialty: string; image: any }[];
}

const SpecialitySection: React.FC<SpecialitySectionProps> = ({ doctorSpecialties }) => {
  return (
    <View style={styles.specialitySec}>
      <View style={styles.specialitySecHdr}>
        <Text style={styles.specialitySecHdrTxt}>Doctor Speciality</Text>
        <TouchableOpacity>
          <Text style={styles.specialitySecHdrLink}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.specialitySecContent}>
        {doctorSpecialties.map((item, index) => {
          if (index === 7) {
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
          } else if (index < 7) {
            return (
              <View style={styles.specialitySecItem} key={index}>
                <TouchableOpacity style={styles.specialitySecItemImgCont}>
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
          }
        })}
      </View>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2A2A',
  },
  specialitySecHdrLink: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2B70FD',
  },
  specialitySecContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 15,
    rowGap: 10,
  },
  specialitySecItem: {
    width: 80,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  specialitySecItemImgCont: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(239,244,255)',
  },
  specialitySecItemImg: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    tintColor: '#4380FF',
  },
  specialitySecItemTxt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
