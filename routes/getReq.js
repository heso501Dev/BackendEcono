const express = require('express'),
      router = express.Router(),
      {getProfile} = require('../controllers/getControllers')

// ===========
// Middleware
// ===========
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// ============
// Routes 
// ============

// Get profile 
router.get('/profile', getProfile);

router.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;