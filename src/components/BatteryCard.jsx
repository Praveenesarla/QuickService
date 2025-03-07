import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import responsive from '../utils/responsive';
import Minus from '../assets/batteries/Icons/Minus';
import Plus from '../assets/batteries/Icons/Plus';

export const BatteryCard = ({name, warranty, time, features, image}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{time}</Text>
        <Text style={styles.infoText}>{warranty} months warranty</Text>
      </View>

      <View style={styles.detailsContainer}>
        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.featureItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.featureText}>{item}</Text>
            </View>
          )}
        />

        <View style={styles.imageContainer}>
          <Image
            source={require('../../src/assets/batteries/amaron.png')}
            style={styles.batteryImage}
          />
          <View style={styles.quantityContainer}>
            <Plus width={18} height={18} />
            <Text>1</Text>
            <Minus width={18} height={18} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 0.3,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  name: {
    fontFamily: 'Outfit-Medium',
    color: '#B82929',
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  infoText: {
    fontFamily: 'Regular',
    color: '#B82929',
    fontSize: responsive.fontSize(10),
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    fontSize: 30,
    lineHeight: 30,
  },
  featureText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    marginLeft: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryImage: {
    width: responsive.width(80),
    height: responsive.height(80),
  },
  quantityContainer: {
    flexDirection: 'row',
    width: responsive.width(80),
    height: responsive.height(17),
    justifyContent: 'space-between',
  },
});
