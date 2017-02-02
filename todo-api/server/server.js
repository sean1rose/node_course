var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// configure mongoose and connect to mongodb db 
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create a model,specifying the attributes (in object form, aka a SCHEMA) we want a todo to have...
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});
// schema vs model: http://stackoverflow.com/questions/22950282/mongoose-schema-vs-model

// create a new todo instance
var newTodo = new Todo({
  text: '  cook dinner      '
});


// save to mongodb database
// newTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo');
// });

// make user model
// eventually, pw, todos
// now set up email property, req'd, trim it, set type string, set min length of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: 'a@gmail.com'
});

// newUser.save().then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// }, (e) => {
//   console.log('unable to save user');
// })