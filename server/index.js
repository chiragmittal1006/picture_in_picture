import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  socket.on("join-room", roomId => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);

    socket.on("offer", data =>
      socket.to(roomId).emit("offer", data)
    );

    socket.on("answer", data =>
      socket.to(roomId).emit("answer", data)
    );

    socket.on("ice-candidate", candidate =>
      socket.to(roomId).emit("ice-candidate", candidate)
    );
  });
});

server.listen(5001, () =>
  console.log("Signaling server running on 5001")
);
