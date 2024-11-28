const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const isInvitedUser = socket.handshake.query.invite === 'true';

  if (isInvitedUser) {
    console.log(`Invited user: ${socket.id}`);
  } else {
    console.log(`Non-invited user: ${socket.id}`);
  }

  socket.on("edit", (content) => {
    console.log(`Content received from ${socket.id}:`, content);
    socket.broadcast.emit("updateContent", content);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
