const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];

    try {

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id);

      next();

    } catch (error) {

      res.status(401);

      throw new Error("Unauthorized");
    }

  } else {

    res.status(401);

    throw new Error("No Token");
  }
};

module.exports = { protect };