import React, {FC, useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationRouteTypes} from '../../types/navigation';
import {
  doctorSelector,
  getDoctors,
  setSpecialty,
} from '../../redux/reducers/doctorSlice/doctorSlice';
import {useDispatch, useSelector} from 'react-redux';
import {doctor} from '../../types/schemas/doctor/doctor';
import {ScrollView} from 'react-native-gesture-handler';
import {MAIN_BG_COLOR} from '../../utils/colors';
import {
  Header,
  ShimmerLoader,
  DocCard,
  SafeScreen,
} from '../../components/components';

const SpecialtyDoctors: FC<NavigationRouteTypes> = ({navigation, route}) => {
  const {specialty} = route.params;
  const {doctors, isLoading} = useSelector(doctorSelector);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch<any>(getDoctors({specialty: specialty}));
    return () => {
      dispatch<any>(setSpecialty('General'));
      dispatch<any>(getDoctors({specialty: 'General'}));
    };
  }, []);

  if (isLoading) {
    return <ShimmerLoader number={20} />;
  }

  return (
    <SafeScreen>
      <Header isHome={false} title={'All Doctors'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.container}>
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
    flexGrow: 1,
    padding: 15,
    backgroundColor: MAIN_BG_COLOR,
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
