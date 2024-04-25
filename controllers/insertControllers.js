const { insertIncome, insertExpense, insertGoal, insertProfile } = require('../models/insertQuery');


// insert profile

const profile = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, insert income
    insertProfile(req, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send the result value returned from the callback
            res.send(result);
        }
    });
}


// insert income

const income = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, insert income
    insertIncome(req, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send the result value returned from the callback
            res.send(result);
        }
    });
};

// insert expenses

const expenses = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, insert income
    insertExpense(req, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send the result value returned from the callback
            res.send(result);
        }
    });
}

// insert goal

const goal = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, insert income
    insertGoal(req, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send the result value returned from the callback
            res.send(result);
        }
    });
}

module.exports = {
    income,
    expenses,
    goal,
    profile
}