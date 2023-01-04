const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { getUserByEmailModel } = require('../models/userModel');

const passwordsMatch = (req, res, next) => {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    res.status(400).send("Passwords don't match");
    return;
  }

  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  next();
};
const isNoNewUser = async (req, res, next) => {
    const user = await getUserByEmailModel(req.body.email);
    if (!user) {
      res.status(400).send('This user/email does not exist');
      return;
    }
    req.body.user = user
    next();
  };

const hashPwd = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    req.body.password = hash;
    req.body.repassword = hash;
    next();
  });
};



const auth = (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).send('Authorization headers required');
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      next();
    }
  });
};

module.exports = { passwordsMatch, isNewUser, hashPwd, auth, isNoNewUser };