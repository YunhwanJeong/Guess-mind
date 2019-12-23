import { handleNewUser, handleDisconnect } from "./notification";
import { handleReceiveMsg } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import { handlePlayerUpdate } from "./players";

let socket = null;

export const getSocket = () => socket;

export const initSockets = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnect);
  socket.on(events.receiveMsg, handleReceiveMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
};
