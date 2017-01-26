const express = require('express');

// 1. instantiate instance of express app
var app = express();


// 2. register a HANDLER for an http get request
  // req -> strores info about request coming in (headers, body, etc)
  // res -> bunch of methods available so u can respond to the request (customize data sent back, set http status codes, etc);
app.get('/', (req, res) => {
  // send data back...
  res.send('hey express foo!');
});


// 3. bind app to a PORT on our machine and LISTEN for requests...
app.listen(3000);