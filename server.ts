// server.js
import dotenv from 'dotenv';
import fastifyServer from 'fastify';
import compress from '@fastify/compress';
import cors from '@fastify/cors';
import get from './routes/get';

dotenv.config();

const fastify = fastifyServer({logger: true});
fastify.register(compress);

// Configure CORS whitelist from .env
let whitelist: Array<string>;
if (!process.env.WHITELIST) {
  whitelist = [""];
}
else if (process.env.WHITELIST.indexOf(',') !== -1) {
  whitelist = process.env.WHITELIST.split(',');
}
else {
  whitelist = [process.env.WHITELIST];
}

const corsOption = {
  origin: whitelist,
};

fastify.register(cors, corsOption);

// Initialize get route
fastify.register(get);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// listen for requests
fastify.listen({port: port}, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
