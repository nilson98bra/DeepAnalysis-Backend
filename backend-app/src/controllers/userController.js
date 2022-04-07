const handlingErrors = require("../handling/handling")
const User = require("../models/user");
const {v4:uuid} = require("uuid")
const sendEmail = require("../config/smtp")

exports.cadUserEmail= async(req,res)=>{
    try{
        const {email} = req.body
        const emailValues = {"email":email}
        const emailErros = await handlingErrors.validateEmail(emailValues)

        if(emailErros){
            return res.status(400).send({"erros":emailErros})
        }

        const exist = await User.findOne({"email":email},{"provisionalRegistration":false})
      
        if(exist){

            return res.status(400).send({"error": "Este email já está cadastrado"})    
        }
        await User.create({ 
            _id: uuid(),
            email: email,
            nameUser: "Default",
            notifyInitBathymetry:false,
            notifyEndBathymetry:false,
            notifyObstacle:false,
            verifyCode: verifyCode,
            verifyCodeDate: new Date().toISOString(),
            provisionalRegistration:true
        })

        const verifyCode = ((min, max)=>{
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        })(000000,999999)


        await sendEmail(verifyCode,email)

        return res.status(200).send({"message":"Código de verificação enviado"})  


       
    }catch(error){
        return res.status(400).send({"mensagem":error})
    }
    
        
}

exports.sendEmail = async(req,res)=>{

    const {email} = req.body
    const emailValues = {"email":email}
    const emailErros = await handlingErrors.validateEmail(emailValues)

    if(emailErros){
        return res.status(400).send({"erros":emailErros})
    }

    /*const exist = await User.findOne({"email":email})
    
    if(exist){

        return res.status(400).send({"error": "Este email já está cadastrado!"})    
    }*/


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

exports.verifyCode = async(req,res)=>{
    try{
        const {email, code} = req.body
        const token = jwt.sign({
            _id: user._id,
            email: email
        },process.env.JWT_KEY,{
            expiresIn: "10h"
        })
        return res.status(200).send({"token":token})
    }catch(error){

    }
}

exports.verifyCodeCad = async(req,res)=>{

}



exports.login = async(req,res)=>{
    try{

        const {email} = req.body
        const emailValues = {"email":email}
        const emailErros = await handlingErrors.validateEmail(emailValues)

        if(emailErros){
            return res.status(400).send({"erros":emailErros})
        }

        
        const exist = await User.findOne({"email":email})
      
        if(!exist){

            return res.status(400).send({"error": "E-mail não encontrado"})    
        }

        return res.status(200).send({"message": true})    

    }catch(error){
        return res.status(400).send({"mensagem":error._message})
    }
}





