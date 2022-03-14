const mongoose = require("../database/mongodb")

const DeepSchema = mongoose.Schema({
    _id:{
        type: String,

    },
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
    },

    idRoute:{
        type: Number,
        required: true
    }

    
},{ versionKey: false })

const Deep = mongoose.model("Deep", DeepSchema);
module.exports = Deep