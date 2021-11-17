const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const {ROLE} = require("../../config");
const passwordHelper = require("../../helpers/passwordHelper");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    // email is incorrect 
    if(!user) {
      const err = new Error("Not found email");
      err.statusCode = 400;
      return next(err);
    }

    if(!passwordHelper.comparePassword(password, user.password)) {
      const err = new Error("Password is not correct");
      err.statusCode = 400;
      return next(err);
    }

    const token = jwt.sign({userId: user._id, role: ROLE[user.role]}, process.env.TOKEN_SECRET);

    res.status(200).json({
      status: 'success',
      data: {token : `Bearer ${token}`}
    })

  } catch (error) {
    next(error);
  }
}

const createUser = async(req, res, next) => {
  try {
    const hashedPassword = passwordHelper.hashPassword(req.body.password);
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(200).json({
      status: 'success',
      message: "Success creating user"
    })
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
}

const resetPasswordUser = async (req, res, next) => {
  /* 
    req.body :
    + current password
    + new password
    + repeat new password
  */
 
  const {userId} = res.locals.user;
  const user = await User.findOne({_id: userId});
  const {currentPassword, newPassword, repeatNewPassword} = req.body;

  // check current password
  if(!passwordHelper.comparePassword(currentPassword, user.password)){
    const err = new Error("Current password is incorrect");
    err.statusCode = 403;
    return next(err);
  }

  // check new password is the same
  if(newPassword !== repeatNewPassword){
    const err = new Error("New password is not the same");
    err.statusCode = 403;
    return next(err);
  }

  // reset password
  const hashedPassword = passwordHelper.hashPassword(newPassword);
  user.password = hashedPassword;
  await User.updateOne({_id: user._id}, {password : hashedPassword});

  res.json({
    status: 'success',
    message: "Password is changed"
  })
}

module.exports = {
  loginUser,
  createUser,
  resetPasswordUser
}