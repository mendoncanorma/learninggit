(function(a){livelo.checkoutheader={init:function(){livelo.checkoutheader.highlightHeader()},highlightHeader:function(){"shipment"===a("#headerStatus").val()?(a(".shipmentli").toggleClass("topBar",!0),a(".shipmentIcon").toggleClass("activeNum",!0),a(".pagementoIcon").toggleClass("activeNum",!1),a(".revisoIcon").toggleClass("activeNum",!1),a(".shipmentText").toggleClass("activeMenu",!0),a(".pagementoText").toggleClass("activeMenu",!1),a(".revisoText").toggleClass("activeMenu",!1)):"pagemento"===a("#headerStatus").val()?
(a(".shipmentli").addClass("topBar"),a(".pagementoli").addClass("topBar"),a(".shipmentIcon").toggleClass("activeNum",!1),a(".pagementoIcon").toggleClass("activeNum",!0),a(".revisoIcon").toggleClass("activeNum",!1),a(".shipmentText").toggleClass("activeMenu",!1),a(".pagementoText").toggleClass("activeMenu",!0),a(".revisoText").toggleClass("activeMenu",!1)):"reviso"===a("#headerStatus").val()&&(a(".shipmentli").addClass("topBar"),a(".pagementoli").addClass("topBar"),a(".revisoli").addClass("topBar"),
a(".shipmentIcon").toggleClass("activeNum",!1),a(".pagementoIcon").toggleClass("activeNum",!1),a(".revisoIcon").toggleClass("activeNum",!0),a(".shipmentText").toggleClass("activeMenu",!1),a(".pagementoText").toggleClass("activeMenu",!1),a(".revisoText").toggleClass("activeMenu",!0))}};livelo.common.modules.push(livelo.checkoutheader.init)})(jQuery);
(function(a){livelo.checkout={container:"#checkout",init:function(){try{livelo.common.ajaxLoader(),livelo.checkout.formSubmits(),livelo.checkout.setMasks(),livelo.checkout.panelSlide(),livelo.checkout.deleteSavedAddress(),livelo.checkout.MakePrimaryCardNo(),livelo.checkout.continueCheckout(),livelo.checkout.selectCardType(),livelo.checkout.mergeCart(),livelo.checkout.makePrimaryAddress(),livelo.checkout.manageCVV(),livelo.checkout.optInstallmentType(),livelo.checkout.setInstallmentValue(),livelo.checkout.browserBackButton(),
livelo.checkout.setPaymentMethodStatus(),livelo.checkout.onClickOAMRadio(),livelo.checkout.OAMRecapchaButtonHadlers(),livelo.checkout.redirectToCart(),livelo.checkout.changeCardExpiry(),livelo.checkout.onLoad()}finally{livelo.common.removeAjaxLoader();var b=a("[data-enable\x3dtrue]");b.removeClass("btn-disabled");b.prop("disabled",!1)}},onLoad:function(){var b=a("#mdlOAMReCapcha");b.length&&b.modal("show");b=a(".postCodePrimary");b.length&&b.focus();b=a(".postCodeAddressBook");b.length&&b.focus()},
redirectToCart:function(){"true"==a("#isRedirect").val()&&(window.location=a("#cartRedirectUrl").val())},onClickOAMRadio:function(){a(".js-communication-select").click(function(b){a("#mdlOAMReCapcha").find(".choices").find("select").attr("disabled",!0);a("#mdlOAMReCapcha").find(".choices").find("select").removeClass("js-active-select");a(this).closest(".choices").find("select").attr("disabled",!1);a(this).closest(".choices").find("select").addClass("js-active-select");a("#recapcha-comm-type").val(a(this).closest(".choices").attr("data-comm-type"));
a("#recapcha-comm-number").val(a(this).closest(".choices").find("select option:selected").val())});a("#mdlOAMReCapcha").find("select").change(function(b){b=a("option:selected",this);a("#recapcha-comm-number").val(b.val())});a("#recapcha-comm-number").val(a("div[data-comm-type\x3d'sms']").find("select option:selected").val())},browserBackButton:function(){0<a("#orderConfirmRedirectURL").length&&(window.history&&window.history.pushState)&&(window.history.pushState("forward",null,"./orderConfirmation.jsp"),
a(window).on("popstate",function(){window.location.href=a("#orderConfirmRedirectURL").val()}))},getRequestCode:function(){var b=a("#recapcha-comm-number").val(),c=a("#recapcha-comm-type").val();a.ajax({url:livelo.urls.context+"/secure/checkout/includes/createTransactionTokenAjax.jsp?ph_num\x3d"+b+"\x26comm_type\x3d"+c,type:"POST",dataType:"json",success:function(b){b.error?(a("#mdlOAMReCapcha").find(".global-error").show(),a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(b.errorMessage)):
(a(".js-init-content").addClass("hider"),a(".js-authorize-code-entry").removeClass("hider"))},error:function(b){a("#mdlOAMReCapcha").find(".global-error").show();a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(b.responseText)}})},resetOAMModal:function(){a("#mdlOAMReCapcha").find(".global-error").hide();a("#mdlOAMReCapcha").find("#verification-code").val("")},OAMRecapchaButtonHadlers:function(){a(".js-oam-enviar").click(function(a){livelo.checkout.resetOAMModal();livelo.checkout.getRequestCode()});
a(".js-solicitar-enviar").click(function(a){livelo.checkout.resetOAMModal();livelo.checkout.getRequestCode()});a(".js-choose-another-ph").click(function(b){livelo.checkout.resetOAMModal();a(".js-authorize-code-entry").addClass("hider");a(".js-init-content").removeClass("hider")});a(".js-verify-enviar").click(function(a){livelo.checkout.verifyRequestCode()})},verifyRequestCode:function(){var b=a("#verification-code").val(),c=livelo.urls.context+"/secure/checkout/includes/validateTransactionTokenAjax.jsp";
if(0===a.trim(b).length)a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html("Você não inseriu um código");else{var d=a("#mdlOAMReCapcha");a.post(c,{verification_code:b}).done(function(a){a.error?(d.find(".global-error").show(),d.find(".error-container").find(".error-message").html(a.errorMessage)):d.modal("hide")}).fail(function(a,b,c){d.find(".global-error").show();d.find(".error-container").find(".error-message").html(e.responseText)})}},onClickChooseAnotherPh:function(){a(".js-choose-another-ph").click(function(b){a(".js-authorize-code-entry").addClass("hider");
a(".js-init-content").removeClass("hider")})},changeCardExpiry:function(){a("#drpCardMonth, #drpCardyear").on("change",function(){a("#checkout .global-error").is(":hidden")||a("#form-chekout-newpayment").valid()})},getCreditCardExpiry:function(){var b=parseInt(a("#drpCardMonth").val()),c=a("#drpCardyear").val(),b=10>parseInt(b)?"0"+b:b;a(".bp-sop-cardexpirationdate").val(b+"/"+c);console.log("card value "+b+"/"+c)},checkAccessToken:function(b){a.ajax({url:livelo.urls.context+"/secure/checkout/includes/queryAccessTokenAjax.jsp",
type:"POST",dataType:"JSON",success:function(c){if(""!=c.accessToken||""!=c.environment)a("#accessToken").val(c.accessToken),a("#environment").val(c.environment),livelo.checkout.sendCardData(function(){b&&b()})},error:function(a){console.log("error in checkAccessToken()")}})},sendCardData:function(b){var c={accessToken:document.getElementById("accessToken").value,onSuccess:function(c){a("#paymentToken").val(c.PaymentToken);b&&b()},onError:function(b){a(".global-error").find(".error-message").html(b.Text);
a(".global-error").show();a("#form-chekout-newpayment").valid()},onInvalid:function(b){for(var c=0;c<b.length;c++)a(".global-error").find(".error-message").html(b[c].Message),a(".global-error").show();a("#form-chekout-newpayment").valid()},environment:document.getElementById("environment").value,language:"PT"};bpSop_silentOrderPost(c)},setInstallmentValue:function(){a("#drppaywithInstallments").on("change",function(){a("#form-chekout-payment, #form-chekout-newpayment").find("#noOfPayments").val(a(this).val())})},
optInstallmentType:function(){a("input[name\x3d'optpaymentOption']").on("click",function(){console.log("---- "+a(this).data("value"));"installments"==a(this).data("value")?a(".installment-block").show():a(".installment-block").hide()})},manageCVV:function(){a("input[name\x3d'optAddress']").each(function(){var b=a("input[name\x3d'optAddress']").closest(".address").find(".secure-code-block");a(this).on("click",function(){a(b).hasClass("hidden")&&a(b).addClass("hidden");a(this).closest(".address").find(".secure-code-block").removeClass("hidden")})})},
mergeCart:function(){"true"==a("#displayFlag").val()?a("#mdlMergeCart").modal("show"):a("#mdlMergeCart").modal("hide");a(".mergecart-modal").on("click",".mergecart-row-item .merge-action",function(){a(this).closest(".mergecart-row-item").find(".mergeAction").val(a(this).data("value"));a("#mergeItemIndex").val(a(this).closest(".mergecart-row-item").find(".itemIndex").val());a("#itemAction").val(a(this).data("value"));livelo.checkout.manageMergeCart()})},manageMergeCart:function(){a("#mergeItemForm").ajaxSubmit({url:livelo.urls.context+
"/secure/checkout/includes/mergeCartContents.jsp",type:"POST",dataType:"html",success:function(b){a("#dynamicData").load(livelo.urls.context+"/secure/checkout/includes/mergeCartContents.jsp",function(){"true"==a("#displayFlag").val()?a("#mdlMergeCart").modal("show"):(a("#dynamicOrderSummary").load(livelo.urls.context+"/secure/checkout/orderSummary.jsp"),a("#pointsBalaneRedirect").load(livelo.urls.context+"/secure/checkout/pointsBalanceValidationRedirection.jsp",function(){a("#ajaxLoaderImage").show();
a("#mdlMergeCart").modal("hide");"true"==a("#isRedirect").val()&&(a("#ajaxLoaderImage").hide(),window.location=a("#cartRedirectUrl").val())}))})},error:function(b){a("#global-error .error-message").html(b.message);a("#mdlMergeCart").modal("show")}})},submitPayment:function(){var b=a("#form-chekout-newpayment");b.valid()&&b.submit()},continueCheckout:function(){a(".btn-continue").on("click",function(){if(0==a("#paymentMethodList").length&&a("#paymentAddNewAddress").hasClass("collapse"))return!1;a("#paymentAddNewAddress").is(":hidden")?
(a("#form-chekout-newpayment").validate(),a("input[name\x3d'optAddress']:checked").closest(".radio").find("input[name\x3d'txtCardSecureCode']").val(),a("#cvvId").val(a("input[name\x3d'optAddress']:checked").closest(".radio").find("input[name\x3d'txtCardSecureCode']").val()),console.log("cvv id"+a("#cvvId").val()),a("#form-chekout-payment").submit()):(a("#form-chekout-payment").validate(),livelo.checkout.getCreditCardExpiry(),livelo.checkout.checkAccessToken(livelo.checkout.submitPayment))})},MakePrimaryCardNo:function(){a(".primary").on("click",
function(b){b.preventDefault();a(this).closest("form").find("#makePrimary").val(a(this).data("cardkey"));a("input[name\x3d'txtCardSecureCode']").removeAttr("data-rule-required");a(this).closest("form").submit()})},makePrimaryAddress:function(){a(".make-primary-address").on("click",function(b){b.preventDefault();a("#form-make-primary").find("#addressId").val(a(this).data("addresskey"));a("#form-make-primary").submit()})},setMasks:function(){0<a("[name\x3dtxtCPF]").length&&a("[name\x3dtxtCPF]").mask("999.999.999-99");
0<a("#txtrphone").length&&a("#txtrphone").mask("9999-9999");0<a("#txtcphone").length&&a("#txtcphone").mask("9999-9999");0<a("#txtmphone").length&&a("#txtmphone").mask("9999-9999");if(0<a(".postCodeAddressBook").length){var b=a(".postCodeAddressBook");5>=a(b).val().length?a(b).mask("99999"):a(b).mask("99999-999")}0<a(".postCodePrimary").length&&(b=a(".postCodePrimary"),5>=a(b).val().length?a(b).mask("99999"):a(b).mask("99999-999"));0<a(".pagementoCardNumber").length&&(b=a(".pagementoCardNumber").text(),
b=b.substr(b.length-4,4),a(".pagementoCardNumber").text(b))},formSubmits:function(){function b(){a(".global-error").find(".error-message").html(a("#globalErrorText").val());a(".global-error").show()}0<a("#form-chekout-payment").length&&a("#form-chekout-payment").validate({invalidHandler:function(){b()}});0<a("#form-chekout-newpayment").length&&a("#form-chekout-newpayment").validate({invalidHandler:function(){b()}});0<a("#mergeItemForm").length&&a("#mergeItemForm").validate({submitHandler:function(){livelo.checkout.manageMergeCart()}});
a("#btnContinuar").on("click",function(){a("#continue").trigger("click")});a("#btnSummaryContinuar").on("click",function(){a("#continue").trigger("click")});a(".selectPrimaryAddress").on("click",function(b){b.preventDefault();b=a(this).data("addressid");a("#address").val(b);a("#mdlMakePrimary").modal("show")});a(".global-promo").find("#hide").on("click",function(b){a(".global-promo").hide()})},selectCardType:function(){function b(a){a=a.replace(/[^\d]/g,"");return a.match(/^(636368|438935|504175|451416|636297|509074)/)||
a.match(/^50904[0,2-3,5-9]{1}/)||a.match(/^50905[0-2]{1}/)||a.match(/^50906[4,6-9]{1}/)||a.match(/^(5067|4576|4011)[0-9]{2}/)?"EC":a.match(/^5[0-5][0-9]{4}/)?"MC":a.match(/^4[0-9]{5}/)?"VI":a.match(/^3[47][0-9]{3}/)?"AX":"UNKNOWN"}!a("#checkout .global-error").is(":hidden")&&null!==a("#cardType")&&(a("#cardType").val(),a(".card-type li").each(function(){a(this).attr("value")===a("#cardType").val()&&a(this).addClass("selected")}));a("#txtCreditCardNo").keyup(function(){var c="";a(this).hasClass("error")&&
a("#txtCreditCardNo").valid();6<=a(this).val().length&&(c=b(a(this).val()));a(".card-type li").each(function(){a(this).find(".rdCardtype").prop("checked",!1);a(this).data("cardabbr")===c?(a(this).addClass("selected"),a(this).find(".rdCardtype").trigger("click"),a(this).closest("form").find("#cardType").val(a(this).attr("value")),a(this).closest("form").find("#cardTypeAbbr").val(a(this).data("cardabbr")),a(".btn-continue").removeAttr("disabled")):"UNKNOWN"===c?(a(this).removeClass("selected"),a(".btn-continue").attr("disabled",
"disabled")):a(this).removeClass("selected")});("EC"==c||"MC"==c||"VI"==c)&&16==a(this).val().length&&a("#txtCreditCardNo").valid();"AX"==c&&15==a(this).val().length&&a("#txtCreditCardNo").valid();"UNKNOWN"==c&&6==a(this).val().length&&a("#txtCreditCardNo").valid()})},setPaymentMethodStatus:function(){a("#chkSave").on("click",function(){this.checked?a("#saveNewCard").val("true"):a("#saveNewCard").val("false")})},deleteSavedAddress:function(){a(".remove").on("click",function(b){b.preventDefault();
a("#mdlDeletePaymentMethod").find(".removecardkey").val(a(this).closest(".addres-details").find(".removecardkey").val());console.log("cardno",a("#mdlDeletePaymentMethod").find(".removecardkey").val());a("#mdlDeletePaymentMethod").find("address").html(a(this).closest(".addres-details").find(".address-data").html());a("#mdlDeletePaymentMethod").find("input[type\x3dradio]").remove();a("#mdlDeletePaymentMethod").modal("show")})},panelSlide:function(){a("#paymentAddNewAddress").collapse({toggle:!1});a("#paymentMethodList").collapse({toggle:!1});
if(1<=a(".add-new-address").length)a(".add-new-address").on("click",function(){a("#paymentMethodList").collapse("toggle")});0==a("#paymentMethodList").length&&(a(".btn-continue").prop("disabled",!0),a("#paymentAddNewAddress").collapse("toggle"));1<=a(".saved-payment").length&&(a("#paymentMethodList").on("hidden.bs.collapse",function(){a("#txtCreditCardNo").val().trim()||a(".btn-continue").prop("disabled",!0)}),a("#paymentMethodList").on("shown.bs.collapse",function(){a(".btn-continue").prop("disabled",
!1)}),a(".saved-payment").on("click",function(){a("#paymentAddNewAddress").collapse("toggle")}),0<a(".payment-page-error-span").length&&""!==a("#txtCreditCardNo").val()&&(a(".btn-continue").prop("disabled",!0),a("#paymentAddNewAddress").removeClass("collapse"),a("#paymentMethodList").addClass("collapse").removeClass("in")))}};livelo.common.modules.push(livelo.checkout.init)})(jQuery);
function bpSop_silentOrderPost(a){bpsilentOptions=bpSop_mergeOptions(a,defaultOptions);bpSop_validateData()&&bpSop_sendRequestToApi()}
function bpSop_sendRequestToApi(){var a=bpSop_getUrl(bpsilentOptions.environment),c=[];c.push("HolderName\x3d"+bpSop_getElementValue(".bp-sop-cardholdername"));c.push("RawNumber\x3d"+bpSop_getElementValue(".bp-sop-cardnumber"));c.push("Expiration\x3d"+bpSop_getElementValue(".bp-sop-cardexpirationdate"));c.push("SecurityCode\x3d"+bpSop_getElementValue(".bp-sop-cardcvv"));c.push("AccessToken\x3d"+bpsilentOptions.accessToken);var c=c.join("\x26"),b=new XMLHttpRequest;"withCredentials"in b?(b.onreadystatechange=
function(){if(4==b.readyState)if(201==b.status){var a=JSON.parse(b.responseText);bpsilentOptions.onSuccess(a)}else bpsilentOptions.onError({Code:b.status,Text:b.statusText})},b.open("POST",a,!0),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.setRequestHeader("Accept","application/json"),b.send(c)):window.XDomainRequest?(b=new window.XDomainRequest,b.timeout=3E3,b.open("POST",a),b.onload=function(){var a=JSON.parse(b.responseText);bpsilentOptions.onSuccess(a)},b.onerror=function(){bpsilentOptions.onError({Code:"401",
Text:"Unauthorized"})},b.send(c)):alert("Browser not supported!")}function bpSop_mergeOptions(a,c){var b={},d;for(d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);for(var e in a)a.hasOwnProperty(e)&&(b[e]=a[e]);return b}function bpSop_getUrl(a){switch(a){case "dev":return"https://dev.pagador.com.br/post/api/public/v1/card";case "sandbox":return"https://homologacao.pagador.com.br/post/api/public/v1/card";default:return"https://www.pagador.com.br/post/api/public/v1/card"}}
function bpSop_validateMandatoryValue(a){if(!a)return!1;a=unescape(a);return bpSop_CustomTrim(a)?!0:!1}
function bpSop_validateData(){var a=[],c=!1,b=!1;bpSop_validateMandatoryValue(bpsilentOptions.accessToken)||(b=!0,a.push({Field:"AccessToken",Message:validationMessages.missingAccessToken()}),c=!0);/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(bpsilentOptions.accessToken)||b||(a.push({Field:"AccessToken",Message:validationMessages.invalidFormat()}),c=!0);b=!1;bpSop_validateMandatoryValue(unescape(bpSop_getElementValue(".bp-sop-cardholdername")))||(b=!0,a.push({Field:"bp-sop-cardholdername",
Message:validationMessages.mandatory()}),c=!0);/^[a-zA-Z ]{1,64}$/.test(unescape(bpSop_getElementValue(".bp-sop-cardholdername")))||b||(a.push({Field:"bp-sop-cardholdername",Message:validationMessages.holderFormat()}),c=!0);b=!1;bpSop_validateMandatoryValue(unescape(bpSop_getElementValue(".bp-sop-cardnumber")))||(b=!0,a.push({Field:"bp-sop-cardnumber",Message:validationMessages.mandatory()}),c=!0);/^[0-9]{1,19}$/.test(unescape(bpSop_getElementValue(".bp-sop-cardnumber")))||b||(b=!0,a.push({Field:"bp-sop-cardnumber",
Message:validationMessages.numberFormat()}),c=!0);bpSop_validateCardFormat(unescape(bpSop_getElementValue(".bp-sop-cardnumber")))||b||(a.push({Field:"bp-sop-cardnumber",Message:validationMessages.numberValidity()}),c=!0);b=!1;return bpSop_validateMandatoryValue(unescape(bpSop_getElementValue(".bp-sop-cardexpirationdate")))||(b=!0,a.push({Field:"bp-sop-cardexpirationdate",Message:validationMessages.mandatory()}),c=!0),/^(0[1-9]|1[0-2])\/([0-9]{4})$/.test(unescape(bpSop_getElementValue(".bp-sop-cardexpirationdate")))||
b||(a.push({Field:"bp-sop-cardexpirationdate",Message:validationMessages.expirationFormat()}),c=!0),/^([0-9]{3}|[0-9]{4})$/.test(unescape(bpSop_getElementValue(".bp-sop-cardcvv")))||(a.push({Field:"bp-sop-cardcvv",Message:validationMessages.securityCodeFormat()}),c=!0),c?(bpsilentOptions.onInvalid(a),!1):!0}function bpSop_validateCardFormat(a){var c=unescape(a);a=parseInt(c.substring(c.length-1,c.length));c=c.substring(0,c.length-1);return bpSop_calculateMod10(c)!=parseInt(a)?!1:!0}
function bpSop_calculateMod10(a){for(var c=0,b=0;b<a.length;b++)c+=parseInt(a.substring(b,b+1));for(var d=[0,1,2,3,4,-4,-3,-2,-1,0],b=a.length-1;0<=b;b-=2)var e=parseInt(a.substring(b,b+1)),c=c+d[e];a=c%10;return a=10-a,10==a&&(a=0),a}function bpSop_getElement(a){return(a=document.querySelectorAll(a))&&0<a.length?a[0]:null}function bpSop_getElementValue(a){return(a=bpSop_getElement(a))?encodeURIComponent("INPUT"==a.nodeName?a.value:a.innerText):null}
function bpSop_CustomTrim(a){try{return a.trim()}catch(c){for(var b=0;b<a.length&&" "==a[b];)b++;return a.substring(b,a.length)}}
var bpsilentOptions={},defaultOptions={environment:"undefined",onSuccess:function(){},onError:function(){},onInvalid:function(){},language:"PT"},validationMessages={missingAccessToken:function(){switch(bpsilentOptions.language){case "EN":return"Missing access token, try again later.";case "ES":return"Token de acceso faltante, intentarlo más tarde.";default:return"Código de acesso não encontrado, tente novamente mais tarde."}},invalidFormat:function(){switch(bpsilentOptions.language){case "EN":return"Invalid format.";
case "ES":return"Formato inválido.";default:return"Formato inválido."}},mandatory:function(){switch(bpsilentOptions.language){case "EN":return"Please fill all the mandatory inputs.";case "ES":return"Por favor complete todas las entradas obligatorias.";default:return"Por favor, preencha todos os campos obrigatórios."}},holderFormat:function(){switch(bpsilentOptions.language){case "EN":return"Please type a valid name.";case "ES":return"Por favor ingrese un nombre válido.";default:return"Por favor, insira um nome válido."}},
numberFormat:function(){switch(bpsilentOptions.language){case "EN":return"Should contain a maximum of 19 numeric characters.";case "ES":return"Debe contener un máximo de 19 caracteres numéricos.";default:return"Deve conter no máximo 19 caracteres numéricos."}},numberValidity:function(){switch(bpsilentOptions.language){case "EN":return"Please insert a valid card number.";case "ES":return"Por favor ingrese un número de tarjeta válida.";default:return"Por favor, insira um número de cartão válido."}},
expirationFormat:function(){switch(bpsilentOptions.language){case "EN":return"Expiration date must be valid and respect the format MM/yyyy.";case "ES":return"Fecha de expiración debe ser válida y respetar el formato MM/aaaa.";default:return"Data de expiração deve ser válida e respeitar o formato MM/aaaa."}},securityCodeFormat:function(){switch(bpsilentOptions.language){case "EN":return"Security code must contain 3 or 4 numeric characters.";case "ES":return"Código de seguridad debe contener 3 o 4 caracteres numéricos.";
default:return"Código de segurança deve conter 3 ou 4 caracteres numéricos."}}};
