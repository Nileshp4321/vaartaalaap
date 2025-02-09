import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const API_URL = 'https://5fba-110-235-229-159.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    token = JSON.parse(token);
    // Alert.alert('token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const login = async (email, password) => {
  const response = await api.post('/auth/login', {email, password});
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', {name, email, password});
  return response.data;
};

export const getChatRooms = async () => {
  const response = await api.get('/chat-rooms/chat-rooms');
  return response.data;
};

export const createChatRoom = async (name, creatorId) => {
  const response = await api.post('/chat-rooms/chat-rooms', {name, creatorId});
  return response.data;
};

export const joinChatRoom = async roomId => {
  const response = await api.post(`/chat-rooms/chat-rooms/${roomId}/join`);
  return response.data;
};
export const getMessages = async roomId => {
  const response = await api.get(`/messages/${roomId}/messages`);
  return response.data;
};

export const sendMessage = async (roomId, content) => {
  const response = await api.post(`/messages/${roomId}/messages`, {
    content,
  });
  return response.data;
};
export const addReaction = async (roomId, messageId, reaction) => {
  const response = await api.post(
    `/messages/${roomId}/messages/${messageId}/reactions`,
    {reaction},
  );
  return response.data;
};
