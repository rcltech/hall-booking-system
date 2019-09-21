const express = require('express');
const router = express.Router();
const to = require('await-to-js').default;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// schema files
const Booking = require('../models/booking');
const Room = require('../models/room');

// error handler
const handleError = require('./errorHandler');

// create booking
const createBooking = async (res, booking) => {
  let error, savedBooking;
  [error, savedBooking] = await to(Booking.create(booking));
  if (error) return handleError(res, error, 'Failed to create booking');
  return savedBooking;
};

// logic to link creating booking to updating room
const updateRoom = async (res, booking) => {
  let error, foundRoom, savedRoom;
  const query = { roomName: booking.room };
  [error, foundRoom] = await to(Room.findOne(query));
  if (error)
    return handleError(
      res,
      error,
      'Failed to find a room with name: ' + query.roomName
    );

  error = foundRoom.updateHoursBooked(booking.start, booking.end);
  if (error) return handleError(res, error, 'Failed to add hours booked');

  [error, savedRoom] = await to(
    Room.findOneAndUpdate(query, foundRoom, {
      new: true,
      useFindAndModify: false
    })
  );
  if (error) return handleError(res, error, 'Failed to update the room');

  return savedRoom;
};
// routes
router.post('/create', async (req, res, next) => {
  if (req.body.api_key === process.env.API_KEY) {
    const booking = req.body;
    booking.api_key = undefined;
    let newBooking = new Booking(booking);
    let bookingError = await newBooking.validateSync();
    if (bookingError)
      return handleError(res, 'Invalid booking', 'Invalid booking', 400);
    let savedRoom = await updateRoom(res, booking);
    if (savedRoom.error) return;
    let savedBooking = await createBooking(res, booking);
    res.status(201).json({ savedBooking, savedRoom });
    return;
  }
  handleError(res, 'Unauthorized access', 'Unauthorized access', 401);
});

module.exports = router;
