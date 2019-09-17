const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const roomSchema = new Schema({
  roomName: String,
  hoursBooked: [Date]
})

roomSchema.methods.updateHoursBooked = function(start, end) {
  let alterHoursBooked = this.hoursBooked.map(t => moment(t).format());
  start = moment(start).format();
  end = moment(end).format();
  
  if (alterHoursBooked.includes(start) || alterHoursBooked.includes(moment(end).subtract(1, 'hours').format())) {
    return 'Booking slot has been taken';
  }

  const numberOfHours = moment(end).diff(start, 'hours');
  for (var i = 0; i < numberOfHours; i++) {
    alterHoursBooked.push(moment(start).add(i, 'hours'));
  }
  alterHoursBooked.sort((a, b) => {
    if (moment(b).isAfter(a)) return -1;
    return 1;
  });

  this.hoursBooked = alterHoursBooked.map(t => moment(t).toDate());
  return null;
}

roomSchema.pre('init', function(room) {
  const update = room.hoursBooked.map(t => moment(t).format());
  room.hoursBooked = update;
  return room;
})

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
