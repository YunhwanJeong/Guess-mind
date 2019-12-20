import { getSocket } from "./socket";

const messages = document.getElementById("jsMessages");
const msgForm = document.getElementById("jsMsgForm");

const printMsg = (message, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="author ${nickname ? "others" : "self"}">${
    nickname ? nickname : "You"
  }:</span> ${message}`;
  messages.appendChild(li);
};

const handleSubmitMsg = event => {
  event.preventDefault();
  const input = msgForm.querySelector("input");
  const { value } = input;
  printMsg(value);
  input.value = "";
  getSocket().emit(window.events.sendMsg, { message: value });
};

export const handleReceiveMsg = ({ message, nickname }) => {
  printMsg(message, nickname);
};

if (msgForm) {
  msgForm.addEventListener("submit", handleSubmitMsg);
}
