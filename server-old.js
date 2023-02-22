const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const formatMessages = require("./utils/messages");
const {
  getCurrentUser,
  joinUsers,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const io = require("socket.io")(server);
const botName = "ChatBot";

// //Detect client connection
// io.on("connection", (socket) => {
//   //Join room
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = joinUsers(socket.id, username, room);
//     socket.join(user.room);
//     //Send message to connected client
//     socket.emit("message", formatMessages(botName, "Welcome to ChatCord!"));
//     //send message to all connected clients except the this client
//     socket.broadcast
//       .to(user.room)
//       .emit("message", formatMessages(botName, `${user.username} has joined`));
//   });

//   //catch the emitted chat message from client
//   socket.on("chatMessage", (message) => {
//     const user = getCurrentUser(socket.id);
//     // console.log(user);
//     // io.to(user.room).emit("message", formatMessages(user.username, message));
//   });
//   //send message on client disconnection
//   socket.on("disconnect", () => {
//     const user = userLeave(socket.id);
//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessages(botName, `${user.username} has disconnected`)
//       );
//     }
//   });
// });

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
