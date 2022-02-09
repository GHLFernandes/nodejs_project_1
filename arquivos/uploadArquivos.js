const fs = require('fs'); //file system
const path = require('path');
const { ping } = require('../infra/conexao');
//criação de imagem via buffer
/*fs.createReadStream('./assets/salsicha.jpg', (erro, buffer) => {
    console.log('imagem foi bufferizada');
    //console.log(buffer);

    fs.writeFile('./assets/salsicha2.jpg', buffer, (erro) => {
        console.log('Imagem Foi escrita');
    })
});

//criação de imagem via stream
fs.createReadStream('./assets/salsicha.jpg')
    .pipe(fs.createWriteStream('./assets/salsicha-stream.jpg'))
    .on('finish', () => console.log('Imagem escrita com sucesso'));
*/

module.exports = (caminho, nomeArquivo, callBackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho);
    const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if (!tipoValido) {
        const erro = 'Erro! Tipo é inválido!';
        console.log('Erro! Tipo inválido!');
        callBackImagemCriada(erro);
    } else {
        const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callBackImagemCriada(false, novoCaminho));

        console.log('PET criado com sucesso!');
    }
};