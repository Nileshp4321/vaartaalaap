import express from 'express';
import {
  createChatRoom,
  getChatRooms,
  getChatRoom,
  joinChatRoom,
} from '../controllers/chatRoomController.js';
import {authenticate} from '../middleware/auth.js';

const router = express.Router();

router.post('/chat-rooms', authenticate, createChatRoom);
router.get('/chat-rooms', authenticate, getChatRooms);
router.get('/chat-rooms/:id', authenticate, getChatRoom);
router.post('/chat-rooms/:id/join', authenticate, joinChatRoom);
export default router;
