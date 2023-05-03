module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getByID)
        


    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)


    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)
    

    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getByID)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)


    app.route('/articles/:id')
        .get(app.api.article.getByID)
        .delete(app.api.article.remove)
        .put(app.api.article.save)

    app.route('/categories/:id/articles')
        .get(app.api.article.getByCategory)
}