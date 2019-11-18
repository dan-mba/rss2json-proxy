const axios = require('axios');
const { parseString } = require('xml2js');

exports.init = (app) => {
  app.get('/', (request, response) => {
    if (!request.query.rss) {
      response.json({ error: 'No rss parameter specified' });
    } else {
      axios.get(request.query.rss)
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
