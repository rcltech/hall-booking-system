const express = require('express');
const app = express();
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

// connect to mongoose
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => {
    console.log("Mongoose connection successful");
  },
  err => {
    console.log("Mongoose connection error");
    console.error(err);
  }
);


const rootRoutes = require('./routes/root');

app.use("/", rootRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  console.log("HaBoS server is running on port " + PORT);
})

module.exports = app;
