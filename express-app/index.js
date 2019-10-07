const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
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

// routes
const rootRoutes = require('./routes/root');
const roomRoutes = require('./routes/room');
const bookingRoutes = require('./routes/booking');

app.use('/api/', rootRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);

// react
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, err => {
  console.log('Owl server is running on port ' + PORT);
});

module.exports = app;
