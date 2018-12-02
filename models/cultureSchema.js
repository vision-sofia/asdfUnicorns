'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CultureSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  kitchen: {
    type: String,
    required: true
  },
  hidden: {
    type: Boolean
  },
  music_type: {
    type: String
  },
  type: {
    type: String
  },
  address: {
    type: String
  },
  latitude: {
    type: String,
    required: true,
    default: ""
  },
  longitude: {
    type: String,
    required: true,
    default: ""
  },
});

module.exports = mongoose.model('Culture', CultureSchema);