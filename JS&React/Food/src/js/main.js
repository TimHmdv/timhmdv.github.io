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

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

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
});