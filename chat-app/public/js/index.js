// makes request from client to server to open up web socket and keep it open
var socket = io();

// 1st arg: event name; 2nd arg: callback func
socket.on('connect', function () {
  // connect to server
  console.log('Connected to server');

  // this is emitting an event upon connection (contrived example)...

  // client side [EVENT EMITTER] (for client creating a message)...
    // client sends 1. event + 2. data
  socket.emit('createMessage', {
    from: 'Sean',
    text: 'Hey this is Sean yo'
  });

});

socket.on('disconnect', function () {
  console.log('websocket connection to server disconnected');
});


// client side [EVENT LISTENER] for new msg created by server...
  // -> expecting: 1.event + 2. data
socket.on('newMessage', function (message) {
  // callback fired upon event, w/ data as argument
  console.log('New message - ', message);
  // will eventually show data on the screen
});