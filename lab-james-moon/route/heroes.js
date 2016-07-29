'use strict';
const express = require('express');
const heroRouter = express.Router();
const Hero = require('../model/hero');
const AppError = require('../model/error');
let heroStorage = require('../lib/heroStorage');

heroRouter.get('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    return res.sendError(AppError.status404('not found'));
  }
  if (heroStorage[req.params.id]) {
    let heroId = req.params.id;
    return res.status(202).json(heroStorage[heroId]);
  }
});

heroRouter.get('/hero/', (req, res) => {
  return res.sendError(AppError.status400('bad request'));
});

heroRouter.post('/hero', (req, res) => {
  if (req.body.name === undefined || req.body.race === undefined || req.body.faction === undefined) {
    return res.sendError(AppError.status400('bad request'));
  }

  let newHero = new Hero(req.body.name, req.body.race, req.body.faction);
  if (req.body.name !== newHero.name || req.body.race !== newHero.race || req.body.faction !== newHero.faction) {
    return res.sendError(AppError.status500('internal server error'));
  }

  heroStorage[newHero.id] = newHero;
  if (heroStorage[newHero.id]) {
    console.log('added ' + newHero.name + ': ' + newHero.id);
    return res.status(202).json(heroStorage[newHero.id]);
  }
});

heroRouter.put('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    if (req.body.name === undefined || req.body.race === undefined || req.body.faction === undefined) {
      return res.sendError(AppError.status500('internal server error'));
    }
    return res.sendError(AppError.status400('bad request'));
  }
  if (req.body.name) heroStorage[req.params.id].name = req.body.name;
  if (req.body.race) heroStorage[req.params.id].race = req.body.race;
  if (req.body.faction) heroStorage[req.params.id].faction = req.body.faction;
  return res.status(202).json(heroStorage[req.params.id]);
});

heroRouter.delete('/hero/:id', (req, res) => {
  if (!heroStorage[req.params.id]) {
    if(req.params.id === undefined) {
      return res.sendError(AppError.status500('internal server error'));
    }
    return res.sendError(AppError.status400('error bad request'));
  }
  if (req.params.id === heroStorage[req.params.id].id) {
    console.log(heroStorage[req.params.id]);
    delete heroStorage[req.params.id];
    return res.status(202).json({msg: 'deleted hero'});
  }
});

module.exports = heroRouter;
