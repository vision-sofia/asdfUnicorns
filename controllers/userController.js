'use strict';

const mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  uuidv4 = require('uuid/v4');

exports.login = async function(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password }).exec();
        if(user) {
            const loginResponse = {
                name: user.name,
                token: uuidv4(),
                avatar: "avatar.png"
            }
            res.status(200).send(loginResponse);
        } else {
            res.status(400).send("Invalid email or password");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.register = function(req, res) {
    try {
        const userRegistration = req.body;
        if(userRegistration.email != null && userRegistration.password != null && userRegistration.name != null) {
            const newUser = new User(userRegistration);
            newUser.save()
            res.status(200).send("Thanks for registering!");
        } else {
            res.status(401).send("Invalid registration form. Please provide all nececery data.");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}