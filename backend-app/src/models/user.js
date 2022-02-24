const mongoose = require("../database/mongodb")

const UserSchema = mongoose.Schema({
    _id:{
        type: String
    },
    nameUser:{
        type: String,
        required: true,       
    },
    notifyInitBathymetry:{
        type: Boolean,
        unique: true
    },
    notifyEndBathymetry:{
        type: Boolean,
        unique: true
    },
    notifyObstacle:{
        type: Boolean,
        unique: true
    },

},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
