import axios from 'axios';

const API_BASE_URL = 'https://apis.allsoft.co/api/documentManagement';

// Create axios instance with detailed logging
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:');
    
    if (error.response) {
      // Server responded with error status
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.log('No response received');
      console.log('Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error message:', error.message);
      console.log('Config:', error.config);
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  generateOTP: (mobileNumber) => {
    console.log('📞 Generating OTP for:', mobileNumber);
    return api.post('/generateOTP', { 
      mobile_number: mobileNumber 
    });
  },
  
  validateOTP: (mobileNumber, otp) => {
    console.log('🔐 Validating OTP for:', mobileNumber);
    return api.post('/validateOTP', { 
      mobile_number: mobileNumber, 
      otp: otp 
    });
  },
};

