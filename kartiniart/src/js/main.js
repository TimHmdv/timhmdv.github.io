import accordion from "./modules/accordion";
import burger from "./modules/burger";
import calc from "./modules/calc";
import checkTextInputs from "./modules/checkTextInputs";
import drop from "./modules/drop";
import filter from "./modules/filter";
import forms from "./modules/forms";
import mask from "./modules/mask";
import modals from "./modules/modals";
import pictureSize from "./modules/pictureSize";
import scrolling from "./modules/scrolling";
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

    accordion('.accordion-heading');

    burger('.burger-menu', '.burger');

    scrolling('.pageup');

    drop();
});