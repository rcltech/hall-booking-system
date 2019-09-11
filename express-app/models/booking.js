const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  room: String,
  start: Date,
  end: Date
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
