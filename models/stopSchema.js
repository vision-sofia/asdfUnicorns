'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StopSchema = new Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  c: {
    type: String,
  },
  n: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Stops', StopSchema);