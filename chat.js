// npm init
// npm i socket.io
// npm i express

const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(8000);
const io = socketio(expressServer);


io.on('connection',(socket)=>{
    console.log(socket.id,"has connected");
    //in ws we use "send" method, and it socket.io we use the "emit" method
    socket.emit('messageFromServer',{data:"Welcome to the socket server!"});
    socket.on('messageFromClient',(dataFromClient)=>{
        console.log("Data: ",dataFromClient.data);
    });
    socket.on('newMessageToServer',(dataFromClient)=>{
        console.log("Data: ",dataFromClient.text);
        io.emit('newMessageToClient', {
            text: dataFromClient.text
        });
    });
});