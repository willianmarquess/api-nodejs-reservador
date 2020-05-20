const Connection = require('../util/Connection');
const con = Connection.getConnection();


const listarCidades = (request, response) => {

    con.query('select c.id_cidade, c.nome_cidade, e.sigla_estado from cidade c, estado e where c.id_estado = e.id_estado order by c.nome_cidade')
        .then((results) => {
            response.status(200).json(results.rows);
        })
        .catch((error) => {
            console.log(error);
            response.status(200).json({ msg: 'Erro ao Listar as Cidades' });
        });
}

module.exports = {listarCidades};