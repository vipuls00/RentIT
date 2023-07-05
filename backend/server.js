const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 5000;
app.use(express.json());
const jwt = require("jsonwebtoken");

const mongoose=require("mongoose");
const User=require("./models/register");
const Product=require("./models/rentCloths");
const Cart=require("./models/cart");
const ConnectDB = require("./database/connection");
const authenticate=require("./middleware/authenticat");
const cookieParser = require('cookie-parser')
const multer = require('multer');
const sharp = require('sharp');
app.use(cookieParser());//connection to db
const cors=require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Not Connected to database");
  });


// USER REGISTRATION
app.post("/register",async(req,res)=>{
  console.log(req.body);
    const {email,password,firstName,lastName,gender,country}=req.body;
    const data={
        email:req.body.email,
        password:password,
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        country:country
    }
    try{
     const check=await User.findOne({email:email});
     if(check){
        res.json("Already exist");
     }
     else{
        await User.insertMany([data]);
        res.json("success");
     }
    }
    catch(e){
        res.json("somthing went wrong");
    }
})

//USER LOGIN

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = {
    email: email,
    password: password,
  };
  try {
    const user = await User.findOne({ email: email, password: password });
    console.log(user);
    if (user) {
      const token = jwt.sign({ _id: user._id }, "This is my secret key now it should work");
      res.cookie("userToken", token, {
        expires:new Date(Date.now()+25892000000),
        httpOnly: true,
        // Add this option to allow cookies over HTTP
        secure: false
      });
      // console.log(`Token: ${token}`);
      res.json({token:token,message: "logged in successfully" });
      // Save token in cookie
      
    } else {
      res.json("not exist");
    }
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});


//TEST ABOUT ME
app.get("/rentCloths", authenticate ,async (req,res)=>{
res.json(req.rootUser); 
})

//PUT ON RENT
const upload = multer({ dest: 'uploads/' });
app.post('/putOnRent',upload.single('image'),async(req,res)=>{
  const{
    userId,
    gender,
    category,
    subCategory,
    size,
    brand,
    price,
    address,
    phoneNo,
    email,
    sold,
    description
  }=req.body;
  if (!req.file) {
    throw new Error('No file uploaded');
  }
  const image = await sharp(`uploads/${req.file.filename}`).resize(800).toBuffer();
  const data={
    userId,
    gender,
    category,
    subCategory,
    size,
    brand,
    price,
    address,
    phoneNo,
    email,
    sold,
    image,
    description
  }
  try{
    if(gender.length>0 && category.length>0 && subCategory.length>0 && size.length>0 && brand.length>0 && price.length>0
      &&address.length>0 && phoneNo.length>0 && email.length>0 && sold=="false" && description.length>0){
        await Product.insertMany([data]);
        res.json({data:data,message:"putted on rent successfully"});
      }
      else{
        res.json({data:data,message:"Something went wrong"});
      }
    
  }
  catch(err){
    console.log(err);
     res.json({err:"Something Went Wrong"})
  }
})

//My Rents
app.post('/getMyRents', async (req, res) => {
  const {userId}=req.body
  const myRented=await Product.find({userId:userId});
  if(myRented){
    res.json({data:myRented});
  }
  else{
    console.log("nothing found");
  }
});

//All Products that are not sold
app.get('/getAllProducts',async(req,res)=>{
  try{
      const products=await Product.find({sold:"false"});
      if(products){
        // console.log(products);
        res.json({data:products});
      }
      else{
        console.log("no products found")
        res.json({data:"no products found"});
      }
  }
  catch(err){
    console.log("something went wrong")
    res.json({error:err});
  }
})

//Add to cart
app.post('/addToCart',async(req,res)=>{
  try{
     const{userId,itemId,quantity}=req.body;
     const data={
      userId:userId,
      itemId:itemId,
      quantity:quantity
     }
     await Cart.insertMany([data]);
     res.json(data);
  }
  catch(err){
    console.log(err);
    res.json({message:"something went wrong"});
  }
})

//User's cart items
app.post('/getMyCartItems', async (req, res) => {
  const { userId } = req.body;
  const items = await Cart.find({ userId: userId });
  // console.log(items);
  const cartItems = [];
  for (const item of items) {
    const product = await Product.findOne({ _id: item.itemId });
    cartItems.push(product);
  }
  // console.log(cartItems);
  res.json({ data: cartItems });
});

//Delete an item from cart
app.post('/deleteCartItem',async(req,res)=>{
  try{
    const{itemId,userId}=req.body;
    await Cart.deleteMany({itemId:itemId,userId:userId});
     res.json("item Deleted successfuly");
    //  console.log("done");
  }
  catch(err){
    res.json({message:"something went wrong"})
  }
})

//Delete Item from product master table
app.post('/deleteItem',async(req,res)=>{
  try{
  const{itemId}=req.body;
  await Product.deleteOne({_id:itemId});
  // await Cart.deleteMany({itemId:itemId});
   res.json("item Deleted successfuly");
  //  console.log("done");
}
catch(err){
  res.json({message:"something went wrong"})
}
})