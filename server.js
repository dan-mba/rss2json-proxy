// server.js
require('dotenv').config();

// init project
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const get = require('./routes/get');

const app = express();
app.use(compression());

/* Configure CORS whitelist from .env */
let whitelist = [process.env.WHITELIST];
if (process.env.WHITELIST.indexOf(',') !== -1) {
  whitelist = process.env.WHITELIST.split(',');
}

const corsOption = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOption));

get.init(app);

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
