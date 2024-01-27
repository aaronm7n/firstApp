const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

/* Login GET Request */
router.get('/', (req, res) => {
    res.render('login.ejs', {
        message: "",
    });
});

/* Login POST Request */
router.post('/', async (req, res) => {
    var userInfo = await req.body;
    const account = await User.findOne({ email: userInfo.email });

    if (!userInfo.email || !userInfo.password) {
        res.render('login.ejs', {
            message: "Please fill out all required fields of information."
        });
    }
    else if (!account) {
        res.render('login.ejs', {
            message: "There is no registered account with this email."
        });
    }
    else if (await bcrypt.compareSync(userInfo.password, account.password)) {
        req.session.user = account;

        res.redirect('/profile');
    }
    else {
        res.render('login.ejs', {
            message: "Uknown error"
        });
    }
});

// Must export router to be used in index.js
module.exports = router;