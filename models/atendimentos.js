const moment = require('moment'); //biblioteca utilizada para formatar a data
const conexao = require('../infra/conexao');

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const atendimentoDatado = {...atendimento, dataCriacao, data };
        const sql = 'INSERT INTO atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (erro, result) => {
            if (erro) {
                res.status(400).json(erro); //400 bad request
            } else {
                res.status(201).json(result); //201 created
            }
        })
    };
}

module.exports = new Atendimento;