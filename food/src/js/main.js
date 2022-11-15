"use strict";
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calculator from './modules/calculator';
import {openElement} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => {
        openElement('.modal', modalTimerId);
    }, 3333333);

    // Tabs

    tabs('.tabheader__items', '.tabheader__item ', '.tabcontent', 'tabheader__item_active');

    // Timer

    timer('.timer', '2023-05-01');

    // Modal

    modal('[data-modal]', '.modal', modalTimerId);

    // adding tabs from JS

    cards();

    // Forms

    form('form', modalTimerId);

    // Carousel slider

    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        sliderWrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        counterWrapper: '.offer__slider-counter',
    });

    // Calculator

    calculator();
});