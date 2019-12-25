import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let painter = null;
let timeout = null;

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const updatePlayer = () => superBroadcast(events.playerUpdate, { sockets });
  const updateScore = id => {
    sockets = sockets.map(aSocket => {
      if (aSocket.id === id) {
        aSocket.points += 10;
      }
      return aSocket;
    });
  };
  const resetScore = () =>
    sockets.map(aSocket => {
      aSocket.points = 0;
      return aSocket;
    });
  const choosePainter = () =>
    sockets[Math.floor(Math.random() * sockets.length)];
  const startGame = () => {
    const paintingTime = 30000;
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        painter = choosePainter();
        word = chooseWord();
        superBroadcast(events.gameStart);
        setTimeout(() => {
          superBroadcast(events.gameStarted, {
            paintingTime: paintingTime / 1000
          });
          io.to(painter.id).emit(events.painterChosen, { word });
          timeout = setTimeout(endGame, paintingTime);
        }, 5000);
      }
    }
  };
  const endGame = () => {
    if (inProgress === true) {
      inProgress = false;
      superBroadcast(events.gameEnded);
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      setTimeout(startGame, 3000);
    }
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    resetScore();
    updatePlayer();
    startGame();
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    if (sockets.length === 1) {
      resetScore();
      endGame();
    } else if (painter) {
      if (socket.id === painter.id) {
        endGame();
      }
    }
    updatePlayer();
  });
  socket.on(events.sendMsg, ({ message }) => {
    broadcast(events.receiveMsg, { message, nickname: socket.nickname });
    if (message === word) {
      superBroadcast(events.receiveMsg, {
        message: `Winner is ${socket.nickname}! The answer was ${word}`,
        nickname: "Bot"
      });
      updateScore(socket.id);
      updatePlayer();
      endGame();
    }
  });
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  socket.on(events.strokePath, ({ x, y, color }) =>
    broadcast(events.strokedPath, { x, y, color })
  );
  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
};

export default socketController;
