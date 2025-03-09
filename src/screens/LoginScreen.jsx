import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import responsive from '../utils/responsive';
import {useUser} from '../context/UserContext';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUser();

  const handleLogin = () => {
    setUser({email: true});
  };

  return (
    <ImageBackground
      source={require('../assets/login.png')}
      resizeMode="cover"
      style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      {/* Phone Number Input */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Phone Number"
        placeholderTextColor="grey"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Navigation */}
      <View style={styles.signupContainer}>
        <Text
          style={{
            fontFamily: 'Outfit-Light',
            fontSize: responsive.fontSize(12),
            color: '#000000',
          }}>
          Don’t have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 0,
  },
  logo: {
    width: '50%',
    height: 140,
  },
  title: {
    fontSize: responsive.fontSize(34),
    width: '100%',
    fontFamily: 'Outfit-Bold',
    color: '#000',
    marginBottom: responsive.margin(20),
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: responsive.fontSize(16),
    fontFamily: 'Outfit-SemiBold',
    color: '#B82929',
    marginBottom: responsive.margin(6),
  },
  input: {
    width: '100%',
    height: responsive.height(40),
    borderRadius: responsive.borderRadius(10),
    borderColor: '#B82929',
    paddingLeft: responsive.padding(15),
    fontSize: responsive.fontSize(14),
    marginBottom: responsive.margin(15),
    color: '#000',
    backgroundColor: '#B8292929',
  },
  loginButton: {
    backgroundColor: '#B82929',
    width: '90%',
    padding: responsive.padding(8),
    borderRadius: responsive.borderRadius(10),
    marginTop: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 7,
  },
  signupText: {
    color: '#B82929',
    fontFamily: 'Outfit-Bold',
    fontSize: responsive.fontSize(12),
  },
});
