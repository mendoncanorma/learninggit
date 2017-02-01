(function($){
	'use strict';
	livelo.pointstransfer = {
		init: function(){
			livelo.pointstransfer.quantitySelected();
			livelo.pointstransfer.formValidate();
			livelo.pointstransfer.termsAndConditionsChecked();
			livelo.pointstransfer.pointstransferlogin();
			livelo.pointstransfer.managePointsTransfer();
			livelo.pointstransfer.addToCartBtnStatusToggle();
		},

		managePointsTransfer: function(){
			$("#quantitySelect").on("change", function(){
				var bucketSize = Number($("#bucketSizeHidden").val()),
				points = Number($("#quantitySelect").val()),
				pointsSize = bucketSize*points;
			$("#pointsDisplay").text(pointsSize);

			if(pointsSize > parseInt($("#pointBalance").val())){
				$("#btnPTPAddToCart").addClass("inactive");
			}
			else{
				$("#btnPTPAddToCart").removeClass("inactive");
			}
				//livelo.pointstransfer.pointsTransfer();
			});
		},
		pointstransferlogin: function(){
			var showLogin = $("#showLogin").val();
			
			if(showLogin == 'true'){
				$("#mdlLogin").modal('show');
			}
		},
		formValidate: function () {

			$("#form-pointstransfer-pdp").validate();

			/*
			$("#form-pointstransfer-pdp").validate({

		        invalidHandler: function() {
		        	$(".global-error").find(".error-message").html(livelo.globalErroMessage);
		        	$(".global-error").show();
		            //form.submit();
		        }
    		});
			*/
		},
		addToCartBtnStatusToggle: function(){
			var isChecked = $('#termsAndConditionsCheckbox').is(':checked');
			var minimumQuantity = parseInt($("#quantitySelect option:first").text());
			var pointBalance = parseInt($("#pointBalance").val());
			var selectedQuantity = parseInt($("#quantitySelect option:selected").text());
//			if(selectedQuantity === minimumQuantity) {
//				if(minimumQuantity <= pointBalance && isChecked){
//					document.getElementById("btnPTPAddToCart").disabled = false;
//				} else {
//					document.getElementById("btnPTPAddToCart").disabled = true;
//				}
//			} else {
//				if(isChecked){
//					document.getElementById("btnPTPAddToCart").disabled = false;
//				} else {
//					document.getElementById("btnPTPAddToCart").disabled = true;
//				}
//
//			}

		},
		termsAndConditionsChecked: function(){
			$('#termsAndConditionsCheckbox').change(function() {
				livelo.pointstransfer.addToCartBtnStatusToggle();
        	});
		},
		quantitySelected: function(){
			livelo.pointstransfer.addToCartBtnStatusToggle();
			livelo.pointstransfer.managePointsTransfer();
			$("#quantitySelect").change(function(e){
				e.preventDefault();
				livelo.pointstransfer.addToCartBtnStatusToggle();
				livelo.pointstransfer.managePointsTransfer();
				var selectedQuantity = $("#quantitySelect").val();
				var productId = $("#productId").val();
				
				// make ajax call to get the price html
							
				$("#priceDiv").empty();
					$.ajax({
					       method:"POST",
						   cache:"false",
						   dataType: "text",
						   data: {quantity: selectedQuantity,productId:productId},
						   url: "/livelo/pages/catalog/includes/pointsTransferPriceDisplay.jsp",
					       success: function(data) {
					    	   $("#priceDiv").append(data);
					    	   
					        },
					       error: function(e) {
					         alert('error-happened!!');
					       }
	 				});
			});
		    
		}
    };
	
	livelo.common.modules.push(livelo.pointstransfer.init);
	
		
})(jQuery);

