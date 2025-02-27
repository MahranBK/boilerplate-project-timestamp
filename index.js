// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// request for date & timestamp
app.get("/api/:date?", (req, res) => {
  const data = req.params.date;

  if(!data){
    const currentDate = new Date();
    res.json({unix: currentDate.getTime(), utc: currentDate.toUTCString()});
  }
  else{
    let date;
    // checking if data is a pure number string
    if (/^\d+$/.test(data)) {
      date = new Date(parseInt(data));
    } else {
      date = new Date(data);
    }

    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  }
  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
