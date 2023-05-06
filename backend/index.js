const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('./config/mongodb')

const db = require('./config/db')//acesso pelo knex

app.db = db
app.mongoose = mongoose

const consign = require('consign')
consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')//recebe app(parametro, a intancia)
    .then('./api/validation.js')//colocar ele para evitar o erro de não carregar
    .then('./api')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)// pass para a funcao o app

//middlewares
require('./config/middlewares')





app.listen(2006, () => {console.log('Servidor Iniciado, porta 2006')})