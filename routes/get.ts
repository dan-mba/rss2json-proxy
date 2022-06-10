import axios from 'axios';
import { parseString } from 'xml2js';
import { FastifyInstance } from 'fastify';

async function get (app: FastifyInstance) {
  app.get<{
    Querystring: {
      rss: string
    }
  }>('/', (request, response) => {
    if (!request.query.rss) {
      response.send({ error: 'No rss parameter specified' });
    } else {
      axios.get(request.query.rss)
        .then((data) => {
          parseString(data.data as string, { explicitArray: false }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send(result);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          response.send({error})
        });
    }
  });
};

export default get;
