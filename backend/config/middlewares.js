//cuidar do body-parser e usar o "cors"
const bodyParser = require('body-parser')
const cors = require('cors')//permite o front consumir a API


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}