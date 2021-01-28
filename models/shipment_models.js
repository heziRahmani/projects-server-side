const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { any, array } = require("@hapi/joi");


const shipmentSchema = new mongoose.Schema({
  address:String,
  phone:Number,
  full_name:String,
  shipment:String,
  order:[{name:String}],
  date:{ type:Date, default:Date.now}
})


exports.shipmetModel = mongoose.model("shipment",shipmentSchema);







const validateShipment = (_shipmentOrder) => {
  const schema = Joi.object({
    address:Joi.string().min(5).max(80).required(),
    phone:Joi.string().min(2).max(80).required(),
    full_name:Joi.string().min(2).max(80).required(),
    shipment:Joi.string().min(2).max(80).required(),
    order:Joi.any(),

    
  }) 

  return schema.validate(_shipmentOrder)
}

exports.validateShipment = validateShipment