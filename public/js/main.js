const chatForm = document.getElementById("chat-form");
const socket = io();

socket.on("message", (message) => {
  outputMessage(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const chat = e.target.msg.value;
  socket.emit("chatMessage", chat);
});

//Output Message Function
const outputMessage = (message) => {
  const div = document.createElement("div");
};
