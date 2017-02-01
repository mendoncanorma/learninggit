(function($){
	'use strict';
	livelo.checkoutheader = {
		init: function(){
			livelo.checkoutheader.highlightHeader();
		},

		highlightHeader: function(){
		    if($("#headerStatus").val() === "shipment"){
				$(".shipmentli").toggleClass("topBar",true);
				
				$(".shipmentIcon").toggleClass("activeNum",true);
				$(".pagementoIcon").toggleClass("activeNum",false);
				$(".revisoIcon").toggleClass("activeNum",false);
				$(".shipmentText").toggleClass("activeMenu",true);
				$(".pagementoText").toggleClass("activeMenu",false);
				$(".revisoText").toggleClass("activeMenu",false);

			} else if ($("#headerStatus").val() === "pagemento"){
				$(".shipmentli").addClass("topBar");
				$(".pagementoli").addClass("topBar");
				$(".shipmentIcon").toggleClass("activeNum",false);
				$(".pagementoIcon").toggleClass("activeNum",true);
				$(".revisoIcon").toggleClass("activeNum",false);
				$(".shipmentText").toggleClass("activeMenu",false);
				$(".pagementoText").toggleClass("activeMenu",true);
				$(".revisoText").toggleClass("activeMenu",false);				
			} else if ($("#headerStatus").val() === "reviso"){
				$(".shipmentli").addClass("topBar");
				$(".pagementoli").addClass("topBar");
				$(".revisoli").addClass("topBar");
				$(".shipmentIcon").toggleClass("activeNum",false);
				$(".pagementoIcon").toggleClass("activeNum",false);
				$(".revisoIcon").toggleClass("activeNum",true);
				$(".shipmentText").toggleClass("activeMenu",false);
				$(".pagementoText").toggleClass("activeMenu",false);
				$(".revisoText").toggleClass("activeMenu",true);
			}
		}
    };
	
	livelo.common.modules.push(livelo.checkoutheader.init);
	
		
})(jQuery);

