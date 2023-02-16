const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const chat = e.target.msg.value;
  socket.emit("chatMessage", chat);
});

//Output Message Function
const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
    ${message}
    </p>
    `;
  chatMessages.appendChild(div);
};
