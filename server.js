const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");

const port = process.env.PORT || 5000;

const io = socket(server, {
  cors: "*",
});
const cors = require("cors");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Add this
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, OPTIONS"
    );
    res.header("Access-Control-Max-Age", 120);
    return res.status(200).json({});
  }

  next();
});

io.on("connection", (client) => {
  console.log("a client is connected!");

  client.on("notification", function (message) {
    io.emit("notification", message);
  });
});

server.listen(port, (serve) => console.log("listening on port 5000"));
