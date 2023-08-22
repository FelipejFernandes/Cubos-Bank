const authenticator = (req, res, next) => {
    const { senha_banco } = req.query

    if (senha_banco === '123') {
        return next()
    }

    return res.status(401).json({ "menssage": "O usuário não está autenticado" })
}

module.exports = authenticator