const User = require("../../models/User")

const getUsers = async(req, res, next) => {
  try {
    const users = await User.find({}, '-password -__v');
  
    res.status(200).json({
      status: 'success',
      data: [ ...users ]
    })
  } catch(err) {
    next(err);
  }
}

const getCurrentUser = async(req, res, next) => {
  const current = req.query.current === 'true';
  // query ? check current user
  if(current) {
    const {userId} = res.locals.user;

    // have no token, haven't login
    if(!userId) {
      const err = new Error("Please, login");
      err.statusCode = 400;
      return next(err);
    }

    const user = await User.findOne({_id: userId}, '-password -__v');

    // have no user
    if(!user) {
      const err = new Error("Unauthorized");
      err.statusCode = 400;
      return next(err);
    }

    const data = user;
    return res.status(200).json({
      status: 'success',
      data
    })

  } else {
    return next();
  }
}

const getUser = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const user = await User.findOne({_id : userId}, '-password -__v');
    const data = user;
  
    res.status(200).json({
      status: 'success',
      data
    })
  } catch(err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getCurrentUser,
  getUser
}