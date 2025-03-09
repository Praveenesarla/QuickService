import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {usePlacesAutocomplete} from 'react-native-google-places-sdk';

import responsive from '../utils/responsive';
import SearchLocation from '../assets/ride/SearchLocation';
import FloatingMenu from '../assets/ride/FloatingMenu';
import LocationDot from '../assets/ride/LocationDot';
import MotorBike from '../assets/ride/MotorBike';
import Capacity from '../assets/ride/Capacity';
import Message from '../assets/ride/Message';
import Call from '../assets/ride/Call';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import QuickMotoCard from '../components/MapViewBody/QuickMoto';
import QuickMoto from '../components/MapViewBody/QuickMoto';

import FullScreenModal from '../components/RideLoader';
import RiderRating from '../assets/ride/RiderRating';
import RideDetailsCard from '../components/MapViewBody/RideDetailsCard';
import GoogleLocationSearch from '../components/MapViewBody/GoogleLocationSearch';
import RiderDetails from '../components/MapViewHeader/RiderDetails';
import AddressView from '../components/MapViewHeader/AddressView';
import OTPDisplay from '../components/MapViewHeader/OTPDisplay';

const {height} = Dimensions.get('window');

const QuickRide = () => {
  const rideOptions = [
    {
      id: 1,
      vehicle: 'Quick Moto',
      time: '10:38',
      distance: '1 min away',
      price: 74,
      originalPrice: 80,
    },
    {
      id: 2,
      vehicle: 'Speed Bike',
      time: '10:45',
      distance: '2 min away',
      price: 85,
      originalPrice: 90,
    },
    {
      id: 3,
      vehicle: 'Fast Ride',
      time: '10:50',
      distance: '3 min away',
      price: 95,
      originalPrice: 100,
    },
  ];
  const [isFloatingViewVisible, setIsFloatingViewVisible] = useState(false);
  const [status, setStatus] = useState('places');
  const [isRideBooked, setIsRideBooked] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const ref = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [header, setHeader] = useState('rider');

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  const handleBookRide2 = () => {
    setIsRideBooked(prev => !prev);
    if (isRideBooked) {
      setStatus('rider');
    } else {
      setStatus('otp');
    }
  };

  const firstViewInitialHeight = height * 0.3;
  const secondViewInitialHeight = height * 0.7;
  const firstViewExpandedHeight = height * 0.62;
  const secondViewCollapsedHeight = height * 0.38;
  const expandedPosition = firstViewExpandedHeight - firstViewInitialHeight;

  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateY.value = Math.max(
        0,
        Math.min(expandedPosition, event.translationY),
      );
    })
    .onEnd(() => {
      const expandThreshold = expandedPosition / 2;
      if (translateY.value > expandThreshold) {
        translateY.value = withSpring(expandedPosition, {
          damping: 20,
          stiffness: 100,
        });
      } else {
        translateY.value = withSpring(0, {
          damping: 20,
          stiffness: 100,
        });
      }
    });

  const animatedTopViewStyle = useAnimatedStyle(() => ({
    height: firstViewInitialHeight + translateY.value,
  }));

  const animatedBottomViewStyle = useAnimatedStyle(() => ({
    height: secondViewInitialHeight - translateY.value,
    top: firstViewInitialHeight + translateY.value,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }));

  const handleBookRide = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setStatus('rider');
    }, 2000);
  };

  const onPressPlaces = () => {
    setStatus('List');
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <FullScreenModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        {/* First View (Map) */}
        <Animated.View style={[styles.topView, animatedTopViewStyle]}>
          <View style={styles.mapContainer}>
            <MapView
              key={'AIzaSyAvG0ZP37y_tEwcQiLaHaCTLR9ceMHbnJ0'}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 16.43815,
                longitude: 81.0934,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            />
            {isFloatingViewVisible ? (
              <View style={styles.floatingButton}>
                {/* Floating button */}
                <TouchableOpacity>
                  <FloatingMenu />
                </TouchableOpacity>
                {/* Text input */}
                <TextInput
                  style={{width: '100%'}}
                  placeholder="355 Mills Extension, Emmetcester 18477"
                />
              </View>
            ) : (
              <TouchableOpacity style={styles.floatingButton2}>
                <FloatingMenu />
              </TouchableOpacity>
            )}

            {/* Floating View */}
          </View>
        </Animated.View>

        {/* Second View */}
        <Animated.View style={[styles.bottomView, animatedBottomViewStyle]}>
          {/* Draggable Top Bar */}
          <GestureDetector gesture={panGesture}>
            <View style={styles.fixedTopView}>
              <View style={styles.dragIndicator} />
            </View>
          </GestureDetector>

          {/* Search Content */}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {status === 'List' ? (
              <AddressView />
            ) : status === 'rider' ? (
              <RiderDetails />
            ) : status === 'otp' ? (
              <OTPDisplay />
            ) : null}

            {status === 'places' ? (
              <GoogleLocationSearch onPlaceSelected={onPressPlaces} />
            ) : status === 'List' ? (
              <FlatList
                contentContainerStyle={{
                  gap: 10,
                  paddingVertical: responsive.padding(10),
                }}
                data={rideOptions}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <QuickMoto
                    vehicle={item.vehicle}
                    time={item.time}
                    distance={item.distance}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    isSelected={selectedRide === item.id}
                    onPress={() => setSelectedRide(item.id)}
                    onBookRide={handleBookRide}
                  />
                )}
              />
            ) : status === 'rider' ? (
              <RideDetailsCard
                isRideBooked={isRideBooked}
                onPressBookRide={handleBookRide2}
              />
            ) : (
              <RideDetailsCard
                isRideBooked={isRideBooked}
                onPressBookRide={handleBookRide2}
              />
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topView: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  bottomView: {
    width: '100%',
    // backgroundColor: '#fff',
    position: 'absolute',
    overflow: 'hidden',
  },
  fixedTopView: {
    width: '100%',
    height: responsive.height(20),
    backgroundColor: '#D5D5D5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragIndicator: {
    width: responsive.width(80),
    height: responsive.height(5),
    backgroundColor: '#000',
    borderRadius: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    top: responsive.height(35),
    left: responsive.width(),
    width: responsive.width(355),
    height: responsive.height(43),
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    flexDirection: 'row',
    paddingLeft: responsive.padding(4),
  },
  floatingView: {
    position: 'absolute',
    top: responsive.height(80),
    left: responsive.width(15),
    width: responsive.width(200),
    height: responsive.height(100),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButton2: {
    position: 'absolute',
    top: responsive.height(35),
    left: responsive.width(18),
    width: responsive.width(45),
    height: responsive.height(45),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
  },
});

export default QuickRide;
