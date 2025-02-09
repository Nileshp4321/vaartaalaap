import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Button} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  console.log('useruseruseruseruseruseruseruser', user?.user.email);
  const handleLogout = async () => {
    try {
      await logout();

      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Avatar.Image
          size={100}
          source={{uri: user?.avatar || 'https://via.placeholder.com/100'}}
        />
        <Title style={styles.name}>{user?.user.name || 'User Name'}</Title>
        <Caption style={styles.email}>
          {user?.user.email || 'user@example.com'}
        </Caption>
      </View>
      <View style={styles.infoSection}>
        {/* Add more user info here if needed */}
      </View>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
