const express = require("express")
const autenticacao = require("../middlewares/autenticacao")
const listarContas = require("../controllers/listarContas")
const autenticarCriacao = require("../middlewares/autenticarCriacao")
const criarContas = require("../controllers/criarContas")
const autenticarAtualizacao = require("../middlewares/autenticarAtualizacao")
const atualizarContas = require("../controllers/atualizarContas")
const excluirContas = require("../controllers/excluirContas")
const depositarContas = require("../controllers/depositarContas")
const sacarContas = require("../controllers/sacarContas")
const transferirContas = require("../controllers/transferirContas")
const saldoConta = require("../controllers/saldoContas")
const extratoContas = require("../controllers/extratoContas")

const app = express()

app.get("/contas", autenticacao, listarContas)
app.post("/contas", autenticarCriacao, criarContas)
app.put("/contas/:numeroConta/usuario", autenticarAtualizacao, atualizarContas)
app.delete("/contas/:numeroConta", excluirContas)
app.post("/transacoes/depositar", depositarContas)
app.post("/transacoes/sacar", sacarContas)
app.post("/transacoes/transferir", transferirContas)
app.get("/contas/saldo", saldoConta)
app.get("/contas/extrato", extratoContas)


module.exports = app