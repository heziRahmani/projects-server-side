const express = require('express');
const { request, response } = require('../app');
const router = express.Router();
const { prodsModel,validProds }=require('../models/prods_models')
const auth=require("../meddelwer/auth");
const { update } = require('lodash');








/* GET home page. */
// הניתוב
router.get('/', (req, res, next)=> {
  
        let page=req.query.page || 0;
    let inpage=Number(req.query.inpage)
 prodsModel.find({})
 .limit(inpage)
 .skip(page * inpage)
 .sort({_id:-1})
 .then(data=>{
    res.json({data})
    console.log(data);
 })
   
});


// product per page
router.get('/page/:pagenum', (req, res, next)=> {
  let perPag=Number(req.query.inPage)|| 9
 prodsModel.find({})
.limit(perPag)
.skip(req.params.pagenum * perPag)
 .sort({_id:-1})
 .then(data=>{
    res.json({data})
    console.log(data);
 })
   
});


// number of products
router.get("/countprods",(req,res)=>{
  prodsModel.countDocuments({})
    .then(data=>{
      res.json(data)
    })
})










// del one product
router.post("/del",auth,(req,res)=>{
    let delOne=req.body.del
    prodsModel.deleteOne({_id:delOne})
    .then(data=>{
      console.log(delOne);
        res.json({massege:"delited one"})
    })
})





// ספירה כמה יש בקטגוריה
router.get('/catcount/:category', (req, res)=> {
  let catName=req.params.category;
  prodsModel.countDocuments({category:catName})
  .then(data=>{
    res.json(data)
  })

})


// all the products in one category
router.get('/cat/:category', (req, res)=> {
    let catName=req.params.category;
    let page=req.query.page || 0;
    let inpage=Number(req.query.inpage) || 9
   
    prodsModel.find({category:catName})
   
    .limit(inpage)
     .skip(page * inpage)

    .then(data=>{
        console.log(data)
    res.json({data})

    })
    .catch(err=>{
        res.status(400).json(err)
    })
      
   });

// single prod by id
   router.get('/single/:id', (req, res, next) => {

    prodsModel.findOne({_id:req.params.id})
    .then(data => {
      res.json(data)
      
    })
    .catch(err => {
      res.status(400).json(err)
    })
  });
  



// search by product name
router.get('/search/', (req, res)=> {
    
let mySearch=new RegExp(`${req.query.q}`)
console.log(mySearch)

    prodsModel.find({name:mySearch})
    .then(data=>{
        console.log(data)
    res.json({data})

    }).catch(err=>{
        res.status(400).json(err)
    })
      
   });





// sort by price
   router.get('/price/',(req,res)=>
   {
        let page=req.query.page || 0;
    let inpage=Number(req.query.inpage) || 3
       prodsModel.find({price:{$gte:req.query.min}})
           .limit(inpage)
     .skip(page * inpage)
       .then(data=>{
           res.json(data)
       })
   })

   

// one product
   router.get('/:prodName',(req,res)=>{
       let prodName=req.params.prodName
       prodsModel.find({name:prodName})
       .then(data=>{
           res.json(data)
       })
   })

  

// add product
   router.post("/add",auth,async(req,res)=>{
       let dataBody=req.body;
      dataBody.user_id=req.decoded._id
       let prods=await validProds(dataBody);
       if(prods.error)
       {
           res.status(400).json(prods.error)
       }
       else{
       
       try{
         let saveData=await prodsModel.insertMany([req.body])
         res.json(saveData[0])
       }
    
       catch{
        res.json({massege:"inser adiffent product"})
       }
       }

   })


  //  updete product
   router.post("/update",async(req,res) => {
    let dataBody = req.body;
    let prod = await validProds(dataBody);
    if(prod.error){
      res.status(400).json(prod.error.details[0])
    }
    else{
      try{
        
        let updateData = await prodsModel.updateOne({_id:req.body.id},req.body);
        res.json(updateData)
        
      }
      catch{
        res.status(400).json({ message: "error cant find id" })
      }
    }
  })


  
   router.post("/amount",async(req,res) => {
    let dataBody = req.body;
   console.log(dataBody);
      let updateData = await prodsModel.updateOne({_id:req.body.id},dataBody);
        res.json(updateData)
        
    
  })
  





   
   
    






module.exports = router;














