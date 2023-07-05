const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
   userId:{
    type:String,
    require:true
   },
   gender:{
    type:String,
    require:true
   },
   category:{
    type:String,
    require:true
   },
   subCategory:{
    type:String,
    require:true
   },
   size:{
    type:String,
    require:true
   },
   brand:{
    type:String,
    require:true
   },
   price:{
    type:String,
    require:true
   },
   address:{
    type:String,
    require:true
   },
   phoneNo:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true
   },
   sold:{
    type:String,
    require:true
   },

   image:{
      type:Buffer,
      require:true
   },
   description:{
      type:String,
      require:true
   }
   
});


const Product=mongoose.model("product master table",productSchema);

module.exports=Product;
