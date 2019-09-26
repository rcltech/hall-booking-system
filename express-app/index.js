const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

// connect to mongoose
const mongo_uri = process.env.MONGO_URI;
const database = process.env.DATABASE;
mongoose
  .connect(mongo_uri, {
    dbName: database,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('Mongoose connection successful');
    },
    err => {
      console.log('Mongoose connection error');
      console.error(err);
    }
  );

// testing branch - periodic updates to room on mongodb
const updateRooms = require('./updateRooms');
updateRooms();

// routes
const rootRoutes = require('./routes/root');
const roomRoutes = require('./routes/room');
const bookingRoutes = require('./routes/booking');

// configure cors policy for local dev
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  });
  next();
});

app.use('/', rootRoutes);
app.use('/room', roomRoutes);
app.use('/booking', bookingRoutes);

const PORT = process.env.PORT;
app.listen(PORT, err => {
  console.log('Server is running on port ' + PORT);
});

module.exports = app;
