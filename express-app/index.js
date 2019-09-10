const express = require('express');
const app = express();
const env = require('dotenv');
env.config();



const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  console.log("HaBoS server is running on port " + PORT);
})
