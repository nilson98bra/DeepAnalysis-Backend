const mongoose = require("../database/mongodb")

const UserSchema = mongoose.Schema({
    _id:{
        type: String,

    },
    nameUser:{
        type: String,
        required: true,       
    },
    email:{
        type: String,
        required: true, 
    },
    phone:{
        type: String,
        required: true, 
    },
    notifyInitBathymetry:{
        type: Boolean,
       
           
    },
    notifyEndBathymetry:{
        type: Boolean,
     
       
    },
    notifyObstacle:{
        type: Boolean,   
       
           
    },
    verifyCode:{
        type:String,
        required: true
    },
    verifyCodeDate:{
        type: Date,
        required: true
    },
    tokenUser:{
        type:String,
        required: true
    },
    refreshTokenUser:{
        type:String,
        required: true
    },
    provisionalRegistration:{
        type: Boolean,
        required: true
    },


},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
