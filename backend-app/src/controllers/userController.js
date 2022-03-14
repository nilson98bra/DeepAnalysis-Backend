const handlingErrors = require("../handling/handling")
const User = require("../models/user");
const {v4:uuid} = require("uuid")




exports.cadUserPhone= async(req,res)=>{
    const {phone} = req.body
    const erros = await handlingErrors.handling(req.body,[15],[11])
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }
    
    let validPhone = await handlingErrors.validPhoneNumber(phone)
    if(validPhone==false){
        return res.status(400).send({"error": "Insira um número válido"})    
    }

    const exist = await User.findOne({"phone":phone})
    if(exist){
        return res.status(400).send({"error": "Este número já está cadastrado"})    
    }
    return res.status(200).send({"mensagem":"Número válido"})
        
}


exports.cadUserEspec= async(req,res)=>{

    const {phone, nameUser, notifyInitBathymetry, notifyEndBathymetry, notifyObstacle} = req.body
    const erros = await handlingErrors.handling(req.body,[11,20,true,true,true],[11,5,true,true,true])
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }

    let validPhone = await handlingErrors.validPhoneNumber(phone)
    if(validPhone==false){
        return res.status(400).send({"error": "Insira um número válido"})    
    }

    const exist = await User.findOne({"phone":phone})
    if(exist){
        return res.status(400).send({"error": "Este número já está cadastrado"})    
    }
    
    await User.create({
        _id: uuid(),
        phone: phone,
        nameUser: nameUser,
        notifyInitBathymetry: notifyInitBathymetry,
        notifyEndBathymetry:  notifyEndBathymetry,
        notifyObstacle: notifyObstacle,
       
    })
    return res.status(201).send({"message": "Usuário Criado"})

}
exports.login = async(req,res)=>{

}





