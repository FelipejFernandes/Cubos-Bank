const fs = require("fs/promises")

const criarContas = async (req, res) => {
    try {
        const leituraBanco = await fs.readFile("./src/bancodedados.json")
        const objetoBanco = JSON.parse(leituraBanco)
        objetoBanco.contas.push({
            numero: (objetoBanco.contas.length + 1).toString(),
            saldo: 0,
            usuario: req.body
        })
        const registro = JSON.stringify(objetoBanco)
        await fs.writeFile("./src/bancodedados.json", registro)
        return res.status(201).json(objetoBanco.contas[objetoBanco.contas.length - 1])
    } catch (erro) {
        return res.status(400).json(erro)
    }

}


module.exports = criarContas