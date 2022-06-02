const express = require("express")
const app = express()

const userRouter = require("./routes/userRoute")
const deepRouter = require("./routes/deepRoute")
const routeRouter = require("./routes/routeRoute")
const bathymetryRouter = require("./routes/bathymetryRoute")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/user",userRouter)
app.use("/deep", deepRouter)
app.use("/route", routeRouter)
app.use("/bathymetry",bathymetryRouter)

app.use((req,res,next) =>{
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


module.exports = app