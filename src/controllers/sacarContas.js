const validacoes = require("../functions/validacoes")
const { format } = require("date-fns")
const fs = require("fs/promises")

const sacarContas = async (req, res) => {
    const { numero, saque, senha } = req.body

    if (numero === undefined || saque === undefined || senha === undefined) {
        return res.status(400).json({ "mensagem": "Envie todos os campos: numero, saque, senha" })
    }

    if (!validacoes.contaExiste(numero)) {
        return res.status(404).json({ "mensagem": "Conta não encontrada" })
    }

    try {
        const leitura = await fs.readFile("./src/bancodedados.json")
        const objetoLeitura = JSON.parse(leitura)
        objetoLeitura.contas.find((contas) => {
            if (contas.numero === numero && contas.usuario.senha === senha && contas.saldo - saque * 100 >= 0) {
                contas.saldo -= saque * 100
            }
        })
        objetoLeitura.saques.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta: numero,
            valor: saque * 100
        })

        const escrita = JSON.stringify(objetoLeitura)
        await fs.writeFile("./src/bancodedados.json", escrita)
        return res.status(200).json({ "mesagem": "Saque realizado com sucesso!" })
    } catch (erro) {
        return res.status(400).json(erro)
    }
}

module.exports = sacarContas