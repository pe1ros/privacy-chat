const { Router } = require("express");
const router = Router();
const User = require("../models/User");

// /chat+
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      return res.status(200).json({ users });
    }

    res.status(500).json({ message: "Users not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something wrong... try it again" });
  }
});
router.get("/global", async (req, res) => {});

module.exports = router;
