import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { RootScreenProps } from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';


const MyAppointments = ({ navigation }: RootScreenProps<'Appointments'>) => {
  return (
    <SafeScreen>
      <View style={styles.appointmentContainer}>
        <Header isHome={false} title={'Appointments'} navigation={navigation} />
        <Text>MyAppointments</Text>
      </View>
    </SafeScreen>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  appointmentContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
