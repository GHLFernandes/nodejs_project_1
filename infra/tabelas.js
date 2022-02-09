class Tabelas {
    init(conexao) {
        this.conexao = conexao;

        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
            id int NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(11) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            obs TEXT,
            dataAgendamento DATETIME NOT NULL,
            dataCriacao DATETIME NOT NULL,
            PRIMARY KEY(id));`;

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            } else {
                console.log('TABELA "Atendimentos" CRIADA COM SUCESSO!');
            }
        });
    };

    criarPets() {
        const sql = `CREATE TABLE IF NOT EXISTS pets (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(50),
            imagem VARCHAR(200),
            PRIMARY KEY(id)
        );`;

        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro);
            } else {
                console.log('TABELA "Pets" CRIADA COM SUCESSO!');
            }
        });
    };
}

module.exports = new Tabelas;