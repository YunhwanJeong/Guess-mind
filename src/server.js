import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => {
  res.render("home");
});

const handleListening = () =>
  console.log(`Server is running at http://localhost:${PORT}✅`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => {
  socket.on("sendMessage", ({ message }) => {
    socket.broadcast.emit("spreadMessage", {
      message,
      nickname: socket.nickname || "Anonymous"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});