const moment = require('moment'); //biblioteca utilizada para formatar a data
const conexao = require('../infra/conexao');
const axios = require('axios');

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const dataValida = moment(dataAgendamento).isSameOrAfter(dataCriacao); //verifica se a data de agendamento é a mesma ou após a data de criação
        const clienteValido = atendimento.cliente.length >= 3;
        const validacoes = [{
                nome: 'data',
                mensagem: 'Data deve ser maior ou igual a data atual!',
                valido: dataValida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve ter pelo menos 3 caracteres!',
                valido: clienteValido
            },
        ];
        const erros = validacoes.filter(campo => !campo.valido);
        const existeErro = erros.length;

        if (existeErro) {
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, dataAgendamento };

            const sql = `INSERT INTO atendimentos SET ? `;

            conexao.query(sql, atendimentoDatado, (erro, result) => {
                if (erro) {
                    res.status(400).json(erro); //400 bad request
                } else {
                    res.status(200).json(atendimento); //201 created
                }
            });
        }
    };

    lista(res) {
        const sql = `SELECT * FROM atendimentos;`;

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(result);
            }
        });
    };

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id};`;

        conexao.query(sql, async(erro, result) => {
            const atendimento = result[0];
            const cpf = atendimento.cliente;

            if (erro) {
                res.status(400).json(erro);
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                atendimento.cliente = data;
                res.status(200).json(atendimento);
            }
        });
    };

    altera(id, valores, res) {
        valores.dataAgendamento ? valores.dataAgendamento = moment(valores.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss') : null;

        const sql = `UPDATE atendimentos SET ? WHERE id=?;`;

        conexao.query(sql, [valores, id], (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id });
            }
        });
    };

    deleta(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id = ?;`;

        conexao.query(sql, id, (erro, result) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({ id });
            }
        });
    }
}

module.exports = new Atendimento;