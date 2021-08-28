const customExpress = require('./config/customExpress') 
const conexao = require("./infraestrutura/conexao")

conexao.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    const app = customExpress()
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  }); 
