module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createAt: Date
    })


    const get =(req, res) => {
        Stat.findOne({}, {}, { sort: {'createdAt': -1} })//filtro, selecionar atributos, 
            .then(stat => res.json(stat))
    }


    return { Stat, get }

    const users = app.db('users')
        .count('id')

}