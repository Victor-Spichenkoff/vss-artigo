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
            .then(users => {
                res.json(users)
            })
            .catch(erro => res.status(500).send(erro))
    }


    const getByID = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id }).first()//nao manda um array
            .then(user => res.json(user))
            .catch(erro => res.status(500).send(erro))
    }



    return { save, get, getByID }//retorna as funcoes que queira usar fora
}

//teste postman
// {
//     "name": "Victor Spichenkoff",
//     "email": "vss@gmail.com",
//     "password": "12345",
//     "confirmPassword": "12345",
//     "admin": true
// }