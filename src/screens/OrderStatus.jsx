import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import responsive from '../utils/responsive';
import {Icon} from 'react-native-elements';
import OrderCard from '../components/OrderCard';
import VerticalStepsIndicator from '../components/VerticalStepIndicator';
import {useNavigation} from '@react-navigation/native';

const orders = [
  {
    id: '1',
    orderId: 'Q29361471236',
    bookingDate: 'Wed Feb 05 2025',
    vehicle: 'J890237',
    status: 'Enquiry Placed',
  },
  {
    id: '2',
    orderId: 'Q29361471237',
    bookingDate: 'Thu Feb 06 2025',
    vehicle: 'J890238',
    status: 'Processing',
  },
  {
    id: '3',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
  {
    id: '4',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
  {
    id: '5',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
  {
    id: '6',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
  {
    id: '7',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
  {
    id: '8',
    orderId: 'Q29361471238',
    bookingDate: 'Fri Feb 07 2025',
    vehicle: 'J890239',
    status: 'Completed',
  },
];

const OrderStatus = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Icon
          onPress={() => navigation.goBack()}
          size={responsive.fontSize(25)}
          color={'#000'}
          name="keyboard-backspace"
        />
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: responsive.width(100),
            height: responsive.height(30),
          }}
        />
      </View>
      <View style={{paddingHorizontal: responsive.padding(10)}}>
        <Text style={styles.orderStatusText}>Order Status</Text>

        <View style={{gap: 10, paddingVertical: responsive.padding(10)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: responsive.width(117)}}>
              <Text style={styles.orderTitle}>Order ID</Text>
              <Text style={styles.orderValue}>Q29361471236</Text>
            </View>
            <View style={{width: responsive.width(117)}}>
              <Text style={styles.orderTitle}>Payment Amount</Text>
              <Text style={styles.orderValue}>N/A</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: responsive.width(117)}}>
              <Text style={styles.orderTitle}>Vehicle</Text>
              <Text style={styles.orderValue}>J890237</Text>
            </View>
            <View style={{width: responsive.width(117)}}>
              <Text style={styles.orderTitle}>Service</Text>
              <Text style={styles.orderValue}>MRF tyre</Text>
            </View>
          </View>
        </View>

        {/* Steps Indicator */}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <VerticalStepsIndicator currentStatus={orders[1].status} />
          <View
            style={{
              alignItems: 'center',
              marginTop: responsive.margin(14),
              gap: 5,
            }}>
            <Image source={require('../../src/assets/uploadImage.png')} />
            <Text
              style={{
                color: '#281B1B',
                fontFamily: 'Outfit-Regular',
                fontSize: responsive.fontSize(13),
              }}>
              Upload the image (optional)
            </Text>
          </View>
        </View>

        {/* Steps Indicator */}

        <View>
          <Text
            style={{
              color: '#B82929',
              fontSize: responsive.fontSize(20),
              fontFamily: 'Outfit-Bold',
            }}>
            Your Orders
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                gap: 10,

                paddingVertical: responsive.padding(10),
              }}
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <OrderCard
                  orderId={item.orderId}
                  bookingDate={item.bookingDate}
                  vehicle={item.vehicle}
                  status={item.status}
                  selected={index === 0}
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsive.padding(15),
  },
  container: {
    flex: 1,
    paddingHorizontal: responsive.padding(8),
  },
  orderStatusText: {
    color: '#B82929',
    fontFamily: 'Outfit-Bold',
    fontSize: responsive.fontSize(20),
  },
  orderTitle: {
    fontFamily: 'Outfit-SemiBold',
    fontSize: responsive.fontSize(14),
    color: '#161616',
  },
  orderValue: {
    fontFamily: 'Outfit-Light',
    fontSize: responsive.fontSize(10),
  },
});
