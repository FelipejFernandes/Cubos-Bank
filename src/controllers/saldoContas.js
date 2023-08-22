const validacoes = require("../functions/validacoes")
const bancodedados = require("../bancodedados.json")

const saldoConta = (req, res) => {
    const { numero_conta, senha } = req.query
    if (numero_conta === undefined || senha === undefined) {
        return res.status(400).json({ "mensagem": "Forneca o número da conta e a senha" })
    }

    if (!validacoes.contaExiste(numero_conta)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada" })
    }

    if (!validacoes.validarSenha(senha)) {
        return res.status(404).json({ "mensagem": "Digite uma senha válida!" })
    }

    const { contas } = bancodedados

    const usuario = contas.find((conta) => { return (conta.numero === numero_conta) })
    if (usuario.usuario.senha === senha) {
        return res.status(200).json({ "saldo": usuario.saldo })
    } else {
        return res.status(404).json({ "mensagem": "Senha incorreta" })
    }
}

module.exports = saldoConta