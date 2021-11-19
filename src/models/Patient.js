const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"]
  },
  age: {
    type: Number,
    required: [true, "Please enter age"]
  },
  severity : {
    type: Number,
    required: [true, "Please enter the severity"],
    min: 1,
    max: 6,
  },
  image: {
    type: String,
  }
})

const Patient = mongoose.model('Patient', patientSchema); 

module.exports = Patient;