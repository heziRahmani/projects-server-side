const express = require('express');
const { validateUser,userModel ,genUserToken} = require('../models/userModels');
const bcrypt = require("bcrypt")
const _ = require("lodash");
const router = express.Router();
const auth=require("../meddelwer/auth")

/* GET users */
router.get('/',auth, (req, res, next) => {
  userModel.find({})
    .then(data => {
      res.json(data)
    })
    .catch(err => {
  
      res.status(400).json(err)
    })
});



router.post("/add",auth,async(req,res) => {
 
    let validUser = validateUser(req.body)
    
    if(validUser.error){
      return res.status(400).json(validUser.error.details[0]);
    }

const salt = await bcrypt.genSalt(10);

    req.body.pass = await bcrypt.hash(req.body.pass,salt)


    
    try{
     let saveData = await userModel.insertMany([req.body]);
     res.json(_.pick(saveData[0], ["_id", "email", "date"]));
    }

    
    catch{
      res.status(400).json({ message: "error insert new user, check email" })
    }
})




// login
router.post("/login",async(req,res) => {
  let user = await userModel.findOne({email:req.body.email});
  if(user){
   
    let validPass = await bcrypt.compare(req.body.pass,user.pass)

    if(validPass){
     
      let newToken = genUserToken({email:user.email,_id:user._id})
      res.json({token:newToken})
    }

    
    else{
      res.status(400).json({ message: "Problem login pass not match" });
    }
  }


  else{
    res.status(400).json({ message: "Problem login user not found" });
  }
})


// del one product
router.post("/del",auth,(req,res)=>{
  let delOne=req.body.del
  userModel.deleteOne({email:delOne})
  .then(data=>{
      res.json({massege:"delited one"})
  })
})


router.get("/checktoken",auth,(req,res)=>{
  res.json({message:"ok",status:"loged in"})
})

module.exports = router;




