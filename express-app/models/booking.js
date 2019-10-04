const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const listOfRooms = ['204', '305'];

const bookingSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'No user provided']
  },
  room: {
    type: String,
    enum: listOfRooms,
    required: [true, 'No room provided']
  },
  start: {
    type: Date,
    required: [true, 'No start datetime provided']
  },
  end: {
    type: Date,
    required: [true, 'No end datetime provided']
  },
  createdAt: {
    type: Date,
    required: true
  }
});

bookingSchema.pre('init', function(booking) {
  booking.start = moment(booking.start).format();
  booking.end = moment(booking.end).format();
  return booking;
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
