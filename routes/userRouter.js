'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');

  app.post('/user/login', userController.login);
  app.post('/user/register', userController.register);
};