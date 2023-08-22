const validacoes = require("../functions/validacoes")

const autenticarAtualizacao = (req, res, next) => {
    const numeroConta = req.params.numeroConta
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!req.body) {
        return res.status(400).json({ "mensagem": "Digite algum campo para atualizar" })
    }

    if (!validacoes.validarNumeroConta(numeroConta)) {
        return res.status(400).json({ "mensagem": "Número de conta inválido" })
    }

    if (!validacoes.contaExiste(numeroConta)) {
        res.status(400).json({ "mensagem": "Não existe nenhuma conta com este número" })
    }
    if (cpf) {
        if (validacoes.existeCPF(cpf)) {
            return res.status(400).json({ "mensagem": "Já existe um CPF cadastrado" })
        }
    }

    if (email) {
        if (validacoes.existeEmail(email)) {
            return res.status(400).json({ "mensagem": "Já existe um email cadastrado" })
        }

        if (!validacoes.validarEmail(email)) {
            return res.status(400).json({ "mensagem": "Digite um email válido" })
        }
    }


    if (!validacoes.validarNome(nome)) {
        return res.status(400).json({ "mensagem": "Digite um nome válido" })
    }



    if (!validacoes.validarSenha(senha)) {
        return res.status(400).json({ "mensagem": "Senha inválida" })
    }


    if (!validacoes.validarData(data_nascimento)) {
        return res.status(400).json({ "mensagem": "Data nascimento inválida" })
    }


    if (!validacoes.validarTelefone(telefone)) {
        return res.status(400).json({ "mensagem": "Telefone inválido" })
    }

    next()
}

module.exports = autenticarAtualizacao