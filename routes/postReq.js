const express = require('express'),
      router = express.Router(),
      {register, login} = require('../controllers/postControllers'),
      {income, expenses, goal, profile, asset} = require('../controllers/insertControllers');
// ===========
// Middleware
// ===========
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// ============
// Routes 
// ============

// Register new user
router.post('/register', register);
// Login
router.post('/login', login);
// add Profile
router.post('/profile', profile)
// add Node Income
router.post('/income', income);
// add Node Expensses
router.post('/expense', expenses);
// add Node Goal
router.post('/goal', goal);

// Handling undefined routes
router.post('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router; 