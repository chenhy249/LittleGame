var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + '/public'));

server.listen(8089);

//socket部分
io.on('connection', function (socket) {
    // io.sockets.sockets.forEach(function(element) {
    //     console.log(element.Socket.id)
    // }, this);

    console.log(socket.handshake)
    console.log("-------------------------")
    //接收并处理客户端的hi事件
    socket.on('sendCommond', function (data) {
        console.log(data);
        //触发客户端事件c_hi
        socket.broadcast.emit('receiveCommond', data)
    })

    socket.on('sendRegretNotice', function (data) {
        socket.broadcast.emit('regretNotice', data);
    })

    socket.on('sendRegretCommond', function () {
        socket.broadcast.emit('regretCommond')
    })

    socket.on('sendNotice', function (data) {
        socket.broadcast.emit('Notice', data)
    })

    socket.on('sendRefreshCommond', function () {
        socket.broadcast.emit('refreshCommond');
    })

    //断开事件
    socket.on('disconnect', function (data) {
        // console.log('断开', data)
        socket.broadcast.emit('c_leave', '离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })

});