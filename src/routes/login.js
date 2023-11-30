const express = require('express');
const router = express.Router();

/* Login GET Request */
router.get('/', (req, res) => {
    res.render('login');
});

/* Login POST Request */

// Must export router to be used in index.js
module.exports = router;