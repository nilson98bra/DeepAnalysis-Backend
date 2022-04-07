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
    notifyInitBathymetry:{
        type: Boolean,
        required: true
       
    },
    notifyEndBathymetry:{
        type: Boolean,
        required: true
    },
    notifyObstacle:{
        type: Boolean,   
        required: true   
    },
    verifyCode:{
        type:String,
        required: true
    },
    verifyCodeDate:{
        type: Date,
        required: true
    },
    provisionalRegistration:{
        type: Boolean,
        required: true
    },


},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
