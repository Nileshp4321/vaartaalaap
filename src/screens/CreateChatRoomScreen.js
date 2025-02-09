import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TextInput, Button, Title, Snackbar} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {createChatRoom} from '../services/api';

const CreateChatRoomScreen = ({navigation}) => {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {user} = useContext(AuthContext);

  const handleCreateRoom = async () => {
    if (roomName.trim() === '') {
      setError('Room name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      //   Alert.alert('roomName', roomName);
      const newRoom = await createChatRoom(roomName, user?.user._id);
      navigation.navigate('Chat', {
        roomId: newRoom._id,
        roomName: newRoom.name,
      });
    } catch (error) {
      console.error('Failed to create chat room:', error);
      if (error.response && error.response.status === 401) {
        setError('Unauthorized. Please log in again.');
      } else {
        setError('Failed to create chat room. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Create New Chat Room</Title>
      <TextInput
        label="Room Name"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleCreateRoom}
        style={styles.button}
        loading={loading}
        disabled={loading}>
        Create Room
      </Button>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: 'Dismiss',
          onPress: () => setError(''),
        }}>
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default CreateChatRoomScreen;
