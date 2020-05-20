const Connection = require('../util/Connection');
const con = Connection.getConnection();
var jwt = require('jsonwebtoken');


const cadastrarUsuario = (request, response) => {

    const usuario = request.body;
    console.log(request.body);


    con.query('insert into usuario (email_usuario, senha_usuario, tipo_usuario) values ($1, $2, $3) returning id_usuario', [usuario.email_usuario, usuario.senha_usuario, usuario.tipo_usuario])
        .then((results) => {
            response.status(201).json({ msg: 'Usuário cadastrado com sucesso ' + results.rows[0].id_usuario });
        })
        .catch((error) => {
            console.log(error);
            response.status(204).json({ msg: 'Erro ao cadastrar Usuário' });
        });
};
const logarUsuario = (request, response) => {

    const usuario = request.body;

    con.query('select * from usuario where email_usuario=$1 and senha_usuario=$2', [usuario.email_usuario, usuario.senha_usuario])
        .then((results) => {
            if (results.rowCount > 0) {
                results.rows[0].token = jwt.sign({
                    email: results.rows.email_usuario,
                    senha: results.rows.senha_usuario
                }, 'shhhhh', {
                    expiresIn: 1800
                });

            } else {
                results.rows = null;
            }
            response.status(200).json(results.rows);
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao logar o usuário, login ou senha incorretos' });
        });
}

const alterarUsuario = (request, response) => {


    const usuario = request.body;
    const id_usuario = parseInt(request.params.id_usuario);

    con.query('UPDATE usuario SET senha_usuario=$1 WHERE id_usuario = $2 returning id_usuario', [usuario.senha_usuario, id_usuario])
        .then((results) => {
            response.status(201).json({ msg: 'Usuário alterado com sucesso ' + results.rows[0].id_usuario });
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao alterar Usuário' });
        });
};



const listarUsuario = (request, response) => {

    con.query('select * from usuario')
        .then((results) => {
            response.status(200).json(results.rows);
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao Listar os Usuários' });
        });
}



module.exports = { cadastrarUsuario, listarUsuario, alterarUsuario, logarUsuario };