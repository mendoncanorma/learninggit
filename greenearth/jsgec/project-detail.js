(function (win, $) {

    'use strict';

    var ProjectDetail = {

        container: "#project-detail",

        projectsCarousel: function () {
            var owl = $("#projects-carousel");
            owl.owlCarousel({
                singleItem:true
            });
        },

        init: function () {
            console.log('init project detail page');
            ProjectDetail.projectsCarousel();
        }
    };

    gec.projectdetail = ProjectDetail;
    
    if ( $(gec.projectdetail.container).length ) {
        gec.common.modules.push( gec.projectdetail.init );    
    }    

})(window, jQuery);