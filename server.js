const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

//Import Utils
const {
  getCurrentUser,
  joinUsers,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
const formatMessages = require("./utils/messages");

const botName = "ChatBot";

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  //On join room
  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUsers(socket.id, username, room);
    socket.join(user.room);

    //sent notification to this client
    socket.emit("message", formatMessages(botName, "Welcome To ChatCord"));
    //sent notification to other clients except this one
    socket.broadcast
      .to(user.room)
      .emit("message", formatMessages(botName, `${user.username} has Joined`));

    //send list of users available in the room while connecting
    io.to(user.room).emit("user-list", getRoomUsers(user.room));
  });
  //get chat message from client and emit to self and others
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);
    console.log(user);
    io.to(user.room).emit("message", formatMessages(user.username, message));
  });
  //send noti to other clietns if this clietn disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user[0].room).emit(
        "message",
        formatMessages(botName, `${user[0].username} has disconnected`)
      );
      //send list of users available in the room while dis-connecting
      io.to(user[0].room).emit("user-list", getRoomUsers(user[0].room));
    }
  });
});

server.listen(PORT, () => console.log(`The server is running at ${PORT}`));
