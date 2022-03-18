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

const sendEmail = async function(phone,destinatary){

    await transporter.sendMail({
        text: `Confirmar o acesso do número ${phone} ao app?`,
        subject: "Verificação de conta",
        from: `Deep Analysis <${process.env.GMAIL_USER}`,
        to: destinatary
    })
}

module.exports = sendEmail