import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';

import authRoutes from '../routes/auth.js';
import chatRoomRoutes from '../routes/chatRoom.js';
import messageRoutes from '../routes/message.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/api/auth', authRoutes);
app.use('/api/chat-rooms', chatRoomRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('join', roomId => {
    socket.join(roomId);
  });

  socket.on('sendMessage', message => {
    io.to(message.chatRoom).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
