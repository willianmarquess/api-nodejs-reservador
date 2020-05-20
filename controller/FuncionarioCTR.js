const Connection = require('../util/Connection');
const con = Connection.getConnection();

const cadastrarFuncionario = (request, response) => {

    const funcionario = request.body;

    con.query('INSERT INTO funcionario(nome_funcionario, rg_funcionario, cpf_funcionario, cargo_funcionario, endereco_funcionario, empresa_funcionario, usuario_funcionario, cidade_funcionario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id_funcionario;', [funcionario.nome_funcionario, funcionario.rg_funcionario, funcionario.cpf_funcionario, funcionario.cargo_funcionario, funcionario.endereco_funcionario, funcionario.empresa_funcionario,
            funcionario.usuario_funcionario, funcionario.cidade_funcionario
        ])
        .then((results) => {
            response.status(201).json({ msg: 'Funcionário cadastrado com sucesso ' + results.rows[0].id_funcionario });
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao cadastrar Funcionário' });
        });
};

const listarPorUsuario = (request, response) => {
    const id_usuario = parseInt(request.params.id_usuario);
    console.log(id_usuario);


    con.query('select * from funcionario where usuario_funcionario = $1', [id_usuario]).then(results => {
        response.status(200).json(results.rows);
    }).catch(error => {
        console.log(error);
        response.status(200).json({ msg: 'Erro ao listar Funcionário' });
    });
}

const alterarFuncionario = (request, response) => {

    const funcionario = request.body;
    const id_funcionario = parseInt(request.params.id_funcionario);


    con.query('UPDATE funcionario SET nome_funcionario=$1, rg_funcionario=$2, cpf_funcionario=$3, cargo_funcionario=$4, empresa_funcionario=$5 WHERE id_funcionario =$6 returning id_funcionario', [funcionario.nome_funcionario, funcionario.rg_funcionario, funcionario.cpf_funcionario, funcionario.cargo_funcionario,
            funcionario.empresa_funcionario, id_funcionario
        ])
        .then((results) => {
            response.status(201).json({ msg: 'Funcionário alterado com sucesso ' + results.rows[0].id_funcionario });
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao alterar Funcionário' });
        });
};



const listarFuncionario = (request, response) => {

    con.query('select * from funcionario')
        .then((results) => {
            response.status(200).json(results.rows);
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao Listar os Funcionários' });
        });
}




module.exports = { cadastrarFuncionario, listarPorUsuario, listarFuncionario, alterarFuncionario };