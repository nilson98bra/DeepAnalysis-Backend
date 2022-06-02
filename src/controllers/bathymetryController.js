const handlingErros = require("../handling/handling")
const Bathy = require("../models/bathymetry");
const {v4:uuid} = require("uuid")

exports.cadBathy = async (req,res,next)=>{
    try{
        const {idRoute} = req.body
        const stringValues = {"idRoute":idRoute}
      
        const stringErros = handlingErros.validateString(stringValues, [36],[36])
    
        if(stringErros.length != 0){
            return res.status(400).send({"erros":erros})
        }
    
    
        const bathyCriado = await Bathy.create({
            _id: uuid(),
            dateInit: new Date().toISOString(),
            idRoute: idRoute
        })
        return res.status(201).send({"message": bathyCriado})
    }
    catch(error){
        next(error)
    }

}

exports.getBathy = async (req,res)=>{

    try{
        const {id} = req.params
        const stringErros = handlingErros.validateString(req.params,[36],[36])
        
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }

        const bathy = await Bathy.findById({"_id":id})
        return res.status(200).send({"data": bathy})
    }catch(error){

        return res.status(400).send({"message":error})
    }


}

exports.getAllBathy = async(req,res,next)=>{
    
    try{
        
        const {idRoute} = req.params
        const stringErros = handlingErros.validateString(req.params,[36],[36])
        
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }
        const bathys = await Bathy.find({"idRoute":idRoute})
   
        return res.status(200).send({"data": bathys})
    }catch(error){
        next(error)
    }

}

exports.uploadImg = async(req,res)=>{
    return res.status(200).send({"message":"Deu bom"});
}

exports.finishBathy = async(req,res,next)=>{
    try{

        const {id} = req.params
        const stringErros = handlingErros.validateString(req.params,[36],[36])

        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }

        await Bathy.findByIdAndUpdate({_id:id},{dateEnd:new Date().toISOString()})
        return res.status(200).send({"message":"Batimetria finalizada!"})

    }catch(err){
    
        next(err)
    }

}