const hamburgerElement = document.querySelector('.hamburger'),
      menuElement = document.querySelector('.menu'),
      closeElement = document.querySelector('.menu__close'),
      overlayElement = document.querySelector('.menu__overlay');

hamburgerElement.addEventListener('click', () => {
    menuElement.classList.add('active');
});

closeElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
});

overlayElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
});