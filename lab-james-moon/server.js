'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const errorResponse = require('./model/error-response');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let app = express();

app.use(errorResponse());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/api', heroRouter);


app.listen(3000, () => console.log('server is up'));
