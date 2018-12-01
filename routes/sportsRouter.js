'use strict';
module.exports = function(app) {
  var sportsController = require('../controllers/sportsController');

  app.get('/sports/all', sportsController.getAllSports);
  app.post('/sports/nearest', sportsController.getNearestToMe);
};