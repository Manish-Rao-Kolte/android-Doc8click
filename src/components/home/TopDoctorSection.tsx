import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import DocCard from '../DocCard';
import { doctorsData } from '../../../data';

interface TopDoctorSectionProps {
  doctorSpecialties: { specialty: string }[];
  scrollViewRef: React.RefObject<any>;
}

const TopDoctorSection: React.FC<TopDoctorSectionProps> = ({ doctorSpecialties, scrollViewRef }) => {
  const docSecRef = useRef<View>(null);
  const flatListRef = useRef<FlatList>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    doctorSpecialties[0]?.specialty || '',
  );

  const handleScrollToIndex = (index: number) => {
    const getViewPos = () => {
      const lastIndex = doctorSpecialties.findIndex(
        (item: { specialty: string; }) => item.specialty === selectedSpecialty,
      );
      if (lastIndex <= index) return 0;
      return 1;
    };
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        viewPosition: getViewPos(),
        animated: true,
      });
    }
  };

  const handleItemPress = (index: number) => {
    handleScrollToIndex(index);
    setSelectedSpecialty(doctorSpecialties[index]?.specialty || '');
  };

  const handleScroll = useCallback(() => {
    if (scrollViewRef.current && docSecRef.current) {
      docSecRef.current.measureLayout(
        scrollViewRef.current,
        (left: number, top: number, width: number, height: number) => {
          scrollViewRef.current.scrollTo({
            y: top + height / 2,
            animated: true,
          });
        },
      );
    }
  }, []);

  return (
    <View style={styles.topDocSec}>
      <View style={styles.topDocSecHdr}>
        <Text style={styles.topDocSecHdrTxt} onPress={handleScroll}>
          Top Doctors
        </Text>
        <TouchableOpacity>
          <Text style={styles.topDocSecHdrLink}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={doctorSpecialties}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleItemPress(index)}>
            <Text
              key={item.specialty}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.topDocSplListTxt,
                item.specialty === selectedSpecialty && {
                  backgroundColor: '#246BFD',
                  color: '#fff',
                },
              ]}>
              {item.specialty}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.topDocSecContent} ref={docSecRef}>
        {doctorsData.map((item, index) => {
          if (index < 6) {
            return <DocCard key={index} doc={item} />;
          }
          return null;
        })}
      </View>
    </View>
  );
};

export default TopDoctorSection;

const styles = StyleSheet.create({
  topDocSec: {
    marginTop: 30,
    justifyContent: 'center',
    gap: 15,
  },
  topDocSecHdr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topDocSecHdrTxt: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B2A2A',
  },
  topDocSecHdrLink: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2B70FD',
  },
  topDocSplListTxt: {
    fontSize: 19,
    height: 35,
    maxWidth: 150,
    marginHorizontal: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: '#246BFD',
    borderRadius: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#246BFD',
  },
  topDocSecContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
