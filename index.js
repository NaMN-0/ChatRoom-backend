import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth.js";
import userRouter from "./router/user.js";

dotenv.config();
const app = express();
const PORT = process.env.port | 8000;

// Middlewares
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log("Server running on Port :", PORT);
})