'use strict';
const AppError = require('./error');

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(error) {
      if (AppError.isAppError(error)) {
        console.log('encountered AppError');
        return res.status(error.statusCode).send(error.message);
      }
      console.log('encountered a non AppError');
      return res.status(error.statusCode || 500).send(error.message);
    };
    next();
  };
};
