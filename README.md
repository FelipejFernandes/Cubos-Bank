![](https://i.imgur.com/DpTyxRw.jpg)

# Desafio | Back-end - Módulo 2

Este projeto simula uma aplicação bancária. Nele, temos a tarefa de criar uma API que execute operações de CRUD. Em vez de optar por um banco de dados PostgreSQL, escolhemos escrever os dados em um arquivo .json para armazenar as informações de cada registro. Para atingir esse objetivo, utilizamos a biblioteca fs/promises e os métodos readFile e writeFile, juntamente com alguns comandos para converter dados entre JavaScript e JSON.

A API conta com os seguintes controladores:
![]([Imgur](https://i.imgur.com/Jxjo52i.png))

## Requisitos obrigatórios
A API teve que seguir alguns padroes:
-   Sua API deve seguir o padrão REST
-   Seu código deve estar organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, é esperado que ele tenha, no mínimo:
    -   Um arquivo index.js
    -   Um arquivo servidor.js
    -   Um arquivo de rotas
    -   Um pasta com controladores
-   Qualquer valor (dinheiro) deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)

## Endpoints
A API conta com os seguintes Endpoints:
![](https://i.imgur.com/Jxjo52i.png)


## Execução do projeto
1º) Faça um clone para a sua máquina 

2º) No vscode execute o comando: npm install 

3º) Abra o insomnia e crie as seguintes rotas:
![]([Imgur](https://i.imgur.com/1R5H15Q.png))

Claro, aqui está a correção:

## Entendendo os Endpoints:

1º) Criar contas: Este endpoint é responsável por criar um novo registro de conta no banco de dados.
Para fazer isso, o processo envolve as seguintes etapas:
- Abre o arquivo de banco de dados para leitura.
- Lê os dados do arquivo e os converte em objetos JavaScript.
- Adiciona a nova conta aos dados lidos.
- Para salvar as alterações, converte os dados JavaScript de volta para o formato JSON.
- Salva o registro atualizado no arquivo .json.

![](https://i.imgur.com/sm2dmSB.png)

2º) Listar Contas:
- Abre o arquivo de banco de dados para leitura.
- E responde a requisição com as contas
![](https://i.imgur.com/nPoabav.png)

3º) Atualizar conta:
- Abre o arquivo de banco de dados para leitura.
- Lê os dados do arquivo e os converte em objetos JavaScript.
- Valida se todos os dados enviados corresponde com a conta informada.
- Caso todos os dados forem corretos a conta é atualizada caso não é informado um erro.
- Salva o registro atualizado no arquivo .json.
![](https://i.imgur.com/fg56HmZ.png)

4º)Excluir conta:
- Abre o arquivo de banco de dados para leitura.
- Lê os dados do arquivo e os converte em objetos JavaScript.
- Valida se o número da conta enviada corresponde com a conta informada.
- Valida se a conta possuí saldo, caso sim, não excluí.
- Salva o registro atualizado no arquivo .json.
![](https://i.imgur.com/H8P24qc.png)

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
