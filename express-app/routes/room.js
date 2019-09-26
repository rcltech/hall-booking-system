const express = require('express');
const router = express.Router();
const to = require('await-to-js').default;

// schema files
const Room = require('../models/room');

// error handler
const handleError = require('./errorHandler');

// routes
router.get('/', async (req, res, next) => {
  let error, rooms;
  [error, rooms] = await to(Room.find({}));
  if (error) return handleError(res, error, 'Failed to find all rooms');
  res.status(200).json({ rooms: rooms });
  return;
});

module.exports = router;
