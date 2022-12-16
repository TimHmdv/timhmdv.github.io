import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor (container, prev, next, reset) {
        super(container, prev, next, reset);
    }

    bindTriggers () {
        this.next.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(1);
            });
        });

        this.prev.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(-1);
            });
        });

        this.reset.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        })
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        for (let slide of this.slides) {
            slide.style.display = 'none';
        }

        this.slides[this.slideIndex - 1].style.display = 'block';
        
        try {
            this.hanson.style.opacity = '0';
            if (n === 3) {
                this.hanson.classList.add('animated');
                this.timer = setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            }
        } catch (e) {}
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        if (this.container) {
            this.bindTriggers();

            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}
    
            this.showSlides(this.slideIndex);
        }
    }
}