const express = require('express');
const router = express.Router();
const to = require('await-to-js').default;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// schema files
const Booking = require('../models/booking');

// error handler
const handleError = require('./errorHandler');

// routes
router.post('/create', async (req, res, next) => {
  if (req.body.api_key === process.env.API_KEY) {
    let error, savedBooking;
    const newBooking = req.body;
    newBooking.api_key = undefined;
    [error, savedBooking] = await to(Booking.create(newBooking));
    if (error) return handleError(res, error, 'Failed to create booking');
    res.status(201).json(savedBooking);
    return;
  }
  handleError(res, 'Unauthorized access', 'Unauthorized access', 401);
})

module.exports = router;
