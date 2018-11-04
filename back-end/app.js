const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./config/database');
db('mongodb://localhost:27017/loja-tenis');

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo deu errado ao processar sua requisição');
});

const Cadarco = require('./models/Cadarco');
const Funcionario = require('./models/Funcionario');
const Cargo = require('./models/Cargo');
const Marca = require('./models/Marca');
const Sola = require('./models/Sola');
const Tenis = require('./models/Tenis');
const Venda = require('./models/Venda');

const cadarcoRouter = require('./routes/CadarcoRoutes');
const funcionarioRouter = require('./routes/FuncionarioRoutes');
const cargoRouter = require('./routes/CargoRoutes');
const marcaRouter = require('./routes/MarcaRoutes');
const solaRouter = require('./routes/SolaRoutes');
const tenisRouter = require('./routes/TenisRoutes');
const vendaRouter = require('./routes/VendaRoutes');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/cadarcos', cadarcoRouter);
app.use('/funcionarios', funcionarioRouter);
app.use('/cargos', cargoRouter);
app.use('/marcas', marcaRouter);
app.use('/solas', solaRouter);
app.use('/tenis', tenisRouter);
app.use('/vendas', vendaRouter);

module.exports = app;
