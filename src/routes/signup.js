const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // This is for assigning a random identification number
const salt = bcrypt.genSaltSync(10);

const User = require('../models/user');

/* Signup GET Request */
router.get('/', (req, res) => {
    res.render('signup.ejs', {
        message: "",
        type: "",
    });
});

/* Signup POST Request */
router.post('/', async (req, res) => {
    var userInfo = await req.body; // Gets the parsed information
    
    if (!userInfo.username || !userInfo.password) { //If not all fields have been filled out will throw error
        res.render('signup.ejs', {
            message: "Please fill out all required fields of information.",
            type: "error"
        });
    }
    else if (userInfo.password != userInfo.confirm) { //If password and confirm password do not match throw error
        res.render('signup.ejs', {
            message: "Your passwords do not match. Please try again.",
            type: "error"
        });
    }
    else if (await User.findOne({ username: userInfo.username })) {
        res.render('signup.ejs', {
            message: "This username is taken. Please try again.",
            type: "error"
        });
    }
    else {
        var hashed = await bcrypt.hashSync(userInfo.password, salt);
        var newUser = new User({
            idNumber: crypto.randomUUID(),
            username: userInfo.username,
            password: hashed,
        });

        newUser.save()
        .then( (result) => {
            res.render('signup.ejs', {
                message: "New user has been created",
                type: "success",
                user: userInfo.username,
            });
        })
        .catch( (err) => {
            res.render('signup.ejs', {
                message: "Database error. Please try again.",
                type: "error"
            });
        })
    }
});

// Must export router to be used in index.js
module.exports = router;