const express = require('express');
const { request, response } = require('../app');
const router = express.Router();
const { validateShipment,shipmetModel}=require('../models/shipment_models')
const auth=require("../meddelwer/auth");






router.get('/', (req, res, next) => {
    shipmetModel.find({})
      .then(data => {
        res.json(data)
      })
      .catch(err => {
    
        res.status(400).json(err)
      })
  });





router.post("/add",async(req,res)=>{
    let dataBody=req.body;
 
    let prods=await validateShipment(dataBody);
    if(prods.error)
    {
        res.status(400).json(prods.error)
    }
    else{
    
    try{
      let saveData=await shipmetModel.insertMany([req.body])
      res.json(saveData[0])
    }
 
    catch{
     res.json({massege:"inser adiffent product"})
    }
    }

})

// del one product
router.post("/del",auth,(req,res)=>{
  let delOne=req.body.del
  shipmetModel.deleteOne({_id:delOne})
  .then(data=>{
    console.log(delOne);
      res.json({massege:"delited one"})
  })
})




module.exports = router;    