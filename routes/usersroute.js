const express = require("express");
const UsersController = require('../controllers/usersController')
const dbConnection = require('../knex/knex');
const {passwordsMatch, isNewUser, hashPwd, isNoNewUser, auth} = require('../middleware/middleware')

const router = express.Router();
router.post('/signup', passwordsMatch, isNewUser,hashPwd, UsersController.addNewUser)

router.post('/login',  isNoNewUser, UsersController.loginUser)
router.put('/profile', auth, UsersController.editUser)

  module.exports = router;