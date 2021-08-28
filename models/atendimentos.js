const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento{

    adiciona(atendimento, res){
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
        const data = moment(atendimento.data, "DD/MM/AAAA").format("YYYY-MM-DD HH:MM:SS")
        const { cliente, pet, servico, status, observacoes } = atendimento    
        
        console.log(atendimento)
        console.log(data)
        console.log(dataCriacao)

        const sql = 'INSERT INTO Atendimentos ' +  
                    ' (id, cliente, pet, servico, status, observacoes, data, datacriacao ) ' +
                    ' VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING id'
        conexao.query(sql, [cliente, pet, servico, status, observacoes, data, dataCriacao], (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultados)
            }

        } )

    }
    
}

module.exports = new Atendimento
