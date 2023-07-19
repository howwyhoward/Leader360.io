console.log('Hello World!')
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
    host: 'leadershipmysql.mysql.database.azure.com',
    user: 'leadershipmysqladmin',
    password: 'R3dD#ad24398L',
    database: 'leadershipmysqldb',
    port     : '3306'
});

app.post('/getUser', (req, res) => {
    const email = req.body.email;
    const query = 'SELECT UserFname, UserLname FROM tblUser WHERE UserEmail = ?';
  
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while querying the database' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'No user found with the given email' });
      } else {
        const user = results[0];
        res.json({ UserFname: user.UserFname, UserLname: user.UserLname });
      }
    });
  });
/*app.post('/submitEmail', (req, res) => {
    console.log("Inside getUser");

    const email = req.body.email;
    const query = 'SELECT UserFname, UserLname FROM tblUser WHERE UserEmail = ?';

    
    db.query(query, email, (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        res.send(result[0]);
    });
});/*

/*app.post('/submitEmail', (req, res) => {
    let email = req.body.email;
    let sql = 'SELECT first_name, last_name FROM users WHERE email = ?';
    
    db.query(sql, [email], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
});*/
  
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