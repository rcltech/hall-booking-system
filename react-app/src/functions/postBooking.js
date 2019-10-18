const axios = require('axios');
const moment = require('moment');

const postBooking = async (room, date, startNum, endNum) => {
  const url = 'http://rctech-owl-dev.herokuapp.com/api/booking/create';
  const userId = '123';
  const start = moment(date);
  const end = moment(date);
  start.set({
    hours: startNum,
    minutes: 0,
    seconds: 0
  });
  end.set({
    hours: endNum,
    minutes: 0,
    seconds: 0
  });
  const createdAt = new Date();
  const booking = {
    userId,
    room,
    start,
    end,
    createdAt
  };
  const req = {
    booking
  };
  const res = await axios.post(url, req);
  return res.statusText === 'Created';
};

export default postBooking;
