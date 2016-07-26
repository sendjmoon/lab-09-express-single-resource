'use strict';
const express = require('express');
const router = require('./route/heroes');
let app = express();

app.use('/api', router);
app.get('*', (req, res) => {
  res.status(404).json({msg: 'that page does not exist'});
});

app.listen(3000, () => console.log('server is up'));
