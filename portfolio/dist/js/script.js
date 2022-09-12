// Hamburger and Menu listeners
const hamburgerElement = document.querySelector('.hamburger'),
      menuElement = document.querySelector('.menu'),
      menuLinkElements = document.querySelectorAll('.menu__link'),
      closeElement = document.querySelector('.menu__close'),
      overlayElement = document.querySelector('.menu__overlay');

hamburgerElement.addEventListener('click', () => {
    menuElement.classList.add('active');
});

menuLinkElements.forEach(function (menuLinkElement) {
    menuLinkElement.addEventListener('click', () => {
        menuElement.classList.remove('active');
    });
})

closeElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
});

overlayElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
});


// Bar level calculating
const levelsValue = document.querySelectorAll('.skills__level-value');
const barsValue = document.querySelectorAll('.skills__level-bar');

levelsValue.forEach(function(levelValue, index) {
    barsValue[index].style.width = levelValue.innerHTML;
});

// Smooth Scrolling
let links = document.querySelectorAll('[href^="#"]');
const element = document.documentElement,
body = document.body;

links.forEach(link => {
    link.addEventListener('click', function(event) {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);

        if (this.hash !== '') {
            event.preventDefault();
            let hashElement = document.querySelector(this.hash),
                hashElementTop = 0;

            while (hashElement.offsetParent) {
                hashElementTop += hashElement.offsetTop;
                hashElement = hashElement.offsetParent;
            }

            hashElementTop = Math.round(hashElementTop);
            smoothScroll(scrollTop, hashElementTop, this.hash);
        }
    });  
})

const smoothScroll = (from, to, hash) => {
    let timeInterval = 1,
        prevScrollTop,
        speed;

    if (to > from) {
        speed = 17;
    } else {
        speed = -17;
    }
    
    let move = setInterval(function() {
        let scrollTop = Math.round(body.scrollTop || element.scrollTop);

        if (
            prevScrollTop === scrollTop ||
            (to > from && scrollTop >= to) ||
            (to < from && scrollTop <= to)
        ) {
            clearInterval(move);
            history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
        } else {
            body.scrollTop += speed;
            element.scrollTop += speed;
            prevScrollTop = scrollTop;
        }
    }, timeInterval);
};