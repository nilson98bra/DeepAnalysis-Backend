require('dotenv').config({path:'./.env'})
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls:{
        rejectUnauthorized: false
    }

})

const sendEmail = async function(code,destinatary){

    await transporter.sendMail({
        text: `Código de verificação: ${code}`,
        subject: "Verificação de conta",
        from: `Deep Analysis <${process.env.GMAIL_USER}`,
        to: destinatary
    })

   
}

module.exports = sendEmail