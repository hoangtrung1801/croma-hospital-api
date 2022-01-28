const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter a name"]
  },
  gender: {
    type: String,
    // required: [true, "Please enter you gender"]
  },
  age: {
    type: Number,
    // required: [true, "Please enter age"]
  },
  phone: {
    type: String,
    // required: [true, "Please enter your phone"]
  },
  severity : {
    type: Number,
    // required: [true, "Please enter the severity"],
    min: 1,
    max: 6,
  },
  image: {
    type: String,
  },
  testCovid: {
    type: Boolean,
    // required: [true, "Please enter your test covid"]
  },
  medicalHistory: {
    type: String,
  }, 
  disease: {
    type: mongoose.Types.ObjectId,
    // required: [true, "Please enter disease"]
  }
})

const Patient = mongoose.model('Patient', patientSchema); 

module.exports = Patient;