import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [otp, setOtp] = useState('');
    const [validTime, setValidTime] = useState(60);
    const navigation = useNavigation();

    // Function to send OTP
    const sendOTP = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
            setConfirm(confirmation);
            startTimer();
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    // Function to verify OTP
    const confirmCode = async () => {
        try {
            await confirm.confirm(otp);
            console.log('Phone authentication successful');
        } catch (error) {
            console.error('Invalid OTP:', error);
        }
    };

    // Timer function for OTP expiration
    const startTimer = () => {
        setValidTime(60);
        const timer = setInterval(() => {
            setValidTime(prev => {
                if (prev <= 1) clearInterval(timer);
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <ImageBackground source={require('../assets/login.png')} resizeMode="cover" style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
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

            {/* OTP Input - Only Show After Sending OTP */}
            {confirm && (
                <>
                    <Text style={styles.label}>OTP</Text>
                    <OTPInputView
                        style={styles.otpContainer}
                        pinCount={6}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.otpBox}
                        onCodeChanged={setOtp}
                    />
                    <View style={styles.resendContainer}>
                        <TouchableOpacity onPress={sendOTP} disabled={validTime > 0}>
                            <Text style={[styles.resendText, validTime === 0 ? styles.resendActive : styles.resendDisabled]}>
                                Resend OTP
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.validTime}> Valid: {validTime}s</Text>
                    </View>
                </>
            )}

            {/* Login / Verify OTP Button */}
            <TouchableOpacity style={styles.loginButton} onPress={confirm ? confirmCode : sendOTP}>
                <Text style={styles.buttonText}>{confirm ? 'Verify OTP' : 'Login'}</Text>
            </TouchableOpacity>

            {/* Signup Navigation */}
            <View style={styles.signupContainer}>
                <Text>Don’t have an account?</Text>
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
        fontSize: 34,
        width: '100%',
        fontWeight: '800',
        color: '#000',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '500',
        color: '#B82929',
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B82929',
        paddingLeft: 15,
        fontSize: 14,
        marginBottom: 15,
        color: '#000',
        backgroundColor: '#B8292929',
    },
    otpContainer: {
        width: '80%',
        height: 50,
        alignSelf: 'center',
    },
    otpBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#B82929',
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
        color: '#B82929',
        backgroundColor: '#B8292929',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    resendText: {
        fontWeight: 'bold',
    },
    resendActive: {
        color: '#B82929',
    },
    resendDisabled: {
        color: 'gray',
    },
    validTime: {
        color: '#B82929',
    },
    loginButton: {
        backgroundColor: '#B82929',
        width: '90%',
        padding: 8,
        borderRadius: 10,
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
        fontWeight: 'bold',
    },
});
