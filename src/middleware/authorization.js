const jwt = require("jsonwebtoken")
require('dotenv').config({path:'./.env'})


module.exports = (req,res,next)=>{
    try{
        if(!req.headers.authorization || req.headers.authorization.split(' ')[0] != "Bearer"){
            res.status(401).send({"error": "O token bearer de autenticação deve ser inserido!"})
        }

        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        req.user = decodedToken
        next()
    }catch(err){
        if(err.message == "jwt expired"){
            res.status(403).send({"error": "O token foi expirado! Por Favor, gere um novo token."})
        }
        if(err.message == "invalid signature"){
            res.status(401).send({"error": "Insira um token válido!"})
        }
        
        
    } 
}
