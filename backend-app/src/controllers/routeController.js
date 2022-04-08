const handlingErrors = require("../handling/handling")
const Route = require("../models/route");
const {v4:uuid} = require("uuid")

exports.cadRoute= async(req,res)=>{
    try{
        const {lt,rt,lb,rb} = req.body
    
        const erros = await handlingErrors.validCoordinates(req.body)
        if(erros.length != 0){
            return res.status(400).send({"message": erros})
        }
    
        await Route.create({
            _id: uuid(),
            coordinateLT: lt,
            coordinateRT: rt,
            coordinateLB: lb,
            coordinateRB: rb,
            date: new Date().toISOString(),
            userId:req.user._id   
        })
        return res.status(201).send({"message": "Rota Criada"})
    }catch(error){
        return res.status(400).send({"message":error})
    }

}

exports.getRoute = async(req,res)=>{
    try{
        const {_id} = req.body
        const stringErros = await handlingErros.validateString(req.body,[36],[36])
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }
        const rota = await Route.findOne({"_id":_id})
        return res.status(200).send({"data":rota})
    }catch(error){
        return res.status(400).send({"message":error})
    }

}


exports.getAllRoutes = async(req,res)=>{
    
    try{
        const rotas = await Route.find({"userId": req.user._id})
        return res.status(200).send({"data":rotas})
    }catch(error){
        return res.status(400).send({"message":error})
    }

}




