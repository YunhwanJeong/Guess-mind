import { getSocket } from "./socket";

const messages = document.getElementById("jsMessages");
const msgForm = document.getElementById("jsMsgForm");

const printMsg = (message, nickname) => {
  const li = document.createElement("li");
  if (nickname === "Bot") {
    li.innerHTML = `<span class="author bot">${nickname}:</span> ${message}`;
  } else {
    li.innerHTML = `<span class="author ${nickname ? "others" : "self"}">${
      nickname ? nickname : "You"
    }:</span> ${message}`;
  }
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

export const disableMsg = () => {
  msgForm.style.display = "none";
};

export const enableMsg = () => {
  msgForm.style.display = "flex";
};
