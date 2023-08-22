const fs = require("fs/promises")

const atualizarContas = async (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email } = req.body
    try {
        const leitura = await fs.readFile("./src/bancodedados.json")
        const objLeitura = JSON.parse(leitura)
        const cadAtualizar = objLeitura.contas.find((conta) => { return conta.numero === numeroConta })
        if (nome) {
            cadAtualizar.usuario.nome = nome
        }
        if (cpf) {
            cadAtualizar.usuario.cpf = cpf
        }
        if (data_nascimento) {
            cadAtualizar.usuario.data_nascimento = data_nascimento
        }
        if (telefone) {
            cadAtualizar.usuario.telefone = telefone
        }
        if (email) {
            cadAtualizar.usuario.email = email
        }
        const escrita = JSON.stringify(objLeitura)
        fs.writeFile("./src/bancodedados.json", escrita)
        res.status(200).json({ "mensagem": "Conta atualizada com sucesso!" })

    } catch (erro) {
        res.status(400).json(erro)
    }

}

module.exports = atualizarContas
