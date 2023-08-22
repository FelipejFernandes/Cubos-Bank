const bancodedados = require("../bancodedados.json")
const { parseISO, isValid } = require("date-fns")

const validacoes = {

    validarNome: function (nome) {
        const arrayNome = nome.split("")
        if (arrayNome.every((char) => { return char === " " }) || nome.length === 0) {
            return false
        } else {
            return true
        }
    },


    validarCaracteresCPF: function (cpf) {
        if (/^\d+$/.test(Number(cpf))) {
            return true
        } else {
            return false
        }
    },

    tamanhoCPF: function (cpf) {
        if (cpf.length === 11) {
            return true
        } else {
            return false
        }
    },

    existeCPF: function (cpf) {
        const contas = bancodedados.contas
        if (contas.find((conta) => { return conta.usuario.cpf === cpf })) {
            return true
        } else {
            return false
        }
    },

    validarData: function (data_nascimento) {
        const data = parseISO(data_nascimento)
        if (!isValid(data)) {
            return false
        } else {
            return true
        }
    },

    validarTelefone: function (telefone) {
        if (telefone.length !== 11 || !/^\d+$/.test(Number(telefone))) {
            return false
        } else {
            return true
        }

    },
    existeEmail: function (email) {
        const contas = bancodedados.contas
        if (contas.find((conta) => { return conta.usuario.email === email.trim() })) {
            return true
        } else {
            return false
        }
    },

    validarEmail: function (email) {
        const mail = email.trim()
        if (!mail.includes("@") && !mail.includes(".")) {
            return false
        }

        const arroba = mail.lastIndexOf("@")
        const ponto = mail.lastIndexOf(".")

        if (arroba > ponto) {
            return false
        }

        return true
    },

    validarSenha: function (senha) {
        const arraySenha = senha.split("")
        if (senha.length === 0 || arraySenha.every((char) => { return char === " " })) {
            return false
        } else {
            return true
        }
    },

    validarNumeroConta: function (conta) {
        if (/^\d+$/.test(Number(conta))) {
            return true
        } else {
            return false
        }
    },

    contaExiste: function (numeroConta) {
        const contas = bancodedados.contas
        if (contas.find((conta) => { return conta.numero === numeroConta })) {
            return true
        } else {
            return false
        }
    }
}

module.exports = validacoes 