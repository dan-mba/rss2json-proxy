import { fetch } from 'undici';
import { parseStringPromise } from 'xml2js';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

type JSONResponse = {data: string};

function get (fastify: FastifyInstance, opts: FastifyPluginOptions, done: Function) {
  fastify.get<{
    Querystring: {
      rss: string
    }
  }>('/', async function (request) {
    if (!request.query.rss) {
      return { error: 'No rss parameter specified' };
    } else {
      try {
        const res = await fetch(request.query.rss);
        const data = await res.text();
        const rss = await parseStringPromise(data, { explicitArray: false })
        return rss;
      } catch (error) {
          console.log(error);
          return {error};
      }
    }
  });
  done();
};

export default get;
