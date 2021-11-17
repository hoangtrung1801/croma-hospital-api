const User = require("../../models/User")

const getUsers = async(req, res, next) => {
  try {
    const users = await User.find({}, '_id name email role');
  
    res.status(200).json({
      status: 'success',
      data: {users}
    })
  } catch(err) {
    next(err);
  }
}

const getUser = async (req, res, next) => {
  try {
    const {userId} = req.params;
    const user = await User.findOne({_id : userId});
  
    res.status(200).json({
      status: 'success',
      data: {user}
    })
  } catch(err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser
}