import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => {
  res.render("home", { events: JSON.stringify(events) });
});

const handleListening = () =>
  console.log(`Server is running at http://localhost:${PORT}✅`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => {
  socketController(socket, io);
});
