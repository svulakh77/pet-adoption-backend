const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path')
const pathToImages = path.resolve(__dirname, '../images');
const { getUserByEmailModel } = require('../models/userModel');

const passwordsMatch = (req, res, next) => {
  const { password, repassword } = req.body;
  if (password !== repassword) {
    res.status(400).send("Password is incorrect");
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
  console.log(req.body)
  if(!req.cookies.token) {
    
    res.status(401).send('Must have access token')
    return;
  }

  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }

    if (decoded) {
      req.body.userId = decoded.id;
      req.body.ownerId = decoded.id
      next();
      return
    }
  });
};
cloudinary.config({ 
    cloud_name: 'dm4rue7fk', 
    api_key: '882889117265694', 
    api_secret: 'G06uyjrw0LUjpFvQext2l9fe78Q' 
  });

  const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  
  const upload = multer({ storage: cloudStorage });



  const generateUrl = (req, res, next) => {
    // console.log(req.file.filename)
    // const pic = `http://localhost:8080/${req.file.filename}`
    // req.body.pic = pic;

    console.log("url path",req.file.path)
    next()
}

  
module.exports = { passwordsMatch, upload, isNewUser, hashPwd, auth, isNoNewUser, generateUrl};