import React, {FC, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
import DocCard from '../../components/DocCard';
import {RootNavParamList, RootScreenProps} from '../../types/navigation';
import {
  doctorSelector,
  getDoctors,
  setSpecialty,
} from '../../redux/reducers/doctorSlice/doctorSlice';
import {useDispatch, useSelector} from 'react-redux';
import {doctor} from '../../types/schemas/doctor/doctor';
import {ScrollView} from 'react-native-gesture-handler';
import {MAIN_BG_COLOR} from '../../utils/colors';

interface SpecialtyDoctorsProps {
  navigation: RootScreenProps<keyof RootNavParamList>['navigation'];
  route: any;
}

const SpecialtyDoctors: FC<SpecialtyDoctorsProps> = ({navigation, route}) => {
  const {specialty} = route.params;
  const {doctors} = useSelector(doctorSelector);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch<any>(getDoctors({specialty: specialty}));
    return () => {
      dispatch<any>(setSpecialty('General'));
      dispatch<any>(getDoctors({specialty: 'General'}));
    };
  }, []);

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        <View style={styles.topDocSecContent}>
          {doctors?.length > 0 &&
            doctors.map((doc: doctor) => (
              <DocCard key={doc._id} doc={doc} navigation={navigation} />
            ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default SpecialtyDoctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_BG_COLOR,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
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
