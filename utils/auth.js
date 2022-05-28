const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("🚀 ~ file: auth.js ~ line 8 ~ jwt.verify ~ user", user);
      if (err) {
        return res.status(401).send({
          message: "unauthenticated",
        });
      }
      req.userId = user.userId;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
