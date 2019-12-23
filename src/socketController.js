import events from "./events";

let sockets = [];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const updatePlayer = () => superBroadcast(events.playerUpdate, { sockets });

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname: nickname });
    broadcast(events.newUser, { nickname });
    updatePlayer();
  });
  socket.on(events.disconnect, () => {
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
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
