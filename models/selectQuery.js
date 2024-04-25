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
  
  

// user Expenses
const userExpenses = async (req, callback)=> {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "node" WHERE user_id = $1 AND type = 0 `, [1]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}

// user Income
const userIncome = async (req, callback) => {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "node" WHERE user_id = $1 AND type = 2 `, [userId]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}

// user Assets
const userAssets = async (req, callback) => {
    try{
        const userId = req.user.user_id;
        const result = await db.query(`SELECT * FROM "asset_holdings" WHERE user_id = $1`, [userId]);
        callback(null, result.rows);
    } catch (err) {
        callback(err, null);
    }
}




module.exports = {userProfile, userExpenses, userIncome, userAssets};