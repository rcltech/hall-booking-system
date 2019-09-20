const Room = require('./models/room');
const moment = require('moment-timezone');
const to = require('await-to-js').default;

const timezone = "Asia/Hong_Kong";

const updateRooms = async () => {
  let error, foundRooms;
  [error, foundRooms] = await to(Room.find({}));
  if (error) return console.error(error);

  const now = moment().tz(timezone).startOf('day');
  const referenceHour = moment(foundRooms[0].hoursBooked[0]).tz(timezone);

  if (!(moment(now).isAfter(referenceHour))) {
    console.log("Rooms do not need to be updated");
    return;
  }

  foundRooms.forEach((room) => {
    let alterHoursBooked = room.hoursBooked.map(t => moment(t).format());
    alterHoursBooked = alterHoursBooked.map(x => moment(x).add(1, 'days'));
    room.hoursBooked = alterHoursBooked.map(t => moment(t).toDate());
  })

  foundRooms.forEach(async (room) => {
    let error, savedRoom;
    [error, savedRoom] = await to(Room.updateOne({roomName: room.roomName}, room));
    if (error) return console.error(error);
  })

  console.log("Rooms have been updated today");
}

module.exports = updateRooms;
