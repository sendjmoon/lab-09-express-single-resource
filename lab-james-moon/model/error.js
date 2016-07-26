'use strict';

let AppError = module.exports = exports = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.status400 = function() {
  return new AppError('bad', 400, 'that\'s a bad request');
};

AppError.status404 = function() {
  return new AppError('dne', 404, 'that page does not exist');
};

// AppError.prototype.500 = function() {
//   this.messsage = 'internal error';
//   this.statusCode = 500;
//   this.responseMessage = 'Internal server error.';
// };
