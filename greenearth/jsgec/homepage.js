(function (win, $) {

    'use strict';

    var HomePage = {

        container: "#homepage",

        welcomeVideo: function () {
            $('.welcome-area video').on('click', function() {
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            });
        },

        customerTestimonialCarousel: function () {
            
            var owl = $("#customer-testimonial-carousel");
            owl.owlCarousel({
                items: 2,
                itemsDesktop: false,
                itemsDesktopSmall: false,
                itemsTablet: false,
                itemsTabletSmall: false,
                itemsMobile: [768, 1]
            });

        },

        init: function () {
            console.log('init homepage');
            HomePage.welcomeVideo();
            HomePage.customerTestimonialCarousel();
        }
    };

    gec.homepage = HomePage;
    
    if ( $(gec.homepage.container).length ) {
        gec.common.modules.push( gec.homepage.init );    
    }    

})(window, jQuery);