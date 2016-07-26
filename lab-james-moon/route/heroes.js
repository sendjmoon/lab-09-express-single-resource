'use strict';
const express = require('express');
const router = express.Router();
const Hero = require('../model/hero');
const heroes = require('../model/herostorage');

router.get('/', (req, res) => {
  res.status(202).json({msg: 'this is the hero router speaking'});
});

router.get('/hero/:id', (req, res) => {
  let heroId = req.params.id;
  res.status(202).json({msg: heroes[heroId]});
});

router.post('/hero/:name/:race/:faction', (req, res) => {
  let newHero = new Hero(req.params.name, req.params.race, req.params.faction);
  console.log(newHero.id);
  heroes[newHero.id] = newHero;
  console.log(heroes);
  res.status(202).json({msg: 'hero created'});
});

module.exports = router;
