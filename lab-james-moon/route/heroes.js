'use strict';
const express = require('express');
const heroRouter = express.Router();
const Hero = require('../model/hero');
const AppError = require('../model/error');
let heroStorage = require('../lib/heroStorage');

heroRouter.get('/hero/:id', (req, res) => {
  let heroId = req.params.id;
  if (!heroStorage[req.params.id]) {
    let error = AppError.status400();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  res.status(202).json({msg: heroStorage[heroId]});
});

heroRouter.post('/hero', (req, res) => {
  let newHero = new Hero(req.query.name, req.query.race, req.query.faction);
  console.log('added ' + req.query.name + ': ' + newHero.id);
  heroStorage[newHero.id] = newHero;
  res.status(202).json({msg: heroStorage[newHero.id]});
});

heroRouter.put('/hero', (req, res) => {
  console.log(heroStorage[req.query.id].name + ' changed to ' + req.query.name);
  heroStorage[req.query.id].name = req.query.name;
  res.status(202).json({
    msg: 'updated name to ' + req.query.name,
    hero: heroStorage[req.query.id]
  });
});

heroRouter.delete('/hero/:id', (req, res) => {
  console.log(req.params.id);
  console.log('deleted ' + heroStorage[req.params.id].name);
  res.status(202).json({msg: 'deleted ' + heroStorage[req.params.id].name});
  delete heroStorage[req.params.id];
});

heroRouter.get('*', (req, res) => {
  let error = AppError.status404();
  return res.status(error.statusCode).send(error.responseMessage);
});

module.exports = heroRouter;
