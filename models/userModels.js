const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");


const userSchema = new mongoose.Schema({
  email:String,
  pass:String,
  date:{ type:Date, default:Date.now}
})


exports.userModel = mongoose.model("users",userSchema);


const genUserToken = (_item) => {

  const token = jwt.sign(_item,config.get("tokenKey"),{expiresIn:"1h"});
  return token;
}

exports.genUserToken = genUserToken;




const validateUser = (_user) => {
  const schema = Joi.object({
    email:Joi.string().min(5).max(80).email().required(),
    pass:Joi.string().min(2).max(80).required(),

    
  }) 

  return schema.validate(_user)
}

exports.validateUser = validateUser