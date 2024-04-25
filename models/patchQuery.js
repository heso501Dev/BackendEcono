const db = require('../config/database');

const updateProfile = async (req, callback) => {
    try {
        
        const userId = req.user.user_id;
       const sel = await db.query(
            `SELECT *
            FROM "User" u
            LEFT JOIN Profile p ON u.user_id = p.user_id  WHERE u.user_id = $1`, [userId]
        )


        let row = sel.rows[0];
        // output of select 
        let username = row.username;
        let country = row.country;
        let phone = row.phone;
        let city = row.city;
        let dependents = row.dependents;
        let marital_status = row.marital_status;
        let risk_tolerance = row.risk_tolerance;

        // req body
        let usernamebody = req.body.username;
        let countrybody = req.body.country;
        let citybody = req.body.city;
        let dep = req.body.dep;
        let ms = req.body.ms;
        let rt = req.body.rt;
        // compare
       
        console.log("test")
        try {
            const result = await db.query(
                `UPDATE profile
                 SET phone=$1 
                 WHERE user_id=$2;`,
                [phone, userId]
            );
            // Handle the result here
        } catch (error) {
            console.error('Error executing query:', error);
            // Handle errors
        }
        if (result.rowCount > 0) {
            // If insertion successful
            callback(null, { success: true, message: 'Profile inserted successfully.' });
        } else {
            // If no rows were affected, insertion failed
            callback({ error: 'Failed to insert Profile.' });
        }
    } catch (error) {
        // If an error occurred during execution
        callback({ error: error.message });
    }
};

module.exports = {
    updateProfile,
}