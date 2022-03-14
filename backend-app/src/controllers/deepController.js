const handlingErros = require("../handling/handling")
const Deep = require("../models/deep");
const Route = require("../models/route");
const {v4:uuid} = require("uuid")

exports.insertDeep = async (req,res)=>{
    const {coordinate,value,idRoute} = req.body
    const stringValues = {"idRoute":idRoute}
    const numericValues = {"value":value}
    const coordinateValues ={"coordinate":coordinate}
    /*Checar se os valores vindo do front estão corretos*/
    const stringErros = await handlingErros.validateString(stringValues, [36],[36])
    const numericErros = await handlingErros.validNumericValues(numericValues,[999],[-999])
    const coordianteErros = await handlingErros.validCoordinates(coordinateValues)
    console.log(typeof(stringErros))
    const erros = stringErros.concat(numericErros,coordianteErros)
    if(erros){
        return res.status(400).send({"erros":erros})
    }
    /*------------------------------------------------- */

    const route = await Route.findOne({_id: idRoute})
    if(!route){
        return res.status(404).send({"error": "Rota não cadastrada"})
    }
    await Deep.create({
        _id: uuid(),
        coordinate:coordinate,
        value: value,
        idRoute: idRoute
    })
    return res.status(201).send({"message": "Profundidade Cadastrada"})
}

exports.selectDeeps = async (req,res)=>{
  
        const {idRoute} = req.body
        const stringErros = await handlingErros.validateString(req.body,[36],[36])
        
        if(stringErros){
            return res.status(400).send({"erros": stringErros})
        }

        const deeps = await Deep.find({"idRoute":idRoute})
        return res.status(200).send({"Data": deeps})

}