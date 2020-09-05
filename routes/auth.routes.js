const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const router = Router();

//api/auth+
router.post(
  "/registration",
  [check("email", "email is wrong").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Your data is wrong" });
      }
      const { name, email, password } = req.body;

      const newUser = await User.findOne({ email });
      if (newUser) {
        return res
          .status(400)
          .json({ message: "User is exist ! take other data" });
      }
      //const hashedPassword = bcrypt.hash (password, 123);

      const user = new User({ name, email, password });
      await user.save();
      res.status(201).json({ message: "User create" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something wrong... try it again" });
    }
  }
);
router.post(
  "/login",
  [
    check("email", "Enter correct email"),
    check("password", "Enter right password"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Your data is wrong try again",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(500)
          .json({ message: "User not found or enter right email" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.status(500).json({ message: "password is wrong" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "something wrong... try it again" });
    }
  }
);

module.exports = router;
