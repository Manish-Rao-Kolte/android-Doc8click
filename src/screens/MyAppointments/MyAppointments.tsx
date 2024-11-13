import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AppointmentCard, Header, SafeScreen} from '../../components/components';
import {RootScreenProps} from '../../types/navigation';
import {
  BLUE_COLOR1,
  MAIN_BG_COLOR,
  MAIN_FONT_COLOR,
  SECONDARY_TINT_COLOR,
} from '../../utils/colors';

const appointments = {
  upcoming: [
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Dentist',
      note: 'Please bring your prescription',
      date: '2023-08-15',
      time: '10:00 AM',
      status: 'upcoming',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Cardiologist',
      note: 'Please bring your prescription',
      date: '2023-08-16',
      time: '11:00 AM',
      status: 'upcoming',
    },
  ],
  completed: [
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Dentist',
      note: 'Please bring your prescription',
      date: '2023-08-15',
      time: '10:00 AM',
      status: 'completed',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Cardiologist',
      note: 'Please bring your prescription',
      date: '2023-08-16',
      time: '11:00 AM',
      status: 'completed',
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Johnson',
      speciality: 'Orthopedic Surgeon',
      note: 'Please bring your prescription',
      date: '2023-08-17',
      time: '12:00 PM',
      status: 'completed',
    },
  ],
  cancelled: [
    {
      id: 1,
      doctorName: 'Dr. John Doe',
      speciality: 'Dentist',
      note: 'Please bring your prescription',
      date: '2023-08-15',
      time: '10:00 AM',
      status: 'cancelled',
    },
    {
      id: 2,
      doctorName: 'Dr. Jane Smith',
      speciality: 'Cardiologist',
      note: 'Please bring your prescription',
      date: '2023-08-16',
      time: '11:00 AM',
      status: 'cancelled',
    },
    {
      id: 3,
      doctorName: 'Dr. Michael Johnson',
      speciality: 'Orthopedic Surgeon',
      note: 'Please bring your prescription',
      date: '2023-08-17',
      time: '12:00 PM',
      status: 'cancelled',
    },
  ],
};

const MyAppointments = ({navigation}: RootScreenProps<'Appointments'>) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const getAppointments = () => {
    switch (activeTab) {
      case 'upcoming':
        return appointments.upcoming;
      case 'completed':
        return appointments.completed;
      case 'cancelled':
        return appointments.cancelled;
      default:
        return [];
    }
  };

  return (
    <SafeScreen>
      <View style={styles.appointmentContainer}>
        <Header isHome={false} title={'Appointments'} navigation={navigation} />

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'upcoming' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('upcoming')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.activeTabText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'completed' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('completed')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'cancelled' && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab('cancelled')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'cancelled' && styles.activeTabText,
              ]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {getAppointments().map((item, index) => {
            return (
              <AppointmentCard
                item={item}
                key={`${item.date}${item.time}${item.status}`}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  appointmentContainer: {
    flex: 1,
    backgroundColor: MAIN_BG_COLOR,
    gap: 15,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: SECONDARY_TINT_COLOR,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: BLUE_COLOR1,
  },
  tabText: {
    fontSize: 16,
    color: MAIN_FONT_COLOR,
  },
  activeTabText: {
    color: MAIN_BG_COLOR,
    fontWeight: 'bold',
  },
});
