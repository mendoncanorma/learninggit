(function ($) {
    
    $.fn.dropdowns = function (options) {
        
        if (this.length === 0) {
            return this;
        } else if (this.length > 1) {
            this.each(function () {
                $(this).dropdowns(options);
            });
            
            return this;
        }
        
        var defaults = {
            toggleWidth: 992  
        };
        
        var options, ww, adjustMenu;
        
        options = $.extend(defaults, options);
        ww      = $(window).width();
        
        
        addParents = function () {
            $('#nav ul').each(function () {
                $(this).prev('a').addClass('parent');
            });
        };
        
        adjustMenu = function () {
            
            if (ww < options.toggleWidth) {
                $('.toggleMenu').show();
                
				$("#nav").hide();
                
                $('#nav li')
                    .off('mouseenter mouseleave')
                
                /*
                $('#nav li a.parent')
                    .off('click')
                    .on('click', function (e) {
                        e.preventDefault();
                        $(this).parent('li').toggleClass('hover');
                    });
                */
                
                $('#nav li')
                    .off('click')
                    .on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // $(this).toggleClass('hover');
                        $(this).children('ul').slideToggle();
                    });
                
            } else if (ww >= options.toggleWidth) {
                $('.toggleMenu').hide();
                
                $("#nav").show();
                
                $("#nav li").removeClass("hover");
                
                $('#nav li')
                    .off('mouseenter mouseleave')
                    .on('mouseenter', function () {
                        $(this).addClass('hover');
                    })
                    .on('mouseleave', function () {
                        $(this).removeClass('hover');
                    });
                
            }            
        };
        
        addParents();
        adjustMenu();
        $('.toggleMenu').on('click', function (e) {
            e.preventDefault();
            // $(this).next("#nav").toggle();
            $(this).next("#nav").slideToggle();
        });
        
        $(window).on ('resize orientationchange', function () {            
            ww = $(window).width();
            adjustMenu();
        });

        
        return this;
    };
    
})(jQuery);