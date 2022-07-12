$(document).ready(function(){
    $('.carousel__inner').slick(
      {
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/slider_arrow-left.png" alt="arrow-left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/slider_arrow-right.png" alt="arrow-right"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              dots: true,
              arrows: false
            }
          }
        ]
      }
    );

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleTabSlide (item) {
      $(item).each(function (i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    }

    toggleTabSlide('.catalog-item__link');
    toggleTabSlide('.catalog-item__back');
  });