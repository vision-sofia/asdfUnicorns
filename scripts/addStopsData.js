'use strict';

const transportStops = require("../data/stops.json");
const mongoose = require('mongoose'),
  Stops = require('../models/stopSchema'),
  Stop = mongoose.model('Stops');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/RAN');

Stop.remove({}).exec();

for(let i = 0; i< transportStops.length; i++) {
    const stop = transportStops[i];
    const newStop = new Stop(stop);
    newStop.save();
}

console.log("Done adding the transport stops");