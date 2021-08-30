const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');


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
/*  db.query('SELECT * FROM candidates', (err, rows) => {
    console.log(rows);
    
});
 */
/* query to get a specific data
db.query('SELECT * FROM candidates WHERE id = 15', (err, row) => {
    if(err){
        console.log(err);
    }
    console.log(row);
}); */

// Query to delete a candidate - ? is a placeholder for passing arguments
/* db.query('DELETE FROM candidates WHERE id = ?', 1, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
}); */

//  Create Query - Create a candidate

const sql = 'INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)';

const params = [8, 'Ron', 'Romney', 1];
db.query(sql, params, (err, result) => {
    if(err){
        console.log(err);
    }
    console.log(result);
});


//  Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});