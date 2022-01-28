const mongoose = require('mongoose');

const specialitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Speciality = mongoose.model('Speciality', specialitySchema);

module.exports = Speciality;