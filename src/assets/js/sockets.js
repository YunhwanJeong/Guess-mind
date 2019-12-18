import { handleNewUser } from "./notification";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

export const initSockets = aSocket => {
  updateSocket(aSocket);
  const { events } = window;
  aSocket.on(events.newUser, handleNewUser);
};
