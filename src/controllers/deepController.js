const handlingErros = require("../handling/handling")
const Deep = require("../models/deep");
const Bathy = require("../models/bathymetry");
const {v4:uuid} = require("uuid")

exports.insertDeep = async (req,res)=>{
    const {idBathy,deeps} = req.body
    const erros = handlingErros.validateDeeps(deeps)
    if(erros.length > 0){
        return res.status(400).send({"erros":erros})
    }
    /*------------------------------------------------- */
    if(req.body.length ==0){
        return res.status(404).send({"error": "Dados de profundidade estão vazios."})
    }
  
    const bathy = await Bathy.findOne({_id: req.body.idBathy})
    if(!bathy){
        return res.status(404).send({"error": "Batimetria não cadastrada"})       
    }

    await Deep.create({
        _id: uuid(),
        deeps:deeps,
        idBathy: idBathy,
        })
    return res.status(201).send({"message": "Profundidade cadastrada."})
}

exports.selectDeeps = async (req,res)=>{

    try{
        const {idBathy} = req.params
        const stringErros = handlingErros.validateString(req.params,[36],[36])
        
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }

        const deeps = await Deep.find({"idBathy":idBathy})
        return res.status(200).send({"data": deeps})
    }catch(error){
        return res.status(400).send({"message":error})
    }


}