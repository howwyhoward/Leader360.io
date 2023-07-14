const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

const mobileMenu = () => {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu)

// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight')
    const homeMenu = document.querySelector('#home-page')
    const aboutMenu = document.querySelector('#about-page')
    const featuresMenu = document.querySelector('#features-page')
    let scrollPos = window.scrollY

    // adds 'highlight' class to menu items
    if(window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight')
        aboutMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        aboutMenu.classList.add('highlight')
        homeMenu.classList.remove('highlight')
        featuresMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 960 && scrollPos < 2345) {
        featuresMenu.classList.add('highlight')
        aboutMenu.classList.remove('highlight')
        return
    } 

    if(elem && window.innerWidth < 960 && scrollPos < 600 || elem) {
        elem.classList.remove('highlight')
    }
}

window.addEventListener('scroll', highlightMenu)
window.addEventListener('click', highlightMenu)

// Close mobile Menu whne clicking again //
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active')
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active')
        menuLinks.classList.remove('active')
    } 
}

const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connection pool for MySQL
const pool = mysql.createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/getUser', async (req, res) => {
  const { email } = req.body;
  
  // SQL query with placeholder
  const sqlQuery = 'SELECT name FROM users WHERE email = ?';

  try {
    // Use connection from pool to execute query
    const [rows, fields] = await pool.execute(sqlQuery, [email]);
    
    if (rows.length > 0) {
      // Send first match as response
      res.json(rows[0]);
    } else {
      // If no users found, send error response
      res.status(404).json({ message: 'User Not Found.' });
    }
  } catch (err) {
    // Send server error response
    res.status(500).json({ message: 'Server error.' });
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);