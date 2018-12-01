'use strict';
const mongoose = require('mongoose'),
Sport = mongoose.model('Sports'),
Stop = mongoose.model('Stops');

exports.getAllSports = async function(req, res) {
    const allSports = await Sport.find({}).exec();
    res.status(200).send(allSports);
}

exports.getNearestToMe = async function(req, res) {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const allSports = await Sport.find({}).exec();
    let nearest = [];
    for(let i = 0; i < allSports.length; i++) {
        const sport = allSports[i];
        if(pointInCircle(sport.latitude, sport.longitude, latitude, longitude, 0.03)) {
            nearest.push(sport);
        }
    }
    res.status(200).send(nearest);
}

exports.getTripDetails = function(req, res) {
    const currentLocation = req.body.currentLocation;;
    const destinationLocation = req.body.details.destiantionLocation;

    //Todo: closest stop to currrent location
    //Todo: Closest stop to destination location
}

function pointInCircle(x, y, cx, cy, radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}