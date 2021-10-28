const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  username: {
    type: String,
    required:true,
    unique:true,
  },
  email: {
    type: String,
    required:true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user'
  },
  password: {
    type: String,
    required:true,
    select: false,
  },
  confirmPassword: {
     type: String,
     required: true,
     select: false,
  },
  // passwordChangedAt: Date,
},{
  timestamps : true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,7);
  this.confirmPassword = undefined;
  next();
})

userSchema.methods.matchPasswords = async (givenPassword,actualPassword) => {
     return await bcrypt.compare(givenPassword,actualPassword);
}

userSchema.methods.changePasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000,10) ;
    return JWTTimeStamp < changedTimeStamp ;
  }
  return false ;
}
const User = mongoose.model("User", userSchema);

module.exports = User;