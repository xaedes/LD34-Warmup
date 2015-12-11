var io = require('socket.io')();
io.on('connection', function(socket){
    console.log("connection");
});

io.on('connect', function(socket){
    console.log("connect");
});
io.listen(3000);