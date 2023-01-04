const express = require("express");
const UsersController = require('../controllers/usersController')
const {passwordsMatch, isNewUser, hashPwd, isNoNewUser} = require('../middleware/middleware')

const router = express.Router();
router.post('/signup', passwordsMatch, isNewUser,hashPwd, UsersController.addNewUser)

router.post('/login',  isNoNewUser, UsersController.loginUser)
router.get('/:id', UsersController.getUser)

  
  module.exports = router;