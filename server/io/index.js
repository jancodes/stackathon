'use strict';
var socketio = require('socket.io');
var io = null;
var data = {}

module.exports = function(server) {

    if (io) return io;

    io = socketio(server);

    // console.log(io)

    var onlineplayers = []
    io.on('connection', function(socket) {

        // Now have access to socket, wowzers!
        console.log('A new client has connected!');
        console.log(socket.id);

        var roomName;
        socket.on('joinRoom', function (room) {
          roomName = room;
          socket.join(roomName);
          // if (!data[roomName]) {
          //   data[roomName] = [];
          // } else {
          //   socket.emit('board', data[roomName]);
          // }
          console.log('here')
          socket.broadcast.to(roomName).emit('justTesting', 'something')
        });

        socket.on('completeMove', function(){
          socket.broadcast.to(roomName).emit('newBoardData', data[roomName])
        })

        socket.on('disconnect', function() {
            console.log('A client has disconnected :(');
            console.log(socket.id);
            socket.broadcast.to(roomName).emit('playerDC', 'some data about player')
        });

    });

    return io;

};
