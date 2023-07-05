const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://shivanshnema83:shivansh%4021@cluster1.7x33fgz.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("CONNECTED TO DATABASE!");
};


module.exports=connectDB;