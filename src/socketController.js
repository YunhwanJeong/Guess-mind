const socketController = socket => {
  socket.on("loggedIn", ({ nickname }) => {
    console.log(nickname);
  });
};

export default socketController;
