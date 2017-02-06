$(document).ready(function($) {
    // $('#tabs').tabulous({
    // 	effect: 'none'
    // });
    
    $('.search-thumbnail').on('click', function(e){
        var $this = $(this),
            url   = $this.data('url') || '',
            target_div;
        if(!url || url.length === 0){
            return;
        }
        if($this.hasClass('refinement-tabs')){
            if($this.parent().hasClass('active')){
                return;
            }
            target_div = $this.attr('href');
            $(target_div).find('figure').removeClass('active');
            $(target_div).find('.owl-content .owl-item:first-child').find('figure').addClass('active');
        }
        else {
            if($this.hasClass('active')){
                return;
            }
            $this.closest('.owl-content').find('.search-thumbnail').removeClass('active');
            $this.addClass('active');
        }
        
        if($this.hasClass('active')){
            return;
        }
            
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function(data){
                $('#products-found').html(data);
            },
            error: function(e){
                
            }
        });
    });
    
    $(".owl-content").each(function(e){
        $(this).owlCarousel({
            navigation : true
        });
    });
    
    $(".tab-content1").owlCarousel({
 
        // Most important owl features
        items : 7,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        singleItem : false,
        itemsScaleUp : false,
            
        //Basic Speeds
        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,
 
        //Autoplay
        autoPlay : false,
        stopOnHover : false,
    
        // Navigation
        navigation : false,
        navigationText : ["prev","next"],
        rewindNav : true,
        scrollPerPage : false,
    
        //Pagination
        pagination : true,
        paginationNumbers: false,
    
        // Responsive 
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window,
    
        // CSS Styles
        baseClass : "owl-carousel",
        theme : "owl-theme",
     
        //Lazy load
        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",
    
        //Auto height
        autoHeight : false,
     
        //JSON 
        jsonPath : false, 
        jsonSuccess : false,
     
        //Mouse Events
        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,
     
        //Transitions
        transitionStyle : false,
     
        // Other
        addClassActive : false,
    
        //Callbacks
        beforeUpdate : false,
        afterUpdate : false,
        beforeInit: false, 
        afterInit: false, 
        beforeMove: false, 
        afterMove: false,
        afterAction: false,
        startDragging : false,
        afterLazyLoad : false
    });
});