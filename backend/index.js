const express = require('express')
const app = express()


const db = require('./config/db')//acesso pelo knex

app.db = db

const consign = require('consign')
consign()
    .then('./config/middlewares.js')//recebe app(parametro, a intancia)
    .then('./api/validation.js')//colocar ele para evitar o erro de não carregar
    .then('./api')
    .then('./config/routes.js')
    .into(app)// pass para a funcao o app

//middlewares
require('./config/middlewares')





app.listen(2006, () => {console.log('Servidor Iniciado, porta 2006')})