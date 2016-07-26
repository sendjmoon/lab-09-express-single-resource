'use strict';

module.exports = function AppError(err, req, res, next) {
  if(err) {
    console.log(err);
  }
};
