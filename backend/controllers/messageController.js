import Message from '../models/Message.js';
import {sendNotification} from '../services/oneSignalService.js';
import ChatRoom from '../models/ChatRoom.js';

export const sendMessage = async (req, res) => {
  try {
    const {content} = req.body;
    const message = new Message({
      content,
      sender: req.user._id,
      chatRoom: req.params.chatRoomId,
    });
    await message.save();
    await message.populate('sender', 'name');

    // Send notification to all participants except the sender
    // const chatRoom = await ChatRoom.findById(req.params.chatRoomId);
    // chatRoom.participants.forEach(async participantId => {
    //   if (participantId.toString() !== req.user._id.toString()) {
    //     await sendNotification(
    //       `New message from ${req.user.name}`,
    //       {roomId: req.params.chatRoomId, roomName: chatRoom.name},
    //       participantId.toString(),
    //     );
    //   }
    // });

    res.status(201).json(message);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to send message', error: error.message});
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      chatRoom: req.params.chatRoomId,
    }).populate('sender', 'name');

    res.json(messages);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to get messages', error: error.message});
  }
};

// export const addReaction = async (req, res) => {
//   try {
//     const {messageId} = req.params;
//     const {reaction} = req.body;

//     const message = await Message.findById(messageId);
//     if (!message) {
//       return res.status(404).json({message: 'Message not found'});
//     }

//     const existingReaction = message.reactions.find(
//       r => r.user.toString() === req.user._id.toString(),
//     );

//     if (existingReaction) {
//       existingReaction.reaction = reaction;
//     } else {
//       message.reactions.push({user: req.user._id, reaction});
//     }

//     await message.save();
//     res.json(message);
//   } catch (error) {
//     res
//       .status(400)
//       .json({message: 'Failed to add reaction', error: error.message});
//   }
// };
