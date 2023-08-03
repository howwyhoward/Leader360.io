// app.js
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
    const featuresMenu = document.querySelector('#features-page')
    const feedbackMenu = document.querySelector('#feedback-page')
    const aboutMenu = document.querySelector('#about-page')
    let scrollPos = window.scrollY

    homeMenu.classList.remove('highlight')
    featuresMenu.classList.remove('highlight')
    feedbackMenu.classList.remove('highlight')
    aboutMenu.classList.remove('highlight')

    // adds 'highlight' class to menu items
    if(window.innerWidth > 960 && scrollPos < 550) {
        homeMenu.classList.add('highlight')
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        featuresMenu.classList.add('highlight')
    } else if (window.innerWidth > 960 && scrollPos < 2000) {
        feedbackMenu.classList.add('highlight')
    } else if (window.innerWidth > 960 && scrollPos < 2750) {
        aboutMenu.classList.add('highlight')
    } else if (window.innerWidth > 960 && scrollPos >= 2750) {
        // Removes highlight from all items when scrolled past about section
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

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// rediect to login page when button is clicked //
function redirectToLogin() {
    window.location.href = 'newuser.html';
}

// retrive user data
let userEmail = localStorage.getItem('UserEmail');

if (userEmail) {
    fetch('http://localhost:3000/getUser?email=' + userEmail)
    .then(response => response.json())
    .then(data => {
        document.getElementById('leader-name').textContent = data.UserFname;
    })
    .catch(error => console.error('Error:', error));
}