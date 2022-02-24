const express = require("express")
const app = express()

const mongoose = require("./database/mongodb")


require('dotenv').config({path:'./.env'})
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

module.exports = app