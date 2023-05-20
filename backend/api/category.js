module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, validID } = app.api.validation

    const save = (req, res) => {//salva e atualiza as categorias
        const category =  {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }//evitar se receber mais que o necessario {...req.body}<--sem filtro
        if(req.params.id) category.id = req.params.id
        try {
            existsOrError(category.name, 'Nome não informado')
        } catch(msg) {
            return res.status(500).send(msg)
        }

        if(category.id) {
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(()=> res.status(2004).send(category))
                .catch(erro => res.status(500).send(erro))
        } else {
            app.db('categories')
                .insert(category)
                .then(()=> res.status(2004).send(category))
                .catch(erro => res.status(500).send(erro))
        }
    }

    const remove = async (req, res) => {
        try {
            validID(req.params.id, "ID incorreto")
            
            const subCategory = await app.db('categories')
                .where({ parentId: req.params.id }) //se tiver o id em umcampo de uma sub, nao pode
            
            notExistsOrError(subCategory, 'Possui subcategorias')


            const articles = await app.db('articles')
                .where({ categoryId: req.params.id})

            notExistsOrError(articles, 'Categoria relacionada a artigos')


            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id})
                .del()
            
            existsOrError(rowsDeleted, 'Categoria não encontrada')

            res.status(204).send()


        } catch (msg){
            return res.status(400).send(msg)
        }
    }



    const withPath = categories => {//para o front, mostrar: reactive > intalacao > windows
        const getParent = (categories, parentId) => {
            let parent = categories.filter(parent => {
                return parent.id === parentId
            })

            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a,b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }


    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(erro => res.status(500).send(erro))
    }


    const getByID = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id }).first()//nao manda um array
            .then(category => res.json(category))
            .catch(erro => res.status(500).send(erro))
    }



    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getByID, get, getTree }
}