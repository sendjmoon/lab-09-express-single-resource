'use strict';

let AppError = module.exports = exports = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.isAppError = function(err) {
  return err instanceof AppError;
};

AppError.status400 = function() {
  return new AppError('bad request', 400, 'that\'s a bad request');
};

AppError.status404 = function() {
  return new AppError('not found', 404, 'that page does not exist');
};

AppError.status500 = function() {
  return new AppError('internal error', 500, 'internal service error');
};
