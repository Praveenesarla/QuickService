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
import QuickMotoCard from '../components/QuickMoto';
import QuickMoto from '../components/QuickMoto';

const {height} = Dimensions.get('window');

const QuickRide = () => {
  const [isFloatingViewVisible, setIsFloatingViewVisible] = useState(false);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  const firstViewInitialHeight = height * 0.3; // Starts at 30%
  const secondViewInitialHeight = height * 0.7; // Starts at 70%
  const firstViewExpandedHeight = height * 0.62; // Expands to 62%
  const secondViewCollapsedHeight = height * 0.38; // Shrinks to 38%
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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
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
                <TouchableOpacity
                  onPress={() => setIsFloatingViewVisible(prev => !prev)}>
                  <FloatingMenu />
                </TouchableOpacity>
                {/* Text input */}
                <TextInput
                  style={{width: '100%'}}
                  placeholder="355 Mills Extension, Emmetcester 18477"
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsFloatingViewVisible(prev => !prev)}
                style={styles.floatingButton2}>
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
            contentContainerStyle={{paddingHorizontal: responsive.padding(8)}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: '#F1F1F1',
                width: '100%',
                height: responsive.height(54),
                marginVertical: responsive.margin(10),
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: responsive.borderRadius(8),
                paddingHorizontal: responsive.padding(7),
              }}>
              <SearchLocation />

              <GooglePlacesAutocomplete
                placeholder="Where to"
                fetchDetails={true}
                enablePoweredByContainer={false}
                debounce={300}
                styles={{
                  textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                  },
                  textInput: {
                    marginTop: responsive.margin(5),
                    height: responsive.height(40),
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                  },
                  listView: {
                    position: 'absolute',
                    top: responsive.height(54),
                    width: '100%',
                    backgroundColor: 'white',
                    zIndex: 999,
                    borderRadius: 8,
                  },
                }}
                onPress={(data, details = null) => {
                  console.log('Selected Place:', data, details);
                }}
                query={{
                  key: 'AIzaSyAvG0ZP37y_tEwcQiLaHaCTLR9ceMHbnJ0',
                  language: 'en',
                }}
              />
            </View>
          </ScrollView>

          {/* Rider-Boy  Details */}

          {/* <View style={{paddingHorizontal: responsive.padding(13)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: responsive.width(0.5),
                paddingVertical: responsive.padding(10),
              }}>
              <Text
                style={{
                  fontFamily: 'Outfit-Medium',
                  color: '#000000',
                  fontSize: responsive.fontSize(14),
                }}>
                Ride Arrived
              </Text>
              <Text
                style={{
                  fontFamily: 'Outfit-Light',
                  fontSize: responsive.fontSize(12),
                }}>
                4min away
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: responsive.padding(8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 14,
                }}>
                <Image source={require('../assets/ride/deliveryBoy.png')} />
                <View>
                  <Text
                    style={{
                      fontSize: responsive.fontSize(16),
                      fontFamily: 'Outfit-SemiBold',
                      color: '#000000',
                    }}>
                    Gun Park
                  </Text>
                  <Text
                    style={{
                      fontSize: responsive.fontSize(10),
                      color: '#000000',
                      fontFamily: 'Outfit-Light',
                    }}>
                    Driver
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Message />
                <Call />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: responsive.padding(5),
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Outfit-SemiBold',
                    fontSize: responsive.fontSize(16),
                  }}>
                  ₹74
                </Text>
                <Text
                  style={{
                    fontSize: responsive.fontSize(10),
                    fontFamily: 'Outfit-Light',
                  }}>
                  Total Price
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: responsive.fontSize(16),
                    fontFamily: 'Outfit-SemiBold',
                  }}>
                  GJ 04 W 504
                </Text>
                <Text
                  style={{
                    fontSize: responsive.fontSize(10),
                    fontFamily: 'Outfit-Light',
                  }}>
                  Vehicle Number
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Outfit-SemiBold',
                    fontSize: responsive.fontSize(16),
                  }}>
                  Activa
                </Text>
                <Text
                  style={{
                    fontFamily: 'Outfit-Light',
                    fontSize: responsive.fontSize(10),
                  }}>
                  Vehicle Name
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#B82929',
                borderColor: '#B82929',
                width: '100%',
                borderRadius: responsive.borderRadius(4),
                height: responsive.height(34),
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: responsive.padding(10),
              }}>
              <Text
                style={{
                  color: '#FAFAFA',
                  fontSize: responsive.fontSize(14),
                  fontFamily: 'Outfit-Medium',
                }}>
                Get OTP
              </Text>
            </View>
          </View> */}

          {/* Rider-Boy  Details */}

          {/* choose Vehicle and price cards */}

          {/* <View
              style={{
                width: '100%',
                height: responsive.height(40),
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: responsive.padding(15),
                gap: 14,
              }}>
              <LocationDot />
              <Text
                style={{
                  fontSize: responsive.fontSize(12),
                  fontFamily: 'Outfit-Light',
                }}>
                2836 Waelchi Turnpike, East Leone 89676
              </Text>
            </View> */}

          {/* Selecting Vehicles */}

          {/* choose Vehicle and price cards */}

          {/* <QuickMoto/> */}
          {/* choose Vehicle and price cards */}
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
    backgroundColor: '#fff',
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
    top: responsive.height(35), // Adjust as needed
    left: responsive.width(), // Adjust as needed
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
    top: responsive.height(35), // Adjust as needed
    left: responsive.width(18), // Adjust as needed // Customize the color
    width: responsive.width(45),
    height: responsive.height(45),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
  },
});

export default QuickRide;
