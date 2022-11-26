const mongoose = require("../database/mongodb")

const DeepSchema = mongoose.Schema({
    _id:{
        type: String,

    },
    deeps:[ 
        {   
        coordinate:{

        type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        
    },
    value:{
        type: Number,
        required: true
    }}],

    idBathy:{
        type: String,
        required: true
    }

    
},{ versionKey: false })

const Deep = mongoose.model("Deep", DeepSchema);
module.exports = Deep