const express = require('express');
const app = express();
const env = require('dotenv');
env.config();

const rootRoutes = require('./routes/root');

app.use("/", rootRoutes);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  console.log("HaBoS server is running on port " + PORT);
})

module.exports = app;