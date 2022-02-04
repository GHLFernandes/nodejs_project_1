const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimento', (req, res) => {
        res.send("Rota de atendimento (GET) ");
    });

    app.post('/atendimento', (req, res) => {
        const atendimento = req.body;

        Atendimento.add(atendimento, res);
        console.log('*******ATENDIMENTO ENVIADO**********');
    })
}