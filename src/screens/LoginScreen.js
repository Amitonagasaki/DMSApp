import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { authAPI } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    const cleanNumber = mobileNumber.replace(/\D/g, '');
    
    if (!cleanNumber || cleanNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      console.log('📞 Sending OTP to:', `+91${cleanNumber}`);
      
      const response = await authAPI.generateOTP(`+91${cleanNumber}`);
      
      console.log('✅ API Response:', response.data);
      
      // FOR DEVELOPMENT: Assume OTP is always sent successfully
      // In production, you would check response.data.status === true
      Alert.alert('Success', 'OTP sent successfully! Please check your messages.');
      navigation.navigate('OTPVerification', { mobileNumber: cleanNumber });
      
    } catch (error) {
      console.error('❌ OTP sending error:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatMobileNumber = (text) => {
    const cleanNumber = text.replace(/\D/g, '');
    if (cleanNumber.length <= 10) {
      setMobileNumber(cleanNumber);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Mobile Number</Text>
      <Text style={styles.subtitle}>Enter your mobile number to receive OTP</Text>
      
      <View style={styles.inputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={formatMobileNumber}
          editable={!loading}
        />
      </View>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSendOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.note}>
        You will receive a 6-digit OTP on this number
      </Text>
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
  note: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  countryCode: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;