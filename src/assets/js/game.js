import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";

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

export const handleGameStarted = () => {
  updateText();
  disableCanvas();
  hideControls();
};

export const handleLeaderChosen = ({ word }) => {
  enableCanvas();
  showControls();
  gameContext.innerText = `You are the painter. The word is: ${word}`;
};

export const handleGameEnded = () => {
  updateText("Game Ended");
  disableCanvas();
  hideControls();
  resetCanvas();
};
