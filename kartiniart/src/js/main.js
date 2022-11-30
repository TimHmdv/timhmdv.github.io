import checkTextInputs from "./modules/checkTextInputs";
import forms from "./modules/forms";
import mask from "./modules/mask";
import modals from "./modules/modals";
import showMoreStyles from "./modules/showMoreStyles";
import sliders from "./modules/sliders";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    modals();

    sliders('.feedback-slider-item', false, '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', true, '.main-prev-btn', '.main-next-btn');

    forms();

    mask('[name="phone"]');

    checkTextInputs('[name="name"]');

    checkTextInputs('[name="message"]');

    showMoreStyles('.button-styles', '.styles-2');
});