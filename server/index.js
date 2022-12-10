const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const PORT = 5000;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log( socket.client.conn.server.clientsCount + " users connected" );

  socket.on("joinRoom", (data) => {
    socket.join(data);
    console.log(`User Joined: ${data}`)
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receivedMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("A User disconnected")
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });
});

server.listen(PORT, () => {
  console.log("SERVER IS RUNNING on PORT ", PORT);
});
