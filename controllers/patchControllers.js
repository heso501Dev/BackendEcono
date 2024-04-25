const {updateProfile} = require('../models/patchQuery');


// update Income

const  profile = (req, res) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
    }
    // User is authenticated, insert income
    updateProfile(req, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        } else {
            // Send the result value returned from the callback
            res.send(result);
        }
    });
};

module.exports = {
    profile,
}