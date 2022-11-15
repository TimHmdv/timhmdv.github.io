"use strict";
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {

    tabs();

    // Timer

    timer();

    // Modal

    modal('[data-modal]', '.modal');

    // adding tabs from JS

    cards();

    // Forms

    form();

    // Carousel slider

    slider();

    // Calculator

    calculator();
});