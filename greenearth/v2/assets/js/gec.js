var gec = {};

(function (win, $) {
	
	'use strict';

	var Common = {

		modules: [],

		init: function () {
			console.log('init common');
		},

		initModules: function () {
			var mdl = 0;

			for (mdl=0; mdl<Common.modules.length; mdl++) {
				Common.modules[mdl]();
			}
		}
	};

	gec.common = Common;

	gec.common.modules.push( gec.common.init );

	$(document).ready(function () {
		gec.common.initModules();		
	});

})(window, jQuery);
(function (win, $) {

	/**
	 * Navigation Constructor
	 */
	function Navigation (options) {
		this.options = $.extend({}, this.options);
		$.extend(this.options, options);
		// this._init();
	};


    /**
     * Navigation Options.
     */
    Navigation.prototype.options = {
        type: 			'slide-right', 	// The menu type
        menuOpenerId: 	'#lnkMenuOpen', // The menu opener class names (i.e. the buttons)
        maskId: 		'#nav-mask' 		// The ID of the mask
    };


    /**
     * Initialise Navigation.
     */
    Navigation.prototype._init = function () {
    	var _self 				= gec.navigation;

        _self.$body 			= $('body');
        _self.$mask 			= $(_self.options.maskId);
        _self.$menu 			= $('#gec-menu-' + _self.options.type);
        _self.$closeBtn 		= _self.$menu.find('.gec-menu-close');
        _self.$menuOpener 		= $(_self.options.menuOpenerId);
        _self._initEvents();
    };

    
    /**
     * Initialise Navigation Events.
     */
    Navigation.prototype._initEvents = function () {
        var _self = this;

        // Event for clicks on the mask.
        _self.$menuOpener.on('click', function (e) {
            e.preventDefault();
            _self.open();
        });


        // Event for clicks on the close button inside the menu.
        _self.$closeBtn.on('click', function (e) {
            e.preventDefault();
            _self.close();
        });


        // Event for clicks on the mask.
        _self.$mask.on('click', function (e) {
            e.preventDefault();
            _self.close();
        });
    };

    
    /**
     * Open Menu.
     */
    Navigation.prototype.open = function () {
        this.$body.addClass('has-active-menu');
        this.$menu.addClass('is-active');
        this.$mask.addClass('is-active');
    };

    
    /**
     * Close Menu.
     */
    Navigation.prototype.close = function () {
        this.$body.removeClass('has-active-menu');        
        this.$menu.removeClass('is-active');
        this.$mask.removeClass('is-active');
    };


    gec.navigation = new Navigation({
        type: 			'slide-right', 	// The menu type
        menuOpenerId: 	'#lnkMenuOpen', // The menu opener class names (i.e. the buttons)
        maskId: 		'#nav-mask' 		// The ID of the mask    	
    });
 
 	// gec.navigation._init();
    gec.common.modules.push( gec.navigation._init );    

})(window, jQuery);
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