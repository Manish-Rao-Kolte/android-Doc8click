import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
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
      id: '1',
      doctorName: 'Dr. John Doe',
      date: '2024-09-28',
      time: '10:00 AM',
      status: 'upcoming',
    },
    {
      id: '2',
      doctorName: 'Dr. Jane Smith',
      date: '2024-09-30',
      time: '11:00 AM',
      status: 'upcoming',
    },
  ],
  completed: [
    {
      id: '3',
      doctorName: 'Dr. Lisa Ray',
      date: '2024-08-15',
      time: '2:00 PM',
      status: 'completed',
    },
  ],
  cancelled: [
    {
      id: '4',
      doctorName: 'Dr. Aaron Finch',
      date: '2024-09-05',
      time: '1:00 PM',
      status: 'cancelled',
    },
  ],
};

const MyAppointments = ({navigation}: RootScreenProps<'Appointments'>) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderAppointment = (item: any) => (
    <View key={item.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <Text style={styles.appointmentDetails}>
          {item.date} | {item.time}
        </Text>
      </View>
    </View>
  );

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
          {getAppointments().map(renderAppointment)}
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
  appointmentCard: {
    backgroundColor: MAIN_BG_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLUE_COLOR1,
  },
  appointmentDetails: {
    fontSize: 14,
    color: MAIN_FONT_COLOR,
  },
});
