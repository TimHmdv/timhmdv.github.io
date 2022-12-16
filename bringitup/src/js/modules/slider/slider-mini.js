import Slider from "./slider";


export default class MiniSlider extends Slider {
    constructor (container , prev, next, activeClass, animate, autoplay) {
        super(container, prev, next, activeClass, animate, autoplay);
    }

    filterSlides() {
        this.filteredSlides = this.slides.filter(slide => {
            if (slide.nodeName !== 'BUTTON') {
                return slide;
            }
        });
    }

    decorizeSlides () {
        this.filteredSlides.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.filteredSlides[0].classList.add(this.activeClass);

        
        if (this.animate) {
            this.filteredSlides[0].querySelector('.card__title').style.opacity = '1';
            this.filteredSlides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers () {
        this.next.addEventListener('click', () => {
            this.nextSlide();
            clearInterval(this.sliderInterval);
        });

        this.prev.addEventListener('click', () => {
           this.prevSlide();
           clearInterval(this.sliderInterval);
        });
    }

    autoPlay () {
        if (this.autoPlay) {
            this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
        
            this.container.addEventListener('mouseenter', () => {
                clearInterval(this.sliderInterval);
            });
    
            this.container.addEventListener('mouseleave', () => {
                this.sliderInterval = this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
            });   
        }
    } 

    nextSlide () {
        this.container.appendChild(this.filteredSlides[0]);

            this.filteredSlides.push(this.filteredSlides[0]);
            this.filteredSlides.splice(0, 1);

            this.decorizeSlides();
    }

    prevSlide () {
        let active = this.filteredSlides[this.filteredSlides.length - 1];
        this.container.insertBefore(active, this.filteredSlides[0]);

        this.filteredSlides.unshift(this.filteredSlides[this.filteredSlides.length - 1]);
        this.filteredSlides.pop();

        this.decorizeSlides();
    }

    init () {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.filterSlides();
            this.decorizeSlides();
            this.bindTriggers();
            this.autoPlay ();
        } catch (e) {};
    }
}