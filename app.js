console.log('Hello World!')
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
    host: 'leadershipmysql.mysql.database.azure.com',
    user: 'leadershipmysqladmin',
    password: 'R3dD#ad24398L',
    database: 'leadershipmysqldb',
    port     : '3306'
});

app.post('/submitEmail', (req, res) => {
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
});

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


app.get('/', function(req,res){
 res.send('hello world 2')

});

//var port = process.env.PORT||3000; //which you can run both on Azure or local
//console.log("example app listening on ", port);
app.listen(8080,function() {
//app.listen(port,function() {    
 console.log("example app listening on 8080");
});