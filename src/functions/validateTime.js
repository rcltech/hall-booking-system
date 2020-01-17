import moment from 'moment';

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
  } else {
    for (let i = 0; i < bookings.length; ++i) {
      if (
        moment(bookings[i].start).isSame(startTime, 'hour') ||
        moment(bookings[i].end).isSame(endTime, 'hour')
      ) {
        alert('Timeslot has been booked by someone else.');
        return false;
      }
    }
  }
  return true;
};
