const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  speciality: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
