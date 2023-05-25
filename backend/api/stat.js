module.exports = app => {
    //     const Stat = app.mongoose.model('Stat', {
    //         users: Number,
    //         categories: Number,
    //         articles: Number,
    //         createdAt: Date
    //     })

    // const get = (req, res) => {
    //     Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
    //         .then(stat => {
    //             const defaultStat = {
    //                 users: 0,
    //                 categories: 0,
    //                 articles: 0
    //             }
    //             res.json(stat || defaultStat)
    //         })
    // }

    // return { Stat, get }
    let stats = {}
    const get = (req, res) => {
        app.db('articles')
            .count('id')
            .first()
            .then(res => {
                stats.articles = parseInt(res.count)
            })
        app.db('users')
            .count('id')
            .first()
            .then(res => {
                stats.users = parseInt(res.count)
            })

        app.db('categories')
            .count('id')
            .first()
            .then(res => {
                stats.categories = parseInt(res.count)
                
            })

            res.send(stats)
    }
    let Stat = {...stats}

    return { get, Stat }
    
    // const users = app.db('users')
    // .count('id')
    
    // return { Stat, get }
}