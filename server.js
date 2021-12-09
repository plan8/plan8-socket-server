const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// server-side
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('msg', e => {
    io.emit('newMessage', e);
    

  })

  socket.on('getMessage', e => {
    io.emit('newMessage', Math.random());
    

  })
  console.log('a user connected');
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});