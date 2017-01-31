$(function() {
    // Trop de soucis avec FF <= 30, détectons le
    if (parseInt(navigator.userAgent.toLowerCase().split('firefox/').slice(-1)[0]) < 31) {
        $('html').addClass('ff-norontb');
    }

    window.lazyload = function(selector) {
        var options = {
            threshold: 50,
            failure_limit: 1000,
            effect: "fadeIn",
            event: "scroll lazyappear",
            appear: function() {
                $(this).removeClass('lazy');
                this.loaded = true;
            }
        };

        // move .lazy flag to .adapt-img-wrapper and launch lazyload
        if ($.fn.lazyload)
            $(selector).addClass('lazy').lazyload(options);
    };

    if ($('html.lazy').length) {
        window.lazyload('.adapt-img-wrapper');
        $('html').removeClass('lazy');
    }

    if (!($.fn.slider))
        window.sliderEnabled = false;

    if (typeof(window.sliderEnabled) == "undefined" || (typeof(window.sliderEnabled) != "undefined" && window.sliderEnabled == true)) {
        var slider = $(".slider:not(.noinit)").slider();
    }

    // Parallax
    var pageHeight = $(document).height(),
        pageWidth = $(document).width(),
        headerHeight, scrollMultiplier;
    var normalLayers = $(".layer-normal");
    var normalLayersContainers = $(".layer-normal .background-container");

    function updateParallax(scroll) {
        scrollMultiplier = Math.max(Math.min(scroll / (pageWidth * 0.3), 1), 0); // Gets blacker until content has been scrolled to the top (slider is out of view)

        // New fade-out Effect
        normalLayersContainers.css({
            opacity: (1 - scrollMultiplier * 0.8).toFixed(2)
        }); // Fade to 20% max
        $(".layer-normal .background-container .fade-gradient2").css({
            opacity: Math.min(1.0, (scrollMultiplier * 2)).toFixed(2)
        }); // Fade to 20% max

        if ($(".ui-autocomplete").length)
            $("#search-form #q").autocomplete("close");
    }

    // Textfill
    function updateTextfill() {
        if ($.fn.textfill) $(".textfill").textfill({
            debug: false,
            widthOnly: true,
            maxFontPixels: 80
        });
    }
    updateTextfill();

    // TODO: remove
    //function updateHeaderOffset() {
    //  headerHeight = $(".header-container").height() || 0;
    //  $("body").css({"padding-top": headerHeight + 'px'});
    //  updateParallax(0);
    //}

    // Scroll handler
    var scroll, autoplayEnabled = true;
    if (typeof(window.parallaxEnabled) == "undefined")
        window.parallaxEnabled = true;

    $('#buorgclose').click(function() {
        $("#cookie-notification, #buorg").remove();
        //updateHeaderOffset();
    });

    window.mobilecheck = function() {
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    var deviceSupportsParallax = window.mobilecheck;

    if (deviceSupportsParallax && window.parallaxEnabled)
        $(window).scroll(function() {
            scroll = $(window).scrollTop();

            // Stop autoplay when slider is in the background
            if (typeof(window.sliderEnabled) == "undefined" || (typeof(window.sliderEnabled) != "undefined" && window.sliderEnabled == true)) {
                if (slider && autoplayEnabled && scroll > 300) {
                    slider.stopTimer();
                    autoplayEnabled = false;
                }
                if (slider && !autoplayEnabled && scroll < 300) {
                    slider.startTimer();
                    autoplayEnabled = true;
                }
            }

            // Close language selector when scrolling
            if (scroll > 300 && $(".language-selector").hasClass("active")) {
                $(".language-selector").removeClass("active");
                $(".language-details").addClass("hidden");
            }

            if (window.parallaxEnabled) updateParallax(scroll);
        });
    //updateHeaderOffset();
    updateParallax(0);

    var breakpoints = {
        current: "load",
        mobileWidth: 760, // 730 normally + Microsoft Windows Scrollbars
        tabletWidth: 1000, // 960 normally + Microsoft Windows Scrollbars

        triggerHandlers: function() {
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            if (breakpoints.current == "load") {
                if (width < breakpoints.mobileWidth) return breakpoints.loadMobile();
                if (width > breakpoints.tabletWidth) return breakpoints.loadDesktop();
                if (width > breakpoints.mobileWidth && width < breakpoints.tabletWidth) return breakpoints.loadTablet();
            }

            if (width < breakpoints.mobileWidth && breakpoints.current != "mobile") {
                if (breakpoints.current == "desktop") breakpoints.desktopToTablet();
                breakpoints.tabletToMobile();
                breakpoints.current = "mobile";
                return;
            }
            if (width > breakpoints.tabletWidth && breakpoints.current != "desktop") {
                if (breakpoints.current == "mobile") breakpoints.mobileToTablet();
                breakpoints.tabletToDesktop();
                breakpoints.current = "desktop";
                return;
            }
            if (width > breakpoints.mobileWidth && width < breakpoints.tabletWidth) {
                if (breakpoints.current == "mobile") {
                    breakpoints.current = "tablet";
                    breakpoints.mobileToTablet();
                    return;
                }
                if (breakpoints.current == "desktop") {
                    breakpoints.current = "tablet";
                    breakpoints.desktopToTablet();
                    return;
                }
            }
        },

        mobileToTablet: function() {
            $("body").trigger("mobileToTablet");
        },
        tabletToMobile: function() {
            $("body").trigger("tabletToMobile");
        },
        tabletToDesktop: function() {
            $("body").trigger("tabletToDesktop");
        },
        desktopToTablet: function() {
            $("body").trigger("desktopToTablet");
        },

        loadMobile: function() {
            breakpoints.current = "mobile";
            breakpoints.desktopToTablet();
            breakpoints.tabletToMobile();
        },
        loadTablet: function() {
            breakpoints.current = "tablet";
            breakpoints.mobileToTablet();
            breakpoints.desktopToTablet();
        },
        loadDesktop: function() {
            breakpoints.current = "desktop";
            breakpoints.mobileToTablet();
            breakpoints.tabletToDesktop();
        }
    }
    window.breakpoints = breakpoints;

    $(window).resize(function() {
        breakpoints.triggerHandlers();
    });
    $(window).load(function() {
        breakpoints.triggerHandlers();
    });
    window.onfocus = (function() {
        breakpoints.triggerHandlers();
    });

    //$("body").on("mobileToTablet tabletToMobile tabletToDesktop desktopToTablet", updateHeaderOffset);

    $('.picks-sign-up form, .footer-links form').submit(function() {
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var inputVal = $(this).find('input[type=text]').val();
        if (!inputVal || inputVal.length < 1) return;
        if (regEmail.test(inputVal)) {
            // Here you can add form logic like ajax request
            if ($.fn.colorbox && !(typeof(window.enableNewsletterPopup) != "undefined" && window.enableNewsletterPopup == false)) {
                $.colorbox({
                    width: colorboxWidth,
                    previous: false,
                    next: false,
                    fixed: true,
                    href: NEWSLETTER_URL + '?email=' + inputVal + ' .main > *',
                    onComplete: function() {
                        $(this).colorbox.resize();
                    }
                });
            }
        } else {
            var input = $(this).find("input");
            var tooltip = $("<span class=\"tooltip\">" + MESSAGE_INVALID_EMAIL + "</span>");

            $(".tooltip").remove();
            $(tooltip).clone()
                .appendTo("body")
                .offset(input.offset())
                .css({
                    "margin-top": input.outerHeight() + 8
                })
                .css({
                    "margin-left": input.outerWidth() * .15
                })
                .css({
                    "color": "#D90749"
                })
                .fadeIn(100)
                .delay(6000)
                .fadeOut(100, function() {
                    $(this).remove();
                });
        }
        return false;
    });

    var colorboxWidth = "60%";

    $(document).bind('cbox_open', function() {
        $('html').css({
            overflow: 'hidden'
        });
    }).bind('cbox_closed', function() {
        $('html').css({
            overflow: 'auto'
        });
    });

    var colorboxOptions = {
        width: colorboxWidth,
        previous: false,
        next: false,
        fixed: false,
        onComplete: function() {
            $(this).colorbox.resize();
        }
    };

    $("body").on("mobileToTablet", function() {
        colorboxWidth = "70%";
        openColorbox();
        window.parallaxEnabled = true;
        updateParallax($(window).scrollTop());
    });

    $("body").on("tabletToMobile", function() {
        colorboxWidth = "90%";
        openColorbox();
        updateParallax(0);
        window.parallaxEnabled = false;
    });

    $("body").on("tabletToDesktop", function() {
        colorboxWidth = "60%";
        window.parallaxEnabled = true;
        if ($("body#dispatch").length > 0 || $("body#life-is-on").length > 0) {
            window.parallaxEnabled = false;
        }
        updateParallax($(window).scrollTop());
        updateTextfill();
        openColorbox();
    });

    $("body").on("desktopToTablet", function() {
        colorboxWidth = "70%";
        //updateParallax(0);
        //window.parallaxEnabled = false;
        updateTextfill();
        openColorbox();
    });


    // Disable Dispatch Slider on mobile
    $("body#dispatch").on("desktopToTablet", function() {
        if (slider) {
            slider.goto(0);
            slider.disable();
        }
    });

    $("body#dispatch").on("tabletToDesktop", function() {
        if (slider) {
            slider.enable();
        }
    });

    function openColorbox() {
        if ($.fn.colorbox) {
            $('.colorbox').each(function() {
                var copyOptions = colorboxOptions;
                if ($(this).parents('.gallery').length > 0) {
                    copyOptions.rel = "gallery";
                    copyOptions.previous = true;
                    copyOptions.next = true;
                    copyOptions.photo = true;
                    copyOptions.href = $(this).attr('href');
                } else {
                    copyOptions.scrolling = true;
                    copyOptions.href = $(this).attr("href") + ' .main > *';
                }
                $(this).colorbox(copyOptions);
            });
        }
    }

    if ($.fn.placeholder)
        $('input, textarea').placeholder();


    // Display support-bar
    $("#support-bar").bind('click', function(e) {
        $(this).toggleClass("active");
        e.stopPropagation();
    });
    $('.chat-availability').bind('click', function(e) {
        e.stopPropagation(); // Don't hide support-bar on click
    });
    $('.chat_button_offline').bind('click', function(e) {
        $('.chat-availability').css('display', 'table-cell');
        e.stopPropagation(); // Don't hide support-bar on click
    });
    $('.chat-availability-close').click(function() {
        $('.chat-availability').toggle();
    });

    //Styled select for work pages
    if ($.fn.selectize && !$("html").hasClass('ie8')) // No selectize on IE8
    {
        window.mySelect = $('select:not(.no-emulation)').selectize({
            allowEmptyOption: true
        });

        // Marketo Selectize
        $(".marketo-form").on("marketo-form-loaded", function(event) {
            $(this).find("select:not(.no-emulation)").selectize({
                allowEmptyOption: true,
                sortField: 'value'
            });
        });
    }

    // Required popup
    if (!/chrome/i.test(navigator.userAgent)) {
        var tooltip = $("<span class=\"tooltip\"><img src=\"" + TOOLTIP_IMAGE + "\">" + MESSAGE_FIELD_MANDATORY + "</span>");
        $("form").attr("novalidate", ""); // Add novalidate to overwrite any native validation handling

        $("[required]").each(function() {
            var input = $(this);
            $(this).closest("form").on("submit", function() {
                if (input.val().length === 0) {
                    $(tooltip).clone()
                        .appendTo("body")
                        .offset(input.offset())
                        .css({
                            "margin-top": input.outerHeight() + 8
                        })
                        .css({
                            "margin-left": input.outerWidth() * .15
                        })
                        .fadeIn(100)
                        .delay(6000)
                        .fadeOut(100, function() {
                            $(this).remove();
                        });
                    return false;
                } else
                    return true;
            });
        });
    }
    $(".chat-content form").on("submit", function() {
            var i = 0;
            $(this).find("[required]").each(function() {
                if ($(this).val().length === 0) {
                    i++;
                    return true;
                }
            });
            console.log(i);
            if (i === 0) {
                $(this).addClass('submitted');
                $('body').animate({scrollTop: ($(this).prevAll('h2').offset().top-100) });
                $(".tooltip").hide(); // Hide tooltips if still visible on submit
                return false;
            }

        });

    // Proactive popup
    if (window.PROACTIVE_DELAY) {
        $(".proactive-chat").delay(PROACTIVE_DELAY * 1000).fadeIn();
        $(".proactive-chat .close-button").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(".proactive-chat").hide();
        });
    }
    
    if($("#dispatch .slider-new").length && $("#dispatch .slider-new")[0].sliderNew) {
        var sliderNew = $("#dispatch .slider-new")[0].sliderNew;
        $("body").on("tabletToDesktop", function() { sliderNew.enable(); });
        $("body").on("desktopToTablet", function() { sliderNew.disable(); });   
    }

    // search button
});

