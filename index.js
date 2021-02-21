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
const app = express();
const PORT = process.env.port | 8000;

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

app.listen(PORT, () => {
  console.log("Server running on Port :", PORT);
})