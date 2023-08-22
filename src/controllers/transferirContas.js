const validacoes = require("../functions/validacoes")
const { format } = require("date-fns")
const fs = require("fs/promises")

const transferirContas = async (req, res) => {
    const { origem, destino, senha, transferencia } = req.body
    if (origem === undefined || destino === undefined || senha === undefined || transferencia === undefined) {
        res.status(400).json({ "mensagem": "Todos os campos devem ser informados" })
    }

    if (!validacoes.contaExiste(origem)) {
        res.status(400).json({ "mensagem": "Conta de origem não existe" })
    }
    if (!validacoes.contaExiste(destino)) {
        res.status(400).json({ "mensagem": "Conta de destino não existe" })
    }

    try {
        const leitura = await fs.readFile("./src/bancodedados.json")
        const objetoLeitura = JSON.parse(leitura)
        objetoLeitura.contas.find((contaOrigem) => {
            if (contaOrigem.numero === origem && contaOrigem.usuario.senha === senha && (contaOrigem.saldo - transferencia * 100 >= 0)) {
                contaOrigem.saldo -= Number(transferencia * 100)
                objetoLeitura.contas.find((contaDestino) => {
                    if (contaDestino.numero === destino) {
                        contaDestino.saldo += Number(transferencia * 100)
                    }
                })
            }
        })
        objetoLeitura.transferencias.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta_origem: origem,
            numero_conta_destino: destino,
            valor: transferencia * 100
        })

        const escrita = JSON.stringify(objetoLeitura)
        await fs.writeFile("./src/bancodedados.json", escrita)
        return res.status(200).json({ "mensagem": "Transferência realizada com sucesso!" })

    } catch (erro) {
        res.status(400).json(erro)
    }
}

module.exports = transferirContas