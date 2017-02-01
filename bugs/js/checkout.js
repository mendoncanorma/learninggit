(function($){
	'use strict';
	livelo.checkout = {
		container: "#checkout",
		init: function(){
			livelo.checkout.formSubmits();
			livelo.checkout.setMasks();
			livelo.checkout.panelSlide();
			livelo.checkout.deleteSavedAddress();
			livelo.checkout.MakePrimaryCardNo();
			livelo.checkout.continueCheckout();
			livelo.checkout.selectCardType();
			livelo.checkout.mergeCart();
			livelo.checkout.makePrimaryAddress();
			livelo.checkout.manageCVV();
			livelo.checkout.optInstallmentType();
			livelo.checkout.setInstallmentValue();
			livelo.checkout.browserBackButton();
			livelo.checkout.setPaymentMethodStatus();
			livelo.checkout.onClickOAMRadio();
			livelo.checkout.OAMRecapchaButtonHadlers();
			livelo.checkout.redirectToCart();
			livelo.checkout.changeCardExpiry();
			if($("#isModalRequired") && $("#isModalRequired").val() == "Positive"){
				$("#mdlOAMReCapcha").modal('show');
			}
			if($("#isModalRequired") && $("#isModalRequired").val() == "Block"){
				window.location = $("#antiFraudRedirectUrl").val();
			}
			if($(".postCodePrimary").length){
				$(".postCodePrimary").focus();
			} 
			if($(".postCodeAddressBook").length){
				$(".postCodeAddressBook").focus();
			}
			
		},
		redirectToCart: function(){
			if($("#isRedirect").val()=="true"){
				window.location = $("#cartRedirectUrl").val();
			}
		},
		onClickOAMRadio: function(){
			$(".js-communication-select").click(function(e){
				// var first_res = $('.sms-number-picker option[value!=""]').first().val();
				$("#mdlOAMReCapcha").find(".choices").find("select").attr("disabled", true);
				
				// $("#mdlOAMReCapcha").find(".choices").find("select").selectedIndex = 0;;
				$("#mdlOAMReCapcha").find(".choices").find("select").removeClass("js-active-select");
				$(this).closest(".choices").find("select").attr("disabled", false);
				$(this).closest(".choices").find("select").addClass("js-active-select");
				$("#recapcha-comm-type").val($(this).closest(".choices").attr("data-comm-type"));
				$('#recapcha-comm-number').val($(this).closest(".choices").find("select option:selected").val());
			});
			
			$("#mdlOAMReCapcha").find("select").change(function(e){
				var optionSelected = $("option:selected", this);
				$('#recapcha-comm-number').val(optionSelected.val());			
			})
			$('#recapcha-comm-number').val($("div[data-comm-type='sms']").find("select option:selected").val());
			// $("#mdlOAMReCapcha").modal('show');
		},
		
		browserBackButton: function(){
			if($('#orderConfirmRedirectURL').length > 0 ){
				if (window.history && window.history.pushState) {
					window.history.pushState('forward', null, './orderConfirmation.jsp');
					$(window).on('popstate', function() {
						window.location.href = $('#orderConfirmRedirectURL').val();
					});
				}
			}
		},

		getRequestCode:function(){
			
			var select_val = $('#recapcha-comm-number').val(),
				comm_type  = $("#recapcha-comm-type").val(),
				url        = livelo.urls.context + '/secure/checkout/includes/createTransactionTokenAjax.jsp?ph_num='+select_val+'&comm_type='+comm_type;
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				success: function(data) {
					if(data.error) {
						$("#mdlOAMReCapcha").find(".global-error").show();
						$("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(data.errorMessage);
					} else {
						$(".js-init-content").addClass("hider");
						$(".js-authorize-code-entry").removeClass("hider");
					}
				},
				error: function(e){
					$("#mdlOAMReCapcha").find(".global-error").show();
					$("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(e.responseText);
				}
			});
		},
		resetOAMModal: function(){
			$("#mdlOAMReCapcha").find(".global-error").hide();
			$("#mdlOAMReCapcha").find("#verification-code").val("");
		},		
		OAMRecapchaButtonHadlers:function(){
			$(".js-oam-enviar").click(function(e){
				livelo.checkout.resetOAMModal();
				livelo.checkout.getRequestCode();
			});
			
			$(".js-solicitar-enviar").click(function(e){
				livelo.checkout.resetOAMModal();
				livelo.checkout.getRequestCode();
			});
			
			$(".js-choose-another-ph").click(function(e){
                livelo.checkout.resetOAMModal();
				$(".js-authorize-code-entry").addClass("hider");
				$(".js-init-content").removeClass("hider");
			});
			
			$(".js-verify-enviar").click(function(e){
				livelo.checkout.verifyRequestCode();
			});
		},
		
		verifyRequestCode:function(){
			var code = $("#verification-code").val(),
				url = livelo.urls.context + '/secure/checkout/includes/validateTransactionTokenAjax.jsp?verification_code='+code;
			
			if($.trim(code).length === 0){
				$("#mdlOAMReCapcha").find(".error-container").find(".error-message").html("Você não inseriu qualquer código");
				return;
			}
			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'json',
				success: function(data){
					if(data.error == true) {
							if(data.isRedirect != true ){
								$("#mdlOAMReCapcha").find(".global-error").show();
								$("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(data.errorMessage);
							} else{
								//$(".js-authorization-error-container").removeClass("hider");
								//$(".js-authorize-code-entry").addClass("hider");
								var redirectUrl=data.redirectUrl;
								$.ajax({
									url: redirectUrl,
									type: 'POST',
									dataType: 'json',
									success: function(responce){
										window.location = "https://auth-dev.pontoslivelo.com.br/oam/server/logout?end_url="+"/secure/myaccount/splash.jsp";
									},error: function(e){
										window.location = "https://auth-dev.pontoslivelo.com.br/oam/server/logout?end_url="+"/secure/myaccount/splash.jsp";
									}
								});

							}
						
					} else {
						$("#mdlOAMReCapcha").modal('hide');
						//window.location.href = window.location.href;
					}
				},
				error: function(e){
					$("#mdlOAMReCapcha").find(".global-error").show();
					$("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(e.responseText);
				}
			});
		},
		
		onClickChooseAnotherPh:function(){
			$(".js-choose-another-ph").click(function(e){
				$(".js-authorize-code-entry").addClass("hider");
				$(".js-init-content").removeClass("hider");
			});
		},
		
		changeCardExpiry: function(){
			$("#drpCardMonth, #drpCardyear").on("change", function(){
				if(!($("#checkout .global-error").is(":hidden"))){
					$("#form-chekout-newpayment").valid();
				}
				
			});
		},
		
		getCreditCardExpiry: function(){
			var cardMonth = parseInt($("#drpCardMonth").val())+1,
				cardYear = $("#drpCardyear").val();
				cardMonth = (parseInt(cardMonth)<10)?"0"+cardMonth:cardMonth;

				$(".bp-sop-cardexpirationdate").val(cardMonth+"/"+cardYear);
				console.log("card value "+cardMonth+"/"+cardYear)

		},
		checkAccessToken: function(callback){			
			$.ajax({
					   // url: livelo.urls.context + '/secure/checkout/includes/queryAccessTokenAjax.jsp',
					   url: 'stubs/queryAccessTokenAjax.json',
					   type: 'POST',
				       dataType: 'JSON',
				       success: function(data) {
					       	if(data.accessToken!="" || data.environment!=""){
					       		$("#accessToken").val(data.accessToken);
					       		$("#environment").val(data.environment);					       						       		
						       	livelo.checkout.sendCardData(function() {
						       		if (callback) callback();
						       	});
					       	}
				       },
				       error: function(e) {
				    	console.log("error in checkAccessToken()") 
				       }
				});
		},
		sendCardData: function (callback){
		    var options ={
			    accessToken:document.getElementById("accessToken").value,
			    onSuccess:function(e){
			     	var paymentToken = e.paymentToken;
			     	$("#paymentToken").val(e.PaymentToken);
					if (callback) callback();
			    },
			    onError:function(e){
				     var errorCode = e.Code;
				     var errorMessage = e.Text;
				     $(".global-error").find(".error-message").html(e.Text);
				     $(".global-error").show();
				     $("#form-chekout-newpayment").valid();
			    },
			    onInvalid:function(e){
				     for(var i = 0; i <e.length; i++){
					     var field = e[i].Field;
					     var message = e[i].Message
					     $(".global-error").find(".error-message").html(e[i].Message);
					     $(".global-error").show();
				     }				     
					 $("#form-chekout-newpayment").valid();
			    },
		    	environment:document.getElementById("environment").value,
		    	language:"PT"
		    };
		    bpSop_silentOrderPost(options);
  		},

		setInstallmentValue: function(){
			$("#drppaywithInstallments").on('change', function(){
				$("#form-chekout-payment").find("#noOfPayments").val($(this).val());
			});
		},
		optInstallmentType: function(){
			$("input[name='optpaymentOption']").on('click', function(){
				console.log("---- "+$(this).data('value'));
				if($(this).data('value')=="installments"){
					$(".installment-block").show();
				}
				else{
					$(".installment-block").hide();
				}	
			})
		},
		manageCVV: function(){
			$("input[name='optAddress']").each(function(){
				var cvvElement = $("input[name='optAddress']").closest(".address").find(".secure-code-block");
				$(this).on('click', function(){

					if($(cvvElement).hasClass("hidden")){
						$(cvvElement).addClass('hidden');
					}
					$(this).closest(".address").find(".secure-code-block").removeClass("hidden");
				});
			})
		},
		mergeCart: function(){

			if($("#displayFlag").val()=="true"){
				$("#mdlMergeCart").modal('show');
			}
			else{
				$("#mdlMergeCart").modal('hide');
			}
	
			$(".mergecart-modal").on('click', ".mergecart-row-item .merge-action", function(){
				$(this).closest(".mergecart-row-item").find(".mergeAction").val($(this).data("value"));
				$("#mergeItemIndex").val($(this).closest(".mergecart-row-item").find(".itemIndex").val());
				$("#itemAction").val($(this).data("value"));
				livelo.checkout.manageMergeCart();
			});
			
		},
		manageMergeCart: function(){
			$("#mergeItemForm").ajaxSubmit({
				url: livelo.urls.context + '/secure/checkout/includes/mergeCartContents.jsp',
				type: 'POST',
				dataType: 'html',
				success: function(data) {
					$("#dynamicData").load(livelo.urls.context + '/secure/checkout/includes/mergeCartContents.jsp',function(){
						if($("#displayFlag").val()=="true"){
							$("#mdlMergeCart").modal('show');

						}
						else{
							$("#dynamicOrderSummary").load(livelo.urls.context + '/secure/checkout/orderSummary.jsp');
							$("#pointsBalaneRedirect").load(livelo.urls.context + '/secure/checkout/pointsBalanceValidationRedirection.jsp',function(){
								$("#ajaxLoaderImage").show();
								$("#mdlMergeCart").modal('hide');
								if($("#isRedirect").val()=="true"){
									$("#ajaxLoaderImage").hide();
									window.location = $("#cartRedirectUrl").val();
								}
							});
						}
					});


				},
				error: function(e) {
					$("#global-error .error-message").html(e.message);
					$("#mdlMergeCart").modal('show');
				}
			});
		},
		
		submitPayment: function() {
			var form = $("#form-chekout-newpayment");
			if(form.valid()) form.submit();
		},

		continueCheckout: function(){
			$(".btn-continue").on('click', function(){				
				if($("#paymentMethodList").length==0 && $("#paymentAddNewAddress").hasClass("collapse")){
					return false;
				}
				
				if(!($("#paymentAddNewAddress").is(":hidden"))){
					var validator = $("#form-chekout-payment").validate();
					livelo.checkout.getCreditCardExpiry();
					livelo.checkout.checkAccessToken(livelo.checkout.submitPayment);
				}
				else{
					var validator = $("#form-chekout-newpayment").validate();
					
					//validator.resetForm();
					//$("#form-chekout-newpayment").data('validator').resetForm();
					$("input[name='optAddress']:checked").closest(".radio").find("input[name='txtCardSecureCode']").val();
					$("#cvvId").val($("input[name='optAddress']:checked").closest(".radio").find("input[name='txtCardSecureCode']").val());
					console.log("cvv id"+ $("#cvvId").val());
					$("#form-chekout-payment").submit();
				}
			});
		},
		MakePrimaryCardNo:function(){
			$(".primary").on('click',function(e){
				e.preventDefault();
				$(this).closest('form').find('#makePrimary').val($(this).data('cardkey'));
				$("input[name='txtCardSecureCode']").removeAttr("data-rule-required");
				$(this).closest('form').submit();
			});
		},

		makePrimaryAddress: function(){
			$(".make-primary-address").on('click',function(e){
				e.preventDefault();
				$("#form-make-primary").find("#addressId").val($(this).data('addresskey'));
				//console.log("------------- "+$("#form-make-primary").find("#addressId").val());
				$("#form-make-primary").submit();
			});
		},
		setMasks: function () {
			 if($('[name=txtCPF]').length > 0) {
				$('[name=txtCPF]').mask("999.999.999-99");
			}
			if($('#txtrphone').length > 0){
				$('#txtrphone').mask("9999-9999");	
			}
			if($('#txtcphone').length > 0){
				$('#txtcphone').mask("9999-9999");
			}
			if($('#txtmphone').length > 0){
				$('#txtmphone').mask("9999-9999");
			} 
			if($('.postCodeAddressBook').length > 0){
				$('.postCodeAddressBook').mask("99999-999");
			}
			if($('.postCodePrimary').length > 0){
				$('.postCodePrimary').mask("99999-999");
			}
			if($('.pagementoCardNumber').length > 0){
				var ccNumVal = $('.pagementoCardNumber').text();
				var ccNum = ccNumVal.substr(ccNumVal.length - 4,4);
				$('.pagementoCardNumber').text(ccNum);
			}
		},
		formSubmits: function(){
			function errorHandler(){
				$(".global-error").find(".error-message").html($("#globalErrorText").val());
			    $(".global-error").show();
			}

			// Form validation for checkout saved payment
			if($("#form-chekout-payment").length>0){
				$("#form-chekout-payment").validate({
					invalidHandler: function() {
			        	errorHandler();
			            //form.submit();
			        }
				});
			}

			// Form validation for checkout saved payment
			if($("#form-chekout-newpayment").length>0){
				$("#form-chekout-newpayment").validate({
					invalidHandler: function() {
			        	errorHandler();
			            //form.submit();
			        }
				});
			}
			
			if($("#mergeItemForm").length>0){
				$("#mergeItemForm").validate({
					submitHandler: function() {
			        	livelo.checkout.manageMergeCart();
			        }
				});

			}
			$("#btnContinuar").on('click', function(){
				// $("#form-shipping-address").submit();
				$("#continue").trigger('click');
			});

			$("#btnSummaryContinuar").on('click', function(){
			//	$("#form-shipping-address").submit();
				$("#continue").trigger('click');
			});



			$(".selectPrimaryAddress").on('click',function(e){
				e.preventDefault();
				var addressId = $(this).data('addressid');
				$("#address").val(addressId);
				$('#mdlMakePrimary').modal('show');
			});
		},
		selectCardType: function(){
			if(!($("#checkout .global-error").is(":hidden")) && $("#cardType")!== null){
				var selecteCard = $("#cardType").val();
				$(".card-type li").each(function(){
					  
					if($(this).attr('value') === $("#cardType").val()){
						  $(this).addClass("selected"); 
						  return;
					 }
					 
				});
			}
			function creditCardTypeFromNumber(num) {
		   // first, sanitize the number by removing all non-digit characters.
		   num = num.replace(/[^\d]/g,'');
		   // now test the number against some regexes to figure out the card type.
		   if (num.match(/^(636368|438935|504175|451416|636297|509074)/) || num.match(/^50904[0,2-3,5-9]{1}/) || 
				   num.match(/^50905[0-2]{1}/) || num.match(/^50906[4,6-9]{1}/) || num.match(/^(5067|4576|4011)[0-9]{2}/)) {
			   return 'EC'; 	 
		   }
		   else if (num.match(/^5[0-5][0-9]{4}/)) {
			   return 'MC';
			   
		   } else if (num.match(/^4[0-9]{5}/)) {
			   return  'VI'; 
			   
		   } else if (num.match(/^3[47][0-9]{3}/)) {
			   return 'AX';
		   } 
		   else{
			   return 'UNKNOWN';  
		   }
		 }
			
			$('#txtCreditCardNo').keyup(function(){
				var cardType = "";
				if($(this).hasClass("error")){
					$("#txtCreditCardNo").valid();
				}
				if($(this).val().length >= 6){
				   cardType = creditCardTypeFromNumber($(this).val());
				}
				
				$(".card-type li").each(function(){
					  $(this).find(".rdCardtype").prop('checked', false);
					if($(this).data("cardabbr") === cardType){
						  $(this).addClass("selected"); 
						  $(this).find(".rdCardtype").trigger('click');
						  $(this).closest("form").find("#cardType").val($(this).attr('value'));
						  $(this).closest("form").find("#cardTypeAbbr").val($(this).data('cardabbr'));
						  $(".btn-continue").removeAttr("disabled");
					 }
					 else if(cardType === "UNKNOWN"){
						   $(this).removeClass("selected");
						   $(".btn-continue").attr("disabled","disabled");
					 }
					 else {
						   $(this).removeClass("selected");
					 }
				});
				if((cardType == "EC" || cardType == "MC" || cardType == "VI")&&($(this).val().length==16)){
					$("#txtCreditCardNo").valid();
				}
				if(cardType == "AX" && $(this).val().length==15){
					$("#txtCreditCardNo").valid();
				}				
				if(cardType == "UNKNOWN" && $(this).val().length==6){
					$("#txtCreditCardNo").valid();
				}
				
			});
			
		},
		setPaymentMethodStatus: function(){
			   $("#chkSave").on("click", function(){
				   if(this.checked){
					   $("#saveNewCard").val("true"); 
				   }
				   else{
					   $("#saveNewCard").val("false"); 
				   }
			    
			   });
			  },
		deleteSavedAddress: function(){
			$('.remove').on('click', function (e) {
				e.preventDefault();
				$("#mdlDeletePaymentMethod").find(".removecardkey").val($(this).closest(".addres-details").find(".removecardkey").val());
				console.log("cardno", $("#mdlDeletePaymentMethod").find(".removecardkey").val());
				$("#mdlDeletePaymentMethod").find("address").html($(this).closest(".addres-details").find(".address-data").html());
				$("#mdlDeletePaymentMethod").find('input[type=radio]').remove();
				$("#mdlDeletePaymentMethod").modal('show');
			});
		},
		panelSlide: function(){
			if($("#paymentMethodList").length==0){
				$(".btn-continue").attr("disabled","disabled");
					$('#paymentAddNewAddress').collapse('toggle');
				}
		   if($(".add-new-address").length>=1){
			    $(".add-new-address").on('click', function(){
			    	$(".btn-continue").removeAttr("disabled");
					$('#paymentMethodList').collapse('toggle');
				});
				     }
			if($(".saved-payment").length>=1){
				$(".saved-payment").on('click', function(){
					$(".btn-continue").attr("disabled","disabled");
					 $('#paymentAddNewAddress').collapse('toggle');
			    });

			if(!($("#paymentAddNewAddress").is(":hidden"))){
				$(".btn-continue").attr("disabled","disabled");
			}
			if($(".payment-page-error-span").length>0 && $("#txtCreditCardNo").val()!==""){
				$(".btn-continue").attr("disabled","disabled");
				$('#paymentAddNewAddress').removeClass("collapse");
				$('#paymentMethodList').addClass("collapse").removeClass("in");
			}

		   }
		}
	};
			livelo.common.modules.push(livelo.checkout.init); 	
			
})(jQuery);
