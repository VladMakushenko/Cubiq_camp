window.addEventListener('DOMContentLoaded', () => {
    const sliderBreakpoint = window.matchMedia('(max-width: 1200px)');

    const lineupSwiperSettings = {
        slidesPerView: 'auto',
        slidesPerGroup: 4,
        loop: false,
        speed: 500,
        spaceBetween: 8,
        threshold: 10,
        simulateTouch: false,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
    };

    const newsSwiperSettings = {
        slidesPerView: 1,
        loop: false,
        speed: 500,
        threshold: 10,
        simulateTouch: false,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
    };

    let lineupSwiper = new Swiper('.lineup_swiper', lineupSwiperSettings);    
    let newsSwiper = new Swiper('.news_swiper', newsSwiperSettings);

    lineupSwiper.on('slideNextTransitionStart', (e) => {
        const lineupSwiperSlides = [...document.querySelectorAll('.swiper-slide')];
        const nextActiveSlide = document.querySelector('.swiper-slide-next');

        for (let i = 0; i < lineupSwiperSlides.length; i++) {
            const item = lineupSwiperSlides[i];

            for (let i = 0; i < lineupSwiperSlides.length; i++) {
                const item = lineupSwiperSlides[i];
                item.classList.remove('swiper-slide--is_active');
                nextActiveSlide.classList.add('swiper-slide--is_active');
            }
        }
    });

    lineupSwiper.on('slidePrevTransitionStart', (e) => {
        const lineupSwiperSlides = [...document.querySelectorAll('.swiper-slide')];
        const activeSlide = document.querySelector('.swiper-slide-active');

        for (let i = 0; i < lineupSwiperSlides.length; i++) {
            const item = lineupSwiperSlides[i];

            for (let i = 0; i < lineupSwiperSlides.length; i++) {
                const item = lineupSwiperSlides[i];
                item.classList.remove('swiper-slide--is_active');
                activeSlide.classList.add('swiper-slide--is_active');
            }
        }
    });


    const increaseSlideOnClick = () => {
        const lineupSwiperSlides = [...document.querySelectorAll('.swiper-slide')];

        for (let i = 0; i < lineupSwiperSlides.length; i++) {
            const item = lineupSwiperSlides[i];
            const itemPicture = item.querySelector('.swiper-slide__picture');

            if (itemPicture) {
                itemPicture.addEventListener('click', () => {    
    
                    for (let i = 0; i < lineupSwiperSlides.length; i++) {
                        const item = lineupSwiperSlides[i];
                        item.classList.remove('swiper-slide--is_active');
                        lineupSwiper.update();
                    }
        
                    item.classList.add('swiper-slide--is_active');

                });
            }
        }

        return;
    };

    const breakpointChecker = () => {
        if (sliderBreakpoint.matches === true) {
            if (!lineupSwiper.destroyed) lineupSwiper.destroy(true, true);

            return;
        } else {
            if (lineupSwiper.destroyed) {
                lineupSwiper = new Swiper('.lineup_swiper', lineupSwiperSettings);    
                lineupSwiper.on('slideChange', () => {
                    // lineupSwiper.update();
                });
            }

            return;
        }
    };

    if (sliderBreakpoint.matches === false) {
        increaseSlideOnClick();
    }
    
    breakpointChecker();    

    window.addEventListener('resize', () => {
        if (sliderBreakpoint.matches === false) {
            increaseSlideOnClick();
        }
        
        breakpointChecker();
    });



    $('.hi_tech_modules .button').on('click', function() {
        $('.modules_list__item').show();
        $(this).hide();
    });



});
