const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server);

//Detect client connection
io.on("connection", (socket) => {
  //Send message to connected client
  socket.emit("message", "Welcome to ChatCord");
  //send message to all connected clients except the this client
  socket.broadcast.emit("message", "A User Joined");
  //send message on client disconnection
  socket.on("disconnect", () => {
    io.emit("message", "A user has disconnected");
  });
  //catch the emitted chat message from client
  socket.on("chatMessage", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
