// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const OpenAI = require('openai');

console.log("Getting the servers ready...");

const app = express();

// openai API //
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log("accessing API Key")

// MySQL database connection settings
const db = mysql.createConnection({
    host: 'leadershipmysqldb2.mysql.database.azure.com',
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

app.use(session({
    secret: 'meow', // Replace 'secret' with a real secret in your production app
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if you are using https
}));

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
    console.log(req.session.id);

    const email = req.query.email;
    const password = req.query.password;
    const query = 'SELECT UserFname, UserLname, UserEmail FROM tblUser WHERE UserEmail = ? AND UserPassword = ?';

    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }

        if (result.length === 0) {
            // If no user is found with the provided email and password, return an appropriate message
            return res.status(404).send('User not found.');
        }
        console.log(result);
        res.json(result[0]);
    });
});

app.post('/addComment', (req, res) => {
    const dataForm1 = req.body; // The form data sent by the client
    console.log(dataForm1); // to check if the values I put in or being outputed


    // Insert the form data into the MySQL database
    const query = 'CALL InsertCommentForuserByEmailNEW2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [dataForm1.UserEmail, dataForm1.IntegrityComment, dataForm1.PersonalOrgComment, dataForm1.ImprovementComment, dataForm1.PerformanceComment, dataForm1.CommunicationComment, dataForm1.FutureComment, dataForm1.ChangeComment, dataForm1.TeamworkComment, dataForm1.CollaborationComment, dataForm1.AchievementComment, dataForm1.ClosingComment], (err, result) => {
      if (err) {
        console.error('Error executing the database query:', err);
        return res.status(500).json({ success: false });
      }
      console.log('Comments added successfully!');
      return res.status(200).json({ success: true });
    });
});

app.get('/getComment', (req, res) => {
    console.log("Inside getComment");
    console.log(req.session.id)

    const userEmail = req.query.UserEmail
    //req.session.save();
    console.log("User Email on server: " + userEmail);
    const query = 'SELECT Integrity, PersonalORG, Improvement, Performance, Communication, Future, `Change`, Teamwork, Collaboration, Achievement, Closing FROM tbluser U JOIN tblcomments C on U.UserID = C.UserID WHERE UserEmail = ?';

    console.log(query);

    db.query(query, [userEmail], (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        
        if (result.length === 0) {
            console.log('No comments found for the user');
            return res.status(404).json({ message: 'No comments found for the user.' });
        }

        console.log('Successful comment search');
        // Assuming that the query returns a single row for the provided UserEmail
        const commentData = result[0];
        console.log(commentData);
        return res.status(200).json({ success: true, commentData });
    });
});

app.post('/addCommentManager', (req, res) => {
    const dataForm1 = req.body; // The form data sent by the client
    console.log(dataForm1); // to check if the values I put in or being outputed


    // Insert the form data into the MySQL database
    const query = 'CALL InsertCommentFromManagerByEmailNEW2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [dataForm1.UserEmail, dataForm1.IntegrityComment, dataForm1.PersonalOrgComment, dataForm1.ImprovementComment, dataForm1.PerformanceComment, dataForm1.CommunicationComment, dataForm1.FutureComment, dataForm1.ChangeComment, dataForm1.TeamworkComment, dataForm1.CollaborationComment, dataForm1.AchievementComment, dataForm1.ClosingComment, dataForm1.Author], (err, result) => {
      if (err) {
        console.error('Error executing the database query:', err);
        return res.status(500).json({ success: false });
      }
      console.log('Comments added successfully!');
      return res.status(200).json({ success: true });
    });
});

app.get('/getCommentManager', (req, res) => {
    console.log("Inside getComment");
    console.log(req.session.id)

    const userEmail = req.query.UserEmail
    //req.session.save();
    console.log("User Email on server: " + userEmail);
    const query = 'SELECT Integrity, PersonalORG, Improvement, Performance, Communication, Future, `Change`, Teamwork, Collaboration, Achievement, Closing, Author FROM tbluser U JOIN tblmanagercomments MC on U.UserID = MC.UserID WHERE UserEmail = ?';

    console.log(query);

    db.query(query, [userEmail], (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        
        if (result.length === 0) {
            console.log('No comments found for the user');
            return res.status(404).json({ message: 'No comments found for the user.' });
        }

        console.log('Successful comment search');
        // Assuming that the query returns a single row for the provided UserEmail
        const commentData = result;
        console.log(commentData);
        return res.status(200).json({ success: true, commentData });
    });
});

app.post('/addCommentPeer', (req, res) => {
    const dataForm1 = req.body; // The form data sent by the client
    console.log(dataForm1); // to check if the values I put in or being outputed


    // Insert the form data into the MySQL database
    const query = 'CALL InsertCommentFromPeerByEmailNEW2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [dataForm1.UserEmail, dataForm1.IntegrityComment, dataForm1.PersonalOrgComment, dataForm1.ImprovementComment, dataForm1.PerformanceComment, dataForm1.CommunicationComment, dataForm1.FutureComment, dataForm1.ChangeComment, dataForm1.TeamworkComment, dataForm1.CollaborationComment, dataForm1.AchievementComment, dataForm1.ClosingComment, dataForm1.Author], (err, result) => {
      if (err) {
        console.error('Error executing the database query:', err);
        return res.status(500).json({ success: false });
      }
      console.log('Comments added successfully!');
      return res.status(200).json({ success: true });
    });
});

app.get('/getCommentPeer', (req, res) => {
    console.log("Inside getCommentPeer");
    console.log(req.session.id)

    const userEmail = req.query.UserEmail
    //req.session.save();
    console.log("User Email on server: " + userEmail);
    const query = 'SELECT Integrity, PersonalORG, Improvement, Performance, Communication, Future, `Change`, Teamwork, Collaboration, Achievement, Closing, Author FROM tbluser U JOIN tblpeercomments PC on U.UserID = PC.UserID WHERE UserEmail = ?';

    console.log(query);

    db.query(query, [userEmail], (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        
        if (result.length === 0) {
            console.log('No comments found for the user');
            return res.status(404).json({ message: 'No comments found for the user.' });
        }

        console.log('Successful comment search');
        // Assuming that the query returns a single row for the provided UserEmail
        const commentData = result;
        console.log(commentData);
        return res.status(200).json({ success: true, commentData });
    });
});

app.post('/addCommentSub', (req, res) => {
    const dataForm1 = req.body; // The form data sent by the client
    console.log(dataForm1); // to check if the values I put in or being outputed


    // Insert the form data into the MySQL database
    const query = 'CALL InsertCommentFromSubordinateByEmailNEW2(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [dataForm1.UserEmail, dataForm1.IntegrityComment, dataForm1.PersonalOrgComment, dataForm1.ImprovementComment, dataForm1.PerformanceComment, dataForm1.CommunicationComment, dataForm1.FutureComment, dataForm1.ChangeComment, dataForm1.TeamworkComment, dataForm1.CollaborationComment, dataForm1.AchievementComment, dataForm1.ClosingComment], (err, result) => {
      if (err) {
        console.error('Error executing the database query:', err);
        return res.status(500).json({ success: false });
      }
      console.log('Comments added successfully!');
      return res.status(200).json({ success: true });
    });
});

app.get('/getCommentSub', (req, res) => {
    console.log("Inside getCommentSub");
    console.log(req.session.id)

    const userEmail = req.query.UserEmail
    //req.session.save();
    console.log("User Email on server: " + userEmail);
    const query = 'SELECT Integrity, PersonalORG, Improvement, Performance, Communication, Future, `Change`, Teamwork, Collaboration, Achievement, Closing FROM tbluser U JOIN tblsubordinatecomments SC on U.UserID = SC.UserID WHERE UserEmail = ?';

    console.log(query);

    db.query(query, [userEmail], (err, result) => {
        if (err) {
            console.error('An error occurred while executing the query');
            return res.status(500).send(err);
        }
        
        if (result.length === 0) {
            console.log('No comments found for the user');
            return res.status(404).json({ message: 'No comments found for the user.' });
        }

        console.log('Successful comment search');
        // Assuming that the query returns a single row for the provided UserEmail
        const commentData = result;
        console.log(commentData);
        return res.status(200).json({ success: true, commentData });
    });
});

// API route (Comment Summary)
app.get('/getSummary', async (req, res) => {
    try {
        const userEmail = req.query.UserEmail;
        console.log("Inside /getSummary route");
        console.log("User email from query params: ", userEmail);

        let allComments = "";

        const userIdQuery = 'SELECT UserID FROM tbluser WHERE UserEmail = ?';
        const userIdResult = await dbQuery(userIdQuery, [userEmail]);
        
        if(userIdResult.length > 0) {
            const userId = userIdResult[0].UserID;
            console.log("User ID from DB query: ", userId);

            const queries = [
                'SELECT * FROM tblcomments WHERE UserID = ?',
                'SELECT * FROM tblmanagercomments WHERE UserID = ?',
                'SELECT * FROM tblpeercomments WHERE UserID = ?',
                'SELECT * FROM tblsubordinatecomments WHERE UserID = ?'
            ];

            const commentArrays = await Promise.all(queries.map(query => dbQuery(query, [userId])));
            
            // Check if there are no comments for the user
            if(commentArrays.every(arr => arr.length === 0)) {
                console.log("No comments found for user.");
                return res.status(404).json({ message: "No comments found for user." });
            }

            allComments = combineComments(...commentArrays);
            console.log("All comments: ", allComments);

            const gpt3Response = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: `Here are a list of comments given to you as follows, ending with the delimeter # for each comment: ${allComments}. Your job is to give an overall summary of what all these comments are trying to say.`,
                max_tokens: 1000 
            });

            // Debugging logs
            console.log("GPT-3 response:", gpt3Response);

            const summary = gpt3Response.choices[0].text.trim();

            // Check if summary is empty
            if(!summary) {
                console.log("Generated summary is empty.");
                return res.status(404).json({ message: "Generated summary is empty." });
            }

            return res.json({ summary });

        } else {
            console.log("User not found");
            return res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const columnsToInclude = [
    'Integrity', 
    'PersonalOrg', 
    'Improvement', 
    'Performance', 
    'Communication', 
    'Future', 
    'Change', 
    'Teamwork', 
    'Collaboration', 
    'Achievement', 
    'Closing'
  ];

// Utility Functions
function dbQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function combineComments(...commentArrays) {
    let combined = "";
    commentArrays.forEach(comments => {
        comments.forEach(comment => {
            columnsToInclude.forEach(column => {
                if (comment[column]) {
                    combined += comment[column] + " ";
                }
            });
            combined = combined.trim();  // Remove any trailing spaces
            combined += "# ";            // Append the delimiter
        });
    });
    return combined.trim(); // Optionally remove the trailing space and delimiter for the last comment
}

const stopwords = ["and", "the", "to", "of", "it", "in", "is", "you", "that", "a", "we", "i", "for", "on"];

function tokenizeAndRemoveStopwords(text) {
    // Tokenize by spaces and remove non-alphabetic characters
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 1 && !stopwords.includes(word));
    return words;
}


app.get('/commentWordFlowchart', async (req, res) => {
    try {
        const userEmail = req.query.UserEmail;
        let allComments = "";

        // Similar to the previous /getSummary endpoint, get all comments for the user:
        const userIdQuery = 'SELECT UserID FROM tbluser WHERE UserEmail = ?';
        const userIdResult = await dbQuery(userIdQuery, [userEmail]);
        
        if (userIdResult.length > 0) {
            const userId = userIdResult[0].UserID;
            const queries = [
                'SELECT * FROM tblcomments WHERE UserID = ?',
                'SELECT * FROM tblmanagercomments WHERE UserID = ?',
                'SELECT * FROM tblpeercomments WHERE UserID = ?',
                'SELECT * FROM tblsubordinatecomments WHERE UserID = ?'
            ];

            const commentArrays = await Promise.all(queries.map(query => dbQuery(query, [userId])));
            
            commentArrays.forEach(commentArray => {
                commentArray.forEach(comment => {
                    for (let key in comment) {
                        if (typeof comment[key] === 'string') {
                            allComments += " " + comment[key];
                        }
                    }
                });
            });

            // Tokenize and count words
            const words = tokenizeAndRemoveStopwords(allComments);
            const wordCounts = {};

            words.forEach(word => {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            });

            // This will just send the word counts for now. Visualization would have to be handled on the client-side.
            res.status(200).json(wordCounts);

        } else {
            res.status(404).json({ message: 'No comments found for the user.' });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Server error.');
    }
});






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});