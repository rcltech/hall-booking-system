import moment from 'moment';

const dissectBookings = bookings => {
  //Separate bookings into modular form (1 hour each)
  //For example : 10-12 pm booking will be dissected into
  //two separate bookings (10-11 pm and 11-12 pm) for validating purpose

  const dissectedBookings = [];
  bookings.forEach(booking => {
    let { start, end } = booking;

    for (let i = moment(start); i.isBefore(moment(end)); i.add(1, 'hours')) {
      dissectedBookings.push({ startTime: moment(i) });
    }
  });
  return dissectedBookings;
};

export const validateTime = (bookings, date, start, end) => {
  const startTime = moment(date)
    .hours(Number(moment(start).format('HH')))
    .startOf('hour');
  const endTime = moment(date)
    .hours(Number(moment(end).format('HH')))
    .startOf('hour');
  const duration = moment.duration(endTime.diff(startTime));
  const hours = duration.asHours();
  const dateChosen = moment(date).startOf('date');
  if (hours > 2) {
    alert('Maximum hours of booking per person is 2 hours.');
    return false;
  } else if (startTime.isSameOrBefore(moment())) {
    alert('Selected timeslot is in the past.');
    return false;
  } else if (
    !(
      startTime.isSameOrAfter(dateChosen.hour(7)) &&
      startTime.isSameOrBefore(dateChosen.hour(22))
    )
  ) {
    alert(
      'Selected timeslot is out of range. You can only book between 7am and 11pm.'
    );
    return false;
  } else if (startTime.isAfter(moment().add(60, 'days'), 'day')) {
    alert("You can't book more than 60 days in advance.");
    return false;
  } else {
    const dissectedBookings = dissectBookings([...bookings]);

    for (let i = 0; i < dissectedBookings.length; ++i) {
      if (
        dissectedBookings[i].startTime.isBetween(
          startTime,
          endTime,
          'hour',
          '[)'
        )
      ) {
        alert('Timeslot has been booked by someone else.');
        return false;
      }
    }
  }
  return true;
};
