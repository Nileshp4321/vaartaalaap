import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {List, FAB, Button, Snackbar} from 'react-native-paper';
import {getChatRooms, joinChatRoom} from '../services/api';
import {AuthContext} from '../context/AuthContext';
import {useIsFocused} from '@react-navigation/native';

const ChatListScreen = ({navigation}) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchChatRooms();
  }, [isFocused]);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const rooms = await getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
      setError('Failed to fetch chat rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async roomId => {
    try {
      await joinChatRoom(roomId);
      await fetchChatRooms();
      navigation.navigate('Chat', {
        roomId,
        roomName: chatRooms.find(room => room._id === roomId).name,
      });
    } catch (error) {
      console.error('Failed to join chat room:', error);
      setError('Failed to join chat room. Please try again.');
    }
  };

  const renderChatRoom = ({item}) => {
    const isJoined = item.participants.some(
      participant => participant._id === user?.user._id,
    );
    return (
      <List.Item
        title={item.name}
        description={`${item.participants.length} participants`}
        left={props => <List.Icon {...props} icon="chat" />}
        onPress={() => {
          if (isJoined) {
            navigation.navigate('Chat', {
              roomId: item._id,
              roomName: item.name,
            });
          }
        }}
        right={() =>
          !isJoined && (
            <Button mode="outlined" onPress={() => handleJoinRoom(item._id)}>
              Join
            </Button>
          )
        }
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={renderChatRoom}
        keyExtractor={item => item._id}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateChatRoom')}
      />
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        action={{
          label: 'Retry',
          onPress: fetchChatRooms,
        }}>
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ChatListScreen;
