'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const AppError = require('./model/error');
const sendError = require('./model/sendError');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let app = express();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', heroRouter);

app.use('*', function(req, res, next) {
  res.sendError();
});

app.listen(3000, () => console.log('server is up'));
