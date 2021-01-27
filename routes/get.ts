import axios from 'axios';
import { parseString } from 'xml2js';
import {Express} from 'express';

function get(app: Express) {
  app.get('/', (request, response) => {
    if (!request.query.rss) {
      response.json({ error: 'No rss parameter specified' });
    } else {
      axios.get(request.query.rss as string)
        .then((data) => {
          parseString(data.data, { explicitArray: false }, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.json(result);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
};

export default get;
