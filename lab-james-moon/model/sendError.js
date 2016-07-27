'use strict';
const AppError = require('./error');

let sendError = module.exports = exports = function(error) {
  return function(req, res, next) {
    console.log('entered error');
  };
};
