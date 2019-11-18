// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const app = express();

/* Configure CORS whitelist from .env */
if(process.env.WHITELIST.indexOf(",")!== -1) {
  var whitelist = process.env.WHITELIST.split(",");
}
else {
  var whitelist = [process.env.WHITELIST];
}

var corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors());

app.get('/', function(request, response) {
  if(!request.query.rss) {
    response.json({error: "No rss parameter specified"});
  }
  else {
    console.log(request.headers.origin);
    axios.get(request.query.rss).
    then(data => {
      parseString(data.data, {explicitArray: false}, function(err, result){
        if(err) {
         console.log(err); 
        } else {
          response.json(result);
        }
      });
    }).
    catch(error => {
      console.log(error);
    });
  }
});

// listen for requests
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
