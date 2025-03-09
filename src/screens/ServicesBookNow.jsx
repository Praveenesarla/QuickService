import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import responsive from '../utils/responsive';
import CustomInput from '../components/CustomInput';
import ServiceBox from '../components/ServiceBox';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const ServicesBookNow = () => {
  const [vehNumber, setVehNumber] = useState('');
  const [address, setAddress] = useState('');
  const [mention, setMention] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  const selectServices = [
    {id: 1, title: 'MRF tyre'},
    {id: 2, title: 'Okaya Battery'},
    {id: 3, title: 'Exide Battery'},
    {id: 4, title: 'Car Cleaning'},
  ];

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <Icon
            onPress={() => navigation.goBack()}
            size={responsive.fontSize(25)}
            color={'#000'}
            name="keyboard-backspace"
          />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.bookNow}>Book Now</Text>
      </View>

      {/* Image Picker */}
      <TouchableOpacity style={styles.centerAlign} onPress={handleImagePick}>
        <View style={styles.uploadContainer}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.selectedImage} />
          ) : (
            <Image source={require('../../src/assets/uploadImage.png')} />
          )}
          <Text style={styles.uploadText}>
            {selectedImage
              ? 'Image Selected'
              : 'Upload the car image (optional)'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Details Box  */}
      <View style={styles.detailsContainer}>
        <CustomInput
          label="Vehicle Number"
          value={vehNumber}
          onChangeText={setVehNumber}
          type="text"
          placeholder="EX: 58963"
        />
        <CustomInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          type="text"
          placeholder="EX: 46650 Bennie Forks, Lake Alexandreborough 58963"
        />
        <CustomInput
          label="Mention Anything"
          value={mention}
          onChangeText={setMention}
          type="textarea"
          placeholder="EX: Lorem ipsum dolor sit amet consectetur."
        />
      </View>

      {/* Bottom View */}
      <View style={styles.bottomContainer}>
        <View style={styles.serviceHeader}>
          <Text style={styles.selectedService}>Selected Service</Text>
          <Text style={styles.editText}>Edit</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.flatListColumn}
        numColumns={2}
        data={selectServices}
        renderItem={({item}) => <ServiceBox text={item.title} />}
        keyExtractor={item => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.bookNowButton}
        onPress={() => navigation.navigate('OrderStatus')}>
        <Text style={styles.bookNowText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ServicesBookNow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsive.padding(8),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookNow: {
    fontSize: responsive.fontSize(20),
    fontFamily: 'Outfit-Bold',
    color: '#B82929',
    paddingHorizontal: responsive.padding(14),
  },
  headerContainer: {
    borderBottomWidth: responsive.width(0.5),
    paddingVertical: responsive.padding(10),
    gap: 10,
  },
  logo: {
    width: responsive.width(100),
    height: responsive.height(30),
  },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    marginTop: responsive.margin(14),
    gap: 5,
  },
  uploadText: {
    color: '#281B1B',
    fontFamily: 'Outfit-Regular',
    fontSize: responsive.fontSize(13),
  },
  selectedImage: {
    width: responsive.width(100),
    height: responsive.height(100),
    borderRadius: responsive.borderRadius(4),
  },
  detailsContainer: {
    alignItems: 'center',
    paddingVertical: responsive.padding(35),
    paddingBottom: responsive.padding(40),
    borderBottomWidth: responsive.width(0.5),
  },
  bottomContainer: {
    padding: responsive.padding(10),
    paddingVertical: responsive.padding(15),
    gap: 14,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedService: {
    fontSize: responsive.fontSize(17),
    color: '#B82929',
    fontFamily: 'Outfit-Regular',
  },
  editText: {
    color: '#B82929',
    fontSize: responsive.fontSize(13),
    fontFamily: 'Outfit-Light',
  },
  flatListContainer: {
    gap: 10,
    paddingHorizontal: responsive.padding(10),
  },
  flatListColumn: {
    justifyContent: 'space-between',
  },
  bookNowButton: {
    marginVertical: responsive.margin(10),
    width: responsive.width(118),
    height: responsive.height(27),
    backgroundColor: '#B82929',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive.borderRadius(4),
    alignSelf: 'flex-end',
  },
  bookNowText: {
    color: '#FAFAFA',
    fontFamily: 'Outfit-Regular',
    fontSize: responsive.fontSize(12),
  },
});
