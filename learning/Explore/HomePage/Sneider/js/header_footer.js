$(".header-container").find("a").click(function(e) {
    e.preventDefault();
});
$(window).load(function() {
    $(document).ready(function() {
        $(".header-container").find("a").unbind("click");

        // Set variables for header functions
        var menu = $('.header-content .menu > div ');
        var menuLength = $('.main-menu > li').size() - 3;
        var submenu = menu.children().children('li:nth-child(1)');

        $("body").on("tabletToDesktop", function() {
            closeMenu();
            menu.width((menuLength * 100) + '%');
            menu.parent().removeClass("menu-mobile");
            menu.children().children().width((100 / menuLength) + '%');
        });
        $("body").on("desktopToTablet", function() {
            closeMenu();
            menu.css('margin-left', '-100%');
            menu.width('100%');
            menu.parent().addClass("menu-mobile");
            menu.children().children().width('100%');
        });

        // Remove every classes that simulate an open menu
        function closeMenu() {
            menu.removeClass("open");
            $('.menu-open').removeClass("menu-open");
            $(".menu > div").removeClass("open").removeClass("animate");
            setTimeout(function() {
                $(".menu li.selected").removeClass("selected");
            }, 300);
        }

        // Click header
        $(".header-content .main-menu > li > a").click(function(e) {
            var menuItem = $(this).parent();
            var itemIndex = menuItem.index() + 1;
            submenu = menu.children().children('li:nth-child(' + itemIndex + ')');

            if (menuItem.hasClass('mobile-country-selector') ||
                menuItem.is('#header-login-link:not(.logged)')) {
                return;
            } else if (submenu.hasClass('selected')) {
                closeMenu();
            } else if (menuItem.hasClass('mobile-language-selector')) {
                $(this).parent().toggleClass('selected');
            } else {
                $(".header-content").removeClass("search-open");
                var itemMargin = 0 - ((itemIndex - 1) * 100); // Set negative margin on the menu in order to move it to the right position

                menu.addClass("open");
                setTimeout(function() {
                    menu.addClass("animate");
                }, 400);
                submenu.siblings().removeClass('selected');
                if (!menu.parent().hasClass("menu-mobile")) {
                    menu.css('margin-left', itemMargin + '%');
                    $('body').addClass("menu-open"); // Add a class to the body in order to push the content
                };

                submenu.addClass('selected');
            }

            // When opening a menu on desktop, open all its first children
            if (menuItem.is("#header-login-link")) {
                $(this).parent().find("div > ul > li").addClass("selected"); // Only select first li
            } else if (submenu.hasClass("selected") && (breakpoints.current == "desktop")) {
                submenu.find("ul").each(function() {
                    submenu.children().children('ul').first().children().removeClass("selected"); // Complex selector to say every node except leaf nodes
                    submenu.children().children('ul').first().children().first().addClass("selected"); // Complex selector to say every node except leaf nodes
                });

                $(".main-menu > li").removeClass("selected");
                $(".main-menu").children('li:nth-child(' + itemIndex + ')').addClass("selected");

                // Set up a handler on the next body click to close the menu
                $("body").one('click', closeMenu);
            } else {
                $("body").off('click', closeMenu);
            }

            fitHeader();
            e.stopPropagation();
            e.preventDefault();
        });

        $(".header-content").click(function(e) {
            e.stopPropagation();
        }); // For the body click handler not to trigger on an internal click


        $(".menu > div > ul > li > .wrapper ul > li > a").click(function(e) {
            if ($(this).closest("#header-login-link").length) return;
            $(this).parent().addClass("selected").siblings().removeClass("selected");
            e.stopPropagation();

            if ($(this).not(".leaf").length) e.preventDefault();
        });

        // Fits header height to level5 height
        function fitHeader() {
            var selected_level4 = $(".header-content .main-menu > li.selected:not(#header-login-link) .wrapper > li.selected .wrapper");
            var height = 0;
            var borders_height = parseInt(selected_level4.css('borderTopWidth')) + parseInt(selected_level4.css('borderBottomWidth'));
            selected_level4.find('> ul>li >div >div').each(function() {
                $(this).parent().css({
                    'display': 'block'
                }); // Force show (to get offsetHeight)
                height = Math.max(height, this.offsetHeight);
                $(this).parent().css({
                    'display': ''
                }); // Hiding... unless if has class selected.
            });
            selected_level4.css({
                'height': height + borders_height + 'px'
            });
        }

        $(".back-button").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).closest("li").removeClass("selected");
        });

        $(".wrapper > .back-button").click(function(e) {
            $(".menu > div").removeClass("open");
        });

        $(".hamburger-button").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            if ($(".header-content").hasClass("menu-open")) {
                closeMenu();
                menu.css('margin-left', '-100%');
            } else {
                $(".header-content").addClass("menu-open").removeClass("search-open");
                menu.css('margin-left', '0');
            }
            updateScrollStatus();
        });

        $(".search-button").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(".header-content").toggleClass("search-open");
            $('.header-content').removeClass('menu-open');
            $(this).parent().toggleClass("selected").siblings().removeClass("selected");
            $(this).parent().find(".selected").removeClass("selected"); // Reset everything
            $(this).parent().parent().find(".open").removeClass("open"); // Reset everything
            $(this).parent().parent().find(".selected").removeClass("selected"); // Reset everything
            $('body').removeClass('menu-open'); // Reset everything

            if ($(".header-content").hasClass("search-open"))
                $(".header-content .search-field").focus();
            else
                $(".header-content .search-field").val("").trigger("input");

            $(document).scrollTop(0); // Scroll to top
            updateScrollStatus();
            e.preventDefault();
        });

        function updateScrollStatus() {
            if ($(".header-content").hasClass("search-open") || $(".header-content").hasClass("menu-open"))
                $("html, body").css({
                    overflow: "hidden",
                    height: "100%"
                }); // Disable scroll
            else
                $("html, body").css({
                    overflow: "visible",
                    height: "auto"
                }); // Enable scroll
        }

        $(".search-results").hide();

        $(".header-content .search-field").on($("html").is(".ie8, .ie9") ? "keyup" : "input",
            function() {
                if ($(this).val().length > 0) {
                    $(".header-content .search-results").show();
                    $(".header-content .message").remove();
                } else {
                    $(".header-content .search-results").hide();
                }
            });

        $(".search-bar").on("submit", function(e) {
            var element = $(this);
            var message_div = $('.message', element);
            var input = $('input.search-field', element);
            if (!input) return; // cannot find search input

            if (!message_div.length) {
                message_div = $('<div class="message"></div>');
            }

            if (input.val().length > 0) {
                message_div.remove();
            } else {
                message_div.html(MESSAGE_FIELD_MANDATORY);
                input.after(message_div);
                e.preventDefault();
            }
        });

        // Click footer
        $(".footer-social .expand-social").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".footer-container").addClass("deployed-social");
            $(this).closest(".footer-container").removeClass("deployed-language");
            $(document).scrollTop($(document).height()); // Scroll to bottom
        })

        $(".footer-social .retract-social").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".footer-container").removeClass("deployed-social");
        })

        // Click footer
        $(".footer-bottom-bar .language-selector").click(function(e) {

            e.stopPropagation();
            e.preventDefault();

            if (breakpoints.current != "desktop") return;
            var footerContainer = $(this).closest(".footer-container");

            if (footerContainer.hasClass("deployed-language")) {
                footerContainer.removeClass("deployed-language");
            } else {
                footerContainer.addClass("deployed-language");
                footerContainer.removeClass("deployed-social");

                var languagesList = $('.footer-language-bar .languages').first();
                var languageSelectorButton = $(this).parent();

                var marginLeft = languageSelectorButton[0].offsetLeft + (languageSelectorButton[0].offsetWidth / 2) - (languagesList[0].offsetWidth / 2);
                marginLeft = Math.max(0, marginLeft);

                languagesList.css({
                    marginLeft: marginLeft + 'px'
                });
                $(document).scrollTop($(document).height()); // Scroll to bottom
            }
        });

        // addClass ie10 debug footer language-selector
        if (/MSIE 10/i.test(navigator.userAgent)) {
            $(".language-selector").addClass('ie10');
        }

        $(".footer-language-bar .close").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).closest(".footer-container").removeClass("deployed-language");
        });

        //Click event to scroll to top
        $('.icon-top').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

    });
});
