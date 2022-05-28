const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { findById } = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    } else {
      const newUser = new User({
        email,
        password,
      });
      newUser.password = await bcrypt.hash(password, 10);
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    } else {
      const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
