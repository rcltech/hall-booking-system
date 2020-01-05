const moment = require('moment');

const separateBookingsByDate = bookings => {
  const bookingsByDate = [];
  bookings.forEach(booking => {
    if (
      bookingsByDate.length === 0 ||
      moment(booking.start)
        .startOf('date')
        .format() !==
        moment(bookingsByDate[bookingsByDate.length - 1][0].start)
          .startOf('date')
          .format()
    )
      bookingsByDate.push([booking]);
    else bookingsByDate[bookingsByDate.length - 1].push(booking);
  });
  return bookingsByDate;
};

const separateBookingsByMonthAndDate = bookingsByDate => {
  const bookingsByMonthAndDate = [];
  bookingsByDate.forEach(bookings => {
    if (
      bookingsByMonthAndDate.length === 0 ||
      moment(bookings[0].start)
        .startOf('month')
        .format() !==
        moment(
          bookingsByMonthAndDate[bookingsByMonthAndDate.length - 1][0][0].start
        )
          .startOf('month')
          .format()
    )
      bookingsByMonthAndDate.push([bookings]);
    else {
      const groupedbookings =
        bookingsByMonthAndDate[bookingsByMonthAndDate.length - 1];
      groupedbookings.push(bookings);
    }
  });
  return bookingsByMonthAndDate;
};

const isUserBooking = (username, bookingUsername) => {
  return username === bookingUsername;
};

const isToday = date => {
  return moment(date).isSame(moment(), 'day');
};

module.exports = {
  separateBookingsByDate,
  separateBookingsByMonthAndDate,
  isUserBooking,
  isToday
};
