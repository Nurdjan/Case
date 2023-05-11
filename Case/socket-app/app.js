const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const roomName = "booty-beep-boop";
let userCount = 0;

// Serve static files from the React app
app.use(express.static(__dirname + "/../client/build"));

// Handle Socket.IO connections
io.on("connection", (socket) => {
  if (true) {
    userCount++;

    socket.join(roomName, () => {
      console.log(`${socket.id} joined ${roomName}`);
      socket.emit("message", "Welcome to the chat!");
    });

    socket.on("message", (msg) => {
      io.to(roomName).emit("message", msg);
    });

    // Kullanıcı koptuğunda bilgilendir
    socket.on("disconnect", () => {
      userCount--;
    });

    // Kullanıcı odaya girdiğinde bilgilendir
    socket.on("joinRoom", (username) => {
      console.log(`${username} joined the room`);
    });

    // Bir kullanıcı yazıyor olunca, oda içindekilerin hepsine typing event'i gönder
    socket.on("typing", () => {
      socket.to(roomName).emit("typing", "data bu");
    });

    // Bir kullanıcı yazmayı durdurduğunda, typing event tersine çevirmek için gönder
    socket.on("stopTyping", () => {
      socket.broadcast.emit("stopTyping");
    });
  } else {
    console.log("room is full");
    socket.disconnect();
  }
});

// Start the http
const port = process.env.PORT || 3001;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
