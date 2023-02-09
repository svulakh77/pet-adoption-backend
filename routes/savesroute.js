const express = require("express");
const savesController = require("../controllers/savesController")
const router = express.Router();
const {auth}=require("../middleware/middleware")

router.post("/savePet", savesController.savePet)
module.exports = router;