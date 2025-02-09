import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {TextInput, IconButton} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {getMessages, sendMessage} from '../services/api';
import {io} from 'socket.io-client';
import OneSignalService from '../services/oneSignalService';
import MessageBubble from '../components/MessageBubble';
import GlassBackground from '../components/GlassBackground';

const ChatScreen = ({route, navigation}) => {
  const {roomId, roomName} = route.params;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
  const socketRef = useRef(null);
  const flatListRef = useRef(null);
  useEffect(() => {
    navigation.setOptions({title: roomName});
    setupSocket();
    fetchMessages();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomName, navigation, messages]);

  const setupSocket = () => {
    socketRef.current = io('https://5fba-110-235-229-159.ngrok-free.app');
    socketRef.current.emit('join', roomId);

    // socketRef.current.on('message', message => {
    //   setMessages(prevMessages => [message, ...prevMessages]);
    //   if (message.sender._id !== user._id) {
    //     OneSignalService.sendNotification(
    //       `New message from ${message.sender.name}`,
    //       {roomId: roomId, roomName: roomName},
    //       user._id,
    //     );
    //   }
    // });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await getMessages(roomId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (inputMessage.trim() === '') return;

    try {
      const newMessage = await sendMessage(roomId, inputMessage);
      socketRef.current.emit('sendMessage', newMessage);
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const renderMessage = ({item}) => (
    <MessageBubble
      message={item}
      isOwnMessage={item?.sender._id === user?._id}
      senderName={item?.sender.name}
    />
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://api.deepai.org/job-view-file/35ed286d-9870-4a48-bc48-b0f3b189a26c/outputs/output.jpg',
      }}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item._id}
          inverted
          contentContainerStyle={styles.messageList}
        />
        <GlassBackground style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            theme={{
              colors: {text: '#fff', placeholder: 'rgba(255, 255, 255, 0.7)'},
            }}
          />
          <IconButton
            icon="send"
            color="#fff"
            size={24}
            onPress={handleSend}
            style={styles.sendButton}
          />
        </GlassBackground>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#fff',
  },
  sendButton: {
    margin: 0,
  },
});

export default ChatScreen;
