
const mongoose = require("mongoose");

const joi = require("@hapi/joi");
const { date } = require("@hapi/joi");

let prodsSchema = mongoose.Schema({
 
  name: String,
  info: String,
  category: String,
  img_url: String,
  price: Number,
  in_stock:Number,
  user_id:String,
});

exports.prodsModel = new mongoose.model("prods", prodsSchema);

const validProds = (_prods) => {
  let joiSechema =joi.object ({
    id:joi.string(),
    name: joi.string().min(2).max(500).required(),
    info: joi.string().min(2).max(500).required(),
    category: joi.string().min(1).max(100).required(),
    img_url: joi.string().min(1).max(500).required(),
    price: joi.number().max(99999).required(),
    in_stock: joi.number().max(99999).required(),
    user_id:joi.string()
  });

  return joiSechema.validate(_prods)
};

exports.validProds=validProds;
