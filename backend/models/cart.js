const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const cartSchema=mongoose.Schema({
    userId:{
        type: String,
        require:true
    },
    itemId:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }
});


const Cart=mongoose.model("cart master table",cartSchema);

module.exports=Cart;
