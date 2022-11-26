const mongoose = require("../database/mongodb")

const BathySchema = mongoose.Schema({
    _id:{
        type: String,

    },
    dateInit:{
        type: Date,
        required: true
    },
    dateEnd:{
        type: Date,
        
    },

    idRoute:{
        type: String,
        required: true
    },

    idUser:{
        type: String,
        required: true
    }

    
},{ versionKey: false })

const Deep = mongoose.model("Bathymetry", BathySchema);
module.exports = Deep