import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import responsive from '../utils/responsive';
import Minus from '../assets/batteries/Icons/Minus';
import Plus from '../assets/batteries/Icons/Plus';
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
} from '../redux/slices/orderSlice';

export const BatteryCard = ({name, warranty, time, features, image}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.order.items);

  const cartItem = cartItems.find(item => item.name === name);
  const quantity = cartItem ? cartItem.quantity : 0;

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
          <Image source={image} style={styles.batteryImage} />

          {/* Show "Add" button when item is not in cart */}
          {quantity === 0 ? (
            <TouchableOpacity
              onPress={() =>
                dispatch(addItem({name, warranty, time, features, image}))
              }
              style={styles.addButton}>
              <Text style={styles.addText}>Add +</Text>
            </TouchableOpacity>
          ) : (
            // Show quantity controls when item is added
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => dispatch(decrementQuantity(name))}>
                <Minus width={18} height={18} />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => dispatch(incrementQuantity(name))}>
                <Plus width={18} height={18} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: responsive.width(0.3),
    padding: responsive.padding(10),
    margin: responsive.fontSize(10),
    borderRadius: responsive.borderRadius(5),
  },
  name: {
    fontFamily: 'Outfit-Medium',
    color: '#B82929',
    fontSize: responsive.fontSize(16),
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
    fontSize: responsive.fontSize(30),
    lineHeight: responsive.height(30),
    color: '#000000',
  },
  featureText: {
    fontFamily: 'Outfit-Regular',
    fontSize: responsive.fontSize(12),
    marginLeft: responsive.margin(5),
    color: '#000000',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  batteryImage: {
    width: responsive.width(80),
    height: responsive.height(80),
  },
  addButton: {
    width: responsive.width(80),
    height: responsive.height(17),
    backgroundColor: '#B82929',
    borderRadius: responsive.borderRadius(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: responsive.fontSize(8),
    color: '#FCFCFC',
  },
  quantityContainer: {
    flexDirection: 'row',
    width: responsive.width(80),
    height: responsive.height(17),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityText: {
    color: '#000000',
    fontSize: responsive.fontSize(10),
    fontFamily: 'Outfit-Regular',
  },
});
