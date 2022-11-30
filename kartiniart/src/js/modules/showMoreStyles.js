import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);


    // cards.forEach(element => {
    //     element.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(element => {
    //         let strToArr = 'hidden-lg hidden-md hidden-sm hidden-xs styles-2'.split(' ');
    //         element.classList.remove(...strToArr);
    //         strToArr = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1'.split(' ');
    //         element.classList.add(...strToArr);
    //     });

    //     btn.remove();
    // });

    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
        .then(res => {
            console.log(res);
            createCards(res);
        }).catch(error => {
            console.log(error)
        })

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            const strToArr = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1'.split(' ');
            card.classList.add(...strToArr);

            card.innerHTML = `
                <div class=styles-block>
                    <img src="${src}" alt>
                    <h4>${title}</h4>
                    <a href="${link}">Подробнее</a>
                </div>
            `

            document.querySelector(wrapper).appendChild(card);
            console.log(document.querySelector('#styles > .row'));
        });
    }
}

export default showMoreStyles;