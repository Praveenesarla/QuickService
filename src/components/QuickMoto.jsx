import React from 'react';
import {View, Text} from 'react-native';
import MotorBike from '../assets/ride/MotorBike';
import Capacity from '../assets/ride/Capacity';
import responsive from '../utils/responsive';

const QuickMoto = ({time, distance, price, originalPrice}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: responsive.padding(10),
        gap: 15,
      }}>
      <MotorBike width={responsive.width(55)} height={responsive.height(55)} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {/* 1st view */}
        <View style={{gap: 8}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text
              style={{
                fontFamily: 'Outfit-Medium',
                fontSize: responsive.fontSize(18),
              }}>
              Quick Moto
            </Text>
            {/* Capacity View */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <Capacity />
              <Text
                style={{
                  fontFamily: 'Outfit-Regular',
                  color: '#000000',
                  fontSize: responsive.fontSize(12),
                }}>
                2
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 13}}>
            <Text
              style={{
                fontFamily: 'Outfit-Regular',
                fontSize: responsive.fontSize(12),
                color: '#000000',
              }}>
              {time}
            </Text>
            <Text
              style={{
                fontFamily: 'Outfit-Regular',
                fontSize: responsive.fontSize(12),
                color: '#000000',
              }}>
              {distance}
            </Text>
          </View>
        </View>
        {/* Price Values */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontSize: responsive.fontSize(18),
              color: '#000000',
            }}>
            ₹{price}
          </Text>
          <Text
            style={{
              fontFamily: 'Outfit-Medium',
              fontSize: responsive.fontSize(12),
              color: '#000000',
              textDecorationLine: 'line-through',
            }}>
            ₹{originalPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default QuickMoto;
