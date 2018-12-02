'use strict';
const mongoose = require('mongoose'),
Sport = mongoose.model('Sports');
const request = require('request-promise-native');

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
    const currentLocation = req.body.currentLocation;
    const destinationLocation = req.body.destiantionLocation;

    let apiCall = `https://api-routes.sofiatraffic.bg/api/v1/trip-guru/?arrive_by=0&from_place=${currentLocation}&itineraries_requested_count=1&lang=bg&optimization=fastest&skipped_travel_options=bicycle,taxi,walk&to_place=${destinationLocation}`

    request(apiCall).then((response) => {
        const transportDetails = JSON.parse(response).public_transport_option.itineraries[0];
        const tripDetails = {
            departure: transportDetails.departure_ts,
            arrival: transportDetails.arrival_ts,
            duration: transportDetails.duration_seconds,
            fareAmmount: transportDetails.fare.ammount,
            co2EmissionsKg: transportDetails.co2_emissions_kg,
            energyBurntKcal: transportDetails.energy_burnt_kcal,
            walkingTime: transportDetails.walking_seconds,
            walkingDistance: transportDetails.walking_distance_m,
            travelGuide: []
        }
        for(let i = 0; i < transportDetails.legs.length; i++) {
            const travelStep = transportDetails.legs[i];
            tripDetails.travelGuide.push({
                type: travelStep.travel_mode,
                from: travelStep.from_place.name,
                to: travelStep.to_place.name,
                destinationLatitude: travelStep.to_place.latitude,
                destinationLongitude: travelStep.to_place.longitude,
                departure: travelStep.departure_ts,
                arrival: travelStep.arrival_ts,
                transportName: travelStep.travel_mode == "walk" ? "крака" : travelStep.public_transport_information.line_name
            })
        }
        res.status(200).send(tripDetails);
    }, (error) => {
        res.status(500).send(error);
    })
}

function pointInCircle(x, y, cx, cy, radius) {
    var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distancesquared <= radius * radius;
}