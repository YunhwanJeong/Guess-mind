import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableMsg, enableMsg } from "./chat";

const scoreBoard = document.getElementById("jsScoreBoard");
const notifs = document.getElementById("jsNotifs");
const countdown = document.getElementById("jsCountdown");

let totalSecond = null;
let interval = null;

const updateScoreboard = players => {
  scoreBoard.innerText = "";
  players.forEach(player => {
    const playerScore = document.createElement("span");
    playerScore.innerText = `${player.nickname}: ${player.points}`;
    scoreBoard.appendChild(playerScore);
  });
};

export const handlePlayerUpdate = ({ sockets }) => updateScoreboard(sockets);

const updateNotifs = (text = null) => {
  if (text !== null) {
    notifs.innerText = "";
    notifs.innerText = text;
  } else {
    notifs.innerText = "";
  }
};

export const handleGameStart = () => {
  updateNotifs("Game will start soon");
};

export const handleGameStarted = ({ paintingTime }) => {
  updateNotifs();
  totalSecond = paintingTime;
  countdown.innerText = `${totalSecond} seconds left`;
  interval = setInterval(showRemainingTime, 1000);
};

const showRemainingTime = () => {
  totalSecond = totalSecond - 1;
  countdown.innerText = `${totalSecond} seconds left`;
};

export const handlePainterChosen = ({ word }) => {
  enableCanvas();
  showControls();
  notifs.innerText = `You are the painter. The word is: ${word}`;
  disableMsg();
};

export const handleGameEnded = () => {
  updateNotifs("Game Ended");
  disableCanvas();
  hideControls();
  resetCanvas();
  enableMsg();
  clearCountdown();
};

const clearCountdown = () => {
  clearInterval(interval);
  countdown.innerText = "";
};
