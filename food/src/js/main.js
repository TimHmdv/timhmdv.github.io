"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items'),
            tabs = document.querySelectorAll('.tabheader__item '),
            tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent (index = 0) {
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

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
        document.body.style.overflow = 'hidden';

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
});