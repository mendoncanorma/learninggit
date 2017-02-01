(function($){
	'use strict';
	livelo.browse = {
		container: "#catContent",
		init: function(){
			livelo.browse.facetToggleFunctionality();
		},
		facetToggleFunctionality: function(){
		$("#catContent").on('click', '.show-link',  function(e){
				 e.preventDefault();
				 var _this = $(this),
				 link = _this.data('content-href'),
				 content = _this.closest('[data-content-collection]'),
				 contentCollection = content.data('content-collection'),
				 url = livelo.urls.context + livelo.urls.assembler + link;
				 url += '&contentCollection=' + contentCollection;
				 $.get(url, function(data){
					content.html(data);
				});
			});
			
			$("#catContent").on('click', '.categoryNameDisplay',  function(e){
				$(this).toggleClass("post-collapse"),
				$(this).closest(".clpcatfacet").find("ul").toggleClass("in");
			});
		}
	}
	
	 if ( $(livelo.browse.container).length > 0) {
		livelo.common.modules.push(livelo.browse.init); 	
	 }	
})(jQuery);
