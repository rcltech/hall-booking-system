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

// user auth middleware
const authUser = require('../middleware/authUser.js');
router.use('/create', authUser);

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
  const booking = req.body.booking;
  booking.createdAt = new Date();
  let newBooking = new Booking(booking);
  if (newBooking.validateSync())
    return handleError(res, 'Invalid booking', 'Invalid booking', 400);
  const savedRoom = await updateRoom(res, booking);
  if (savedRoom.error) return;
  const savedBooking = await createBooking(res, booking);
  res.status(201).json({ savedBooking, savedRoom });
});

module.exports = router;
