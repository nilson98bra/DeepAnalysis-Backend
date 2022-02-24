const mongoose = require("mongoose")
require('dotenv').config({path:'./.env'})


const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.ak09p.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

console.log(uri)
try{
    mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true})

    mongoose.connection.on("connected", ()=>{
        console.log("connected to Mongodb...")
    })
    mongoose.connection.on("error", (err)=>{
        console.log("error to connect to mongodb: "+err)
    })

}catch(err){
    console.log("Error connecting to database")
}


module.exports = mongoose;