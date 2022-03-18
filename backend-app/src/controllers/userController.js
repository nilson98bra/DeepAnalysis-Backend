const handlingErrors = require("../handling/handling")
const User = require("../models/user");
const {v4:uuid} = require("uuid")
const sendEmail = require("../config/smtp")

exports.cadUserPhone= async(req,res)=>{
    try{
        const {phone} = req.body
        let validPhone = await handlingErrors.validPhoneNumber(phone)
        if(validPhone==false){
            return res.status(400).send({"error": "Insira um número válido"})    
        }

        const exist = await User.findOne({"phone":phone},{"provisionalRegistration":false})
      
        if(exist){

            return res.status(400).send({"error": "Este número já está cadastrado"})    
        }
      
        await User.create({
            _id: uuid(),
            phone: phone,
            nameUser: "Default",
            notifyInitBathymetry:false,
            notifyEndBathymetry:false,
            notifyObstacle:false,
            provisionalRegistration:true
        })

        return res.status(200).send({"mensagem":"Número de telefone válido"})
    }catch(error){
        return res.status(400).send({"mensagem":error})
    }
    
        
}


exports.cadUserEspec= async(req,res)=>{

    const {_id, nameUser, notifyInitBathymetry, notifyEndBathymetry, notifyObstacle} = req.body
    
    const stringValues = {"nameUser":nameUser,"_id":_id}
    const booleanValues = {"notifyInitBathymetry":notifyInitBathymetry,
    "notifyEndBathymetry":notifyEndBathymetry,"notifyObstacle":notifyObstacle}
    const stringErros = await handlingErros.validateString(stringValues, [15,36],[4,36])
    const booleanErros = await handlingErrors.validBooleanValues(booleanValues)

    const erros = stringErros.concat(booleanErros)
    if(erros){
        return res.status(400).send({"erros":erros})
    }

    await User.findByIdAndUpdate({phone:phone},{nameUser:nameUser, 
        notifyInitBathymetry: notifyInitBathymetry,notifyEndBathymetry:  notifyEndBathymetry,
        notifyObstacle: notifyObstacle})

    return res.status(201).send({"message": "Detalhes Atualizados"})

}

exports.verifyEmail = async(req,res)=>{
    try{
        const {_id, } = req.body
    }catch(error){

    }
}

exports.sendEmail = async(req,res)=>{

    try{
        const {phone,email} = req.body
        let validPhone = await handlingErrors.validPhoneNumber(phone)
        let validateEmail = await handlingErrors.validateEmail(email)


        if(validPhone==false){
            return res.status(400).send({"error": "Insira um número válido"})    
        }
        const exist = await User.findOne({"phone":phone})
        if(!exist){
            return res.status(400).send({"error": "insira um número já cadastrado previamente"})    
        }
        await sendEmail(phone,email)
        return res.status(200).send({"message":"E-mail de verificação enviado"})
       
 
    }catch(error){
        return res.status(400).send({"message":error._message})
}




}

exports.login = async(req,res)=>{
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
      

        return res.status(200).send({"mensagem":"Número de telefone válido"})
    }catch(error){
        return res.status(400).send({"mensagem":error._message})
    }
}





