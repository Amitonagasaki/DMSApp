import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, TextInput } from 'react-native';
import { authAPI } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { mobileNumber } = route.params;
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = async (code) => {
    if (code.length === 6) {
      setLoading(true);
      try {
        // FOR DEVELOPMENT: Use mock verification since real API requires registered numbers
        // const response = await authAPI.validateOTP(`+91${mobileNumber}`, code);
        
        // Mock successful verification for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store mock authentication data
        await AsyncStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        await AsyncStorage.setItem('userData', JSON.stringify({
          id: 1,
          mobileNumber: mobileNumber,
          name: 'Test User'
        }));
        
        Alert.alert('Success', 'Login successful!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        
      } catch (error) {
        console.error('❌ OTP verification error:', error);
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        resetOtpFields();
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await authAPI.generateOTP(`+91${mobileNumber}`);
      Alert.alert('Success', 'OTP sent again successfully');
      resetOtpFields();
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const resetOtpFields = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a 6-digit code to +91{mobileNumber}
      </Text>
      
      <View style={styles.otpContainer}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpBox}
            value={otp[index]}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            editable={!loading}
            selectTextOnFocus
          />
        ))}
      </View>
      
      {loading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}
      
      <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading || loading}>
        <Text style={[styles.resendText, (resendLoading || loading) && styles.disabledText]}>
          {resendLoading ? 'Sending...' : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
  },
  resendText: {
    marginTop: 20,
    color: '#6200ee',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#ccc',
  },
});

export default OTPVerificationScreen;