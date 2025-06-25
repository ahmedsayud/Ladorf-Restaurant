import axios from 'axios';
import { BASE_URL } from './ConfigApi';

// Login API
export const login = async (phone: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, {
      phone,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Register API
export const register = async (name: string, phone: string, password: string, password_confirmation: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, {
      name,
      phone,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

// Logout API
export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/logout`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Logout failed' };
  }
}; 