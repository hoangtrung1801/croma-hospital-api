const mongoose = require('mongoose');

/*
  room :
  + floor
  + code  
  + patients
*/
const roomSchema = new mongoose.Schema({
  floor: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  slot: {
    type: Number,
    required: true
  },
  patients: {
    type: [mongoose.Types.ObjectId],
    default: []
  }
})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;