const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');
conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        console.log('**********CONEXÃO COM DB EFETUADA**************');

        Tabelas.init(conexao);
        const app = customExpress();
        const PORT = 3000;

        app.listen(PORT, () => {
            console.log('SERVIDOR RODANDO NA PORTA:', PORT);
        });
    }


});