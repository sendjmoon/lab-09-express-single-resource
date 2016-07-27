'use strict';

let res = module.exports = exports = function(err, req, res, next) {
  res.sendError(err, req, res, next);
};

res.prototype.sendError = function(err, req, res, next) {
  console.log(err.message);
  res.statusCode(err.statusCode).send(err.message);
};
