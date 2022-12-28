const express = require("express");

const router = express.Router();
router.get('/users',(req,res)=>{
  res.send('getting users');
  console.log('Bye')
})
  router.post("/login", (req, res) => {
    console.log(req.body)
    res.send('Login');
  });

  router.post("/signup", (req, res) => {
    console.log(req.body)
    res.send('Signup');
  });
  

  
  module.exports = router;