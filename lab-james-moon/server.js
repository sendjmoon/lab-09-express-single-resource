'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const AppError = require('./model/error');
const errorResponse = require('./model/error-response');
const jsonParser = require('body-parser').json();
const morgan = require('morgan');
let app = express();

app.use(errorResponse());
app.use(morgan('dev'));
app.use(jsonParser);
app.use('/api', heroRouter);

app.use((req, res) => {
  res.sendError(AppError.status404('not found'));
});

app.listen(3000, () => console.log('server is up'));
