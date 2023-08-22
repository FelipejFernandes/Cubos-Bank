const bancodedados = require("../bancodedados")

const listarContas = (req, res) => {
    const { contas } = bancodedados
    return res.status(200).json(contas)
}

module.exports = listarContas