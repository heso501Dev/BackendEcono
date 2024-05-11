const db = require('../config/database');

db.connect();

// user profile info
const userProfile = async (req, callback) => {
    try {
      const userId = req.user.user_id;
      
      const result = await db.query(
      `SELECT *
      FROM "User" u
      LEFT JOIN Profile p ON u.user_id = p.user_id 
      LEFT JOIN node n ON u.user_id = n.user_id
      LEFT JOIN asset_holdings e ON u.user_id = e.user_id
      WHERE u.user_id = $1;`, [1])
      if (result.rows.length === 0) {
        // If no user profile found for the given email
        callback({ message: 'User profile not found' }, null);
      } else {
        // If user profile found, return the data
        callback(null, result.rows);
      }
    } catch (err) {
      // If an error occurs during the query execution
      callback({ message: 'Error retrieving user profile', error: err }, null);
    }
  };
  
  




module.exports = {userProfile};