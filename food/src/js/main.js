"use strict";

window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = require('./modules/tabs');

    tabs();

    // Timer

    const deadLine = '2023-05-01';

    function getTimeRemaining (endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
                days = Math.floor(total / 1000 / 60 / 60 / 24),
                hours = Math.floor((total / 1000 / 60 / 60) % 24),
                minutes =  Math.floor ((total / 1000 / 60) % 60),
                seconds = Math.floor ((total / 1000) % 60);
        
        return {
            total : total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function addZero (number) {
        if (number >=0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock (selector, endTime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadLine);

    // Modal

    const modalTriggers = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');
   
    function openElement (element) {
        element.classList.remove('hide');
        element.classList.add('show', 'fade');
        
        // document.body.style.overflow = 'hidden';

        // if (element === modal) {
        //     clearInterval(modalTimerId);
        // }
    } 

    modalTriggers.forEach(item => {
        item.addEventListener('click', () => {
            openElement(modal);
        });
    });

    function closeElement (element) {
        element.classList.remove('show', 'fade');
        element.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', e =>{
        if (e.target === modal || e.target.className === 'modal__close') {
            closeElement(modal);
        }
    });

    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            closeElement(modal);
        }
    });

    // const modalTimerId = setTimeout(() => {
    //     openElement(modal);
    // }, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openElement(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // adding tabs from JS

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 37;
            this.changetoUAH();
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changetoUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.defaultClass = 'menu__item'
                element.classList.add(this.defaultClass);
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                })
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);   
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then((data) => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach (item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        })

        return await res.json();
    };

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', jsonData)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove()
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })


            // request.addEventListener ('load', () => {
            //     statusMessage.remove()

            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //     }

            //     else {
            //         showThanksModal(message.failure); 
            //     }
            // });
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        openElement(modal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeElement(modal);
        }, 4000);
    }

    // Carousel slider

    const offerSlider = document.querySelector('.offer__slider'),
        offerSliderCounter = offerSlider.querySelector('.offer__slider-counter'),
            offerSliderPrev = offerSliderCounter.querySelector('.offer__slider-prev'),
            offerSliderCurrent =  offerSliderCounter.querySelector('#current'),
            offerSliderTotal =  offerSliderCounter.querySelector('#total'),
            offerSliderNext = offerSliderCounter.querySelector('.offer__slider-next'),
        offerSliderWrapper = offerSlider.querySelector('.offer__slider-wrapper'),
            offerSliderInner = offerSliderWrapper.querySelector('.offer__slider-inner'),
            offerSlides = offerSliderInner.querySelectorAll('.offer__slide'),
    offerSliderWrapperWidth = window.getComputedStyle(offerSliderWrapper).width;

    let currentSlideIndex = 1;
    let innerOffset = 0;
    const totalSlidesCount = offerSlides.length;

    offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
    offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;

    offerSliderInner.style.width = `${100 * totalSlidesCount}%`;
    offerSliderInner.style.display = 'flex';
    offerSliderInner.style.transition = '0.5s all';

    offerSliderWrapper.style.overflow = 'hidden';

    offerSlider.style.position = 'relative';
    const allDots = [];
    const dotsWrapper = document.createElement('ol');
    dotsWrapper.classList.add('carousel-indicators');
    offerSliderWrapper.append(dotsWrapper);

    offerSlides.forEach((slide,slideIndex) => {
        slide.style.width = offerSliderWrapperWidth;

        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotsWrapper.append(dot);

        if (slideIndex == 0) {
            dot.style.opacity = '1';
        }

        allDots.push(dot);

        dot.addEventListener('click', (e) => {
            innerOffset = convertStringToNumber(offerSliderWrapperWidth) * slideIndex;
            offerSliderInner.style.transform = `translateX(-${innerOffset}px)`;

            allDots.forEach (item => item.style.opacity = '.5');
            dot.style.opacity = '1';

            currentSlideIndex = slideIndex + 1;

            offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
        });

    });


    offerSliderNext.addEventListener('click', () => {
        if (innerOffset == convertStringToNumber(offerSliderWrapperWidth) * (totalSlidesCount - 1)) {
            innerOffset = 0;
        } else {
            innerOffset += convertStringToNumber(offerSliderWrapperWidth) ;
        }

        offerSliderInner.style.transform = `translateX(-${innerOffset}px)`

        if (currentSlideIndex == totalSlidesCount) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
        }

        offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;

        allDots.forEach (item => item.style.opacity = '.5');
        allDots[currentSlideIndex-1].style.opacity = '1';
    })

    offerSliderPrev.addEventListener('click', () => {
        if (innerOffset == 0) {
            innerOffset = convertStringToNumber(offerSliderWrapperWidth) * (totalSlidesCount - 1);
        } else {
            innerOffset -= convertStringToNumber(offerSliderWrapperWidth);
        }

        offerSliderInner.style.transform = `translateX(-${innerOffset}px)`

        if (currentSlideIndex == 1) {
            currentSlideIndex = totalSlidesCount;
        } else {
            currentSlideIndex--;
        }

        offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;

        allDots.forEach (item => item.style.opacity = '.5');
        allDots[currentSlideIndex-1].style.opacity = '1';
    })
    
    function convertStringToNumber (string) {
        return +string.replace(/\D/g, '');
    }

    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;


    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex' , 'female');
    }
    
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio' , 1.375);
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '-----';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    //-------------------------------------------------------------------
    
    // showSlides(currentSlideIndex);

    // offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;


    // function showSlides(n) {
    //     if (n > totalSlidesCount) {
    //         currentSlideIndex = 1;
    //     }

    //     if (n < 1) {
    //         currentSlideIndex = totalSlidesCount;
    //     }

    //     offerSlides.forEach (item => closeElement(item));

    //     openElement(offerSlides[currentSlideIndex-1]);

    //     offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
    // }

    // function plusSlides (n) {
    //     showSlides(currentSlideIndex += n);
    // }

    // offerSliderPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // offerSliderNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //-------------------------------------------------------------------

    // offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    // offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;

    // offerSlides.forEach((item) => {
    //     closeElement(item);
    // });

    // openElement(offerSlides[currentSlideIndex]);

    // offerSliderNext.addEventListener('click', () => {
    //     if(currentSlideIndex < totalSlidesCount-1) {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex++;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     } else {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex = 0;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     }
    // });

    // offerSliderPrev.addEventListener('click', () => {
    //     if(currentSlideIndex > 0) {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex--;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     } else {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex = totalSlidesCount-1;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     }
    // });

});