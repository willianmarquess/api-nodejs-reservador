const roteador = require('express').Router();
const cidadectr = require('../controller/CidadeCTR');
const usuarioctr = require('../controller/UsuarioCTR');
const funcionarioctr = require('../controller/FuncionarioCTR');

//cidades
roteador.get('/cidade', cidadectr.listarCidades);

//usuario
roteador.post('/usuario', usuarioctr.cadastrarUsuario);
roteador.get('/usuario', usuarioctr.listarUsuario);
roteador.put('/usuario/:id_usuario', usuarioctr.alterarUsuario);
roteador.post('/usuarioLogin', usuarioctr.logarUsuario);

//funcionário
roteador.post('/funcionario', funcionarioctr.cadastrarFuncionario);
roteador.get('/funcionario', funcionarioctr.listarFuncionario);
roteador.get('/funcionarioUsuario/:id_usuario', funcionarioctr.listarPorUsuario)
roteador.put('/funcionario/:id_funcionario', funcionarioctr.alterarFuncionario);


roteador.post('/', () => {});
roteador.get('/', () => {});
roteador.put('/', () => {});
roteador.get('/', () => {});
roteador.delete('/', () => {});


function verificadorJWT(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'sem token na requisição' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = roteador;