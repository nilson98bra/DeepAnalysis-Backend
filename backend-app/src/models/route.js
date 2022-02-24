const mongoose = require("../database/mongodb")

const RouteSchema = mongoose.Schema({
    _id:{
        type: Number,
        unique: true
    },
    coordinate1:{
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
    coordinate2:{
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
    coordinate3:{
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
    coordinate4:{
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
},{ versionKey: false })

const Route = mongoose.model("Route", RouteSchema);
module.exports = Route