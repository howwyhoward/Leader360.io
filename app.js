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

// Close mobile Menu when clicking again //
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active')
    if (window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active')
        menuLinks.classList.remove('active')
    } 
}





const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'leadershipmysql.mysql.database.azure.com',
  user     : 'leadershipmysqladmin',
  password : 'R3dD#ad24398L',
  database : 'leadershipmysqldb',
  ssl  : {
    ca : fs.readFileSync('DigiCertGlobalRootG2.crt.pem')
  }
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting: ' + error.stack);
    return;
  }
  
  console.log('Connected as id ' + connection.threadId);
});

let createTableQuery = `
  CREATE TABLE tblUSER (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserFname VARCHAR(30) NOT NULL,
    UserLname VARCHAR(30) NOT NULL,
    UserEmail VARCHAR(50) NOT NULL,
    UserPhoneNumber VARCHAR(20) NOT NULL
  )
`;

connection.query(createTableQuery, function (error, results, fields) {
  if (error) throw error;
  console.log('Table "tblUSER" has been created');
});

let users = [
  ['Arnav', 'Khare', 'arney.chillarney@gmail.com', '4252367685'],
  ['Ali', 'Chawro', 'achawro9@gmail.com', '4254481587'],
  ['Howard', 'Wang', 'howardw1120@gmail.com', '4253517712'],
  ['Santosh', 'Khare', 'santosh@golsinc.com', '4254926980'],
  ['Atul', 'Khare', 'akhare@gmail.com', '4254436066'],
];

let insertQuery = 'INSERT INTO tblUSER (UserFname, UserLname, UserEmail, UserPhoneNumber) VALUES ?';

connection.query(insertQuery, [users], function (error, results, fields) {
  if (error) throw error;
  console.log('Inserted ' + results.affectedRows + ' rows');
});

connection.end();





menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);