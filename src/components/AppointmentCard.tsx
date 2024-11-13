import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BLUE_COLOR1, MAIN_BG_COLOR, MAIN_FONT_COLOR} from '../utils/colors';

const AppointmentCard = ({item}: {item: any}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View key={item.id} style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.doctorName}>{item.doctorName}</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 7,
            alignItems: 'center',
          }}>
          <Text style={styles.appointmentDetails}>
            {item.date} | {item.time}
          </Text>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={MAIN_FONT_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && (
        <View style={styles.cardBody}>
          <View style={styles.cardBodyTxtContainer}>
            <Text style={styles.cardBodySpl}>{item.speciality}</Text>
            <Text style={styles.cardBodyNote}>{`"${item.note}"`}</Text>
          </View>
          <View style={styles.cardBtnContainer}>
            {item.status !== 'cancelled' && (
              <TouchableOpacity
                style={[
                  styles.cardBtn,
                  {backgroundColor: '#1679AB', borderColor: '#1679AB'},
                ]}>
                <Text style={styles.cardBtnTxt}>
                  {item.status === 'upcoming'
                    ? 'Upload Prescription'
                    : 'View Presciption'}
                </Text>
              </TouchableOpacity>
            )}
            {item.status === 'completed' && (
              <TouchableOpacity
                style={[
                  styles.cardBtn,
                  {backgroundColor: '#F87A53', borderColor: '#F87A53'},
                ]}>
                <Text style={styles.cardBtnTxt}>Reports</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.cardBtn,
                {
                  backgroundColor: '#50B498',
                  borderColor: '#50B498',
                },
              ]}>
              <Text style={styles.cardBtnTxt}>
                {item.status === 'cancelled'
                  ? 'Refund Status'
                  : item.status === 'upcoming'
                  ? 'Make Payment'
                  : 'Payment History'}
              </Text>
            </TouchableOpacity>
            {item.status === 'upcoming' && (
              <TouchableOpacity
                style={[
                  styles.cardBtn,
                  {backgroundColor: '#F87A53', borderColor: '#F87A53'},
                ]}>
                <Text style={styles.cardBtnTxt}>Join Call</Text>
              </TouchableOpacity>
            )}
          </View>
          {item.status === 'upcoming' && (
            <Text>*Please join the call on time.*</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
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
  cardBody: {
    flex: 1,
    gap: 20,
  },
  cardBodyTxtContainer: {
    gap: 5,
  },
  cardBodySpl: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
  },
  cardBodyNote: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14.5,
  },
  cardBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cardBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: BLUE_COLOR1,
    borderWidth: 1.4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_COLOR1,
    elevation: 2,
  },
  cardBtnTxt: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13.5,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  appointmentStatus: {
    fontSize: 14,
    color: MAIN_FONT_COLOR,
    fontWeight: 'bold',
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
