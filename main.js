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
    io.emit('chat message', msg); // barcha foydalanuvchiga yuboriladi
    console.log(msg);
    
  });

  socket.on('disconnect', () => {
    console.log('Foydalanuvchi chiqdi:',  socket.id);
    console.log('Axmoq');
    
  });
});

server.listen(3000, () => {
  console.log('Server 3000-portda ishlayapti');
  console.log('Salom');
  
});
