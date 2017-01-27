const express = require('express');

// import handlebars
const hbs = require('hbs');

// 1. instantiate instance of express app
var app = express();

var fs = require('fs');


// 7. set up hbs partials - takes directory that contains all our partial files
  // to render a footer partial in hbs file: {{> footer}}
hbs.registerPartials(__dirname + '/views/partials')


// 5. using dynamic templating w/ handlebars
  // app.set lets us set express configurations using k-v pairs
  // need to create directory in project for views (views/about.hbs)
app.set('view engine', 'hbs');

// (middleware is executed in the order of the calls of your app.use)
// 4. MIDDLEWARE (app.use to set up/register middleware) to set up static directory files based on public folder in root directory...
  // express.static takes absolute path of the file we're serving up
    // __dirname uses root directory of this project (so concatenate w/ public directory)
    // this should serve up help.html in public folder to /help.html
app.use(express.static(__dirname + '/public'));
// Middleware - can make changes to request/response, header objects, can use to make sure someone is logged in, to respond to a request

// create a logger that logs all requests that come in to server and store timestamp of requests
app.use((req, res, next) => {
  var now = new Date().toString();
  // time, type of req, to what url
  var log = `${now}: ${req.method} ${req.url}`;
  
  // logger to terminal
  console.log(log);
  // middleware to log to fs
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  
  // next is used to tell express when ur middleware func is done, so can chain middlewares (serve directory, log to the screen, help w/ app performance, make a db request to make sure user is authenticated)
  next();
});

// this middleware would override all others -stops everything else from executing
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// 8. handlebar helper -> takes in 2 args (name of helper, func to run)
  // use it in the hbs file, not here in the server
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// use space ' ' in the template to pass in an argument  (see home for calling screamIt)
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


// 2. register a HANDLER for an http get request
  // req -> strores info about request coming in (headers, body, etc)
  // res -> bunch of methods available so u can respond to the request (customize data sent back, set http status codes, etc);
app.get('/', (req, res) => {
  // send data back...
  // res.send('<h1>Hey FOO!</h1>');
  // ^ response headers 'content/type' will be 'text/html'

  // 2. old example sending json back...
  // to send json back (express automatically formats to json, so response headers 'content/type' will be 'application/json')...
  // res.send({
  //   name: 'Sean',
  //   likes: ['fantasy football', 'gym']
  // });

  // 6. using handlebars to render home.hbs
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'This is the home page! WELCOME! We hope you enjoy your stay!'
  })

});

// 5. About route
app.get('/about', (req, res) => {
  // res.send('About Page');
  // ^ static about page string

  // ****INJECTING HTML DATA EXAMPLE****
  // res.render lets u render templates u have set up w/ ur view engine
    // render about.hbs static file
    // 6. ***can inject dynamic data inside of template using hbs -> need to pass in an obj as 2nd argument to res.render
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// route 
app.get('/bad', (req, res) => {
  res.send({
    errorMsg: 'you hit a bad endpoint foo'
  });
});

var portNumber = 3000;

// 3. bind app to a PORT on our machine and LISTEN for requests...
app.listen(portNumber, () => {
  console.log(`Server is up at port ${portNumber}`);
});