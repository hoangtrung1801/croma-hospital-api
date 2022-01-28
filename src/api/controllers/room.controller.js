const Room = require("../../models/Room");

const getRooms = async(req, res, next) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      status: 'success',
      data: rooms
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRooms
}