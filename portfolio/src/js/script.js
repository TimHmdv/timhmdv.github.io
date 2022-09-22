window.addEventListener('DOMContentLoaded', () => {
    // Hamburger and Menu listeners
    const hamburgerElement = document.querySelector('.hamburger'),
    menuElement = document.querySelector('.menu'),
    menuLinkElements = document.querySelectorAll('.menu__link'),
    closeElement = document.querySelector('.menu__close'),
    overlayElement = document.querySelector('.overlay');

    hamburgerElement.addEventListener('click', () => {
    menuElement.classList.add('active');
    overlayElement.classList.add('active');
    });

    menuLinkElements.forEach(function (menuLinkElement) {
    menuLinkElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
    overlayElement.classList.remove('active');
    });
    })

    closeElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
    overlayElement.classList.remove('active');
    });

    overlayElement.addEventListener('click', () => {
    menuElement.classList.remove('active');
    overlayElement.classList.remove('active');
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

    // WOW.js library initialization
    new WOW().init();

    // Form validation
    $('form').validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            text: {
                required: true
            },
            checkbox: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Укажите имя",
                minlength: jQuery.validator.format("Введите как минимум {0} символа(-ов)!")
            },
            email: {
                required: "Укажите адрес электронной почты",
                email: "Неверный формат"
            },
            text: {
                required: "Необходимо ввести сообщение"
            },
            checkbox: {
                required: "Необходимо согласие!"
            }
        }
    });

    // Send data from form and check recaptcha response

    $('form').submit(function (e) {
		e.preventDefault();
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            alert('Вы не прошли проверку CAPTCHA должным образом');
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize(),
                success: function (response) {
                    $(this).find('input').val('');
                    $(this).find('textarea').val('');
                    
                    $('.overlay, #thanks').fadeIn('slow');
                    
                    $('form').trigger('reset');
                }
            });    
        }
		return false;
	});
})