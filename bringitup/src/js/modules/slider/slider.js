export default class Slider {
    constructor({
        container = null,
        next = null,
        prev = null,
        reset = null,
        activeClass = null,
        animate = false,
        autoplay = false
    } = {}){
        this.container = document.querySelector(container);
        try {this.slides = [...this.container.children];} catch (e) {};
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.reset = document.querySelectorAll(reset);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }

}