import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';
import logo from '../assets/logo.png';
import responsive from '../utils/responsive';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Vraj Parikh',
    email: 'v@gmail.com',
    phone: '723468245',
    bank: 'BOB Bank',
    address: '42475 Duke Street, Lake Odastad 42944',
    memberId: 'Q274749P892',
    vehicle: 'Honda',
    refer: '',
    orders: 2,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = field => {
    setSelectedField(field);
    setEditValue(userInfo[field]);
    setModalVisible(true);
  };

  const handleSave = () => {
    setUserInfo({...userInfo, [selectedField]: editValue});
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.sftcdn.net/images/t_app-icon-m/p/d0659adc-964d-4eea-8e7e-18f9678d79ac/2936336398/cool-profile-pictures-for-boys-logo',
          }}
          style={styles.profileLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>{userInfo.name}</Text>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      {/* Personal Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <InfoRow
          label="Name"
          value={userInfo.name}
          onPress={() => handleEdit('name')}
        />
        <InfoRow
          label="Email"
          value={userInfo.email}
          onPress={() => handleEdit('email')}
        />
        <InfoRow
          label="Phone Number"
          value={userInfo.phone}
          onPress={() => handleEdit('phone')}
        />
        <InfoRow
          label="Bank A/C"
          value={userInfo.bank}
          onPress={() => handleEdit('bank')}
        />
        <InfoRow
          label="Address"
          value={userInfo.address}
          onPress={() => handleEdit('address')}
        />
        <InfoRow
          label="My Orders"
          value={userInfo.orders}
          onPress={() => handleEdit('address')}
        />
      </View>

      {/* Some Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Some information</Text>
        <InfoRow
          label="Member ID"
          value={userInfo.memberId}
          onPress={() => handleEdit('memberId')}
        />
        <InfoRow
          label="Vehicle Name"
          value={userInfo.vehicle}
          onPress={() => handleEdit('vehicle')}
        />
        <InfoRow
          label="Refer and Earn"
          value={userInfo.refer}
          onPress={() => handleEdit('refer')}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          style={styles.deleteButton}
          labelStyle={styles.buttonLabel}>
          <Icon name="trash-can-outline" size={14} color="red" /> Delete Account
        </Button>
        <Button
          mode="outlined"
          style={styles.logoutButton}
          labelStyle={styles.buttonLabel}>
          <Icon name="logout" size={14} color="red" /> Log out
        </Button>
      </View>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {selectedField}</Text>
            <TextInput
              style={styles.input}
              value={editValue}
              onChangeText={setEditValue}
            />
            <View style={styles.modalButtonContainer}>
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.saveButton}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Reusable Component for Info Rows
const InfoRow = ({label, value, onPress}) => (
  <TouchableOpacity style={styles.infoRow} onPress={onPress}>
    <Text style={styles.infoLabel}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.infoValue}>{value}</Text>
      <Icon name="chevron-right" size={20} color="gray" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8F8'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsive.padding(10),
  },
  headerText: {
    fontSize: responsive.fontSize(20),
    fontFamily: 'Outfit-SemiBold',
    width: '50%',
    color: '#000000',
  },
  logo: {height: responsive.height(40), width: responsive.width(120)},
  profileLogo: {
    height: responsive.height(40),
    width: responsive.width(40),
    borderRadius: responsive.borderRadius(50),
  },
  infoContainer: {
    padding: responsive.padding(16),
    backgroundColor: '#FFF',
    marginBottom: responsive.margin(10),
  },
  sectionTitle: {
    fontSize: responsive.fontSize(16),
    fontFamily: 'Outfit-SemiBold',
    marginBottom: responsive.margin(8),
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.padding(12),
    borderBottomWidth: responsive.width(1),
    borderBottomColor: '#EAEAEA',
  },
  infoLabel: {
    fontSize: responsive.fontSize(14),
    color: '#000000',
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Outfit-SemiBold',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  infoValue: {
    fontSize: responsive.fontSize(14),
    color: '#000000',
    textAlign: 'right',
    fontFamily: 'Outfit-Light',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.padding(10),
    marginTop: responsive.margin(20),
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: responsive.width(1),
    borderRadius: responsive.borderRadius(10),
  },
  logoutButton: {
    borderColor: 'red',
    borderWidth: responsive.width(1),
    borderRadius: responsive.borderRadius(10),
  },
  buttonLabel: {
    fontSize: responsive.fontSize(12),
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: responsive.padding(20),
    borderRadius: responsive.borderRadius(10),
    width: '80%',
  },
  modalTitle: {
    fontSize: responsive.fontSize(18),
    fontWeight: 'bold',
    marginBottom: responsive.margin(10),
  },
  input: {
    borderWidth: responsive.width(1),
    borderColor: '#ccc',
    borderRadius: responsive.borderRadius(5),
    padding: responsive.padding(10),
    marginBottom: responsive.margin(20),
  },
  modalButtonContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  cancelButton: {backgroundColor: 'gray', marginRight: responsive.margin(10)},
  saveButton: {backgroundColor: 'blue'},
});

export default ProfileScreen;
