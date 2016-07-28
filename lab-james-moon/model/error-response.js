'use strict';

// let ResError = function(statusCode, message) {
//   this.statusCode = statusCode;
//   this.message = message;
// };

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(error) {
      console.log('wtf');
    };
    next();
  };
};
