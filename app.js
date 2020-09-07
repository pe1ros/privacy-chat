const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const socket = require("socket.io");
const chats = require("./routes/chat.routes");
const User = require("./models/User");
const server = require("http").Server(app);
const io = socket(server);

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chat", require("./routes/chat.routes"));

let currentConnect = [];
const PORT = config.get("PORT" || 8000);

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    io.on("connection", function (socket) {
      console.log("user connected", socket.id);

      socket.on("CHAT:JOIN", ({ chatId, userId }) => {
        socket.join(chatId);
        chats.chats.get(chatId).get("users").set(socket.id, userId);
        const users = [...chats.chats.get(chatId).get("users").values()];
        socket.to(chatId).emit("GET:USERS:CHAT", users);
        currentConnect.length = 0;
        currentConnect.push(users);
      });
      socket.on("NEW:MESSAGE", ({ chatId, userId, text }) => {
        const objMessage = { chatId, userId, text, date: Date.now() };
        chats.chats.get(chatId).get("messages").push(objMessage);
        socket.to(chatId).broadcast.emit("CHAT:NEW:MESSAGE", objMessage);
      });
      socket.on("forceDisconnect", function () {
        socket.disconnect();
      });
      socket.on("disconnect", async function () {
        console.log("user disconnected", socket.id);
        chats.chats.forEach((value, chatId) => {
          if (value.get("users").delete(socket.id)) {
            const users = [...value.get("users").values()];
            socket.to(chatId).broadcast.emit("CHAT:LEAVE", users);
            currentConnect.length = 0;
            currentConnect.push(users);
          }
        });
      });
    });
    server.listen(PORT, () =>
      console.log(`App has been startted on PORT ${PORT} ...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
  }
}
start();

module.exports.currentConnect = currentConnect;
