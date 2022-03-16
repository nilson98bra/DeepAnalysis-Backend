const handlingErrors = require("../handling/handling")
const User = require("../models/user");
const {v4:uuid} = require("uuid")




exports.cadUserPhone= async(req,res)=>{
    try{
        const {phone} = req.body
        let validPhone = await handlingErrors.validPhoneNumber(phone)
        if(validPhone==false){
            return res.status(400).send({"error": "Insira um número válido"})    
        }

        const exist = await User.findOne({"phone":phone})
        if(exist){
            return res.status(400).send({"error": "Este número já está cadastrado"})    
        }

        const verifyCode = ((min, max)=>{
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        })(100000,999999)

        await User.create({
            _id: uuid(),
            phone: phone,
            nameUser: "User",
            notifyInitBathymetry: false,
            notifyEndBathymetry:  false,
            notifyObstacle: false,
            verifyCode: verifyCode,
            verifyCodeDate: new Date().toISOString()
        
        })
        return res.status(200).send({"mensagem":"Telefone cadastrado no sistema"})
    }catch(error){
        return res.status(400).send({"mensagem":error._message})
    }
    
        
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

exports.checkVerificationCode = async(req,res)=>{
    try{
        const {_id, } = req.body
    }catch(error){

    }
}

exports.generateVerificationCode = async(req,res)=>{

    try{
        const {_id} = req.body
        const stringErros = await handlingErrors.validateString(req.body,[36],[36])
        if(stringErros.length != 0){
            return res.status(400).send({"error": stringErros})    
        }
    
        const exist = await User.findOne({"_id":_id})
        if(exist){
            const verifyCode = ((min, max)=>{
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            })(100000,999999) 
            console.log(verifyCode)
            await User.findOneAndUpdate({_id:_id},{verifyCode:verifyCode, verifyCodeDate: new Date().toISOString()})
            return res.status(200).send({"mensagem":"Código gerado"})
        }
        return res.status(200).send({"mensagem":"Usuário não existente"})
 
    }catch(error){
        return res.status(400).send({"mensagem":error._message})
    }




}

exports.login = async(req,res)=>{

}





