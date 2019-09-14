const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: String,
  hoursBooked: [Date]
})

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
