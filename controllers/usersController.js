const { addUser } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const addNewUser = async (req, res) => {
  try {
    const id = await addUser(req.body);
    const newUser = {
      ...req.body,
      id: id,
    };

    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getUser = async (req, res) => {
  try {
    const id = await readUserModel(req.body);
    const redUser = {
      ...req.body,
      id: id,
    };
    res.send(redUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const loginUser = async (req, res) => {
  const { password, user } = req.body;
  console.log("loginUser: ", req.body);
  console.log("pass: ", password);
  console.log("key: ", user.password);
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send("Passwords don't match");
      } else {
        const token = jwt.sign({ user:user }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        user.token = token;

        console.log("TOKEN", token,user);
        res.send({ token: token, user:user });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports = { addNewUser, loginUser,getUser };
