const body = document.querySelector("body");
const loginBox = document.getElementById("jsLoginBox");
const loginForm = loginBox.querySelector("form");
const gameContainer = document.getElementById("jsGameContainer");

const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";
const NICKNAME = "nickname";
const nickname = localStorage.getItem(NICKNAME);

const login = nickname => {
  const socket = io("/");
  socket.emit("loggedIn", { nickname });
};

const handleSubmitNickname = event => {
  event.preventDefault();
  const input = loginBox.querySelector("input");
  const nickname = input.value;
  localStorage.setItem(NICKNAME, nickname);
  input.value = "";
  login(nickname);
  body.className = LOGGED_IN;
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  login(nickname);
}

if (loginBox) {
  loginForm.addEventListener("submit", handleSubmitNickname);
}
