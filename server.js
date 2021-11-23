const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");

const port = process.env.PORT || 5000;

const io = socket(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"]
  },
});
const cors = require("cors");

app.use(cors());

io.on("connection", (client) => {
  console.log("a client is connected!");

  client.on("notification", function (message) {
    io.emit("notification", message);
  });
});

server.listen(port, (serve) => console.log("listening on port 5000"));
