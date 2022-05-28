const {
  registerUser,
  loginUser,
  authenticateUser,
} = require("../controllers/authControllers");
const { auth } = require("../utils/auth");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", auth, authenticateUser);

module.exports = router;
