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
       
    },
    notifyEndBathymetry:{
        type: Boolean,
        
    },
    notifyObstacle:{
        type: Boolean,      
    },
    verifyCode:{
        type: Number
    },
    verifyCodeDate:{
        type: Date,
        required: true
    }

},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
