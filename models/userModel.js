const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required:true,
  },
  confirmPassword: {
     type: String,
     required: true
  }
},{
  timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
