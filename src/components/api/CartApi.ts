import axios from 'axios';
import { BASE_URL } from './ConfigApi';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// إضافة منتج للسلة
export const addToCart = async (itemId: number, quantity: number = 1) => {
  const formData = new FormData();
  formData.append('item_id', String(itemId));
  formData.append('quantity', String(quantity));
  return axios.post(`${BASE_URL}/api/user/cart`, formData, {
    headers: getAuthHeaders(),
  });
};

// جلب كل محتويات السلة
export const getCart = async () => {
  return axios.get(`${BASE_URL}/api/user/all-cart`, {
    headers: getAuthHeaders(),
  });
};

// تعديل كمية منتج في السلة
export const updateCartItem = async (itemId: number, quantity: number) => {
  const formData = new FormData();
  formData.append('quantity', String(quantity));
  return axios.post(`${BASE_URL}/api/user/cart/${itemId}`, formData, {
    headers: getAuthHeaders(),
  });
};

// حذف منتج من السلة
export const deleteCartItem = async (cartItemId: number) => {
  return axios.delete(`${BASE_URL}/api/user/cart/${cartItemId}`, {
    headers: getAuthHeaders(),
  });
};

export const placeOrder = async ({ shipping_address }) => {
  const formData = new FormData();
  if (shipping_address) formData.append('shipping_address', shipping_address);
  return axios.post(`${BASE_URL}/api/user/orders`, formData, {
    headers: getAuthHeaders(),
  });
}; 