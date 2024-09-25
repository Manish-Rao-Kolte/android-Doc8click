import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {
  BLUE_COLOR1,
  BLUE_COLOR3,
  MAIN_BG_COLOR,
  MAIN_FONT_COLOR,
  MAIN_TINT_COLOR,
} from '../../utils/colors';

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
];

const BookAppointment = ({route}: {route: any}) => {
  const {doctor} = route.params;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  const handleBookNow = () => {
    Alert.alert('Work in progress', 'This feature will be implemented soon.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Doctor's Info */}
      <View style={styles.doctorCard}>
        <Image
          source={require('../../images/doctors-image/doctor1-icon.png')}
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>
              ⭐ {doctor.rating} (120 reviews)
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Image
              source={require('../../images/doctors-image/hospital.png')}
              style={styles.docCardImg}
            />
            <Text style={styles.details}>{doctor.hospital}</Text>
          </View>
          <View style={styles.detailRow}>
            <Image
              source={require('../../images/doctors-image/dollar.png')}
              style={styles.docCardImg}
            />
            <Text style={styles.details}>${doctor.consultationCharge}</Text>
          </View>
          <View style={styles.detailRow}>
            <Image
              source={require('../../images/doctors-image/briefcase.png')}
              style={styles.docCardImg}
            />
            <Text style={styles.details}>
              {doctor.yearsOfPractice} years of practice
            </Text>
          </View>
        </View>
      </View>

      {/* Date Picker */}
      <View style={styles.datePicker}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <DateTimePicker
          mode="single"
          date={selectedDate}
          onChange={params => setSelectedDate(params.date as dayjs.Dayjs)}
        />
      </View>

      {/* Time Slots */}
      <View style={styles.timeSlots}>
        <Text style={styles.sectionTitle}>Select Time Slot</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTime(slot)}
              style={[
                styles.timeSlot,
                {
                  backgroundColor:
                    selectedTime === slot ? BLUE_COLOR1 : MAIN_TINT_COLOR,
                },
              ]}>
              <Text style={styles.timeSlotText}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: MAIN_BG_COLOR,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: MAIN_FONT_COLOR,
  },
  specialty: {
    fontSize: 18,
    color: '#007bff',
    marginVertical: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#888',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
  docCardImg: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    tintColor: BLUE_COLOR3,
    marginRight: 5,
  },
  datePicker: {
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  datePickerInput: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  timeSlots: {
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 5,
  },
  timeSlotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default BookAppointment;
