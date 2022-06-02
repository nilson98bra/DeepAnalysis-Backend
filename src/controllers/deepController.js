const handlingErros = require("../handling/handling")
const Deep = require("../models/deep");
const Bathy = require("../models/bathymetry");
const {v4:uuid} = require("uuid")

exports.insertDeep = async (req,res)=>{
    const {coordinate,value,idBathy} = req.body
    const stringValues = {"idBathy":idBathy}
    const numericValues = {"value":value}
    const coordinateValues ={"coordinate":coordinate}
    /*Checar se os valores vindo do front estão corretos*/
    const stringErros = handlingErros.validateString(stringValues, [36],[36])
    const numericErros = handlingErros.validateNumericValues(numericValues,[999],[-999])
    const coordinateErros = handlingErros.validateCoordinates(coordinateValues)
    const erros = stringErros.concat(numericErros,coordinateErros)
    if(erros.length != 0){
        return res.status(400).send({"erros":erros})
    }
    /*------------------------------------------------- */

    const route = await Bathy.findOne({_id: idBathy})
    if(!route){
        return res.status(404).send({"error": "Batimetria não cadastrada."})
    }
    await Deep.create({
        _id: uuid(),
        coordinate:coordinate,
        value: value,
        idBathy: idBathy
    })
    return res.status(201).send({"message": "Profundidade cadastrada."})
}

exports.selectDeeps = async (req,res)=>{

    try{
        const {idBathy} = req.params
        const stringErros = await handlingErros.validateString(req.params,[36],[36])
        
        if(stringErros.length != 0){
            return res.status(400).send({"erros": stringErros})
        }

        const deeps = await Deep.find({"idBathy":idBathy})
        return res.status(200).send({"data": deeps})
    }catch(error){
        return res.status(400).send({"message":error})
    }


}