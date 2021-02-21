import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  chatID: {
    type: String,
    required: true
  },
  body: {
    type: Array,
    required: true
  }
});

export default mongoose.model("Chat", chatSchema);