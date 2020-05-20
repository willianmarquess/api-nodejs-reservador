const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const porta = 3000;
const cors = require('cors');
const roteador = require('./rotas/Roteador');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(roteador);

var jwt = require('jsonwebtoken');
var token = jwt.sign({ user: 'will' }, 'shhhhh', {
    expiresIn: 300 //expira em 5min
});

jwt.verify(token, 'shhhhh', (err, decoded) => {
    if (err) {
        console.log(err);

    }
    console.log(decoded);
});


console.log(token);


app.listen(porta, () => {
    console.log('rodando');

});