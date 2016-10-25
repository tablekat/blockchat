
import * as express from 'express';
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
import { Message } from './Message';
import { MessageSystem } from './MessageSystem';

app.use('/', express.static('www'));

var messageSystem = new MessageSystem();

io.on('connection', function(socket){
  console.log('a user connected');

  var onUpdate = () => {
    socket.emit('update-messages', {
      msgs: messageSystem.messages,
    });
  };

  messageSystem.on('update', onUpdate);

  socket.on('disconnect', function(){
    messageSystem.removeListener('update', onUpdate);
    console.log('user disconnected');
  });

  socket.on('new-message', function({ msg }){
    msg = new Message(msg);
    socket.broadcast.emit('new-message', { msg });
    messageSystem.add(msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
