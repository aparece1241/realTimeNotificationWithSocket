const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");

var port = process.env.PORT || 8080;

const io = socket(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"]
  },
});

let udpSocket = 0

const cors = require("cors");

app.use(cors());

io.on("connection", (client) => {
  console.log("a client is connected!");
  
  udpSocket = client
  
  client.on("notification", function (message) {
    io.emit("notification", message);
  });
});

server.listen(port, (serve) => console.log("listening on port 5000"));



//udp server on 41181
var dgram = require("dgram");
var server1 = dgram.createSocket("udp4");
server1.on("message", function (msg, rinfo) {
  console.log("msg: " + msg);
  if (udpSocket != 0){
    udpSocket.emit('field', ""+msg);
  }
});
server1.on("listening", function () {
  var address = server1.address();
  console.log("udp server1 listening " + address.address + ":" + address.port);
});
server1.bind(41181);
