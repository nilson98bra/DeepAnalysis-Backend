const handlingErrors = require("../handling/handling")
const User = require("../models/user");
const {v4:uuid} = require("uuid")
const sendEmail = require("../config/smtp")
const moment = require("moment")
const jwt = require("jsonwebtoken")
require('dotenv').config({path:'./.env'})

function generateCode(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.cadUserEmail= async(req,res)=>{
    try{
        const {email} = req.body
        const emailValues = {"email":email}
        const emailErros = await handlingErrors.validateEmail(emailValues)

        if(emailErros.length !=0){
            return res.status(400).send({"mensagem":emailErros})
        }

        const exist = await User.findOne({$and:[
            {"email":email},
            {"provisionalRegistration":false}
        ]})
            
      
        if(exist){

            return res.status(400).send({"error": "Este email já está cadastrado."})    
        }

        const verifyCode = generateCode(100000,999999)

        const existProvisional = await User.findOne({"email":email},{"provisionalRegistration":true})
        
        if(existProvisional){
            await User.findOneAndUpdate({email:email},{verifyCode: verifyCode, verifyCodeDate:new Date().toISOString()})
        }
        else{

            await User.create({ 
                _id: uuid(),
                email: email,
                phone: "Default",
                nameUser: "Default",
                notifyInitBathymetry:false,
                notifyEndBathymetry:false,
                notifyObstacle:false,
                verifyCode: verifyCode,
                verifyCodeDate: new Date().toISOString(),
                tokenUser: "Default",
                refreshTokenUser: "Default",
                provisionalRegistration:true,
            })
        }

        await sendEmail(verifyCode,email)

        return res.status(201).send({"message":"Código de verificação enviado."}) 
    }
    catch(err){
        return res.status(400).send({"message":err})
    }
 
   
  
    
}

exports.sendEmail = async(req,res)=>{

    const {email} = req.body
    const emailValues = {"email":email}
    const emailErros = await handlingErrors.validateEmail(emailValues)

    if(emailErros.length !=0){
        return res.status(400).send({"mensagem":emailErros})
    }

    const verifyCode = generateCode(100000,999999)
    
    const user = await User.findOneAndUpdate({email:email},{verifyCode: verifyCode, verifyCodeDate:new Date().toISOString()},{new: true})
    
    if(user){
        await sendEmail(verifyCode,email)
        
        return res.status(200).send({"message":"Código de verificação enviado."})  
    }

    return res.status(404).send({"message":"E-mail não encontrado!"})  

}

exports.updateNameAndPhone = async(req,res)=>{
    try{
        const {nameUser, phone} = req.body
        const stringValues = {"nameUser":nameUser}
        const phoneValues = {"phone":phone}
        const stringErros = await  handlingErrors.validateString(stringValues, [15],[4])
        const phoneErros = await handlingErrors.validatePhoneNumber(phoneValues)
    
        const erros = stringErros.concat(phoneErros)
        
        if(erros.length != 0){
            return res.status(400).send({"mensagem":erros})
        }
    
        await User.findByIdAndUpdate({_id:req.user._id},{nameUser:nameUser, phone:phone})
        return res.status(200).send({"message": "Nome e telefone atualizados."})
    }catch(err){
        return res.status(400).send({"message":err})
    }

}

exports.cadUserEspec= async(req,res)=>{
    try{
        
    const {notifyInitBathymetry, notifyEndBathymetry, notifyObstacle} = req.body  
    const booleanValues = {"notifyInitBathymetry":notifyInitBathymetry,
    "notifyEndBathymetry":notifyEndBathymetry,"notifyObstacle":notifyObstacle}
    const booleanErros = await handlingErrors.validateBooleanValues(booleanValues)

    if(booleanErros.length != 0){
        return res.status(400).send({"mensagem":booleanErros})
    }

    await User.findByIdAndUpdate({_id:req.user._id},{ 
        notifyInitBathymetry: notifyInitBathymetry,notifyEndBathymetry:  notifyEndBathymetry,
        notifyObstacle: notifyObstacle})

    return res.status(201).send({"message": "Preferências Atualizadas."})
    }
    catch(err){
        return res.status(400).send({"message":err})
    }


}

exports.verifyCode = async(req,res)=>{
    
    try{
        const {email, code} = req.body
    const numericValues = {"code":code}
    const emailValues = {"email":email}
    const numericErros = await handlingErrors.validateNumericValues(numericValues, [6],[6])
    const emailErros = await handlingErrors.validateEmail(emailValues)

    const erros = numericErros.concat(emailErros)

    if(erros.length != 0){
        return res.status(400).send({"erros":erros})
    } 

    const user = await User.findOne({"email":email})
    if(user){
    
        let now = moment(new Date())
        const duration = moment.duration(now.diff(user.verifyCodeDate));

        if(user.verifyCode == code){

            if(duration.asMinutes()>8){
                return res.status(403).send({"erro":"Código Expirado!"})
            }

            const existProvisional = await User.findOne({"email":email},{"provisionalRegistration":true})
    
            if(existProvisional){
                await User.findOneAndUpdate({email:email},{provisionalRegistration:false})

                const token = jwt.sign({
                    _id: user._id,
                    email: email
                },process.env.JWT_KEY,{
                    expiresIn: "7d"
                })
                const refreshToken = jwt.sign({
                    _id: user._id,
                    email: email
                },process.env.JWT_REFRESH_KEY,{
                    expiresIn: "30d"
                })
                
                await User.findOneAndUpdate({email:email},{tokenUser:token, refreshTokenUser:refreshToken})

                return res.status(200).send({"token":token, "refreshToken":refreshToken, "nameUser": user.nameUser, "phone": user.phone})

            }
            
        }
        return res.status(401).send({"message":"Código Inválido!"})
    }
    return res.status(401).send({"message":"Esse e-mail não existe no sistema!"})
    }catch(err){
        return res.status(400).send({"message":err})
    }
    
    
}


exports.login = async(req,res)=>{
    try{
        const {email} = req.body
        const emailValues = {"email":email}
        const emailErros = await handlingErrors.validateEmail(emailValues)

        if(emailErros.length != 0){
            return res.status(400).send({"mensagem":emailErros})
        }

        const verifyCode = generateCode(100000,999999)
        const user = await User.findOneAndUpdate({$and:[
            {"email":email},
            {"provisionalRegistration":false}
        ]},{verifyCode: verifyCode, verifyCodeDate:new Date().toISOString()},{new: true})
    
        if(!user){
            return res.status(401).send({"error": "E-mail não encontrado"})    
        }
        await sendEmail(verifyCode,email)
            
        return res.status(200).send({
        "message":"Código de verificação enviado"})  
        
    }catch(err){
        return res.status(400).send({"message":err})
    }
}

exports.refreshToken = async(req,res)=>{
    try{
        const {refreshToken} = req.body;
        if(refreshToken.trim().length == 0){
            return res.status(400).send({"message":"Refresh Token está vazio!"})
        }
        try{   
            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
            const user = await User.findOne({refreshTokenUser:refreshToken})
            const token = jwt.sign({
                _id: user._id,
                email: user.email
            },process.env.JWT_KEY,{
                expiresIn: "7d"
            })
        
        await User.findOneAndUpdate({refreshTokenUser:refreshToken},{tokenUser: token})
        return res.status(200).send({"token":token, "refreshToken":refreshToken})
           
        }catch(err){
           
            res.status(403).send({"error": "Não autorizado! O refresh token foi expirado!"});
            
        }
    }catch(err){
       
        res.status(403).send({"error": err});
        
    }
    

    
}



