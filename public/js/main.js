const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");

const url = new URL(window.location);
const searchParams = url.searchParams;
const username = searchParams.get("username");
const room = searchParams.get("room");

const socket = io();
socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let chat = e.target.msg.value;
  socket.emit("chatMessage", chat);
  e.target.msg.value = "";
  e.target.msg.focus;
});

//Update room name for client
roomName.textContent = room;

//get all users list from server
socket.on("user-list", (users) => {
  users.forEach((user) => {
    document.getElementById("users").innerHTML += `<li>${user.username}</li>`;
  });
});

//Output Message Function
const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>
    `;
  chatMessages.appendChild(div);
};
