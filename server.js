// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Removed the incorrect line here.

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL database connection settings
const db = mysql.createConnection({
    host: 'leadershipmysql.mysql.database.azure.com',
    user: 'leadershipmysqladmin',
    password: 'R3dD#ad24398L',
    database: 'leadershipmysqldb',
    port: '3306'
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

// Route to handle the form data from the client
app.post('/addUser', (req, res) => {
    const formData = req.body; // The form data sent by the client

    // Insert the form data into the MySQL database
    const query = 'INSERT INTO tblUser (UserFname, UserLname, UserEmail, UserPassword) VALUES (?, ?, ?, ?)';
    db.query(query, [formData.FirstName, formData.LastName, formData.Email, formData.Password], (err, result) => {
      if (err) {
        console.error('Error executing the database query:', err);
        return res.status(500).json({ success: false });
      }
      console.log('Account created successfully!');
      return res.status(200).json({ success: true });
    });
});


app.get('/getUser', (req, res) => {
    console.log("Inside getUser");

    const email = req.query.email;
    const query = 'SELECT UserFname, UserLname FROM tblUser WHERE UserEmail = ?';

    db.query(query, email, (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        res.send(result[0]);
    });
});

app.get('/helloworld', function(req,res){
    res.send('hello world 2')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
