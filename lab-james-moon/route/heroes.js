'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Hero = require('../model/hero');
const heroes = require('../model/herostorage');

router.get('/', (req, res) => {
  res.status(202).json({msg: 'request /hero/id to search by id. request /hero?\'querystring\' to create a new hero. accepted parameters are name, race, and faction'});
});

router.get('/hero/:id', (req, res) => {
  let heroId = req.params.id;
  res.status(202).json({msg: heroes[heroId]});
});

router.post('/hero', (req, res) => {
  let newHero = new Hero(req.query.name, req.query.race, req.query.faction);
  console.log('added ' + req.query.name + ': ' + newHero.id);
  heroes[newHero.id] = newHero;
  res.status(202).json({msg: heroes[newHero.id]});
});

router.put('/hero', (req, res) => {
  console.log(heroes[req.query.id].name + ' changed to ' + req.query.name);
  heroes[req.query.id].name = req.query.name;
  res.status(202).json({
    msg: 'updated name to ' + req.query.name,
    hero: heroes[req.query.id]
  });
});

router.delete('/hero/:id', (req, res) => {
  console.log(req.params.id);
  console.log('deleted ' + heroes[req.params.id].name);
  res.status(202).json({msg: 'deleted ' + heroes[req.params.id].name});
  delete heroes[req.params.id];
});

module.exports = router;
