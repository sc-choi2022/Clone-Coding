import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.render("/"));
const handleListen = () => console.log(`Listening on ws://localhost:3000`);

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
  socket.on("enter_room", (message) => {
    console.log(message);
  });
});
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to Browser ✔");
//   socket.on("close", () => console.log("Disconnected from Browser ❌"));
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message);
//     switch(parsed.type){
//       case "new_message":
//         sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${parsed.payload}`));
//       case "nickname":
//         socket["nickname"] = parsed.payload;
//     }
//   });
// });
httpServer.listen(3000, handleListen);