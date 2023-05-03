const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || req.body.passord) {
            return res.status(400).send('Informe usuário e senha')
        } 

        //pega o usuario
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if(!user) return res.status(400).send('Usuário não informado')

        //verificar a senha
        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if(!isMatch) return res.status(401).send('Usuário ou senha incorretos')

        //gerar o payload e token
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)//3 dias
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }


    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)

                if(new Date(token.exp * 1000) > new Date()) {//volta a equiparar
                    return res.send(true)//ainda valido
                }
            }
        } catch(e) {
            //não precisa responder
        }

        res.send(false)
    }


    return { signin, validateToken }
}

