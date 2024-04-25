const express = require('express'),
      router = express.Router(),
      {profile } = require('../controllers/patchControllers')

// ===========
// Middleware
// ===========
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


// adjust Income
router.patch('/profile', profile);



// Handling undefined routes
router.patch('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;