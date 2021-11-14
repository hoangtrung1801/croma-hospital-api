const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {ROLE} = require("../../config");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({userId: user._id, role: ROLE[user.role]}, process.env.TOKEN_SECRET) ;
  
    res.status(200).json({
      status: 'success',
      data: {token : token}
    })
  } catch(error) {
    res.json(error);
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user) {
      const err = new Error("Not found email");
      err.statusCode = 400;
      return next(err);
    }

    if(!bcrypt.compareSync(password, user.password)) {
      const err = new Error("Password is not correct");
      err.statusCode = 400;
      return next(err);
    }

    const token = jwt.sign({userId: user._id, role: ROLE[user.role]}, process.env.TOKEN_SECRET);
    res.status(200).json({
      status: 'success',
      data: {token}
    })

  } catch (error) {
    res.json(error); 
  }
}

module.exports = {
  registerUser,
  loginUser
}