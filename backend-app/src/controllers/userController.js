const handlingErrors = require("../handling/handling")
const User = require("../models/summoner");
const {v4:uuid} = require("uuid")

exports.cadUserPhone= async(req,res)=>{
    const {phone, nameUser, initBathymetry, endBathymetry, obstacle} = req.body
    const erros = await handlingErrors.handling(req.body,[11,20,true,true,true],[11,5,true,true,true])
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }
    const exist = await Summoner.findOne({"phone":phone})
    if(exist){
        return res.status(401).send({"error": "Este número já está cadastrado"})    
    }
        
    await User.create({
        _id: uuid(),
        phone: phone,
        nameUser: nameUser,
        notifyInitBathymetry: initBathymetry.toString(),
        notifyEndBathymetry: endBathymetry.toString(),
        notifyObstacle: obstacle,
       
    })
    return res.status(201).send({"message": "Usuário Criado"})
}

exports.cadUserPhone= async(req,res)=>{
    const {_id} = req.body
    const erros = await handlingErrors.handling(req.body,[11])
    if(erros.length){
        return res.status(400).send({error: erros.join("; ")})
    }
    const exist = await Summoner.findOne({"_id":_id})
        if(exist){
        
            return res.status(401).send({"error": "Este número já está cadastrado"})    
        }
        
       await Summoner.create({
            _id: uuid(),
            nickname: user.data.name,
            accountId: user.data.accountId,
            summonerLevel: user.data.summonerLevel,
            profileIconId: user.data.profileIconId,
            summonerId: user.data.id,
            userId: req.user._id
        })
        return res.status(201).send({"message": "Summoner created"})
}

exports.cadUserEspec= async(req,res)=>{

}
exports.login = async(req,res)=>{

}





