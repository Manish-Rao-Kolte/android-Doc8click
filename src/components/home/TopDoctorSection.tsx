import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {BLUE_COLOR1, BLUE_COLOR2, MAIN_BG_COLOR} from '../../utils/colors';
import {
  doctorSelector,
  getDoctors,
  setSpecialty,
} from '../../redux/reducers/doctorSlice/doctorSlice';
import {useDispatch, useSelector} from 'react-redux';
import {doctor} from '../../types/schemas/doctor/doctor';
import {RootNavParamList, RootScreenProps} from '../../types/navigation';
import {ShimmerLoader, DocCard} from '../components';

interface TopDoctorSectionProps {
  doctorSpecialties: {specialty: string}[];
  scrollViewRef: React.RefObject<any>;
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
}

const TopDoctorSection: React.FC<TopDoctorSectionProps> = ({
  doctorSpecialties,
  scrollViewRef,
  navigation,
}) => {
  const docSecRef = useRef<View>(null);
  const flatListRef = useRef<FlatList>(null);
  const {specialty, doctors, isLoading} = useSelector(doctorSelector);
  const dispatch = useDispatch();
  const doctorsList = doctors;

  const handleScrollToIndex = (index: number) => {
    const getViewPos = () => {
      const lastIndex = doctorSpecialties.findIndex(
        (item: {specialty: string}) => item.specialty === specialty,
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
    dispatch(setSpecialty(String(doctorSpecialties[index].specialty)));
  };

  const handleScrollToSection = useCallback(() => {
    if (scrollViewRef.current && docSecRef.current) {
      docSecRef.current.measureLayout(
        scrollViewRef.current,
        (left: number, top: number, width: number, height: number) => {
          scrollViewRef.current.scrollTo({
            y: top - 110,
            animated: true,
          });
        },
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (specialty) {
      dispatch<any>(getDoctors({specialty}));
    }
  }, [specialty]);

  return (
    <View style={styles.topDocSec}>
      <View style={styles.topDocSecHdr}>
        <Text style={styles.topDocSecHdrTxt} onPress={handleScrollToSection}>
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
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleItemPress(index)}>
            <Text
              key={item.specialty}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.topDocSplListTxt,
                item.specialty === specialty && {
                  backgroundColor: BLUE_COLOR1,
                  borderColor: BLUE_COLOR2,
                  color: MAIN_BG_COLOR,
                  opacity: 1,
                },
              ]}>
              {item.specialty}
            </Text>
          </TouchableOpacity>
        )}
      />
      {isLoading ? (
        <ShimmerLoader number={6} />
      ) : (
        <View style={styles.topDocSecContent} ref={docSecRef}>
          {doctorsList?.length > 0 &&
            doctorsList
              .slice(0, 6)
              .map((doc: doctor) => (
                <DocCard key={doc._id} doc={doc} navigation={navigation} />
              ))}
        </View>
      )}
    </View>
  );
};

export default TopDoctorSection;

const styles = StyleSheet.create({
  topDocSec: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 15,
  },
  topDocSecHdr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topDocSecHdrTxt: {
    fontSize: 20,
    fontFamily: 'Nunito-ExtraBold',
    fontWeight: '900',
    color: '#2B2A2A',
  },
  topDocSecHdrLink: {
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: 'Nunito-Medium',
    color: '#2B70FD',
  },
  topDocSplListTxt: {
    fontSize: 14,
    maxWidth: 120,
    height: 35,
    marginHorizontal: 1.2,
    paddingHorizontal: 6,
    borderWidth: 1.3,
    borderColor: BLUE_COLOR1,
    borderRadius: 20,
    fontFamily: 'Nunito-Bold',
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: BLUE_COLOR1,
    opacity: 0.8,
  },
  topDocSecContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
