import events from "./events";

const socketController = socket => {
  socket.on(events.setNickname, ({ nickname }) => {
    console.log(nickname);
  });
};

export default socketController;
