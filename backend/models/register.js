const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema=mongoose.Schema({
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    firstName:{
        type: String,
        require:true
    },
    lasName:{
        type: String,
        require:true
    },
    gender:{
        type: String,
        require:true
    },
    country:{
        type: String,
        require:true
    }
});


const User=mongoose.model("user master table",userSchema);

module.exports=User;
