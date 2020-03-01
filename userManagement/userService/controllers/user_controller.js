var User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let config = require("../../config/config");

exports.register = async function login(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({
      email
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    }

    user = new User({ firstName, lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.DATABASE.SECRET,
      {
        expiresIn: 10000
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.login = async function register(req, res, next) {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email: email
    });

    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !"
      });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.DATABASE.SECRET,
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        
        res.status(200).json({
          token
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// exports.reset = function reset(req, res, next) {

// };
