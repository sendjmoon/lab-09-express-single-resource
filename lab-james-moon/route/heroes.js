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
  console.log(newHero.id);
  heroes[newHero.id] = newHero;
  console.log(heroes);
  res.status(202).json({msg: heroes[newHero.id]});
});

router.post('/hero/:name/:race/:faction', (req, res) => {
  let newHero = new Hero(req.params.name, req.params.race, req.params.faction);
  console.log(newHero.id);
  heroes[newHero.id] = newHero;
  console.log(heroes);
  res.status(202).json({
    msg: 'Hero created',
    name: req.params.name});
});

module.exports = router;
