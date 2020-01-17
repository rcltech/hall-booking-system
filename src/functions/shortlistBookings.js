import moment from 'moment';

export const shortlistBookings = (bookings, date) => {
  const rangeStart = moment(date).startOf('date');
  const rangeEnd = moment(date)
    .startOf('date')
    .add(3, 'day');
  return bookings.filter(
    booking =>
      moment(booking.start).isSameOrAfter(rangeStart) &&
      moment(booking.end).isSameOrBefore(rangeEnd)
  );
};
