const handlingErrors = require("../handling/handling")
const Route = require("../models/route");
const {v4:uuid} = require("uuid")

exports.cadRoute= async(req,res)=>{
   
        const {lt,rt,lb,rb,name} = req.body
        const coordianteValues = {"lt":lt,"rt":rt,"lb":lb,"rb":rb}
        const stringValues = {"name":name}
        const coordianteerros = handlingErrors.validateCoordinates(coordianteValues)
        const stringErros = handlingErrors.validateString(stringValues, [25],[4])
        const erros = stringErros.concat(coordianteerros)
        if(erros.length > 0){
            return res.status(400).send({"message": erros})
        }
    
        await Route.create({
            _id: uuid(),
            coordinateLT: lt,
            coordinateRT: rt,
            coordinateLB: lb,
            coordinateRB: rb,
            date: new Date().toISOString(),
            name: name,
            userId:req.user._id   
        })
        return res.status(201).send({"message": "Rota criada."})


}

exports.getRoute = async(req,res)=>{
    try{
        const {id} = req.params
        const stringErros = await handlingErrors.validateString(req.params,[36],[36])
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }
        const rota = await Route.findOne({"_id":id})
        return res.status(200).send({"data":rota})
    }catch(err){
        return res.status(400).send({"message":err})
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




