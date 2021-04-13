import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  imgUrl: {
    type: String,
    default: "https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png"
  },
  bio: {
    type: String,
    default: "Hey there! I am new here."
  },
  people: {
    type: Array
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  newUser: {
    type: Boolean
  }
});

export default mongoose.model("User", userSchema);