window.addEventListener('DOMContentLoaded', () => {
    const sliderBreakpoint = window.matchMedia('(max-width: 500px)');

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

        breakpoints: {
            501: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            1025: {
                slidesPerView: 'auto',
                slidesPerGroup: 4,
            }
          }
    };

    let lineupSwiper = new Swiper('.formats_slider', lineupSwiperSettings);

    const lineupSwiperSlides = [...document.querySelectorAll('.swiper-slide')];

    for (let i = 0; i < lineupSwiperSlides.length; i++) {
        const item = lineupSwiperSlides[i];
        const itemLink = item.querySelector('.swiper-slide__link');

        if (itemLink) {
            itemLink.addEventListener('click', (e) => {
                e.preventDefault();

                for (let i = 0; i < lineupSwiperSlides.length; i++) {
                    const item = lineupSwiperSlides[i];
                    item.classList.remove('swiper-slide--is_active');
                    // lineupSwiper.update();
                }

                item.classList.add('swiper-slide--is_active');
            });
        }
    }

    lineupSwiper.on('slideNextTransitionStart', (e) => {
        const nextActiveSlide = document.querySelector('.formats_slider .swiper-slide-next');

        for (let i = 0; i < lineupSwiperSlides.length; i++) {
            const item = lineupSwiperSlides[i];
            item.classList.remove('swiper-slide--is_active');
            nextActiveSlide.classList.add('swiper-slide--is_active');
        }
    });

    lineupSwiper.on('slidePrevTransitionStart', (e) => {
        const activeSlide = document.querySelector('.formats_slider .swiper-slide-active');

        for (let i = 0; i < lineupSwiperSlides.length; i++) {
            const item = lineupSwiperSlides[i];
            item.classList.remove('swiper-slide--is_active');
            activeSlide.classList.add('swiper-slide--is_active');
        }
    });


    const breakpointChecker = () => {
        if (sliderBreakpoint.matches === true) {
            if (!lineupSwiper.destroyed) lineupSwiper.destroy(true, true);
        } else {
            if (lineupSwiper.destroyed) {
                lineupSwiper = new Swiper('.formats_slider', lineupSwiperSettings);
                lineupSwiper.on('slideChange', () => {
                    lineupSwiper.update();
                });
            }
        }

        return;
    };

    breakpointChecker();

    window.addEventListener('resize', () => {
        // lineupSwiper.update();

        breakpointChecker();
    });

});
