'use strict';

var csv = require("fast-csv");
const mongoose = require('mongoose'),
  Sports = require('../models/sportSchema'),
  Sport = mongoose.model('Sports');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/RAN');

Sport.remove({}).exec();

let sports = [];
csv.fromPath("./asdfUnicorns/data/sportPlaces.csv", { headers: true, discardUnmappedColumns: true, strictColumnHandling: false })
.on("data", function(data){
    sports.push(data);
})
.on("end", () => {
    for (var i = 0; i < sports.length; i++) {
        clean(sports[i]);
        delete sports[i]["id"];
        sports[i].type = "";
        setSportType(sports[i])
        if(sports[i].city != "София") {
            delete sports[i];
            continue;
        }
        delete sports[i].city;
        checkForBooleans(sports[i]);
    }
    sports = sports.filter(function(e){return e}); 
    for (var i = 0; i < sports.length; i++) {
        //console.log(sports[i]);
        const sport = new Sport(sports[i]);
        sport.save();
    }
    console.log("Done adding the sport places");
});

function clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] == "") {
        delete obj[propName];
      }
    }
}

function setSportType(sport) {
    var properties = ["city","neighbourhood","address","coordinates","latitude","longitude","name","link","new","logo","for_kids","type"];
    for(var propName in sport) {
        if(properties.indexOf(propName) < 0) {
            sport.type += propName + ',';
            delete sport[propName];
        }
    }
    sport.type = sport.type.slice(0, -1);
}

function checkForBooleans(sport) {
    for(var propName in sport) {
        if(sport[propName] == "TRUE") {
            sport[propName] = true;
        } else if (sport[propName] == "FALSE") {
            sport[propName] = false;
        } 
    }
}