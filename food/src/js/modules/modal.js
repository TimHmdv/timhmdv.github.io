function openElement (selector, modalTimerId) {
    function open (element) {
        element.classList.remove('hide');
        element.classList.add('show', 'fade');
    }
    if (typeof(selector) === 'object') {
        open(selector);
    } else {
        const retrievedElement = document.querySelector(selector);
        open(retrievedElement);
    }

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
} 

function closeElement (selector) {
    function close (element) {
        element.classList.remove('show', 'fade');
        element.classList.add('hide');
    }
    if (typeof(selector) === 'object') {
        close(selector);
    } else {
        const retrievedElement = document.querySelector(selector);
        close(retrievedElement);
    }
}

function modal (triggerSelector, modalSelector, modalTimerId) {
    const modalTriggers = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal');

    modalTriggers.forEach(item => {
        item.addEventListener('click', () => {
            openElement(modal, modalTimerId);
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

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openElement(modal, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openElement, closeElement};