const fs = require("fs/promises")
const validacoes = require("../functions/validacoes")
const { format } = require("date-fns")

const depositarContas = async (req, res) => {
    const { numero, deposito } = req.body
    if (!numero && !deposito) {
        return res.status(404).json({ "mensagem": "Digite o número da conta e o Deposito" })
    }

    if (!validacoes.contaExiste(numero)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada!" })
    }

    if (deposito <= 0 || deposito === null) {
        return res.status(404).json({ "mensagem": "Valor do deposito inválido" })
    }

    try {
        const leitura = await fs.readFile("./src/bancodedados.json")
        const objetoLeitura = JSON.parse(leitura)
        objetoLeitura.contas.find((conta) => { if (conta.numero === numero) { conta.saldo += Number(deposito * 100) } })
        objetoLeitura.depositos.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta: numero,
            valor: deposito * 100
        })
        const escrita = JSON.stringify(objetoLeitura)
        await fs.writeFile("./src/bancodedados.json", escrita)
        return res.status(200).json({ "mensagem": "Depósito realizado com sucesso!" })
    } catch (erro) {
        return res.status(400).json({ erro })
    }
}

module.exports = depositarContas