import Accordion from "./modules/accordion";
import Difference from "./modules/difference";
import Download from "./modules/download";
import SendForm from "./modules/form";
import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({
        container:'.page', 
        next: '.next',
        reset: '.sidecontrol > a',
        animate: 'fadeIn'
    });
    slider.render();

    const moduleSlider = new MainSlider({
        container: '.moduleapp',
        next: '.next, .nextmodule',
        prev: '.prevmodule',
        reset: '.sidecontrol > a',
        animate: 'fadeIn'
    });
    moduleSlider.render();

    const showUpSlider = new MiniSlider({
        container : '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        addOpacity: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container : '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container : '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    const player = new VideoPlayer('.showup .play', '.overlay');
    player.init();

    const modulePlayer = new VideoPlayer('.module__video-item .play', '.overlay');
    modulePlayer.init();

    const oldOfficer = new Difference({
        officer: '.officerold',
        items: '.officer__card-item'
    });
    oldOfficer.init();

    const newOfficer = new Difference({
        officer: '.officernew',
        items: '.officer__card-item'
    });
    newOfficer.init();


    const letsHelpForm  = new SendForm({
        form: '.join__evolution form',
        url: './assets/question.php'
    });
    letsHelpForm.init();

    const selectTimeForm = new SendForm({
        form: '.schedule__form form',
        url: './assets/question.php'
    });
    selectTimeForm.init();

    const accordion = new Accordion({
        links: '.plus',
        bodies: '.msg'
    });
    accordion.init();

    const download = new Download('.download');
    download.init();
});