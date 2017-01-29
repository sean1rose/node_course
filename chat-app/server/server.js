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

  // listen for disconnect
  socket.on('disconnect', () => {
    console.log('client disconnected/tab closed');
  });
});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is live and in color at port ${port}`);
});