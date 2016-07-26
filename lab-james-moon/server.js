'use strict';
const express = require('express');
const heroRouter = require('./route/heroes');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', heroRouter);
app.use('*', (err, req, res, next) => {
  console.log(err);
  res.status(500).render('error', {error: err});
});

app.listen(3000, () => console.log('server is up'));
