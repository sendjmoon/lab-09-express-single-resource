'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const bodyParser = require('body-parser');
const AppError = require('./model/error');
let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', heroRouter);
// app.use('*', AppError);
// app.use('*', function(err, req, res) {
//   AppError(err, req, res);
// });

app.listen(3000, () => console.log('server is up'));
