const validacoes = require("../functions/validacoes")

const autenticarCriacao = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    if (!validacoes.validarNome(nome)) {
        return res.status(400).json({ "msg": "Digite um nome válido!" })
    }

    if (!validacoes.validarCaracteresCPF(cpf) || !validacoes.tamanhoCPF(cpf)) {
        return res.status(400).json({ "msg": "Digite um CPF válido!" })
    }

    if (validacoes.existeCPF(cpf)) {
        return res.status(400).json({ "msg": "Já existe um CPF cadastrado!" })
    }

    if (!validacoes.validarData(data_nascimento)) {
        return res.status(400).json({ "msg": "Digite uma data válida!" })
    }

    if (!validacoes.validarTelefone(telefone)) {
        return res.status(400).json({ "msg": "Digite um telefone válido!" })
    }

    if (!validacoes.validarEmail(email)) {
        return res.status(400).json({ "msg": "Digite um email válido!" })
    }

    if (validacoes.existeEmail(email)) {
        return res.status(400).json({ "msg": "Já existe um E-mail cadastrado!" })
    }

    if (!validacoes.validarSenha(senha)) {
        return res.status(400).json({ "msg": "Digite uma senha válida!" })
    }

    next()

}

module.exports = autenticarCriacao