(function($){
	'use strict';
	 livelo.myAccount = {
		container: "#myAccount",
		container1: ".wishlist-container",
		init: function(){
			livelo.myAccount.deleteSavedAddress();
			
			livelo.myAccount.invokeDate();
			livelo.myAccount.alterEmail();
			//myAccount.alterPassword();
			livelo.myAccount.setPrimary();
			livelo.myAccount.invokeNotifications();
			livelo.myAccount.setNotifications();
			livelo.myAccount.pointUpdate();
			
			livelo.myAccount.formValidate();
			livelo.myAccount.setMenuItem();
			livelo.myAccount.setMasks();
			livelo.myAccount.addNewAddress();
			livelo.myAccount.deleteSavedAddress();
			livelo.myAccount.makePrimaryAddress();
			livelo.myAccount.selectCardType();
			livelo.myAccount.submitPaymentForm();
			livelo.myAccount.setActiveLink();
			livelo.myAccount.managePointsHistory();
			livelo.myAccount.manageOrderHistory();
			livelo.myAccount.orderhistoryPagination();
			livelo.myAccount.setCheckboxValue();
			livelo.myAccount.changePasswordModal();
		},
		changePasswordModal: function(){
			$("#resetlink").on("click", function(e){
				e.preventDefault();
				
				$("#mdlChangePassword").modal('show');
				$("#mdlLogin").modal('hide');
			});
		},

		loadOrderHistory: function(sortColumn,sortType){
			$.ajax({
					   url:($('#orderHistoryPage').length>=1)?$('#orderHistoryPage').val():"",
					   type: 'POST',
				       dataType: "html",
				       data:  {sortColumn:sortColumn, sortType:sortType ,pageNumber:'1', pagination: false },
				       success: function(data) {
				        
				         $("#dynamicData").empty();
				         $("#dynamicData").html(data);
				       },
				       error: function(e) {
				          $("#global-error .error-message").html("Error");
				       }
    				});
		},
		manageOrderHistory: function(){	
			$(".historyContent").on('click', ".historytable th a", function(){
				
				var sortType = "ASC";
				console.log("sortType "+$(this).find("span").hasClass("up"));
				if(!$(this).find("span").hasClass("up")){
					sortType = "ASC";
					$(this).find("span").addClass("up");
				}
				else{
					$(this).find("span").removeClass("up");
					sortType = "DESC";
				}
				
				livelo.myAccount.loadOrderHistory($(this).attr("class"), sortType);

			});
		},
		
		orderhistoryPagination: function(){
			   $(".historyContent").on('click', ".pagination li a", function(e){
			    e.preventDefault();
			    var currentPage="",
			    activeColumn = $(".table.historytable th.sort-active"),
			    activeSort = $(activeColumn).find("a").attr("class"),
			    sortType="";
			    if($(this).hasClass("page-progress")){
			     currentPage = $(this).find(".pagination-value").val();
			    }else{
			     currentPage = $(this).text();
			    }
			    
			    if($(activeColumn).find("span").hasClass("up")){
			     sortType = "ASC"
			    }
			    else
			     sortType = "DESC";
			     $.ajax({
			    	 url:($('#orderHistoryPage').length>=1)?$('#orderHistoryPage').val():"",
			        type: 'POST',
			           data:  {sortColumn:activeSort, sortType:sortType, pageNumber:currentPage, pagination: true},
			           success: function(data) {
			            
			             $("#dynamicData").empty();
			             $("#dynamicData").html(data);
			           },
			           error: function(e) {
			              $("#global-error .error-message").html("Error");
			           }
			        });
			   });
			  }, 
			   
		setCheckboxValue: function(){
			$('input[type="checkbox"]').on("change",function() {
				$(this).attr('value', this.checked ? "true" : "false");
			});
			
		},
		loadPointsHistory: function(sortColumn,sortType,selectPeriod,selectPartner,selectpointsType){
			$.ajax({
					   url:"/livelo/secure/myaccount/json/pointsTransactionHistoryJson.jsp",
					   type: 'POST',
				       dataType: "html",
				       data:  {sortColumn:sortColumn, sortType:sortType, selectPeriod:selectPeriod, selectPartner:selectPartner,selectpointsType:selectpointsType},
				       success: function(data) {
				        
				         $("#dynamicData").empty();
				         $("#dynamicData").html(data);
				       },
				       error: function(e) {
				          $("#global-error .error-message").html("Error");
				       }
    				});
		},

		managePointsHistory: function(){

			$("#pointslist-area").on('click', ".pagination li a", function(e){

				e.preventDefault();
				var currentPage="",
				activeColumn = $("#pointslistTable th.sort-active"),
				activeSort = $(activeColumn).find("a").attr("class"),
				sortType="",
				selectPeriod = $("#selectPeriod").val(),
				selectPartner = $("#selectPartner").val(),
				selectpointsType = $("#selectpointsType").val();
				if($(this).hasClass("page-progress")){
					currentPage = $(this).find(".pagination-value").val();
				}else{
					currentPage = $(this).text();
				}
				
				
				if($(activeColumn).find("span").hasClass("up")){
					sortType = "ASC"
				}
				else
					sortType = "DESC";
					$.ajax({
					   url:"/livelo/secure/myaccount/json/pointsTransactionHistoryJson.jsp",
					   type: 'POST',
					   dataType: "html",
				       data:  {sortColumn:activeSort, sortType:sortType, pageNumber:currentPage, selectPeriod:selectPeriod, selectPartner:selectPartner,selectpointsType:selectpointsType},
				       success: function(data) {
				        
				         $("#dynamicData").empty();
				         $("#dynamicData").html(data);
				       },
				       error: function(e) {
				          $("#global-error .error-message").html("Error");
				       }
    				});
			});

			$("#pointslist-area").on('click', "#pointslistTable th a", function(e){
				e.preventDefault();
				var sortType = "ASC",
				selectPeriod = $("#selectPeriod").val(),
				selectPartner = $("#selectPartner").val(),
				selectpointsType = $("#selectpointsType").val();
			    if(!$(this).find("span").hasClass("up")){
				     sortType = "ASC";
				     $(this).find("span").addClass("up");
			    }
				else{
				     $(this).find("span").removeClass("up");
				     sortType = "DESC";
				}
				livelo.myAccount.loadPointsHistory($(this).attr("class"), sortType, selectPeriod, selectPartner, selectpointsType);
			});

			$("#pointslist-area").on('click', "#btnVerExtrato", function(){
			
				var selectPeriod = $("#selectPeriod").val(),
					selectPartner = $("#selectPartner").val(),
					selectpointsType = $("#selectpointsType").val();

					$.ajax({
					   url:"/livelo/secure/myaccount/json/pointsTransactionHistoryJson.jsp",
					   type: 'POST',
				       dataType: "html",
				       data:  {selectPeriod:selectPeriod, selectPartner:selectPartner,selectpointsType:selectpointsType },
				       success: function(data) {
				        
				         $("#dynamicData").empty();
				         $("#dynamicData").html(data);
				       },
				       error: function(e) {
				          $("#global-error .error-message").html("Error");
				       }
    				});

			});

		},
		setActiveLink: function(){
			$('.js-wishlist-link').click(function(e) {
				// e.preventDefault();
				// if($(this).find('li').hasClass('active')){
				// 	return;
				// }
				// 
				// $('li.active').removeClass('active');
				// 
				// $(this).find('li').addClass('active');
			});
		},
		submitPaymentForm: function () {
			 if($('#savePaymentButton').length > 0) {
				$('#savePaymentButton').on('click',function(e){
					$('#savePaymentMethod').trigger('click');
				});
			}
			
		},
		
		setMasks: function () {
			 if($('[name=txtCPF]').length > 0) {
				$('[name=txtCPF]').mask("999.999.999-99");
			}
			/*if($('#txtrphone').length > 0){
				$('#txtrphone').mask("9999-9999");	
			}
			if($('#txtcphone').length > 0){
				$('#txtcphone').mask("9999-9999");
			}
			if($('#txtphone').length > 0){
				$('#txtphone').mask("9999-9999");
			} */
			if($('.postCodeAddressBook').length > 0){
				$('.postCodeAddressBook').mask("99999-999");
			}
			if($('.postCodePrimary').length > 0){
                $('.postCodePrimary').mask("99999-999");
            }
            // if($('.js-phone-no-text').length > 0){
            //     $(".js-phone-no-text").mask("9999?9-9999");
            // }
			/*if($('.js-mobile-no-text').length > 0){
                $(".js-mobile-no-text").mask("99999-9999");
            }*/
			if($('.js-mobile-no-text').length > 0) {
				$(".js-mobile-no-text")
					.mask("9999?9-9999")
					.on('blur', function () {
						var phone_val = this.value;
						var last = phone_val.substr( phone_val.indexOf("-") + 1 );
						
						if( last.length == 3 ) {
							var move = phone_val.substr( phone_val.indexOf("-") - 1, 1 );
							var lastfour = move + last;
							
							var first = phone_val.substr( 0, 4 );
							
							$(this).val( first + '-' + lastfour );
						}
					});

			
				formatCellular( $(".js-mobile-no-text").get(0) );
			}
            function formatCellular(fld_phone) {
                var phone_val = fld_phone.value;
                var last = phone_val.substr( phone_val.indexOf("-") + 1 );
                
                if( last.length == 3 ) {
                    var move = phone_val.substr( phone_val.indexOf("-") - 1, 1 );
                    var lastfour = move + last;
                    
                    var first = phone_val.substr( 0, 4 );
                    
                    $(fld_phone).val( first + '-' + lastfour );
                }
            }

			
			if($('.js-land-phone-no-text').length > 0){
				$(".js-land-phone-no-text").mask("9999-9999");
			}

			// $(".js-phone-no-text").each(function(){
			// 	var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
		    // 	if( last.length == 3 ) {
			//         var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
			//         var lastfour = move + last;
			// 	        
			//         var first = $(this).val().substr( 0, 4 );
			// 	        
			//         $(this).val( first + '-' + lastfour );
			//     }
			// });
			// $(".js-phone-no-text").on("blur", function() {
			// 	if( $(this).val().length < 9){
			// 		$(this).val('');
			// 	}
			//     var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
			//     if( last.length == 3 ) {
			//         var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
			//         var lastfour = move + last;
			//         
			//         var first = $(this).val().substr( 0, 4 );
			//         
			//         $(this).val( first + '-' + lastfour );
			//     }
			// });
		},

		setMenuItem: function(){
			$('#imgProfile').removeClass("active");
			$('#imgPointsBalance').removeClass("active");
			$('#imgWishlist').removeClass("active");
			$('#imgOrderHistory').removeClass("active");
			$('#imgAddressBook').removeClass("active");
			$('#imgPaymentMethods').removeClass("active");
			$('#imgSocialPartners').removeClass("active");
			$('#imgLogout').removeClass("active");
			$('#imgChangePassword').removeClass("active");
			if($('#menuItemName').val() === "Profile"){
				$('#imgProfile').addClass("active");
			} else if($('#menuItemName').val() === "PointsBalance"){
				$('#imgPointsBalance').addClass("active");
			} else if($('#menuItemName').val() === "Wishlist"){
				$('#imgWishlist').addClass("active");
			} else if($('#menuItemName').val() === "OrderHistory"){
				$('#imgOrderHistory').addClass("active");
			} else if($('#menuItemName').val() === "AddressBook"){
				$('#imgAddressBook').addClass("active");
			} else if($('#menuItemName').val() === "PaymentMethods"){
				$('#imgPaymentMethods').addClass("active");
			} else if($('#menuItemName').val() === "SocialPartners"){
				$('#imgSocialPartners').addClass("active");
			} else if($('#menuItemName').val() === "Logout"){
				$('#imgLogout').addClass("active");
			} else if($('#menuItemName').val() === "Profile-main"){
				$('#imgProfileMain').addClass("active");
			} else if($('#menuItemName').val() === "ChangePassword"){
				$('#imgChangePassword').addClass("active");
			}
		},

		selectCardType: function(){
			$(".card-type li").on("click", function(){
				$(".card-type li").removeClass("selected"),
				$(this).addClass("selected");
				$(this).closest("form").find("#cardType").val($(this).attr('value'));
				$(this).closest("form").find("#cardTypeAbbr").val($(this).data('cardabbr'));
			});
		},
		makePrimaryAddress: function(){
			$('.primary').on('click', function (e) {
				e.preventDefault();
				$(this).closest('form').submit();	
			});
		},
		deleteSavedAddress: function(){
			$('.remove').on('click', function (e) {
				e.preventDefault();
					//console.log("dtata "+$(this).closest(".addres-details").find(".address-data").text());
					//console.log('delete');
					$("#mdlDeletePaymentMethod").find(".cardno").val($(this).closest(".address-details").find(".cardno").val());
					console.log("cardno", $("#mdlDeletePaymentMethod").find(".cardno").val());
					$("#mdlDeletePaymentMethod").find("address").html($(this).closest(".address-details").find(".address-data").html());
					$("#mdlDeletePaymentMethod").modal('show');
			});
		},
		addNewAddress: function(){

			$("input[name='optAddress']").on('change', function (e) {
					e.preventDefault();
					$("#newAddressSelected").val('false');
					console.log("address option "+$(this).data("addressoption"));
					if($(this).data("addressoption")=="NewAddress"){
					//if($("#optNewAddress").is(":checked")){
						$("#new-address").show();
						$("#newAddressSelected").val('true');
					}
					else{
						$("#new-address").hide();

					}
					
			});
		},
		formValidate: function () {

			function errorHandler(){
				$(".global-error").find(".error-message").html($("#globalErrorText").val());
			    $(".global-error").show();
			}

			/*
			var formresetpassword = $("#form-reset-forgotten-password");
			formresetpassword.on('submit', function(event) {
				event.preventDefault();

				if(!formresetpassword.valid()) {
					errorHandler();
					return;
				}
				formresetpassword[0].submit();				
			});
			*/

			if($("#form-reset-forgotten-password").length>0){
				$("#form-reset-forgotten-password").validate({
					invalidHandler: function() {
			        	errorHandler();
			        }
				});
			}


			// Form submission for change password 
			var formchangepassword = $("#form-change-password");
			formchangepassword.on('submit', function(event) {
				event.preventDefault();

				if(!formchangepassword.valid()) {
					errorHandler();
					return;
				}
				formchangepassword[0].submit();				

			});
						
			
			// Form validation for reset Password
			if($("#form-changepassword-modal").length>0){
				$("#form-changepassword-modal").validate({
					invalidHandler: function() {
			        	errorHandler();
			            //form.submit();
			        }
				});
			}
			
			// Form validation for reset Password
			if($("#form-reset-password").length>0){
				$("#form-reset-password").validate({
					invalidHandler: function() {
			        	errorHandler();
			        },
			        submitHandler: function () {
						
						livelo.common.formsubmit = 'form-reset-password';

			        	// make ajax call
						var $form 	= $("#form-reset-password"),
							_URL 	= $form.attr('action');
						
						var prm = $.ajax({
							url: _URL,
							type: "POST",
							cache: "false",
							dataType: "json",
							data: $form.serialize(),
						});
						
						prm.done(function (data) {
							if (data.success === "true") {
							    $("#password-success, #form-reset-password-div").toggle();
							} else {
							    $("#changePasswordModalError").html(data.message);
							    $(".global-error").show();

							    if (data.sessionTimeOut == 'true') {
							        window.location.href = livelo.urls.context + "/secure/minha-conta/editar";
							    }
							}
						});
						
						prm.fail(function () {
							$("#changePasswordModalError").html(e.message);
							$(".global-error").show();
						});						
					
						/*
						$("#form-reset-password").ajaxSubmit({
					       method:"POST",
						   cache:"false",
						   dataType:"json",
						   url: URL,
					       success: function(data) {
					    	   if(data.success === "true"){
					    		   $("#password-success, #form-reset-password-div").toggle();
					    	   } else {
					    		   $("#changePasswordModalError").html(data.message);
					    		   $(".global-error").show();
					            
					    		   if(data.sessionTimeOut == 'true') {
					    			   window.location.href = livelo.urls.context + "/secure/minha-conta/editar";
					    		   }
					          }
					       },
					       error: function(e) {
					          $("#changePasswordModalError").html(e.message);
					          $(".global-error").show();
					       }
						});
						*/						
			        }
				});
			}
			
			//form validation for forgot password
			if($("#form-forgot-password").length>0){
				$("#form-forgot-password").validate({
					invalidHandler: function() {
			        	errorHandler();
			            //form.submit();
			        }
				});
			}
			if($("#form-activate-account").length>0){
				$("#form-activate-account").validate({
					invalidHandler: function() {
			        	errorHandler();
			        }
				});
			}	
			
				//Form validation for profile
			if($("#form-profile").length>0){
				$("#form-profile").validate({
					invalidHandler: function() {
			        	errorHandler();
			        }
				});
			}

				//Form validation for new Payment Method
			if($("#form-myaccount-payment").length>0){
				$("#form-myaccount-payment").validate({
					invalidHandler: function() {
						errorHandler();
			        }
				});
			}
			
			$(".cart-oos-error-close").find("#hide").on("click", function(e){
				$(".cart-oos-global-error").hide();
			});
		},

		invokeDate: function(){
			($('#datetimepicker').length>0)?$('#datetimepicker').datepicker({
			        format: "dd/mm/yyyy",
			        autoclose: true
				}):"";
		},

		alterEmail: function(){
			$("#changeEmail").on('click', function (e) {
					e.preventDefault();
					$("#form-changePassword").submit();
					$("#mdlChangeEmail").modal('show');
			});
		},

		setPrimary: function(){
			$(".addressbook-makeprimary").on('click', function (e) {
					e.preventDefault();
					var current_addrss = $(this).closest(".col-md-4").find($("input[name='addressId']")).val();
					$("#address").val(current_addrss);
					$('#form-address-book_temp').submit();

			});
		},
		setNotifications: function(){
			$("#chkEMail, #chkSMS, #chkPush").each(function(){

				if($(this).is(":checked")){
					$(this).next("input[type=hidden]").val("true");
				}
				else{
					$(this).next("input[type=hidden]").val("false");
				}	
			});	
		},
		invokeNotifications: function(){
			$("#chkEMail, #chkSMS, #chkPush").on('click',function(){
				livelo.myAccount.setNotifications();
			});	
		},
		
		pointUpdate: function(){
			$(".point-update").on('click',function(e){
				e.preventDefault();				
				$("#txtSaldoAtual").empty();
					$.ajax({
					       method:"GET",
						   cache:"false",
						   dataType: "json",
					       url: "/livelo/secure/myaccount/json/pointBalanceJson.jsp",
					       success: function(data) {
					    	   $("#txtSaldoAtual").text(data.profilePointBalance);
					    	   
					    	   if(!data.isCallOk){
					    		   $(".point-update").hide();
					    		   $(".try-again").show();
					    	   }
					    	   else{
							$("#noPointsMessage").hide();
						   }
					         //alert(data);
					         //alert(data.isCallOk);
					         //alert(data.profilePointBalance);
					       },
					       error: function(e) {
					         alert('error-happened!!');
					       }
	 				});
			});
		}
	}
	// if ( $(livelo.myAccount.container).length > 0) {
	livelo.common.modules.push(livelo.myAccount.init); 	
	// }
		
})(jQuery);
