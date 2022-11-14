function openElement (element) {
    element.classList.remove('hide');
    element.classList.add('show', 'fade');
    
    // document.body.style.overflow = 'hidden';

    // if (element === modal) {
    //     clearInterval(modalTimerId);
    // }
} 

function closeElement (element) {
    element.classList.remove('show', 'fade');
    element.classList.add('hide');
    document.body.style.overflow = '';
}

function modal () {
    const modalTriggers = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');

    modalTriggers.forEach(item => {
        item.addEventListener('click', () => {
            openElement(modal);
        });
    });

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
}

export default modal;
export {openElement, closeElement};