import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    content: {type: String, required: true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    // reactions: [
    //   {
    //     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //     reaction: String,
    //   },
    // ],
  },
  {timestamps: true},
);

export default mongoose.model('Message', messageSchema);
