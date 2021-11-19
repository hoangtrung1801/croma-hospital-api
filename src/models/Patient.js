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
  
})