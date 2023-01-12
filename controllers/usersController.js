const { addUser, updateUser } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addNewUser = async (req, res) => {
  try {
    const { email, password, repassword, lastName, firstName,phoneNumber } = req.body;
    if (!email) {
      res.status(400).json("Email is a required field" );
      return;
    }
    if (!password){
        res.status(400).json("Password is a required field");
        return;
    }
    if (!repassword){
        res.status(400).json("Please re-enter your password");
        return;
    }
  if (!firstName){
        res.status(400).json("First name is a required field");
        return;
    }    
   if (!lastName){
        res.status(400).json("Last name is a required field");
        return;
    }
    if (!phoneNumber){
        res.status(400).json("Phone number is a required field");
        return;
    }
    
   else {
    const id = await addUser(req.body);
    const newUser = {
      ...req.body,
      id: id,
    }
    const token = jwt.sign({ newUser: newUser }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });
      newUser .token = token;

      console.log("TOKEN", token, newUser );
      res.send({ token: token, newUser : newUser  });
    res.send(newUser);
    console.log(newUser)
}

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const editUser = async (req, res) => {
  try {
    console.log(req.body)
    const body = req.body
    const id = await updateUser(body);
    const editedUser = {
      ...req.body,
      id: req.body.userId,
    };
    res.send(editedUser);
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
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        user.token = token;

        console.log("TOKEN", token, user);
        res.send({ token: token, user: user });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports = { addNewUser, loginUser, getUser, editUser };
