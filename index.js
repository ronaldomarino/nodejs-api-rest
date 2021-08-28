const customExpress = require('./config/customExpress') 
const conexao = require("./infraestrutura/conexao")
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    Tabelas.init(conexao)

    const app = customExpress()
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  }); 
