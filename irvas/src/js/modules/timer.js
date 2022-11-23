function addZero (number) {
    if (number >=0 && number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}
const timer = (id, deadline) => {
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/1000/60/60) % 60),
                days = Math.floor(t/1000/60/60/24);
        
        return {
            total: t,
            seconds: seconds,
            minutes: minutes,
            hours: hours,
            days: days
        }
    }

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
                days = document.querySelector('#days'),
                hours = document.querySelector('#hours'),
                minutes = document.querySelector('#minutes'),
                seconds = document.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

export {addZero, timer};