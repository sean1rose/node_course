// makes request from client to server to open up web socket and keep it open
var socket = io();

// 1st arg: event name; 2nd arg: callback func
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('websocket connection to server disconnected');
});