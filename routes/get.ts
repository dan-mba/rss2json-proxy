import { fetch } from 'undici';
import { parseStringPromise } from 'xml2js';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

function get (fastify: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error) => void) {
  fastify.get<{
    Querystring: {
      rss: string
    }
  }>('/', async function (request, reply) {
    if (!request.query.rss) {
      reply.type('application/json').code(400);
      return { error: 'No rss parameter specified' };
    } else {
      try {
        const res = await fetch(request.query.rss);
        const data = await res.text();
        const rss = await parseStringPromise(data, { explicitArray: false });

        reply.type('application/json').code(200);
        return rss;
      } catch (error) {
          console.log(error);
          reply.type('application/json').code(400);
          return {error};
      }
    }
  });
  done();
}

export default get;
