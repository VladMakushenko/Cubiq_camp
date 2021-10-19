window.addEventListener('DOMContentLoaded', () => {

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

    let newsSwiper = new Swiper('.news_swiper', newsSwiperSettings);

});
