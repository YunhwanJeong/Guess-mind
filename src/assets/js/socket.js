import { handleNewUser, handleDisconnect } from "./notification";
import { handleReceiveMsg } from "./chat";

let socket = null;

export const getSocket = () => socket;

const updateSocket = aSocket => {
  socket = aSocket;
};

export const initSockets = aSocket => {
  updateSocket(aSocket);
  const { events } = window;
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnect);
  aSocket.on(events.receiveMsg, handleReceiveMsg);
};
