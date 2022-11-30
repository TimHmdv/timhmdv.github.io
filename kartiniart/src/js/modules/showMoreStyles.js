const showMoreStyles = (trigger, styles) => {
    const cards = document.querySelectorAll(styles),
            btn = document.querySelector(trigger);


    cards.forEach(element => {
        element.classList.add('animated', 'fadeInUp');
    });

    btn.addEventListener('click', () => {
        cards.forEach(element => {
            let strToArr = 'hidden-lg hidden-md hidden-sm hidden-xs styles-2'.split(' ');
            element.classList.remove(...strToArr);
            strToArr = 'col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1'.split(' ');
            element.classList.add(...strToArr);
        });

        btn.remove();
    });
}

export default showMoreStyles;