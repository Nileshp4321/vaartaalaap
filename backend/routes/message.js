import express from 'express';
import {
  sendMessage,
  getMessages,
  // addReaction,
} from '../controllers/messageController.js';
import {authenticate} from '../middleware/auth.js';

const router = express.Router();

router.post('/:chatRoomId/messages', authenticate, sendMessage);
router.get('/:chatRoomId/messages', authenticate, getMessages);
// router.post(
//   '/:chatRoomId/messages/:messageId/reactions',
//   authenticate,
//   addReaction,
// );

export default router;
