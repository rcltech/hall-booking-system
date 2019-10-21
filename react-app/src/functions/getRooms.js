const axios = require('axios');
const moment = require('moment');

const getRooms = async (room, date) => {
  //Initialize events template
  let events = {};
  for (let i = 0; i < 7; ++i) {
    events[
      moment(date)
        .add(i, 'days')
        .format('ll')
    ] = [];
  }
  const url = 'https://rctech-owl-dev.herokuapp.com/api/room';
  const response = await axios.get(url);
  const rooms = response.data.rooms;
  let times = undefined;
  for (let i = 0; i < rooms.length; ++i) {
    if (rooms[i].roomName === room) {
      times = rooms[i].hoursBooked;
      break;
    }
  }
  let id = 1;
  if (times) {
    for (let i = 0; i < times.length; ++i) {
      let conditionCheck1 = moment(times[i]).format('ll') in events;
      let conditionCheck2 = 7 <= Number(moment(times[i]).format('HH'));
      let conditionCheck3 = Number(moment(times[i]).format('HH')) <= 23;
      if (conditionCheck1 && conditionCheck2 && conditionCheck3) {
        events[moment(times[i]).format('ll')].push({
          id,
          type: 'custom',
          startTime: moment(times[i]),
          endTime: moment(times[i]).add(1, 'hours')
        });
        id++;
      }
    }
    return events;
  }
};

export default getRooms;
