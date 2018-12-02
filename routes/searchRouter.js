'use strict';
module.exports = function(app) {
  var searchController = require('../controllers/searchController');

  app.get('/search', searchController.search);
};