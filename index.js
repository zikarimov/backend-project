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


function currentTime (req, res, next) {
  var paramDate = req.params.date;

  if (!paramDate) req.date = new Date();
  else req.date = isNaN(paramDate) ? new Date(paramDate) : new Date(Number(paramDate));
  next();
}

app.get('/api/:date?', currentTime, function(req, res) {

  if (isNaN(req.date.getTime())) return res.send({ error: "Invalid Date" });

  res.send({
      unix: req.date.getTime(),
      utc: req.date.toUTCString()
  });
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
