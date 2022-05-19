const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();


//configuracion
app.set('port', process.env.PORT || 3002 );

//import databd
const {mongoose}= require('./database');

//archivos estaticos
//app.use(express.static(path.join(__dirname, '/build')));
//app.use(express.static(__dirname + '/build'));
app.use(express.static('./build/'));

//middlewear
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//rutas

app.use('/user', require('./Router/router.user'));
//app.use('/books', require('./router/roter.book'));
//app.use('/', require('./router/roter'));

//configuracion del server
app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
    
});