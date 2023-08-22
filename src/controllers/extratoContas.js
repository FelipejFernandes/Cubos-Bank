const validacoes = require("../functions/validacoes")
const bancodedados = require("../bancodedados.json")

const extratoContas = (req, res) => {
    const { numero_conta, senha } = req.query
    if (numero_conta === undefined && senha === undefined) {
        return res.status(400).json({ "mensagem": "Informe o número da conta e a senha!" })
    }

    if (!validacoes.contaExiste(numero_conta)) {
        return res.status(400).json({ "mensagem": "A conta informada não existe" })
    }

    if (!validacoes.validarSenha(senha)) {
        return res.status(400).json({ "mensagem": "A senha informada é inválida" })
    }

    const movDaConta = {
        deposistos: bancodedados.depositos.filter((deposistos) => {
            return deposistos.numero_conta === numero_conta
        }),
        saques: bancodedados.saques.filter((saques) => {
            return saques.numero_conta === numero_conta
        }),
        transeferenciasEnviadas: bancodedados.transferencias.filter((transferencias) => {
            return transferencias.numero_conta_origem === numero_conta
        }),
        transeferenciasRecebidas: bancodedados.transferencias.filter((transferencias) => {
            return transferencias.numero_conta_destino === numero_conta
        })
    }

    return res.status(200).json(movDaConta)
}

module.exports = extratoContas