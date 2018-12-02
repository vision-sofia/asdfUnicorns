'use strict';
const mongoose = require('mongoose'),
Sport = mongoose.model('Sports'),
Culture = mongoose.model('Culture');

exports.search = async function(req, res) {
    const searchQuerry = req.query.searchQuerry;
    const allSports = await Sport.find({ }).exec();
    const allCultures = await Culture.find({ }).exec();
    let result = allSports.concat(allCultures);
    result = result.filter(place => place.name.includes(searchQuerry));
    res.status(200).send(result);
}