import modals from "./modules/modals";
import sliders from "./modules/sliders";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    modals();

    sliders('.feedback-slider-item', false, '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', true, '.main-prev-btn', '.main-next-btn');
});