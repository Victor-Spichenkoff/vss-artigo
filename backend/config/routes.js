const admin = require('./admin')


module.exports = app => {
    app.get('/teste', (req, res)=> res.send('Funcionando'))

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))
        // .delete(admin(app.api.user.remove))

        
    app.route('/users/:id')
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getByID))
        .delete(admin(app.api.user.remove))





    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))
    

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getByID)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

        app.route('/articles/:id')
            .all(app.config.passport.authenticate())
            .get(app.api.article.getByID)
            .delete(admin(app.api.article.remove))
            .put(admin(app.api.article.save))
 
 
            app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))



    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)


    app.route('/stats')
        // .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}


//testar login adm
// {
//     "email": "vss@gmail.com",
//     "password": 12345
// }

// bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlZpY3RvciBTcGljaGVua29mZiBTYW50YW5hIiwiZW1haWwiOiJ2c3NAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4MzIzNjk4NiwiZXhwIjoxNjgzNDk2MTg2fQ.OE6r5g4qH_1V3G-OE6DC0vK7UBxfZuiFShJhlF3mAr0


// {
//     "id": 2,
//     "name": "Victor",
//     "email": "v@gmail.com",
//     "admin": false
// } 
// {
//     "id": 2,
//     "name": "Victor",
//     "email": "v@gmail.com",
//     "admin": false,
//     "iat": 1683244641,
//     "exp": 1685836641,
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6IlZpY3RvciIsImVtYWlsIjoidkBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4MzI0NDY0MSwiZXhwIjoxNjg1ODM2NjQxfQ.TaYld2xbYlRXpFeGJNXAmONSDf0sOfNPiM423XJ7i54"
// }

//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlZpY3RvciBTcGljaGVua29mZiBTYW50YW5hIiwiZW1haWwiOiJ2c3NAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4NDI3MDQ3NSwiZXhwIjoxNjg2ODYyNDc1fQ._IYNUPkX0MBmU4Ecuk2uFz91Noxz1SwyLRIdTfSNS14