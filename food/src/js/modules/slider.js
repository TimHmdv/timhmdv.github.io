import {addZero} from './timer';

function slider () {
    const offerSlider = document.querySelector('.offer__slider'),
        offerSliderCounter = offerSlider.querySelector('.offer__slider-counter'),
            offerSliderPrev = offerSliderCounter.querySelector('.offer__slider-prev'),
            offerSliderCurrent =  offerSliderCounter.querySelector('#current'),
            offerSliderTotal =  offerSliderCounter.querySelector('#total'),
            offerSliderNext = offerSliderCounter.querySelector('.offer__slider-next'),
        offerSliderWrapper = offerSlider.querySelector('.offer__slider-wrapper'),
            offerSliderInner = offerSliderWrapper.querySelector('.offer__slider-inner'),
            offerSlides = offerSliderInner.querySelectorAll('.offer__slide'),
    offerSliderWrapperWidth = window.getComputedStyle(offerSliderWrapper).width;

    let currentSlideIndex = 1;
    let innerOffset = 0;
    const totalSlidesCount = offerSlides.length;

    offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
    offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;

    offerSliderInner.style.width = `${100 * totalSlidesCount}%`;
    offerSliderInner.style.display = 'flex';
    offerSliderInner.style.transition = '0.5s all';

    offerSliderWrapper.style.overflow = 'hidden';

    offerSlider.style.position = 'relative';
    const allDots = [];
    const dotsWrapper = document.createElement('ol');
    dotsWrapper.classList.add('carousel-indicators');
    offerSliderWrapper.append(dotsWrapper);

    offerSlides.forEach((slide,slideIndex) => {
        slide.style.width = offerSliderWrapperWidth;

        let dot = document.createElement('li');
        dot.classList.add('dot');
        dotsWrapper.append(dot);

        if (slideIndex == 0) {
            dot.style.opacity = '1';
        }

        allDots.push(dot);

        dot.addEventListener('click', (e) => {
            innerOffset = convertStringToNumber(offerSliderWrapperWidth) * slideIndex;
            offerSliderInner.style.transform = `translateX(-${innerOffset}px)`;

            allDots.forEach (item => item.style.opacity = '.5');
            dot.style.opacity = '1';

            currentSlideIndex = slideIndex + 1;

            offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
        });

    });


    offerSliderNext.addEventListener('click', () => {
        if (innerOffset == convertStringToNumber(offerSliderWrapperWidth) * (totalSlidesCount - 1)) {
            innerOffset = 0;
        } else {
            innerOffset += convertStringToNumber(offerSliderWrapperWidth) ;
        }

        offerSliderInner.style.transform = `translateX(-${innerOffset}px)`

        if (currentSlideIndex == totalSlidesCount) {
            currentSlideIndex = 1;
        } else {
            currentSlideIndex++;
        }

        offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;

        allDots.forEach (item => item.style.opacity = '.5');
        allDots[currentSlideIndex-1].style.opacity = '1';
    })

    offerSliderPrev.addEventListener('click', () => {
        if (innerOffset == 0) {
            innerOffset = convertStringToNumber(offerSliderWrapperWidth) * (totalSlidesCount - 1);
        } else {
            innerOffset -= convertStringToNumber(offerSliderWrapperWidth);
        }

        offerSliderInner.style.transform = `translateX(-${innerOffset}px)`

        if (currentSlideIndex == 1) {
            currentSlideIndex = totalSlidesCount;
        } else {
            currentSlideIndex--;
        }

        offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;

        allDots.forEach (item => item.style.opacity = '.5');
        allDots[currentSlideIndex-1].style.opacity = '1';
    })
    
    function convertStringToNumber (string) {
        return +string.replace(/\D/g, '');
    }
}

export default slider;

//-------------------------------------------------------------------
    
    // showSlides(currentSlideIndex);

    // offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;


    // function showSlides(n) {
    //     if (n > totalSlidesCount) {
    //         currentSlideIndex = 1;
    //     }

    //     if (n < 1) {
    //         currentSlideIndex = totalSlidesCount;
    //     }

    //     offerSlides.forEach (item => closeElement(item));

    //     openElement(offerSlides[currentSlideIndex-1]);

    //     offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex)}`;
    // }

    // function plusSlides (n) {
    //     showSlides(currentSlideIndex += n);
    // }

    // offerSliderPrev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // offerSliderNext.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //-------------------------------------------------------------------

    // offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    // offerSliderTotal.innerHTML = `${addZero(totalSlidesCount)}`;

    // offerSlides.forEach((item) => {
    //     closeElement(item);
    // });

    // openElement(offerSlides[currentSlideIndex]);

    // offerSliderNext.addEventListener('click', () => {
    //     if(currentSlideIndex < totalSlidesCount-1) {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex++;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     } else {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex = 0;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     }
    // });

    // offerSliderPrev.addEventListener('click', () => {
    //     if(currentSlideIndex > 0) {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex--;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     } else {
    //         closeElement(offerSlides[currentSlideIndex]);
    //         currentSlideIndex = totalSlidesCount-1;
    //         offerSliderCurrent.innerHTML = `${addZero(currentSlideIndex+1)}`;
    //         openElement(offerSlides[currentSlideIndex]);
    //     }
    // });