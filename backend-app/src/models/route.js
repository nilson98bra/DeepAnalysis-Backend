const mongoose = require("../database/mongodb")

const RouteSchema = mongoose.Schema({
    _id:{
        type: Number,
        unique: true
    },
    coordinateLT:{
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
    coordinateRT:{
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
    coordinateLB:{
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
    coordinateRB:{
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