const queries = require('./queries')


module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')
            existsOrError(article.userId, 'Autor não informada')
            existsOrError(article.content, 'Conteúdo não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        article.id = req.params.id

        if(req.params.id) {
            app.db('articles')
                .update(article)
                .where({ id: req.params.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(() => res.status(204).send())
                .catch((err) => res.status(400).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('articles')
                .where({ id: req.params.id })
                .del()

            existsOrError(rowsDeleted, 'Artigo não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }


    //paginacao

    const limit = 2

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('articles')
            .count('id').first()
        
        const count = parseInt(result.count)

        app.db('articles')
            .select('id','name', 'description')
            .limit(limit)
            .offset(page * limit - limit)//pular quantos 2 * 10 - 10 = começa no 10
            .then(articles => res.status(200).json({ data: articles, count, limit }))//os dois são pro front
            .catch(e => res.status(500).send(e))
    }

    const getByID = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(503).send(err))
    }



    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
 
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)//sql e o parametro

        const ids = categories.rows.map(c => c.id)//pega as linhas e retorna só o id (è um array)

        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl',
                { author: 'u.name' })
            .limit(limit)
            .offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id','desc')
            .then(articles => res.json(articles))
            .catch(e => res.status(500).send(e))
    } 


    return { save, remove, get, getByID, getByCategory }
}


//testes
// {
//     "name": "Testes 1",
//     "description": "testes",
//     "userId": 1,
//     "categoryId": 1,
//     "content": "Conteúdo"
// }