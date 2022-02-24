const mongoose = require("../database/mongodb")

const UserSchema = mongoose.Schema({
    _id:{
        type: String
    },
    nameUser:{
        type: String,
        required: true,       
    },
    initBathymetryNotif:{
        type: String,
        unique: true
    },
    endBathymetryNotif:{
        type: String,
        unique: true
    },
    iBat:{
        type: String,
        unique: true
    },

},{ versionKey: false })

const User = mongoose.model("User", UserSchema);
module.exports = User
