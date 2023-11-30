const express = require('express');
const router = express.Router();

/* Home Page GET Request */
router.get('/', async (req, res) => {
    res.render('homePage');
});

// Must export router to be used in index.js
module.exports = router;