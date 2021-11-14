const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a full name"],
  }, 
  email: {
    type: String,
    required: [true, "Please enter email"]
  }, 
  password: {
    type: String,
    required: [true, "Password is required"] 
  },
  /* Later */
  // age: {
  //   type: Number,
  //   required: [true, "Please type your age"]
  // },
  // address: {
  //   type: String,
  //   required: [true, "Please type your address"]
  // },
  role: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    if(error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  })
})

const User = mongoose.model('User', userSchema);

module.exports = User;