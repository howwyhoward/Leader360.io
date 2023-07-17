const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create MySQL connection
const connection = mysql.createConnection({
  host     : 'leadershipmysql.mysql.database.azure.com',
  user     : 'leadershipmysqladmin',
  password : 'R3dD#ad24398L',
  database : 'leadershipmysqldb',
  port     : '3306',
  ssl: {
    rejectUnauthorized: true,
    ca: DigiCertGlobalRootCA.crt.pem
  }
});

// Connect to MySQL
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

// Create table query
let createTableQuery = `
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

app.get('/getUserName', (req, res) => {
  const userEmail = req.body.email;
  const query = 'SELECT UserFname FROM tblUSER WHERE UserEmail = ?';

  connection.query(query, [userEmail], (error, results, fields) => {
    if (error) {
      return res.status(500).send(error);
    }

    if (results.length > 0) {
      return res.send(`Hello ${results[0].UserFname}, your report is ready`);
    } else {
      return res.send('Hello, your report is ready');
    }
  });
});

app.listen(3000, function() {
  console.log('App is listening on port 3000');
});
