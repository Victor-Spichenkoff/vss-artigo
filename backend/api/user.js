const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt =  bcrypt.genSaltSync(10)//tempero, cada senha tem um hash diferente

        return bcrypt.hashSync(password, salt)
    }


    const save = async (req, res) => {//inserir e atualizar
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id//quer atualizar ele

        // if(!req.originalUrl.startsWith('/users')) user.admin = false
        // if(!req.user || req.user.admin) user.admin = false

        try {//validacoes
            existsOrError(user.name, 'nome não informado')
            existsOrError(user.email, 'email não informado')
            existsOrError(user.password, 'senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword)

            //db foi passado para o app(app.db=db)
            const userFromDB = await app.db('users')//acessa a tabela users
                .where({ email: user.email }).first()//filtra e pega o primeiro
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch (msg){
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: req.params.id })
                .whereNull('deletedAt')
                .then(() => res.status.status(204).send())//tudo certo
                .catch(erro => res.status(500).send(erro))//erro no servidor
                console.log('atualizar')
        } else {//inserir
            app.db('users')
                .insert(user)
                .then(() => res.status(204).send())
                .catch(erro => res.status(500).send(erro))
        }

    }


    const get = (req, res) => {//pegar todos os usurários (evoluir e colocar paginação)
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            // .whereNull('deletedAt')
            .then(users => {
                res.json(users)
            })
            .catch(erro => res.status(500).send(erro))
    }


    const getByID = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id }).first()//nao manda um array
            .whereNull('deletedAt')
            .then(user => res.json(user))
            .catch(erro => res.status(500).send(erro))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
                notExistsOrError(articles, 'Usuário ligado a algum artigo')

                const rowsUpdated = await app.db('users')
                    .delete()//({deleteAt: new Date()})
                    .where({ id: req.params.id })

                existsOrError(rowsUpdated, 'Usuário não encontrado')

                res.status(204).send()
        } catch(e) {
            res.send(e).status(400)
        }
    }



    return { save, get, getByID, remove }//retorna as funcoes que queira usar fora
}



//Teste externo
// {
//     "name": "Testador",
//     "email": "testar@gmail.com",
//     "password": 12345,
//     "confirmPassword": 12345,
//     "admin": true
// }

//teste postman
// {
//     "name": "Victor Spichenkoff",
//     "email": "vss@gmail.com",
//     "password": "12345",
//     "confirmPassword": "12345",
//     "admin": true
// }

// {
//     "name": "Emma",
//     "confirmPassword": 12345,
//     "email": "emma@gmail.com",
//     "password": 12345,
//     "admin": true
// }