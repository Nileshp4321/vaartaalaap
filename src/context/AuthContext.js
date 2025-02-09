import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserData();
  }, []);

  const loginUsingGoogle = userData => {
    console.log('userData', userData);
  };

  const registerUser = async userData => {
    try {
      const userData1 = await AsyncStorage.setItem(
        'userData',
        JSON.stringify(userData),
      );
      console.log(
        'userData1userData1userData1userData1userData1userData1userData1>>',
        userData1,
      );
      setUser(userData1);
      return userData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const token = await AsyncStorage.getItem('token');
      // Alert.alert('userData token ', JSON.parse(token));
      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const loginUser = async userData => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('token', JSON.stringify(userData?.token));
      // Alert.alert('userData', userData?.token);
      setUser(userData);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, loginUser, registerUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
