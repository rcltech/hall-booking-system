const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room: String,
  start: Date,
  end: Date
})

bookingSchema.pre('init', function(booking) {
  booking.start = moment(booking.start).format();
  booking.end = moment(booking.end).format();
  return booking;
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
