const fs = require("fs/promises")
const validacoes = require("../functions/validacoes")

const excluirContas = async (req, res) => {
    const { numeroConta } = req.params
    if (!validacoes.validarNumeroConta(numeroConta)) {
        return res.status(404).json({ "mensagem": "Número de conta inválida!" })
    }
    if (!validacoes.contaExiste(numeroConta)) {
        return res.status(404).json({ "mensagem": "A conta informada não existe" })
    }

    try {
        const leitura = await fs.readFile("./src/bancodedados.json")
        const objetoLeitura = JSON.parse(leitura)

        const achouConta = objetoLeitura.contas.find((conta) => { return conta.numero === numeroConta })
        if (achouConta.saldo !== 0) {
            res.status(400).json({ "mensagem": "A conta não pode ser excluída pois o saldo é diferente de zero" })
        } else {
            objetoLeitura.contas = objetoLeitura.contas.filter((conta) => { return conta.numero !== numeroConta })
            let escrita = JSON.stringify(objetoLeitura)
            await fs.writeFile("./src/bancodedados.json", escrita)
            return res.status(200).json({ "mensagem": "Conta excluída!" })
        }
    } catch (erro) {
        return res.status(400).json(erro)
    }

}

module.exports = excluirContas