const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha')
        } 


        //pega o usuario
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
            .then(u => u)
            .catch(e => res.send(e))
            
            
            
            if(!user) return res.status(400).send('Usuário não encontrado')
            
            //verificar a senha
        // try {
            const isMatch = bcrypt.compareSync(req.body.password.toString(), user.password)

            
        // }catch(e){console.log("ERRO: " +e)}



        if(!isMatch) return res.status(403).send('Usuário ou senha incorretos')

        //gerar o payload e token
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 30)//3 dias(30 dias para teste)
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
            // console.log('Token: '+e)
            // res.status(408)
            return res.send(false)
            //não precisa responder
        }

        res.send(false)
    }




    return { signin, validateToken }
}

