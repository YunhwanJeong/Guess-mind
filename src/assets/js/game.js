import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";
import { disableMsg, enableMsg } from "./chat";

const scoreBoard = document.getElementById("jsScoreBoard");
const gameContext = document.getElementById("jsGameContext");

const updateScoreboard = players => {
  scoreBoard.innerText = "";
  players.forEach(player => {
    const playerScore = document.createElement("span");
    playerScore.innerText = `${player.nickname}: ${player.points}`;
    scoreBoard.appendChild(playerScore);
  });
};

export const handlePlayerUpdate = ({ sockets }) => updateScoreboard(sockets);

const updateText = (text = null) => {
  if (text !== null) {
    gameContext.innerText = "";
    gameContext.innerText = text;
  } else {
    gameContext.innerText = "";
  }
};

export const handleGameStart = () => {
  updateText("Game will start soon");
};

export const handleGameStarted = () => {
  updateText();
};

export const handlePainterChosen = ({ word }) => {
  enableCanvas();
  showControls();
  gameContext.innerText = `You are the painter. The word is: ${word}`;
  disableMsg();
};

export const handleGameEnded = () => {
  updateText("Game Ended");
  disableCanvas();
  hideControls();
  resetCanvas();
  enableMsg();
};
