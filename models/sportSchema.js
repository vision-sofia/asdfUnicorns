'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  logo: {
    type: Schema.Types.Mixed
  },
  new: {
    type: Boolean
  },
  link: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  neighbourhood: {
    type: String
  },
  coordinates: {
    type: String
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  for_kids: {
    type: Boolean
  },
});

module.exports = mongoose.model('Sports', SportSchema);