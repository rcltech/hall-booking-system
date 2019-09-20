const Room = require('./models/room');
const moment = require('moment');
const to = require('await-to-js').default;

let dateLastUpdated = moment();
let timerId;
const delay = 1000 * 60 * 60;

const timer = {
  startTimer: () => {
    timerId = setInterval(updateRooms, delay);
    console.log('Timer started');
  },
  stopTimer: () => {
    if (timerId) clearInterval(timerId);
    console.log('Timer stopped');
  }
}

const updateRooms = async () => {
  console.log(moment(dateLastUpdated).format());
  if (!(moment().isAfter(moment(dateLastUpdated).add(1, 'day')))) {
    console.log('DID NOT RUN');
    return;
  }

  let error, foundRooms;
  [error, foundRooms] = await to(Room.find({}));
  if (error) return console.error(error);
  foundRooms.forEach((room) => {
    let alterHoursBooked = room.hoursBooked.map(t => moment(t).format());
    for (var i = 0; i < alterHoursBooked.length; i++) {
      alterHoursBooked[i] = moment(alterHoursBooked[i]).add(1, 'days');
    }
    room.hoursBooked = alterHoursBooked.map(t => moment(t).toDate());
  })

  foundRooms.forEach(async (room) => {
    let error, savedRoom;
    [error, savedRoom] = await to(Room.updateOne({roomName: room.roomName}, room));
    if (error) return console.error(error);
  })

  dateLastUpdated = moment();
}

module.exports = timer;
