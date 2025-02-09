import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, Title, Snackbar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {register} from '../services/api';

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
  });

  const {registerUser} = useContext(AuthContext);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormData(prev => ({...prev, error: 'Name is required.'}));
      return false;
    }
    if (!formData.email.trim()) {
      setFormData(prev => ({...prev, error: 'Email is required.'}));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormData(prev => ({
        ...prev,
        error: 'Please enter a valid email address.',
      }));
      return false;
    }
    if (!formData.password.trim()) {
      setFormData(prev => ({...prev, error: 'Password is required.'}));
      return false;
    }
    if (formData.password.length < 6) {
      setFormData(prev => ({
        ...prev,
        error: 'Password must be at least 6 characters long.',
      }));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const userData = await register(
        formData.name,
        formData.email,
        formData.password,
      );
      registerUser(userData);
      navigation.navigate('Login');
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        error: 'Registration failed. Please try again.',
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={text => setFormData(prev => ({...prev, name: text}))}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={text => setFormData(prev => ({...prev, email: text}))}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={formData.password}
        onChangeText={text => setFormData(prev => ({...prev, password: text}))}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <Snackbar
        visible={!!formData.error}
        onDismiss={() => setFormData(prev => ({...prev, error: ''}))}
        duration={5000}
        action={{
          label: 'Dismiss',
          onPress: () => setFormData(prev => ({...prev, error: ''})),
        }}>
        {formData.error}
      </Snackbar>
      <Button onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
  },
});
