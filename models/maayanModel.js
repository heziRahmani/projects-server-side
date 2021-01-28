const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
// const config = require("config");
const { number } = require("@hapi/joi");


const maayanSchema = new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    options:String,
    quantity:String,
    date:{ type:Date, default:Date.now}
  })


  exports.maayanModle=mongoose.model("maayans",maayanSchema)


  const validData=(_data)=>
  {
      const schema=Joi.object({
          name:Joi.string().required(),
          price:Joi.number().required(),
          category:Joi.string().required(),
          options:Joi.string().min(0),
          quantity:Joi.string()
      })
      return schema.validate(_data)
  }

  exports.validData = validData;