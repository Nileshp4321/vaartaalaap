import ChatRoom from '../models/ChatRoom.js';

export const createChatRoom = async (req, res) => {
  try {
    const {name} = req.body;
    const chatRoom = new ChatRoom({name, participants: [req.user._id]});
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to create chat room', error: error.message});
  }
};

export const getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate('participants', 'name');
    res.json(chatRooms);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to get chat rooms', error: error.message});
  }
};

export const getChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate(
      'participants',
      'name',
    );
    if (!chatRoom) {
      return res.status(404).json({message: 'Chat room not found'});
    }
    res.json(chatRoom);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to get chat room', error: error.message});
  }
};

export const joinChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id);
    if (!chatRoom) {
      return res.status(404).json({message: 'Chat room not found'});
    }
    if (!chatRoom.participants.includes(req.user._id)) {
      chatRoom.participants.push(req.user._id);
      await chatRoom.save();
    }
    res.json(chatRoom);
  } catch (error) {
    res
      .status(400)
      .json({message: 'Failed to join chat room', error: error.message});
  }
};
