const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const currentConnect = require("../app");

const chats = new Map();
// /chat+
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (currentConnect && users) {
      return res
        .status(200)
        .json({ currentConnect: currentConnect.currentConnect, users });
    }

    res.status(500).json({ message: "Users not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong... try it again" });
  }
});

router.post("/chat", async (req, res) => {
  const { userId, chatId } = req.body;
  if (!chats.has(chatId)) {
    chats.set(
      chatId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.send();
});

router.get("/chat", async (req, res) => {
  const { id: chatId } = req.params;
  const objUsers = chats.has(chatId)
    ? {
        users: [...chats.get(chatId).get("users").values()],
        messages: [...chats.get(chatId).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.json(objUsers);
});

module.exports = router;
module.exports.chats = chats;
