const express = require('express');
const { request, response } = require('../app');
const auth = require('../meddelwer/auth');
const router = express.Router();
const { validData,maayanModle}=require('../models/maayanModel')





router.get("/", (req,res)=>{
  maayanModle.find({})
  .then(data=>
    {
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
    })
})


router.get("/single/:id",(req,res)=>{
    let singleId=req.params.id
    console.log(singleId);
    maayanModle.findOne({_id:singleId})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{res.status(400).json(err)})
})

router.post("/add",auth, async(req,res)=>{
    let prod=req.body;
    let validProd=await validData(prod)
    if(validProd.err)
    {
       res.status(400).json(validProd.err)
    }
    else{
   try{
    let saveData=await maayanModle.insertMany([req.body])
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
    maayanModle.deleteOne({_id:delOne})
    .then(data=>{
      console.log(delOne);
        res.json({massege:"delited one"})
    })
})



router.get("/cat/:category",(req,res)=>{
    let cat=req.params.category
    maayanModle.find({category:cat})
    
    .then(data=>{
        console.log(data)
    res.json({data})

    })
    .catch(err=>{
        res.status(400).json(err)
    })
})



router.post("/update", async(req,res)=>{
    
    let bodyData=req.body;
    let validProd=validData(bodyData)
    if(validProd.error)
    {
        res.status(400).json();
        console.log(validProd.error);
    }
    else{
            try{
                let updateProd=await maayanModle.updateMany({name:req.body.name},bodyData)
                res.json(updateProd)
                console.log(updateProd);
            }
            catch{
                res.status(400).json("error");
                console.log("eror2");
            }
    }
   
})


module.exports = router;
