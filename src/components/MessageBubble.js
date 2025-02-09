import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Avatar} from 'react-native-paper';
import GlassBackground from './GlassBackground';

const MessageBubble = ({message, isOwnMessage, senderName}) => {
  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
      ]}>
      {!isOwnMessage && (
        <Avatar.Text size={32} label={senderName[0]} style={styles.avatar} />
      )}
      <View style={styles.messageContent}>
        <GlassBackground style={styles.messageBubble}>
          {!isOwnMessage && <Text style={styles.senderName}>{senderName}</Text>}
          <Text style={styles.messageText}>{message.content}</Text>
          <Text style={styles.timestamp}>
            {new Date(message.createdAt).toLocaleTimeString()}
          </Text>
        </GlassBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 10,
  },
  messageContent: {
    maxWidth: '80%',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  reactionButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionPanel: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionItem: {
    marginHorizontal: 5,
  },
  reactionEmoji: {
    fontSize: 20,
  },
});

export default MessageBubble;
