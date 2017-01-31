(function (win, $) {

  'use strict';

  var ProjectsObj = {

    container: "#projects",

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
      console.log('init projects page');
      ProjectsObj.customerTestimonialCarousel();
    }
  };

  gec.projects = ProjectsObj;

  if ($(gec.projects.container).length) {
    gec.common.modules.push(gec.projects.init);
  }

})(window, jQuery);