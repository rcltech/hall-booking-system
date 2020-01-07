import moment from 'moment';

export const validateTime = (timeSlots, date, start, end) => {
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
  } else if (
    startTime.isSameOrBefore(dateChosen.hour(Number(moment().format('HH')))) &&
    startTime.isSame(moment(), 'day')
  ) {
    alert('Selected timeslot is not available.');
    return false;
  } else if (
    !(
      startTime.isSameOrAfter(dateChosen.hour(7)) &&
      startTime.isSameOrBefore(dateChosen.hour(22))
    )
  ) {
    alert('Selected timeslot is out of range.');
    return false;
  } else {
    for (let i = 0; i < timeSlots.length; ++i) {
      if (
        timeSlots[i].startTime.isSame(startTime, 'hour') ||
        timeSlots[i].endTime.isSame(endTime, 'hour')
      ) {
        alert('Timeslot has been booked by someone else.');
        return false;
      }
    }
  }
  return true;
};
