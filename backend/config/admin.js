module.exports = middleware => {//recebe função
    return (req, res, next) => {
        try{
            if(true) {
                middleware(req, res, next)
            } else {
                res.status(401).send('Usuário não é administrador.')
            }
        } catch(e) {
            res.status(500).send('Erro no servidor')
        }
    }
}