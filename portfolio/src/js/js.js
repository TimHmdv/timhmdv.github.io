window.addEventListener('DOMContentLoaded', () => {

    // Sidepanel 
    const sidepanel = document.querySelector('.sidepanel');
    const sidepanelHeight = sidepanel.clientHeight;
    const sidepanelScrollTop = sidepanel.getBoundingClientRect().y;
    console.log(sidepanelScrollTop);
    const promoHeight = document.querySelector('.promo').scrollHeight;
    window.addEventListener('scroll', () => {
        const scrollTop = Math.round(Math.max(document.documentElement.scrollTop || document.body.scrollTop))
        if (scrollTop + sidepanelHeight + sidepanelScrollTop > promoHeight) {
            sidepanel.classList.add('sidepanel_active');
        } else if (scrollTop + sidepanelHeight + sidepanelScrollTop < promoHeight) {
            sidepanel.classList.remove('sidepanel_active');
        }
    })

    //Menu
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu'),
          menuContainer = document.querySelector('.menu__list'),
          closeElem = document.querySelector('.menu__close');

    menuContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' || e.target.parentNode.tagName === "LI") {
            menu.classList.remove('active');
        }
    });      

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    // PromoBtns
    const promoBtnsContainer = document.querySelector('.promo__btns');
    const promoBtns = document.querySelectorAll('.promo__link');
    promoBtnsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            promoBtns.forEach((btn) => btn.classList.remove('promo__link_active', 'btn'))
            e.target.classList.add('promo__link_active', 'btn')
        }
    });

    // Counters
    const counters = document.querySelectorAll('.skills__ratings-counter'),
        lines = document.querySelectorAll('.skills__ratings-line span');

    counters.forEach( (item, i) => {
        lines[i].style.width = item.innerHTML;
    });

    // Scrolling
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
            speed = 30;
        } else {
            speed = -30;
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
})