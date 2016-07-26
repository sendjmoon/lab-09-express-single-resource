'use strict';
const uuid = require('node-uuid');

module.exports = function Hero(name, race, faction) {
  this.id = uuid.v4();
  this.name = name;
  this.race = race;
  this.faction = faction;
};
