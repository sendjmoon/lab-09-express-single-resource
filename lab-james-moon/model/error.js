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
  return new AppError('not there', 404, 'that page does not exist');
};

AppError.status500 = function() {
  return new AppError('fucked', 500, 'internal service error');
};

// not closing the json string will throw an error 500 internal service error
// echo '{"msg": "hello"}' | http :3000/api/hero/
// json_parser.js
// const AppError = require('./app_error');

// module.exports = exports = function(statusCode, message) {
//   statusCode = statusCode || 400;
//   message = message || 'invalid json';
//   let jsonError = AppError(statusCode, message, next);
//     new Promise((resolve,reject) => {
//       let jsonString = '';
//       req.on('data', (data) => {
//         jsonString = jsonString + data.toString();
//       });
//
//       req.on('end', () => {
//         try {
//           let parsed = JSON.parse(jsonString);
//           //if it's successfully parsed it'll pass down to .then
//           resolve(parsed);
//         } catch(err) {
//           reject(err);
//         }
//       });
//     })
//     .then((json) => {
//       req.body = json;
//       next();
//       //this is where jsonError function gets created
//     }, jsonError);
// };

// app_error.js
// let appError = module.exports = exports = function(statusCode, message, errCb) {
//   return function(error) {
//     errCb({error, statusCode, message, type: 'AppError'});
//   }
// }
