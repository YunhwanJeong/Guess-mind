import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let painter = null;

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const updatePlayer = () => superBroadcast(events.playerUpdate, { sockets });
  const choosePainter = () =>
    sockets[Math.floor(Math.random() * sockets.length)];
  const startGame = () => {
    if (inProgress === false) {
      inProgress = true;
    }
    painter = choosePainter();
    word = chooseWord();
    setTimeout(() => {
      superBroadcast(events.gameStarted);
      io.to(painter.id).emit(events.leaderChosen, { word });
    }, 2000);
  };
  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    updatePlayer();
    if (sockets.length === 2) {
      startGame();
    }
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    if (sockets.length === 1) {
      endGame();
    } else if (painter) {
      if (socket.id === painter.id) {
        endGame();
      }
    }
    updatePlayer();
  });
  socket.on(events.sendMsg, ({ message }) =>
    broadcast(events.receiveMsg, { message, nickname: socket.nickname })
  );
  socket.on(events.beginPath, ({ x, y }) =>
    broadcast(events.beganPath, { x, y })
  );
  socket.on(events.strokePath, ({ x, y, color }) =>
    broadcast(events.strokedPath, { x, y, color })
  );
  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
};

export default socketController;
