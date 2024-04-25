const express = require('express'),
      router = express.Router(),
      {getProfile, getExpenses, getIncome, getAssets, getGoal} = require('../controllers/getControllers')

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

// Get Expenses
router.get('/Expenses', getExpenses);

// Get Income
router.get('/Income', getIncome);

// Get Assets
router.get('/Assets', getAssets);

// Get goal
router.get('/goal', getGoal)


// Handling undefined routes
router.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;