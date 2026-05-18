const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    console.log(req.body);

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message: "All fields required"
      });
    }

    const userExists =
    await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user =
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d"
      }
    );

    return res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d"
      }
    );

    return res.json({
      success: true,
      token,
      user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  signup,
  login
};