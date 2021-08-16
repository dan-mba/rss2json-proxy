// server.js
import dotenv from 'dotenv';
import fastifyServer from 'fastify';
import compress from 'fastify-compress';
import cors, {FastifyCorsOptions} from 'fastify-cors';
import get from './routes/get';

dotenv.config();

const fastify = fastifyServer();
fastify.register(compress);

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

const corsOption: FastifyCorsOptions = {
  origin: whitelist,
};

fastify.register(cors, corsOption);

// Initialize get route
fastify.register(get);

// listen for requests
fastify.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your fastify is listening on port ${address}`);
});
