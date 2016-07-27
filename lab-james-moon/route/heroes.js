'use strict';
const express = require('express');
const heroRouter = express.Router();
const Hero = require('../model/hero');
const AppError = require('../model/error');
let heroStorage = require('../lib/heroStorage');

heroRouter.get('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    let error = AppError.status400();
    res.status(error.statusCode).send(error.responseMessage);
  }
  if (req.params.id === undefined) {
    let error = AppError.status500();
    res.status(error.statusCode).send(error.responseMessage);
  }
  if (heroStorage[req.params.id]) {
    let heroId = req.params.id;
    res.status(202).json({msg: heroStorage[heroId]});
  }
});

heroRouter.post('/hero', (req, res) => {
  if (req.body.name === undefined || req.body.race === undefined || req.body.faction === undefined) {
    let error = AppError.status400();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  let newHero = new Hero(req.body.name, req.body.race, req.body.faction);
  if (req.body.name !== newHero.name || req.body.race !== newHero.race || req.body.faction !== newHero.faction) {
    let error = AppError.status500();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  heroStorage[newHero.id] = newHero;
  if (heroStorage[newHero.id]) {
    console.log('added ' + newHero.name + ': ' + newHero.id);
    return res.status(202).json({msg: heroStorage[newHero.id]});
  }
});

heroRouter.put('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    let error = AppError.status400();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  if (req.body.name === undefined || req.body.race === undefined || req.body.faction === undefined) {
    let error = AppError.status500();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  if (req.body.name) heroStorage[req.params.id].name = req.body.name;
  if (req.body.race) heroStorage[req.params.id].race = req.body.race;
  if (req.body.faction) heroStorage[req.params.id].faction = req.body.faction;
  return res.status(202).json({hero: heroStorage[req.params.id]});
});

heroRouter.delete('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    let error = AppError.status400();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  if (req.params.id === undefined) {
    let error = AppError.status500();
    return res.status(error.statusCode).send(error.responseMessage);
  }
  res.status(202).json({msg: 'deleted ' + heroStorage[req.params.id].name});
  return delete heroStorage[req.params.id];
});

heroRouter.use('*', (req, res) => {
  let error = AppError.status404();
  return res.status(error.statusCode).send(error.responseMessage);
});

module.exports = heroRouter;
