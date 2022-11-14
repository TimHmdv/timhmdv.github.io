"use strict";

window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = require('./modules/tabs');

    tabs();

    // Timer

    const timer = require('./modules/timer');

    timer();

    // Modal

    const modal = require('./modules/modal');

    modal();

    // adding tabs from JS

    const cards = require('./modules/cards');

    cards();

    // Forms

    const form = require('./modules/form');

    form();

    // Carousel slider

    const slider = require('./modules/slider');

    slider();

    // Calculator

    const calculator = require('./modules/calculator');

    calculator();
});