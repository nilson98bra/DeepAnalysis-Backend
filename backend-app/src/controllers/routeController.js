const handlingErrors = require("../handling/handling")
const Route = require("../models/route");
const {v4:uuid} = require("uuid")

exports.cadRoute= async(req,res)=>{
    const {lt,rt,lb,rb} = req.body
    
    const erros = await handlingErrors.validCoordinates(req.body)
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }

    await Route.create({
        _id: uuid(),
        coordinateLT: lt,
        coordinateRT: rt,
        coordinateLB: lb,
        coordinateRB: rb,
        date: new Date().toISOString()

       
    })
    return res.status(201).send({"message": "Rota Criada"})
}

exports.getRoute = async(req,res)=>{
    const {_id} = req.body
    const erros = await handlingErrors.handling(req.body,[36],[36])
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }
    const rota = await Route.findOne({"_id":_id})
    return res.status(200).send({"message":rota})
}


exports.getAllRoutes = async(req,res)=>{
    
    const rotas = await Route.find({})
    return res.status(200).send({"data":rotas})
}




