console.log('Hello World!')
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http');

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

/*app.post('/getUser', (req, res) => {
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
*/

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

//var port = process.env.PORT||3000; //which you can run both on Azure or local

app.listen(3000,function() {
//app.listen(port,function() {    
 console.log("example app listening on 3000");
 //console.log("example app listening on ", port);

});