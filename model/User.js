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
    default: "https://lh3.googleusercontent.com/proxy/cHKMe_NmiPQ2sKKBHKtoNXQ75IIPZNIx54Ps8ynIZq_Sg6O-3EuMiZc22bkXZRBaZIZL_JoIzbkzpmw9Kdt_W8FYdknMP1E4IXEzsQUaw_Z2yNrgz--15DTq9sh-"
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