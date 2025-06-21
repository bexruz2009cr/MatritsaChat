const { log } = require('console');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Statik fayllarni ochish
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Foydalanuvchi ulandi:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(msg);
  });

  socket.on('disconnect', () => {
    console.log('Foydalanuvchi chiqdi:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
});
