import { createRequire } from 'module';
import express from "express";
import mongoose from "mongoose";
import path from "path";

import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth.js";
import userRouter from "./router/user.js";
import fileRouter from "./router/files.js";
import chatRouter from "./router/chat.js";

dotenv.config();

const require = createRequire(import.meta.url);
const PORT = process.env.port | 8000;
const app = express();
const server = require('http').createServer(app);
export const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log("User Connected")
  socket.on('join', (data) => {
    console.log("A user joined the room", data.chatID);
    socket.join(data.chatID);
    io.to(data.chatID).emit('welcome',"welocome");
  })
  socket.on('sendMsg', (data) => {
    console.log("Send Msg from "+data.user1+" to "+data.user2);
    io.to(data.chatID).emit('msgReceive',{msg:data});
  })
  socket.on('disconnect', (data) => {
    console.log("User left");
  })
})

// Middlewares
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

// DB Connection
mongoose.set('useFindAndModify', false);
mongoose.
  connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log("Error : ", err);
  })

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/files", fileRouter);
app.use("/api/chat", chatRouter);

server.listen(PORT, () => {
  console.log("Server running on Port :", PORT);
})