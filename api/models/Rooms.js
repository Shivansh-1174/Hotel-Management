const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    default: '0',
  }
});

const Rooms = mongoose.model('Rooms', roomSchema);

module.exports = Rooms;