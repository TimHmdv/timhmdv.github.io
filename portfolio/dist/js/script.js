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

const levelsValue = document.querySelectorAll('.skills__level-value');
const barsValue = document.querySelectorAll('.skills__level-bar');

levelsValue.forEach(function(levelValue, index) {
    barsValue[index].style.width = levelValue.innerHTML;
});