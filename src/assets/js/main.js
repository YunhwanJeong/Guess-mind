const body = document.querySelector("body");
const loginBox = document.getElementById("jsLoginBox");
const loginForm = loginBox.querySelector("form");
const loginInput = loginBox.querySelector("input");
const gameContainer = document.getElementById("jsGameContainer");

const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";
const NICKNAME = "nickname";
const nickname = localStorage.getItem(NICKNAME);

const handleSubmitNickname = event => {
  event.preventDefault();
  const nickname = loginInput.value;
  localStorage.setItem(NICKNAME, nickname);
  loginInput.value = "";
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
}

if (loginBox) {
  loginForm.addEventListener("submit", handleSubmitNickname);
}
