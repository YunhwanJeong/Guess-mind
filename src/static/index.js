// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
const socket = io("/");

socket.on("spreadMessage", data => {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
});

const sendMessage = message => {
  socket.emit("sendMessage", { message });
  console.log(`You: ${message}`);
};

const setNickname = nickname => {
  socket.emit("setNickname", { nickname });
};
