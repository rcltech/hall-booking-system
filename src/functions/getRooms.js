const moment = require('moment');

const getRooms = async (bookings, date) => {
  //Initialize events template
  let events = {};
  for (let i = 0; i < 7; ++i) {
    events[
      moment(date)
        .add(i, 'days')
        .format('ll')
    ] = [];
  }

  let times = [];
  bookings.forEach(booking => {
    const duration = moment.duration(
      moment(booking.end).diff(moment(booking.start))
    );
    const durationHours = duration.as('hours');
    for (let i = 0; i < durationHours; i++) {
      times.push(
        moment(booking.start)
          .add(i, 'hours')
          .toDate()
      );
    }
  });

  if (times) {
    for (let i = 0; i < times.length; ++i) {
      let conditionCheck1 = moment(times[i]).format('ll') in events;
      let conditionCheck2 = 7 <= Number(moment(times[i]).format('HH'));
      let conditionCheck3 = Number(moment(times[i]).format('HH')) <= 23;
      if (conditionCheck1 && conditionCheck2 && conditionCheck3) {
        events[moment(times[i]).format('ll')].push({
          id: moment(times[i]).format('HH'),
          type: 'custom',
          startTime: moment(times[i]),
          endTime: moment(times[i]).add(1, 'hours')
        });
      }
    }
    return events;
  }
};

export default getRooms;
