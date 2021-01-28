
const jwt = require('jsonwebtoken');
const config = require("config")

const auth = async(req,res,next) => {
  const token = req.header("x-auth-token");

  if(!token) {
    return res.status(400).json({ message: "error token you must send header 1" })
  }
  try{
    const decode = jwt.verify(token,config.get("tokenKey"));
   
    req.decoded = decode;
    
    next()
  }
  catch{
    
    return res.status(400).json({ message: "error token 2 not valid 2" })
  }
}

module.exports = auth;