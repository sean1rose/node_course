const express = require('express');

// 1. instantiate instance of express app
var app = express();


// 2. register a HANDLER for an http get request
  // req -> strores info about request coming in (headers, body, etc)
  // res -> bunch of methods available so u can respond to the request (customize data sent back, set http status codes, etc);
app.get('/', (req, res) => {
  // send data back...
  // res.send('<h1>Hey FOO!</h1>');
  // ^ response headers 'content/type' will be 'text/html'

  // to send json back (express automatically formats to json, so response headers 'content/type' will be 'application/json')...
  res.send({
    name: 'Sean',
    likes: ['fantasy football', 'gym']
  });
});

// route
app.get('/about', (req, res) => {
  res.send('About Page');
});

// route 
app.get('/bad', (req, res) => {
  res.send({
    error: 'you hit a bad endpoint foo'
  })
})

// 3. bind app to a PORT on our machine and LISTEN for requests...
app.listen(3000);