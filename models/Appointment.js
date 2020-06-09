const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true 
  },
  endDate: {
    type: Date,
    required: true
  },
  begins: {
    type: Date,
    required: true
  },
  ends: {
    type: Date,
    required: true
  },
  people: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  }
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;