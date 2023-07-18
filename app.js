const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');




document.getElementById('submit-button').addEventListener('click', function(e) {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  $.ajax({
    type: "GET",
    url: "https://leadership-internship2.azurewebsites.net/getUserName",
    data: { email: email },
    success: function(data) {
        const userNameSpan = document.getElementById('user-name');
        userNameSpan.textContent = data;
    },
    error: function(error) {
        console.error('Error:', error);
    }
  });
});




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


menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);