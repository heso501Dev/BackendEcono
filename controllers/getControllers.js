const { userProfile} = require('../models/selectQuery');


// Retrieve User Profile
const getProfile = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, fetch user profile
    userProfile(req, (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send user profile information
            res.json(rows);
        }
    });
};
module.exports = { getProfile};