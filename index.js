const express = require("express");
const { connectDb } = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
connectDb();
app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRouts");

app.use("/api/auth", authRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port 5000");
});
