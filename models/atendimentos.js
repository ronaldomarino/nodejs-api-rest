const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento{

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'
                    
        conexao.query(sql, (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados.rows)
            }
        } ) 
    }

    buscarPorId(id, res){
        const sql = 'SELECT * FROM Atendimentos WHERE id=$1'

        conexao.query(sql, [id], (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                const resultado = resultados.rows[0]
                res.status(200).json(resultado)
            }
        })
    }

    adiciona(atendimento, res){
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS")
        const data = moment(atendimento.data, "DD/MM/AAAA").format("YYYY-MM-DD HH:MM:SS")
        const { cliente, pet, servico, status, observacoes } = atendimento    

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = cliente.length >=5

        const validacoes = [
            {   
                nome: 'data',
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }     
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO Atendimentos ' +  
                    ' (id, cliente, pet, servico, status, observacoes, data, datacriacao ) ' +
                    ' VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING id'
                    
            conexao.query(sql, [cliente, pet, servico, status, observacoes, data, dataCriacao], (erro, resultados) => {
                if (erro){
                    res.status(400).json(erro)
                } else {
                    const id = resultados.rows[0].id
                    res.status(201).json({...atendimento, id})
                    console.log({...atendimento, id})
                    //res.status(201).json(id)
                }
            } )            
        }         
    } 
    
    altera(id, valores, res){
        const data = moment(valores.data, "DD/MM/AAAA").format("YYYY-MM-DD HH:MM:SS")

        const sql = 'UPDATE Atendimentos SET data = $1 WHERE id=$2'

        conexao.query(sql, [data, id], (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                //const resultado = resultados.rows[0]
                res.status(200).json({...valores, id})
            }
        } ) 
    }

    exclui(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=$1'

        conexao.query(sql, [id], (erro, resultados) => {
            if (erro){
                res.status(400).json(erro)
            } else {
                //const resultado = resultados.rows[0]
                res.status(200).json({id})
            }
        } ) 
    }
}

module.exports = new Atendimento
