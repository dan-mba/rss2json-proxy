// server.js
import dotenv from 'dotenv';
import compression from 'compression';
import express from 'express';
import cors, {CorsOptions} from 'cors';
import get from './routes/get';

dotenv.config();

const app = express();
app.use(compression());

// Configure CORS whitelist from .env
let whitelist: Array<string>;
if (!process.env.WHITELIST) {
  whitelist = [""];
}
else if (process.env.WHITELIST!.indexOf(',') !== -1) {
  whitelist = process.env.WHITELIST!.split(',');
}
else {
  whitelist = [process.env.WHITELIST!];
}

const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOption));

// Initialize get route
get(app);

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  const address = listener.address();
  let port = null;
  if(typeof address === "string") {
    port = address;
  } else {
    port = address?.port;
  }
  console.log(`Your app is listening on port ${port}`);
});
