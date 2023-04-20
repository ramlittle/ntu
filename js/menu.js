//DOMS
const menuButton = document.querySelector('.menu-button');
const navContainer =document.querySelector('.nav-container');
const logoContainer = document.querySelector('.logo-container');
const header = document.querySelector('header');

//EVENTS
menuButton.addEventListener('click',()=>{
    if (navContainer.style.display=='none'){
        logoContainer.style.display='none';
        navContainer.style.display='flex';    
        header.style.height='10rem';
        menuButton.style.backgroundColor='aliceblue';
        menuButton.style.color='black';
    }else{
        logoContainer.style.display='flex'
        navContainer.style.display='none';
        header.style.height='auto';
        menuButton.style.backgroundColor='lightgrey';
    }
})