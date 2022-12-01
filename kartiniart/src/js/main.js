import calc from "./modules/calc";
import checkTextInputs from "./modules/checkTextInputs";
import filter from "./modules/filter";
import forms from "./modules/forms";
import mask from "./modules/mask";
import modals from "./modules/modals";
import pictureSize from "./modules/pictureSize";
import showMoreStyles from "./modules/showMoreStyles";
import sliders from "./modules/sliders";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let state = {};
    
    modals();

    sliders('.feedback-slider-item', false, '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', true, '.main-prev-btn', '.main-next-btn');

    forms(state);

    mask('[name="phone"]');

    checkTextInputs('[name="name"]');

    checkTextInputs('[name="message"]');

    showMoreStyles('.button-styles', '#styles .row');

    calc('#size', '#material', '#options', '.promocode', '.calc-price', state);

    filter();

    pictureSize('.sizes-block');
});