const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');


// express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username
        user: 'root',
        password: 'Ace@13579',
        database: 'election'
    },
    console.log('Connected to the election database')
);


// query to get all the data
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;
 db.query(sql, (err, rows) => {
    if(err){
        res.status(500).json({error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data:rows
    });
});    
});

// query to get a specific data
app.get('/api/candidates/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
});

});

// Query to delete a candidate - ? is a placeholder for passing arguments
app.delete('/api/candidates/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error : err.message});
        } else if(!result.affectedRows){
            res.json({
                message: 'Candidate not found'
            });
        } else {
        res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
        
        });
    };
   
});
});

//  Create Query - Create a candidate

app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({errors: errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data:body
        });
    });
});

//  Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});