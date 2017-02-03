// library imports
var express = require('express');
var bodyParser = require('body-parser');

// local imports
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

const port = process.env.PORT || 3000;

var app = express();

// MIDDLEWARE = bodyParser.json() function
// bodyParser takes [json body data] that was passed from the client and converts it to an object and attaches it to the request object (request.body)
  // allows you to send json data and then access it in route handlers via 'req.body'
app.use(bodyParser.json());
// can now send json to express app (can access it in route-callback functions)


// CONFIGURE ROUTES / ENDPOINTS

// POST /todos
  // send resouce as body -> send (json object) w/ text property to server
  //  server will create new model, then send that completed model (id + properties) back to client
// app.post(url, callback)
app.post('/todos', (req, res) => {
  // POST HANDLER callback func -> create the todo using the info passed from the user on request.body
  // create todo from request data
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  });
  // save todo to mongodb using mongoose
  todo.save().then((doc) => {
    // send the saved doc back to the user in response
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
// Can test ^ this post todo endpoint using postman

app.listen(port, () => {
  console.log(`Server is lit on port ${port}`);
});
