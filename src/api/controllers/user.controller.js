const User = require("../../models/User")

const getUsers = async(req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {users}
  })
}

const getUser = async (req, res) => {
  const {userId} = req.params;
  const user = await User.findOne({_id : userId});

  res.status(200).json({
    status: 'success',
    data: {user}
  })
}

module.exports = {
  getUsers,
  getUser
}