'use strict';

var csv = require("fast-csv");
const mongoose = require('mongoose');
const request = require('request-promise-native'),
  Cultures = require('../models/cultureSchema'),
  Culture = mongoose.model('Culture');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/RAN');

Culture.remove({}).exec();

let culture = [];
csv.fromPath("./asdfUnicorns/data/culturePlaces.csv", { headers: true, discardUnmappedColumns: true, strictColumnHandling: false })
.on("data", function(data){
    culture.push(data);
})
.on("end", async () => {
    for (var i = 0; i < culture.length; i++) {
        clean(culture[i]);
        delete culture[i].webpage;
        checkForBooleans(culture[i]);
        const coordinates = await getCoordinates(culture[i].address);
        if(coordinates) {
            culture[i].latitude = coordinates.latitude;
            culture[i].longitude = coordinates.longitude;
        } else {
            culture[i].latitude = "0";
            culture[i].longitude = "0";
        }
    }
    for (var i = 0; i < culture.length; i++) {
        //console.log(culture[i]);
        const newCulture = new Culture(culture[i]);
        newCulture.save();
    }
    console.log("Done adding the culture places");
});

function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] == "") {
        delete obj[propName];
      }
    }
}

function checkForBooleans(obj) {
    for(var propName in obj) {
        if(obj[propName] == "TRUE") {
            obj[propName] = true;
        } else if (obj[propName] == "FALSE") {
            obj[propName] = false;
        } 
    }
}

async function getCoordinates(searchQuerry) {
    try {
        if(searchQuerry != undefined && searchQuerry) {
            let apiCall = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBF7z3G0PxS5fZUD1nsdbk23XkR5udn8HY&fields=geometry&inputtype=textquery&input=${encodeURIComponent(searchQuerry)}`;
            //console.log(apiCall);
            return await request(apiCall)
            .then((response) => {
                let searchResult = JSON.parse(response);
                console.log(searchResult.status);
                if(searchResult.status == undefined) {
                    console.log(response);
                }
                if(searchResult.status == 'OK') {
                    //console.log("Got coordinates for " + searchQuerry);
                    return { latitude: searchResult.candidates[0].geometry.location.lat, longitude: searchResult.candidates[0].geometry.location.lng };
                } 
                else {
                    return { latitude: "0", longitude: "0" };
                }
            });
        }
    } catch (error) {
        //console.log(error);
        return { latitude: "0", longitude: "0" };
    }
}