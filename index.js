#!/usr/bin/env node

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const { argv: [, , port = 9000] } = process
server.listen(port);
console.log('SERVER: listening on port ' + port)

io.on('connection', function (socket) {
    console.log('SERVER: new user connected')
});
