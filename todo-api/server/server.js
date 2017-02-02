var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// configure mongoose and connect to mongodb db 
mongoose.connect('mongodb://localhost:27017/TodoApp');

// create a model,specifying the attributes we want a todo to have...
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// create a new todo instance
var newTodo = new Todo({
  text: 'Cook dinner',
});

// save to mongodb database
newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});


var secondTodo = new Todo({
  text: 'plan wedding',
  completed: false,
  completedAt: new Date().getTime()
});


secondTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('Unable to save todo');
});