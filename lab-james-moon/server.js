'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const errorResponse = require('./model/error-response');
const jsonParser = require('body-parser').json();
const morgan = require('morgan');
let app = express();

app.use(errorResponse());
app.use(morgan('combined'));
app.use(jsonParser);
app.use('/api', heroRouter);


app.listen(3000, () => console.log('server is up'));
