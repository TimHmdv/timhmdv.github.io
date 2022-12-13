import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";

window.addEventListener('DOMContentLoaded', () => {
    const Slider = new MainSlider({
        container:'.page', btns: '.next'
    });
    Slider.render();

    const ShowUpSlider = new MiniSlider({
        container : '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    ShowUpSlider.init();

    const ModulesSlider = new MiniSlider({
        container : '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    ModulesSlider.init();

    const FeedSlider = new MiniSlider({
        container : '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    FeedSlider.init();

    const Player = new VideoPlayer('.showup .play', '.overlay');
    Player.init();
});