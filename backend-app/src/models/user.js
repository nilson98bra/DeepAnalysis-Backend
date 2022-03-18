const mongoose = require("../database/mongodb")

const UserSchema = mongoose.Schema({
    _id:{
        type: String,

    },
    phone:{
        type: String,
        required: true,  
    },
    nameUser:{
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
    provisionalRegistration:{
        type: Boolean,
        required: true
   
    },


},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
