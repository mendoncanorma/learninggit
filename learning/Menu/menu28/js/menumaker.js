(function ($) {
    
    $.fn.menumaker = function (options) {
        
        if ( this.length == 0) {
            return this;
        } else if ( this.length > 1 ) {
            this.each(function () {
                $(this).menumaker(options);
            });
            return this;
        }
        
        var cssmenu,
            settings,
            select,
            option,
            link,
            ul,
            indentation;
        
        cssmenu     = $(this);
        settings    = $.extend({
            title: "Menu",
            format: "dropdown",
            breakpoint: 768,
            sticky: false
        }, options);
        
        cssmenu.find("li ul").parent().addClass("has-sub");
        
        if (settings.format === 'select') {

            select = $('<select />', {
                'class': 'select-list',
                'width': "100%"
            });
            
            option = $('<option />', {
                selected: true,
                value: -1,
                text: settings.title
            });
            
            select.append(option);
            cssmenu.append(select);
            
            cssmenu.find('li > a').each(function () {
                link        = $(this);
                ul          = link.parents('ul');
                indentation = "";
                
                for (var i=1; i<ul.length; i++) {
                    indentation += "- ";
                }
                
                option = $('<option />', {
                    value: link.attr('href'),
                    text: indentation + " " + link.text()
                });
                
                select.append(option);
            });
            
            select.on('change', function () {
                window.location.href = this.value;
            });
            
        } else if (settings.format === "dropdown") {
            
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            
        }
        
    };
    
})(jQuery);