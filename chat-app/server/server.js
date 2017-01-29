// root of node app, creates new express app, configures public directory to be static folder that express serves up, and calls app.listen to start up the server
const express = require('express');
const path = require('path');

// /Users/seanrose/Projects/node_course/chat-app/public vs. /Users/seanrose/Projects/node_course/chat-app/server/server.js (this file) 
const publicPath = path.join(__dirname, '../public');

var app = express();

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is live and in color at port ${port}`);
});