// root of node app, creates new express app, configures public directory to be static folder that express serves up, and calls app.listen to start up the server
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// /Users/seanrose/Projects/node_course/chat-app/public vs. /Users/seanrose/Projects/node_course/chat-app/server/server.js (this file) 
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);

// configure server to use socket.io
var io = socketIO(server);
// io === our websocket server

// (remember to initiate the client side socket connection)

// register a connection event listener (listen for client-connection-to-server-event and then do something via callback)...
io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit to user that joined from the admin (text: 'Welcome to the chat app')
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App!',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit from admin (text: 'new user joined')
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined',
    createdAt: new Date().getTime()
  });


  // server-side [EVENT LISTENER (for client create message event)]
    // expecting 1. event + 2. data
  socket.on('createMessage', (message) => {
    console.log('createMessage - ', message);
    // want to emit new msg event to everybody so every connected user receives it
    
    /*
    // server-side [EVENT EMITTER]
    // socket.emit -> emits event to single connection
    // io.emit -> emits to EVERY connection
    */
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    /*
    // server side [EVENT BROADCAST EMITTER]
    // broadcast to everyone except myself/this socket (only other users will receive this msg)
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    */



  });


  // listen for disconnect
  socket.on('disconnect', () => {
    console.log('client disconnected/tab closed');
  });
});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is live and in color at port ${port}`);
});