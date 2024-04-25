const db = require('../config/database');



// insert profile
const insertProfile = async (req, callback) => {
    try {
        const userId = req.user.user_id;
        const phone = req.body.phone;
        const country = req.body.country;
        const city = req.body.city;
        const dependents = req.body.dependents;
        const maritalStatus = req.body.ms;
        const riskTolerance = req.body.rt;




        const result = await db.query(
            `INSERT INTO profile(
                 user_id, phone, country, city, dependents, marital_status, risk_tolerance)
                VALUES ($1, $2, $3, $4, $5, $6, $7);`,
            [userId, phone, country, city, dependents, maritalStatus, riskTolerance,]
        );

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
// insert income
const insertIncome = async (req, callback) => {
    try {
        const userId = req.user.user_id;
        const type = 2;
        const name = req.body.name;
        const amount = req.body.amount;
        const cur = req.body.cur;
        const cat = req.body.cat;
        const interval = req.body.interval;
        const date = req.body.date;
        const note = req.body.note;


        const result = await db.query(
            `INSERT INTO node(
                 user_id, type, name, amount, currency, category, "interval", date, deadline, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            [userId, type, name, amount, cur, cat, interval, date, deadline, note]
        );

        if (result.rowCount > 0) {
            // If insertion successful
            callback(null, { success: true, message: 'Income inserted successfully.' });
        } else {
            // If no rows were affected, insertion failed
            callback({ error: 'Failed to insert income.' });
        }
    } catch (error) {
        // If an error occurred during execution
        callback({ error: error.message });
    }
};
// insert expense
const insertExpense = async (req, callback) => {
    try {
        const userId = req.user.user_id;
        const type = 0;
        const name = req.body.name;
        const amount = req.body.amount;
        const cur = req.body.cur;
        const cat = req.body.cat;
        const interval = req.body.interval;
        const date = req.body.date;
        const note = req.body.note;
        const deadline = req.body.deadline;


        const result = await db.query(
            `INSERT INTO node(
                 user_id, type, name, amount, currency, category, "interval", date, deadline, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            [userId, type, name, amount, cur, cat, interval, date, deadline, note]
        );

        if (result.rowCount > 0) {
            // If insertion successful
            callback(null, { success: true, message: 'Expense inserted successfully.' });
        } else {
            // If no rows were affected, insertion failed
            callback({ error: 'Failed to insert Expense.' });
        }
    } catch (error) {
        // If an error occurred during execution
        callback({ error: error.message });
    }
};
// insert goal
const insertGoal = async (req, callback) => {
    try {
        const userId = req.user.user_id;
        const type = 1;
        const name = req.body.name;
        const amount = req.body.amount;
        const cur = req.body.cur;
        const cat = req.body.cat;
        const interval = req.body.interval;
        const date = req.body.date;
        const note = req.body.note;
        const deadline = req.body.deadline;


        const result = await db.query(
            `INSERT INTO node(
                 user_id, type, name, amount, currency, category, "interval", date, deadline, notes)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
            [userId, type, name, amount, cur, cat, interval, date, deadline, note]
        );

        if (result.rowCount > 0) {
            // If insertion successful
            callback(null, { success: true, message: 'Goal inserted successfully.' });
        } else {
            // If no rows were affected, insertion failed
            callback({ error: 'Failed to insert Goal.' });
        }
    } catch (error) {
        // If an error occurred during execution
        callback({ error: error.message });
    }
};
module.exports = {
    insertProfile, insertIncome, insertExpense, insertGoal
};