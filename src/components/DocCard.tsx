import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

type DocCardProps = {
  doc: {
    name: string;
    specialty: string;
    rating: number;
    image: any;
  };
};

const DocCard = ({ doc }: DocCardProps) => {
  return (
    <View style={styles.docCardContainer}>
      <Image style={styles.docCardImg} source={doc.image} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardName}>
        {doc.name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardSpl}>
        {doc.specialty}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.docCardRat}>
        Rating: {doc.rating}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: '#246BFD',
          borderRadius: 10,
          backgroundColor: '#246BFD',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          padding: 5,
        }}>
        <Text style={{ color: '#fff', fontSize: 20 }}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DocCard;

const styles = StyleSheet.create({
  docCardContainer: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#246BFD',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 5,
  },
  docCardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: 'contain',
  },
  docCardName: {
    fontSize: 18,
    fontWeight: '700',
  },
  docCardSpl: {
    fontSize: 16,
    fontWeight: '500',
  },
  docCardRat: {
    fontSize: 14,
    fontWeight: '500',
  },
});
