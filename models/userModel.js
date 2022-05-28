const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
