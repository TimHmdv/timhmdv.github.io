$(document).ready(function () {
	$('.carousel .slider').slick(
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

	$('.catalog .slider').slick(
		{
			prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/slider_arrow-left.png" alt="arrow-left"></button>',
			nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/slider_arrow-right.png" alt="arrow-right"></button>'
		}
	);

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	$('.catalog .slider').on('click swipe', function () {
		let currentSlide = $('.catalog .slider').slick('slickCurrentSlide');
		$(this).closest('.container').find('div.catalog__content').removeClass('catalog__content_active').eq(currentSlide).addClass('catalog__content_active');
	});

	function toggleTabSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	}

	toggleTabSlide('.catalog-item__link');
	toggleTabSlide('.catalog-item__back');

	// Modal


	$('[data-modal=consultation]').on('click', function () {
		if ($(window).width() >= 576) {
			$('.overlay, #consultation').fadeIn('slow');
		} else {
			$('.overlay, #consultation').slideDown('slow');
		}
		
	});

	$('.modal__close').on('click', function () {
		if ($(window).width() >= 576) {
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		} else {
			$('.overlay, #consultation, #order, #thanks').slideUp('slow');
		}
	})

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			if ($(window).width() >= 576) {
				$('.overlay, #order').fadeIn('slow');
			} else {
				$('.overlay, #order').slideDown('slow');
			}
		});
	})

	function validateForm (form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Укажите имя",
					minlength: jQuery.validator.format("Введите как минимум {0} символа(-ов)!")
				},
				phone: "Укажите номер телефона",
				email: {
					required: "Укажите адрес электронной почты",
					email: "Ваш адрес электронной почты должен быть в формате name@domain.com"
				}
			}
		});
	};

	validateForm('#consultation-form');
	validateForm('#consultation form');
	validateForm('#order form');


	$('form input[name]').mask("+7 (999) 999-99-99");

});