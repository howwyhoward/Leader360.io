// Create table query
/*let createTableQuery = `
  CREATE TABLE IF NOT EXISTS tblUSER (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserFname VARCHAR(30) NOT NULL,
    UserLname VARCHAR(30) NOT NULL,
    UserEmail VARCHAR(50) NOT NULL,
    UserPhoneNumber VARCHAR(20) NOT NULL
  )
`;

// Create table
connection.query(createTableQuery, function (error, results, fields) {
  if (error) throw error;
  console.log('Table "tblUSER" has been created');
});

// Users
let users = [
  ['Arnav', 'Khare', 'arney.chillarney@gmail.com', '4252367685'],
  ['Ali', 'Chawro', 'achawro9@gmail.com', '4254481587'],
  ['Howard', 'Wang', 'howardw1120@gmail.com', '4253517712'],
  ['Santosh', 'Khare', 'santosh@golsinc.com', '4254926980'],
  ['Atul', 'Khare', 'akhare@gmail.com', '4254436066'],
];

// Insert query
let insertQuery = 'INSERT INTO tblUSER (UserFname, UserLname, UserEmail, UserPhoneNumber) VALUES ?';

// Insert users
connection.query(insertQuery, [users], function (error, results, fields) {
  if (error) throw error;
  console.log('Inserted ' + results.affectedRows + ' rows');
});
*/

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'leadershipmysql.mysql.database.azure.com',
    user: 'leadershipmysqladmin',
    password: 'R3dD#ad24398L',
    database: 'leadershipmysqldb',
    port     : '3306'
});

app.get('/', (req,res) => {
  console.log('started application');
});

app.post('/getUser', (req, res) => {
    console.log('getuser');
    const email = req.body.email;
    const query = 'SELECT UserFname, UserLname FROM tbluser WHERE UserEmail = ?';

    db.query(query, email, (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        res.send(result[0]);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on Port ${port}`));
