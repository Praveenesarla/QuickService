import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import responsive from '../utils/responsive';
import {Icon} from 'react-native-elements';
import OrderCard from '../components/OrderCard';
import VerticalStepsIndicator from '../components/VerticalStepIndicator';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

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
];

const OrderStatus = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

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
        </View>

        {/* Steps Indicator and Image Picker */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <VerticalStepsIndicator currentStatus={orders[1].status} />

          {/* Image Picker */}
          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              alignItems: 'center',
              marginTop: responsive.margin(14),
              gap: 5,
            }}>
            {selectedImage ? (
              <Image
                source={{uri: selectedImage}}
                style={{
                  width: responsive.width(80),
                  height: responsive.height(80),
                  borderRadius: 10,
                }}
              />
            ) : (
              <>
                <Image source={require('../assets/uploadImage.png')} />
                <Text style={styles.uploadText}>
                  Upload the image (optional)
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Your Orders Section */}
        <View>
          <Text style={styles.yourOrdersText}>Your Orders</Text>
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
  uploadText: {
    color: '#281B1B',
    fontFamily: 'Outfit-Regular',
    fontSize: responsive.fontSize(13),
  },
  yourOrdersText: {
    color: '#B82929',
    fontSize: responsive.fontSize(20),
    fontFamily: 'Outfit-Bold',
  },
});
