'use strict';
module.exports = function(app) {
  var cultureController = require('../controllers/cultureController');

  app.get('/culture/all', cultureController.getCulturePlaces);
  app.post('/culture/nearest', cultureController.getNearestToMe);
  app.post('/culture/trip', cultureController.getTripDetails);
};