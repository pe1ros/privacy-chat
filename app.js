const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

const PORT = config.get("PORT" || 5000);

const connections = [];
const chats = new Map();

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const server = app.listen(PORT, () =>
      console.log(`App has been startted on PORT ${PORT} ...`)
    );
    const io = socket(server);
    io.on("connection", function (socket) {
      console.log("user connected", socket.id);
      connections.push(socket.id);

      socket.on("CHAT:JOIN", (data) => {
        console.log("CHAT:JOIN", data);
        chats.set(socket.id, data.userId);
        socket.to(data.chatId).broadcast.emit("USER:JOINED", chats);
      });
      socket.on("forceDisconnect", function () {
        socket.disconnect();
        connections.splice(connections.indexOf(socket), 1);
      });
      socket.on("disconnect", async function () {
        console.log("user disconnected", socket.id);
        connections.splice(connections.indexOf(socket), 1);
      });
    });
  } catch (e) {
    console.log("Server Error", e.message);
  }
}
start();
