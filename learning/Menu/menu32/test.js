window.zenni.prescription = (function() {
    "use strict";

    var _this = {
        elementName: "elementName",

        eventName: "eventName",
        targetElement: [],
        selectedPrescriptionSelectBox: {},
        selectedPrescriptionRadio: {},
        selectedPrescriptionCheckBox: {},
        selectedPrescriptionText: {},

        getPrescription: function() {

            if ($(".checkout").length > 0) {
                commerceItemInfo.prescription = {};
                commerceItemInfo.prescription.prescriptionType = $('#prescriptionType').children('option:selected').val();
                commerceItemInfo.prescription.odSph = $('#odSph').children('option:selected').val();
                commerceItemInfo.prescription.osSph = $('#osSph').children('option:selected').val();
                commerceItemInfo.prescription.odCyl = $('#odCyl').children('option:selected').val();
                commerceItemInfo.prescription.osCyl = $('#osCyl').children('option:selected').val();
                commerceItemInfo.prescription.odAxis = $('#odAxis').children('option:selected').val();
                commerceItemInfo.prescription.osAxis = $('#osAxis').children('option:selected').val();
                commerceItemInfo.prescription.nvAdd = $('#nvAdd').children('option:selected').val();
                commerceItemInfo.prescription.odPrismValue = $('#odPrismValue').children('option:selected').val();
                commerceItemInfo.prescription.odPrismDirection = $('#odPrismDirection').children('option:selected').val();
                commerceItemInfo.prescription.osPrismValue = $('#osPrismValue').children('option:selected').val();
                commerceItemInfo.prescription.osPrismDirection = $('#osPrismDirection').children('option:selected').val();
                commerceItemInfo.prescription.pdSingle = $('#pdSingle').children('option:selected').val();
                commerceItemInfo.prescription.pdRight = $('#pdRight').children('option:selected').val();
                commerceItemInfo.prescription.pdLeft = $('#pdLeft').children('option:selected').val();
                commerceItemInfo.prescription.prescriptionSavedName = $('#prescriptionSavedName').val();
                commerceItemInfo.prescription.prescriptionSavedMonth = $('#prescriptionSavedMonth').children('option:selected').val();
                commerceItemInfo.prescription.prescriptionSavedDay = $('#prescriptionSavedDay').children('option:selected').val();
                commerceItemInfo.prescription.prescriptionSavedYear = $('#prescriptionSavedYear').children('option:selected').val();
                commerceItemInfo.prescription.prescriptionRenewMonths = $('#prescriptionRenewMonths').children('option:selected').val();
                commerceItemInfo.prescription.singlePd = $('input:radio[class="pdGroupRadio"]:checked').val();
                commerceItemInfo.prescription.prescriptionIsToBeSaved = $('#prescriptionIsToBeSaved').is(":checked");
                commerceItemInfo.prescription.prescriptionIsRenew = $('#prescriptionIsRenew').is(":checked");
                commerceItemInfo.prescription.prismEnabled = $('input:radio[class="prismGroupRadio"]:checked').val();
            }
        },

        orderNextClick: function(step) {

            if ($(".checkout").length > 0) {
                var step_desc;
                if (step) {
                    switch (step) {
                        case "1":

                            step_desc = "1 RX";
                            break;

                        case "2":

                            step_desc = "2 Lenses";
                            break;

                        case "3":

                            step_desc = "3 Add-Ons";
                            break;

                    }
                }
                var skuId = $('#skuId').val();
                dataLayer.push({
                    'event': 'trackEvent',
                    'eventCategory': 'Full Checkout Process',
                    'Step': step_desc,
                    'id': skuId
                });

                if (step === "3") {
                    var addToCartBtn = $("#addonFormId").find("div.addToCart");
                    var total = $(addToCartBtn).find("div.innerBox input#subTotal").val();
                    var quantity = $(addToCartBtn).find("div.innerBox div.qtyMsg span.select label").text();
                    dataLayer.push({
                        'event': 'addToCart',
                        'ecommerce': {
                            'add': {
                                'products': [{
                                    'id': skuId,
                                    'price': total,
                                    'quantity': quantity,
                                    'dimension16': 'true'
                                }]
                            }
                        }
                    });
                }
            }
        },

        validatePrescription: function() {

            if ($(".checkout").length > 0) {
                var prescriptionType = $('#prescriptionType').children('option:selected').val();
                _this.getPrescription();
                if (prescriptionType === '') {
                    $('#prescriptionType').parent().parent().find("span:first-child").addClass("error");
                    _this.showSingalErrorMessage(prescriptionErrorContainer.noPrescriptionTypeError, 'prescriptionErrorSection', prescriptionErrorContainer.errorHead);
                    return;
                }
                if (prescriptionType === 'nonPrescription' || prescriptionType === 'frameOnly') {
                    _this.submitPrescription();
                    return;
                }
                var isSaved = $('#prescriptionIsToBeSaved').is(":checked");
                var saveName = $('#prescriptionSavedName').val();
                if (isSaved && saveName === '') {
                    $('#prescriptionSavedName').addClass('error');
                    _this.showSingalErrorMessage(prescriptionErrorContainer.emptyPrescriptionName, 'prescriptionErrorSection', prescriptionErrorContainer.errorHead);
                    return;
                }
                var lensShape = commerceItemInfo.lensShape;
                targetElement.length = 0;
                errorMessage.msgs = [];
                warningMessage.msgs = [];
                var result = validateAll();
                _this.splitMessage(result);
                var length = result.length;
                var isAllWarning = isAllWarningMessage(result);
                if (length === 0) {
                    /* Send add prescription event */
                    if ($('#prescriptionIsToBeSavedLabel').hasClass('checked')) {
                        if (typeof dataLayer !== "undefined") {
                            var skuId = $('#skuId').val();
                            prescriptionType = $('#prescriptionType').val();
                            dataLayer.push({
                                'event': 'zenni_event',
                                'eventCategory': 'Product Detail',
                                'operation': 'Add Prescription',
                                'eventLabel': prescriptionType,
                                'skuId': skuId
                            });
                        }
                    }
                    /* end */
                    _this.submitPrescription();
                }
                if (isAllWarning && length !== 0) {
                    _this.showWarningMessage();
                }
                if (!isAllWarning && length !== 0) {
                    _this.showPrescriptionErrorMessage();
                    addErrorTip();
                }

            }
        },

        splitMessage: function(result) {

            if ($(".checkout").length > 0) {
                var length = result.length;
                for (var i = 0; i <= length - 1; i++) {
                    var failedresult = result[i];
                    if (failedresult.messageType === 'warning') {
                        _this.warningMessage.msgs.push(failedresult.message);
                    } else {
                        _this.errorMessage.msgs.push(failedresult.message);
                    }
                }
            }

        },

        addErrorTip: function() {

            if ($(".checkout").length > 0) {
                jQuery.each(targetElement, function(index, domEle) {
                    $("#" + domEle).closest('.select').addClass("error");
                });
                if (commerceItemInfo.prescription.singlePd === "true") {
                    $("#pdRight").parent().parent().find("span:first-child").removeClass("error");
                    $("#pdLeft").parent().parent().find("span:first-child").removeClass("error");
                } else {
                    $("#pdSingle").parent().parent().find("span:first-child").removeClass("error");
                }
            }
        },

        isAllWarningMessage: function(errorMessage) {

            if ($(".checkout").length > 0) {
                var length = errorMessage.length;
                var sum = 0;
                for (var i = 0; i <= length - 1; i++) {
                    var failedresult = errorMessage[i];
                    if (failedresult.messageType === 'warning') {
                        sum += 1;
                    }
                }
                if (sum === length) {
                    return true;
                }
                return false;
            }
        },

        submitLensForm: function() {

            if ($(".checkout").length > 0) {
                orderNextClick("2");
                // submit the form with ajax
                var selectedLensSku = $('#lensFormId .tlist span.radio.checked').find('input:radio[class="lensRadio"]').val();
                var selectedTintProduct = $('#lensFormId .tlist span.radio.checked').find('input:radio[class="tintRadio"]').val();
                if (typeof(selectedLensSku) === 'undefined') {
                    _this.showSingalErrorMessage(prescriptionErrorContainer.lensSectionInfo, 'lensSectionError', prescriptionErrorContainer.lensSectionTitle);
                    return false;
                }
                if (typeof(selectedTintProduct) !== 'undefined') {
                    var selectedTint = $("#" + selectedTintProduct).children('option:selected').val();
                    if (selectedTint === '') {
                        _this.showSingalErrorMessage(prescriptionErrorContainer.tintErrorInfo, 'lensSectionError', prescriptionErrorContainer.tintErrorTitle);
                        return false;
                    }
                    $("#tintSkuId").val(selectedTint);
                }
                var form = $("#lensFormId");

                $("#lensInfo").css('position', 'relative');
                $("#lensInfo").append("<div class='loading'>" +
                    "<span></span></div>");
                form.ajaxSubmit({
                    type: 'post',
                    dataType: 'html',
                    url: "/productdetail/lensInfo_form.jsp",
                    success: function(data) {
                        if (data === 'error') {
                            _this.showSingalErrorMessage(prescriptionErrorContainer.backendErrorForLense, 'processLense', prescriptionErrorContainer.errorTitle);
                        } else {
                            var responseDate = $(data);
                            var prescriptInfo = responseDate.find("#prescriptInfo").html();
                            $("#prescriptInfo").html(prescriptInfo);
                            var lensInfo = responseDate.find("#lensInfo").html();
                            $("#lensInfo").html(lensInfo);
                            var addOnsInfo = responseDate.find("#addOnsInfo").html();
                            $("#addOnsInfo").html(addOnsInfo);
                            $("#addOnsInfo").removeClass("disable");

                            // add animate action
                            $.pdpCommonUtils.doAnimate($("#addOnsInfo"));

                            var orderSummary = responseDate.find("#orderItem").html();
                            $("#orderItem").html(orderSummary);
                            calcPrice();
                            var exchargeDetail = responseDate.find("#lensExcharge").html();
                            var exchargeDetailTrim = $.trim(exchargeDetail);
                            if (exchargeDetailTrim !== '') {
                                showSingalErrorMessage(exchargeDetailTrim, 'exchargeMessage', prescriptionErrorContainer.exchargeFeeTitle);
                            }
                            /* Send select lens event */
                            if (typeof dataLayer !== "undefined") {
                                var skuId = $('#skuId').val();
                                var lensSelected = 'Lens-' + $('.radio.checked input:radio').val();
                                dataLayer.push({
                                    'event': 'zenni_event',
                                    'eventCategory': 'Product Detail',
                                    'operation': 'Lens Selected',
                                    'eventLabel': lensSelected,
                                    'skuId': skuId
                                });
                            }
                            /* end */
                        }
                    },
                    error: function(data) {
                        window.location.reload();
                    }
                });
            }
        },

        validateAll: function() {

            if ($(".checkout").length > 0) {
                var errorMessage = [];
                for (var validateFunction in PrescriptionRules) {
                    if (PrescriptionRules) {
                        var functionBody = PrescriptionRules[validateFunction];
                        if (jQuery.isFunction(functionBody)) {
                            var targetElementName = PrescriptionRules[validateFunction][elementName];
                            var targetEventName = PrescriptionRules[validateFunction][eventName];
                            if (typeof(targetEventName) !== 'undefined' && typeof(targetElementName) !== 'undefined') {
                                if (targetElementName === 'prescriptionNext' && targetEventName === 'onclick') {
                                    var callFunction = "PrescriptionRules." + validateFunction + "(commerceItemInfo)";
                                    var evalValue = eval(callFunction);
                                    if (evalValue !== 'success') {
                                        _this.errorMessage.push(getMessage(PrescriptionRules, validateFunction, evalValue));
                                    }
                                }
                            }
                        }
                    }
                }
                return errorMessage;
            }
        },

        getMessage: function(functionGroup, functionName, messageProperty) {

            if ($(".checkout").length > 0) {
                var message = functionGroup[functionName][messageProperty];
                var validateResult = {
                    'messageType': messageProperty,
                    'message': message
                };
                var singalTargetElement = functionGroup.targetElement;
                jQuery.each(singalTargetElement, function(index, domEle) {
                    targetElement.push(domEle);
                });

                return validateResult;
            }
        },

        processOptions: function() {

            if ($(".checkout").length > 0) {
                if (typeof(PrescriptionRules) === 'undefined') {
                    return;
                }
                var prescriptionParameter = PrescriptionRules.prescriptionParameter;
                if (typeof(prescriptionParameter) !== 'undefined') {
                    jQuery.each(prescriptionParameter, function(index, domEle) {
                        _this.fillOption(index, domEle);
                    });
                }
                _this.fillUsageAndNose();
                _this.fillBaseDirection();
            }
        },

        processDefaultValue: function() {

            if ($(".checkout").length > 0) {
                if (typeof(PrescriptionRules) === 'undefined') {
                    return;
                }
                var defaultValue = PrescriptionRules.defaultValue;
                if (typeof(defaultValue) !== 'undefined') {
                    jQuery.each(defaultValue, function(index, domEle) {
                        $("#" + index).parent().find("label:first-child").text(domEle.defaultDisplay);
                        jQuery("#" + index + " option[value='" + domEle.defaultValue + "']").attr("selected", true);
                    });
                }
            }
        },

        fillOption: function(targetId, targetOptions) {

            if ($(".checkout").length > 0) {
                var start = targetOptions.min;
                var end = targetOptions.max;
                var step = targetOptions.step;
                var precision = targetOptions.precision;
                var hasSymbol = targetOptions.hasSymbol;
                for (var k = start * 100; k <= end * 100; k += step * 100) {
                    var optionVlaue = (k / 100).toFixed(precision);
                    if (optionVlaue > 0) {
                        if (hasSymbol) {
                            $('#' + targetId).append('<option value=' + optionVlaue + '>+' + optionVlaue + '</option>');
                        } else {
                            $('#' + targetId).append('<option value=' + optionVlaue + '>' + optionVlaue + '</option>');
                        }
                    } else {
                        $('#' + targetId).append(
                            '<option value=' + optionVlaue + '>' + optionVlaue + '</option>');
                    }
                }

                $('#' + targetId).selectpicker('refresh');
            }
        },

        fillUsageAndNose: function() {

            if ($(".checkout").length > 0) {
                var usage = rxOpimization.usage;
                var nosePos = rxOpimization.nosePos;
                jQuery.each(usage, function(index, domEle) {
                    if (index === 0) {
                        $('#purposeForGlass').parent().find("label:first-child").text(domEle.description);
                    }
                    $('#purposeForGlass').append('<option value="' + domEle.code + '">' + domEle.description + '</option>');
                });
                jQuery.each(nosePos, function(index, domEle) {
                    if (index === 0) {
                        $('#wearOnNose').parent().find("label:first-child").text(domEle.description);
                    }
                    $('#wearOnNose').append('<option value="' + domEle.code + '">' + domEle.description + '</option>');
                });

            }
        },

        fillBaseDirection: function() {

            if ($(".checkout").length > 0) {
                jQuery.each(prismDirection, function(index, domEle) {
                    $('#odPrismDirection').append('<option value="' + domEle.code + '">' + domEle.description + '</option>');
                });
                jQuery.each(prismDirection, function(index, domEle) {
                    $('#osPrismDirection').append('<option value="' + domEle.code + '">' + domEle.description + '</option>');
                });
            }
        },

        prescripRule: function(sph) {

            console.log(sph);
            _this.PrescriptionRules[sph]();
        },

        bindEvent: function() {

            if ($(".checkout").length > 0) {
                if (typeof(PrescriptionRules) === 'undefined') {
                    return;
                }
                for (var validateFunction in PrescriptionRules) {
                    if (PrescriptionRules) {
                        var functionBody = PrescriptionRules[validateFunction];
                        if (jQuery.isFunction(functionBody)) {
                            var targetElementName = PrescriptionRules[validateFunction][elementName];
                            var targetEventName = PrescriptionRules[validateFunction][eventName];
                            if (typeof(targetEventName) !== 'undefined' && typeof(targetElementName) !== 'undefined') {
                                if (targetElementName === 'prescriptionNext' || targetElementName === 'pdSingle') {
                                    continue;
                                }
                                if (targetElementName === 'prescriptionType') {
                                    var change = validateFunction;
                                    $("#" + targetElementName).on(targetEventName, _this.PrescriptionRules[change]);
                                    continue;
                                }
                                if (targetElementName === 'odSph') {
                                    var changeSph = validateFunction;
                                    $("#" + targetElementName).on(targetEventName, _this.PrescriptionRules[changeSph]);
                                    $("#osSph").on(targetEventName, _this.PrescriptionRules[changeSph]);
                                    $("#odCyl").on(targetEventName, _this.PrescriptionRules[changeSph]);
                                    $("#osCyl").on(targetEventName, _this.PrescriptionRules[changeSph]);
                                }
                            }
                        }
                    }
                }

                $("#prescriptionNext").on('click', function(e) {
                    e.preventDefault();
                    orderNextClick("1");
                    _this.validatePrescription();
                });

                $("#pdSingle").on('change', function() {
                    window.setTimeout(function() {
                        _this.validatePD(true);
                    }, 0);

                });
                $("#pdRight").on('change', function() {
                    window.setTimeout(function() {
                        _this.validatePD(false);
                    }, 0);
                });
                $("#pdLeft").on('change', function() {
                    window.setTimeout(function() {
                        _this.validatePD(false);
                    }, 0);
                });
                $("#error_processPrescription .popupClose").on("click", function() {
                    $("#prescriptInfo").find(".loading").remove();
                    $("#prescriptInfo").removeClass("position");
                    return true;
                });
                $("#error_processLense .popupClose").on("click", function() {
                    $("#lensInfo").find(".loading").remove();
                    $("#lensInfo").removeClass("position");
                    return true;
                });
                $("#error_processPrescription .btnOK").on("click", function() {
                    $("#prescriptInfo").find(".loading").remove();
                    $("#prescriptInfo").removeClass("position");
                    $('#AcsModal').modal('hide');
                    return true;
                });
                $("#error_processLense .btnOK").on("click", function() {
                    $("#lensInfo").find(".loading").remove();
                    $("#lensInfo").removeClass("position");
                    $('#AcsModal').modal('hide');
                    return true;
                });
            }
        },

        showPCWarning: function(obj, title, warningStatus) {

            if ($(".checkout").length > 0) {
                if (warningStatus !== 'TRUE') {
                    return true;
                }
                $(".radio .lensRadio").each(function() {
                    $(this).closest("dl").find(".text-small").css("display", "none");
                });
                if (title.toLowerCase().indexOf("polycarbonate") > 0) {
                    $(obj).closest("dl").find(".text-small").css("display", "block");
                }
            }
        },

        changeLensSku: function(price, displayName, id, lensSkuId) {

            if ($(".checkout").length > 0) {
                var _windowId = $("#_windowId").val();
                $.get("/misc/ajax/productOrder/tintSection.jsp", {
                        'selectedLensSkuId': lensSkuId,
                        '_windowid': _windowId
                    },
                    function(data) {
                        var responseDate = $(data);
                        var lensTintChooseDom = responseDate.find("#lensTintChoose").html();
                        $("#lensTintChoose").html(lensTintChooseDom);
                        _this.appendToOrderSummary(price, displayName, id);
                        $("#lensPrice").val(price);
                        var total = parseFloat($("#subtotal").val()) + parseFloat($("#lensPrice").val()) + parseFloat($("#tintPrice").val());
                        $("#orderSummaryPrice").text("$" + total.toFixed(2));
                        _this.addTintToOrderSummary();
                    });

            }
        },

        addLensToOrderSummary: function() {

            if ($(".checkout").length > 0) {
                var selectedLensSku = $('input:radio[class="lensRadio"]:checked').val();
                var t = $('input:radio[class="lensRadio"][value="' + selectedLensSku + '"]');
                if (t !== undefined) {
                    var orderSummaryId = t.attr("orderSummaryId");
                    if (orderSummaryId !== undefined) {
                        var title = t.attr("title");
                        var price = parseFloat(t.attr("price"));
                        _this.appendToOrderSummary(price.toFixed(2), title, orderSummaryId);
                        $("#lensPrice").val(price);
                        var total = parseFloat($("#subtotal").val()) + parseFloat($("#lensPrice").val()) + parseFloat($("#tintPrice").val());
                        $("#orderSummaryPrice").text("$" + total.toFixed(2));
                    }
                }

            }
        },

        addTintToOrderSummary: function() {

            if ($(".checkout").length > 0) {
                var total = parseFloat($("#subtotal").val()) + parseFloat($("#lensPrice").val()) + parseFloat($("#tintPrice").val());
                var selectedTintProduct = $('input:radio[class="tintRadio"]:checked').val();
                if (selectedTintProduct !== undefined) {
                    var tintObject = $("#" + selectedTintProduct).children('option:selected');
                    if (tintObject !== undefined && tintObject.val() !== '') {
                        var orderSummaryId = tintObject.attr("orderSummaryId");
                        var title = tintObject.attr("title");
                        if (tintObject.val() !== 'tsku300001') {
                            var price = parseFloat(tintObject.attr("price"));
                            _this.appendToOrderSummary(price.toFixed(2), title, orderSummaryId);
                            $("#tintPrice").val(price);
                            $("#orderSummaryPrice").text("$" + total.toFixed(2));
                        } else {
                            $("#" + orderSummaryId).remove();
                            total = parseFloat($("#subtotal").val()) + parseFloat($("#lensPrice").val());
                            $("#orderSummaryPrice").text("$" + total.toFixed(2));
                        }
                    }
                } else {
                    var selectedLensSku = $('input:radio[class="lensRadio"]:checked').val();
                    if (selectedLensSku !== undefined) {
                        $("#tint").remove();
                        total = parseFloat($("#subtotal").val()) + parseFloat($("#lensPrice").val());
                        $("#orderSummaryPrice").text("$" + total.toFixed(2));
                    }
                }
            }
        },

        appendToOrderSummary: function(price, displayName, id) {

            if ($(".checkout").length > 0) {
                $("#" + id).remove();
                var renderText = '';
                var priceFormate = parseFloat(price).toFixed(2);
                if (parseFloat(price) === 0) {
                    renderText = 'Free';
                } else {
                    renderText = "$" + priceFormate;
                }
                $(".totalPrice").before("<dl id=\"" + id + "\"><dt>" + displayName + "</dt><dd>" + renderText + "</dd></dl>");
            }
        },

        addToShoppingCart: function() {

            if ($(".checkout").length > 0) {
                var fillAllOption = _this.validatePersonalization();
                if (fillAllOption) {
                    /* Send Event Accessory Selected */
                    // if(typeof dataLayer !==  "undefined"){
                    // var accessories = $('.qtyTable').find('select');
                    // var selectedAccessors = '';
                    // $.each(accessories, function(){
                    // if($(this).val().length > 0){
                    // selectedAccessors = selectedAccessors + ",";
                    // selectedAccessors = selectedAccessors + $(this).attr('id');
                    // }
                    // });
                    // var skuId = $('#skuId').val();
                    // if(selectedAccessors.length > 0){
                    // selectedAccessors = selectedAccessors.substring(1);
                    // dataLayer.push({'event':'zenni_event','eventCategory':'Product Detail',
                    // 'operation':'Accessory
                    // Selected','eventLabel':selectedAccessors,'skuId':skuId});
                    // }
                    // dataLayer.push({'event':'zenni_event','eventCategory':'Transaction',
                    // 'operation':'Add_Item_To_Cart','eventLabel':skuId,'skuId':skuId});
                    // }
                    /* End */
                    var form = $("#addonFormId");
                    form.submit();
                }
            }
        },

        processSelectedPrescription: function() {

            if ($(".checkout").length > 0) {
                _this.processSelectPrescriptionSelectBox();
                _this.processSelectPrescriptionRadio();
                _this.processSelectPrescriptionCheckBox();
                _this.processSelectPrescriptionText();
            }
        },

        processSelectPrescriptionText: function() {

            if ($(".checkout").length > 0) {
                for (var name in selectedPrescriptionText) {
                    if (selectedPrescriptionText) {
                        var selectedValue = selectedPrescriptionText[name];
                        if (selectedValue !== '') {
                            $("#" + name).val(selectedValue);
                        }
                    }
                }
            }

        },

        processSelectPrescriptionSelectBox: function() {

            if ($(".checkout").length > 0) {
                var bro = $.browser;
                var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
                for (var name in selectedPrescriptionSelectBox) {
                    if (selectedPrescriptionSelectBox) {
                        var selectedValue = selectedPrescriptionSelectBox[name];
                        if (selectedValue !== '') {
                            $("#" + name).parent().find("label:first-child").removeClass("gray");
                            if (bro.msie || isIE11) {
                                $("#" + name).children('option:selected').removeAttr('selected');
                            }
                            var processObejct = $("#" + name + " option[value='" + selectedValue + "']");
                            $("#" + name).parent().find("label:first-child").text(processObejct.text());

                            processObejct.attr("selected", true);
                        }

                        if (name === "prescriptionType" && selectedValue === "SingleVision") {
                            $('#NVAddTitle').hide();
                            $('#selNVAdd').hide();
                        }

                        if (name === "prescriptionType" && (selectedValue === "frameOnly" || selectedValue === "nonPrescription")) {
                            $('#infoODOS').hide();
                            $('#prismInfo').hide();
                            $('#pdInfo').hide();
                            $('#savePrescript').hide();
                        }


                        var prescriptionType = $('#prescriptionType').children('option:selected').val();
                        if (prescriptionType === 'Bifocal' || prescriptionType === 'Progressive') {
                            $("#prismGroup").hide();
                        }
                    }
                }
            }
        },


        processSelectPrescriptionRadio: function() {

            if ($(".checkout").length > 0) {
                for (var name in selectedPrescriptionRadio) {
                    if (selectedPrescriptionRadio) {
                        var selectedValue = selectedPrescriptionRadio[name];
                        if (selectedValue !== '') {
                            $("input:radio[class='" + name + "'][value='" + selectedValue + "']").attr("checked", "checked");
                        }
                    }
                }
                var singlePd = $('input:radio[class="pdGroupRadio"]:checked').val();
                if (singlePd !== 'true') {
                    $("#spanSignlePD").removeClass("checked");
                    $("#spanDoulePD").addClass("checked");
                    $(".singlePDBox").hide();
                    $(".doublePDBox").show();
                }
                var frametype = $('.frameInfo').attr('data-frametype');
                var selected = $('#prescriptionType').children('option:selected').val();
                var odSph = parseFloat($('#odSph').children('option:selected').val());
                var osSph = parseFloat($('#osSph').children('option:selected').val());
                var odCyl = parseFloat($('#odCyl').children('option:selected').val());
                var osCyl = parseFloat($('#osCyl').children('option:selected').val());
                var minSph = odSph < osSph ? odSph : osSph;
                var maxJoint = (odSph + odCyl) > (osSph + osCyl) ? (odSph + odCyl) : (osSph + osCyl);
                if (minSph < -12 || maxJoint > 6 || frametype && frametype.search(/PremiumSunglasses/ig) >= 0) {
                    $("#prismInfo").hide();

                } else {
                    if (selected === 'SingleVision' || selected === '') {
                        $("#prismInfo").show();
                    }
                }

                if ($("#prismInfo").is(":hidden")) {
                    $("input:radio[class='prismGroupRadio'][value='false']").attr("checked", "checked");
                    $("#notEnablePrism").addClass("checked");
                }
                var prismenable = $('input:radio[class="prismGroupRadio"]:checked').val();
                if (prismenable === 'true') {
                    $("#enablePrism").addClass("checked");
                    $("#notEnablePrism").removeClass("checked");
                    $(".infoODOS ").show();
                }
            }
        },

        processSelectPrescriptionCheckBox: function() {

            if ($(".checkout").length > 0) {
                console.log('test');
                for (var name in selectedPrescriptionCheckBox) {
                    if (selectedPrescriptionCheckBox) {
                        var selectedValue = selectedPrescriptionCheckBox[name];
                        if (selectedValue === 'true') {
                            $("#" + name + "[value='" + selectedValue + "']").attr("checked", true);
                        }
                    }
                }
                var prescriptionIsToBeSaved = $('#prescriptionIsToBeSaved').is(":checked");
                if (prescriptionIsToBeSaved) {
                    $('#prescriptionIsToBeSaved').parent().addClass("checked");
                    var section = $("#savePrescriptBody");
                    section.removeClass("hidden");
                    section.show();
                }
            }
        },

        editSelectedAddonSection: function(step) {

            if ($(".checkout").length > 0) {
                var windowId = $("#_windowId").val();
                var rad = Math.floor((Math.random() * 1000) + 1);
                $.get("/misc/ajax/productOrder/editSelectedAddonSection.jsp", {
                        'currentStep': step,
                        '_windowid': windowId,
                        "rad": rad
                    },
                    function(data) {
                        var responseDate = $(data);
                        var prescriptInfo = responseDate.find("#prescriptInfo").html();
                        if (step === 1) {
                            $.pdpCommonUtils.doAnimateEdit($("#prescriptInfo"), prescriptInfo);

                        } else {
                            $("#prescriptInfo").html(prescriptInfo);
                        }

                        var lensInfo = responseDate.find("#lensInfo").html();
                        if (step === 2) {
                            $.pdpCommonUtils.doAnimateEdit($("#lensInfo"), lensInfo);
                        } else {
                            $("#lensInfo").html(lensInfo);
                        }

                        var addOnsInfo = responseDate.find("#addOnsInfo").html();
                        $("#addOnsInfo").html(addOnsInfo);
                        var orderSummary = responseDate.find("#orderItem").html();
                        $("#orderItem").html(orderSummary);
                        if (step === 1) {
                            var prescriptionSelectBox = responseDate.find("#selectedPrescriptionSelectBox").val();
                            var prescriptionRadio = responseDate.find("#selectedPrescriptionRadio").val();
                            var prescriptionCheckBox = responseDate.find("#selectedPrescriptionCheckBox").val();
                            var prescriptionText = responseDate.find("#selectedPrescriptionText").val();
                            selectedPrescriptionSelectBox = $.parseJSON(prescriptionSelectBox);
                            selectedPrescriptionRadio = $.parseJSON(prescriptionRadio);
                            selectedPrescriptionCheckBox = $.parseJSON(prescriptionCheckBox);
                            selectedPrescriptionText = $.parseJSON(prescriptionText);
                            _this.processOptions();
                            _this.processDefaultValue();
                            _this.processSelectedPrescription();
                            _this.processView();

                            var selected = $('#prescriptionType').children('option:selected').val();
                            if (selected === 'Progressive') {
                                if (document.getElementById("pDescription")) {
                                    document.getElementById("pDescription").style.display = "block";
                                } else {
                                    var myDiv = document.createElement("div");
                                    myDiv.id = "pDescription";
                                    myDiv.innerHTML = "<p style='font-size:12px;'>Manufactured using technology covered by a royalty bearing license to U.S. Patent No. 6,089,713 and its foreign counterparts.</p>";
                                    document.getElementById('prescriptionType').parentNode.parentNode.parentNode.parentNode.appendChild(myDiv);
                                }
                            } else {
                                if (document.getElementById("pDescription")) {
                                    document.getElementById("pDescription").style.display = "none";
                                }
                            }

                        }
                        if (step === 2) {
                            _this.addLensToOrderSummary();
                            _this.addTintToOrderSummary();
                        }
                    });
            }
        },

        processView: function() {

            if ($(".checkout").length > 0) {
                var selectedPrescription = $('#prescriptionType').children('option:selected').val();
                if (selectedPrescription === 'SingleVision') {
                    $("#selNVAdd").hide();
                    $("#NVAddTitle").hide();
                }
                $("#optimize").hide();
                if (selectedPrescription === 'Bifocal' || selectedPrescription === 'Progressive' || selectedPrescription === 'LimitlessBifocal') {
                    $("#prismInfo").hide();
                }
                if (selectedPrescription === 'nonPrescription' || selectedPrescription === 'frameOnly') {
                    $("#infoODOS").hide();
                    $("#prismInfo").hide();
                    $("#pdInfo").hide();
                    $("#optimize").hide();
                    $("#savePrescript").hide();
                }
                $("#prescriptionNext").show();
                $("#presNextGrey").hide();
                var odSph = parseFloat($('#odSph').children('option:selected').val());
                var osSph = parseFloat($('#osSph').children('option:selected').val());
                var odCyl = parseFloat($('#odCyl').children('option:selected').val());
                var osCyl = parseFloat($('#osCyl').children('option:selected').val());
                var minSph = odSph < osSph ? odSph : osSph;
                var maxSph = odSph > osSph ? odSph : osSph;
                var maxJoint = (odSph + odCyl) > (osSph + osCyl) ? (odSph + odCyl) : (osSph + osCyl);
                var minJoint = (odSph + odCyl) < (osSph + osCyl) ? (odSph + odCyl) : (osSph + osCyl);
                if (minSph < -12 || minJoint < -18 || maxSph > 6 || maxJoint > 6) {
                    $("#prismInfo").hide();
                }
            }
        },

        clearAll: function() {

            if ($(".checkout").length > 0) {
                _this.processDefaultValue();
                $("input:radio[class='pdGroupRadio'][value='true']").attr("checked", "checked");
                $("input:radio[class='prismGroupRadio'][value='false']").attr("checked", "checked");
                $("#spanDoulePD").removeClass("checked");
                $("#doublePDBox").hide();
                $("#spanSignlePD").addClass("checked");
                $("#singlePDBox").show();
                $("#enablePrism").removeClass("checked");
                $("#notEnablePrism").addClass("checked");
                $("#prescriptionSavedName").val('');
                $("#selNVAdd").show();
                $("#NVAddTitle").show();
                $("#prismInfo").show();
                $("#prismInfoODOS").hide();
                $("#pdInfo").show();
                //  $("#optimize").hidden();
                $("#infoODOS").show();
                $("#prescriptionIsToBeSaved [value='true']").attr("checked", false);
                $("#prescriptionIsToBeSavedLabel").removeClass("checked");
                $("#savePrescript").show();
                $("#savePrescriptBody").hide();
                //$("#prescriptionNext").hide();
                $("#presNextGrey").show();
                var myDate = new Date();
                var defaultYear = myDate.getFullYear();
                var defaultMonth = myDate.getMonth() + 1;
                var defaultDay = myDate.getDate();
                $('#prescriptionSavedYear').parent().find("label:first-child").text(defaultYear);
                $('#prescriptionSavedMonth').parent().find("label:first-child").text(defaultMonth);
                $('#prescriptionSavedDay').parent().find("label:first-child").text(defaultDay);
                $("#prescriptionSavedYear option[value='" + defaultYear + "']").attr("selected", true);
                $("#prescriptionSavedMonth option[value='" + defaultMonth + "']").attr("selected", true);
                $("#prescriptionSavedDay option[value='" + defaultDay + "']").attr("selected", true);
                $('#prescriptionRenewMonths').parent().find("label:first-child").text('6 Months');
                $("#prescriptionRenewMonths option[value='']").attr("selected", true);
            }
        },

        validatePersonalization: function() {

            if ($(".checkout").length > 0) {
                var selectPersonalization = $('input[type="checkbox"][group="personalizationProduct"]');
                var iscorrect = true;
                selectPersonalization.each(function() {
                    var isSelected = $(this).is(":checked");
                    var targetId = $(this).attr("id");
                    if (isSelected) {
                        if (targetId === 'textInside') {
                            var textInside = $(".textInside");
                            var insideText = textInside.find("#insideText").val();
                            var termInsideText = textInside.find('#termInsideText').is(":checked");
                            if (insideText === '' || termInsideText === '') {
                                if (insideText === '') {
                                    $("#insideText").addClass("error");
                                }
                                _this.showSingalErrorMessage(prescriptionErrorContainer.personalizationInfo, 'textInside', prescriptionErrorContainer.textInsideTitle);
                                iscorrect = false;
                            }
                        }
                        if (targetId === 'textOutside') {
                            var textOutside = $(".textOutside");
                            var outsideText = textOutside.find("#outsideText").val();
                            var outsideTextSkuId = textOutside.find('#outsideTextSkuId').children('option:selected').val();
                            var outsideTextFont = textOutside.find('input:radio[class="outsideTextFont"]:checked').val();
                            var termOutsideText = textOutside.find('#termOutsideText').is(":checked");
                            if (outsideText === '' || outsideTextSkuId === '' || !outsideTextFont || termOutsideText === '') {
                                if (outsideText === '') {
                                    $("#outsideText").addClass("error");
                                }
                                if (outsideTextSkuId === '') {
                                    $("#outsideTextSkuId").closest('span').addClass('error');
                                }
                                _this.showSingalErrorMessage(prescriptionErrorContainer.personalizationInfo, 'textOutside', prescriptionErrorContainer.textOutsideTitle);
                                iscorrect = false;
                            }
                        }
                        if (targetId === 'artOutside') {
                            var artOutside = $(".artOutside");
                            var persImageCode = artOutside.find("#persImageCode").val();
                            var persImageSkuId = artOutside.find('#persImageSkuId').children('option:selected').val();
                            if (persImageSkuId === '' || persImageCode === '') {
                                _this.showSingalErrorMessage(prescriptionErrorContainer.personalizationInfo, 'artOutside', prescriptionErrorContainer.artOutsideTitle);
                                iscorrect = false;
                            }
                        }
                    }
                });


                return iscorrect;
            }
        },

        getTintPrice: function(id) {

            if ($(".checkout").length > 0) {
                var price = $('#' + id).children('option:selected').attr("price");
                var priceTag = $('#' + id).parent().parent().parent().find("span[class=tintSkuPrice]");
                if (price !== '' && price !== undefined) {
                    priceTag.text("$" + price);
                    var $obj = $('input:radio[class="tintRadio"][value="' + id + '"]');
                    $obj.attr('checked', 'checked');
                    $obj.trigger('click');
                    addTintToOrderSummary();
                    $(".select130").each(function() {
                        if (this.id !== id) {
                            this.options[0].selected = true;
                            $(this).parent().find('label').html($(this).find('option:selected').text());
                            var selValue = $(this).find('option:selected').val();
                            if (selValue.length <= 0) {
                                if (!$label.hasClass('gray')) {
                                    $label.addClass('gray');
                                }
                            } else {
                                if ($label.hasClass('gray')) {
                                    $label.removeClass('gray');
                                }
                            }
                            priceTag = $(this).parent().parent().parent().find("span[class=tintSkuPrice]");
                            priceTag.text("");
                        }
                    });
                } else {
                    priceTag = $('#' + id).parent().parent().parent().find("span[class=tintSkuPrice]");
                    priceTag.text("");
                }
            }
        },

        selectLensSharp: function(id, isSubmitForm, formId, isProgressiveAvailable, mainSection, backFrameLink) {

            if ($(".checkout").length > 0) {
                var targetParam = {
                    'skuId': skuId,
                    'lensShapeId': id,
                    'faceId': ''
                };
                backFrameLink = encodeURIComponent(backFrameLink);
                $("#" + formId + " input[id='rimlessShapeId']").val(id);
                var _windowId = $("#_windowId").val();
                if (isSubmitForm) {
                    var skuId = $("#selectedMainSku").val();
                    var step = $("#currentStep").val();
                    var hasError = false;
                    if (typeof(step) !== 'undefined' && step !== '1' && step !== '0') {
                        $.ajax({
                            url: "/misc/ajax/productOrder/changeLensShapeSku.jsp",
                            async: false,
                            data: {
                                'lensShapeSku': id,
                                "_windowid": _windowId
                            },
                            success: function(data) {
                                if ($.trim(data) !== 'success') {
                                    showLensShapeErrorMessage($.trim(data), 'processBackPrescriptionError', prescriptionErrorContainer.errorHead, targetParam);
                                } else {
                                    $.get("/misc/ajax/productOrder/getOrderUrl.jsp", targetParam, function(data) {
                                        if (targetParam.step === '1') {
                                            window.location.href = $.trim(data) + "&_windowid=" + _windowId + "&backFrameLink=" + backFrameLink;
                                        } else {
                                            window.location.href = $.trim(data) + "&step=" + $.trim(targetParam.step) + "&_windowid=" + _windowId + "&backFrameLink=" + backFrameLink;
                                        }
                                    });
                                }
                            }
                        });
                    } else if (step === '1') {
                        targetParam = {
                            'skuId': skuId,
                            'lensShapeId': id
                        };
                        $.get("/misc/ajax/productOrder/getOrderUrl.jsp", targetParam, function(data) {
                            window.location.href = $.trim(data) + "&_windowid=" + _windowId + "&backFrameLink=" + backFrameLink;
                        });
                    }

                } else {
                    if (isProgressiveAvailable === 'true') {
                        $("#" + mainSection).find("span[id=isProgressiveAvailable]").removeClass('noMsg');
                        $("#" + mainSection).find("span[id=isProgressiveAvailable]").text('Yes');
                    } else {
                        $("#" + mainSection).find("span[id=isProgressiveAvailable]").text('No');
                        $("#" + mainSection).find("span[id=isProgressiveAvailable]").addClass('noMsg');
                    }
                    $("#" + mainSection).find("span[id=pdRange]").text($("#" + id).attr("pd"));
                    $("#" + mainSection).find("span[id=lengthHeight]").text($("#" + id).attr("lengthHeight"));
                    $("#" + mainSection).find("span[id=lensWidth]").text($("#" + id).attr("lensWidth"));
                    _this.processOrderUrl(formId, backFrameLink);
                }

            }
        },

        selectMainSku: function(id, description, formId) {

            if ($(".checkout").length > 0) {
                $("#endecaSkuId").val(id);
                $("#h1SkuId").text(id);
                if ($(".heroImg") === undefined) {
                    return;
                }
                var altValue = $(".heroImg").attr("alt") === undefined ? "" : $(".heroImg").attr("alt");
                var specialIndex = altValue.indexOf("#");
                var finalResult = altValue.substring(0, specialIndex);
                finalResult = jQuery.trim(finalResult) + " #" + id;
                $(".heroImg").attr("alt", finalResult);
                var titleValue = $(".heroImg").attr("title") === undefined ? "" : $(".heroImg").attr("title");
                var indexTitle = titleValue.lastIndexOf(" ");
                titleValue = titleValue.substring(0, indexTitle);
                titleValue = titleValue + " " + id;
                $(".heroImg").attr("title", titleValue);
                var skuText = $("#" + id).find("input");
                var skuInfoText = {
                    "inventoryStatus": skuText.data('inventorystatus'),
                    "status": skuText.data('status')
                };
                var inventoryStatus = skuInfoText.inventoryStatus;
                var status = skuInfoText.status;
                if ($.trim(status) === 'disabled') {
                    if (formId === 'quickViewFormId') {
                        $("#quickViewoutOfStock").hide();
                        $("#quickViewInStock").hide();
                    } else {
                        $("#outOfStock").hide();
                        $("#orderGlasses").hide();
                    }
                    $("#outOfStockSignUp").hide();
                    $("#RetiredButton").show();
                } else if ($.trim(inventoryStatus) === 'outof_stock') {
                    if (formId === 'quickViewFormId') {
                        $("#quickViewoutOfStock").show();
                        $("#quickViewInStock").hide();
                    } else {
                        $("#outOfStock").show();
                        $("#orderGlasses").hide();
                    }
                    $("#outOfStockSignUp").show();
                    $("#RetiredButton").hide();
                } else {
                    if (formId === 'quickViewFormId') {
                        $("#quickViewoutOfStock").hide();
                        $("#quickViewInStock").show();
                    } else {
                        $("#outOfStock").hide();
                        $("#orderGlasses").show();
                    }
                    $("#" + formId + " input[id='mainSkuId']").val(id);
                    _this.processOrderUrl(formId, window.location.href);
                    $(".colorName").text(description);
                    $("#outOfStockSignUp").hide();
                    $("#RetiredButton").hide();
                }
                $("#outOfStockSkuId").val(id);
                $("#outOfStockEmailInput").val("");
                $("#outOfStockEmailMessage").html("");
            }
        },

        processOrderUrl: function(formId, backFrameLink) {

            if ($(".checkout").length > 0) {
                var skuId = $("#" + formId + " input[id='mainSkuId']").val();
                var lensShapeId = $("#" + formId + " input[id='rimlessShapeId']").val();
                var skuInfoText = $("#" + skuId).find("input");
                var orderUrl = skuInfoText.data('url');
                var temp = $.trim(orderUrl);
                if (temp.indexOf("?") < 0) {
                    if (lensShapeId !== '') {
                        temp = temp + "?lensShapeId=" + lensShapeId + "&_windowid=new" + "&backFrameLink=" + backFrameLink;
                    } else {
                        temp = temp + "?_windowid=new" + "&backFrameLink=" + backFrameLink;
                    }
                } else {
                    if (lensShapeId !== '') {
                        temp = temp.substring(0, temp.indexOf("?"));
                        temp = temp + "?lensShapeId=" + lensShapeId + "&_windowid=new" + "&backFrameLink=" + backFrameLink;
                    } else {
                        temp = temp + "&_windowid=new" + "&backFrameLink=" + backFrameLink;
                    }
                }
                if (formId === 'lensShapeFormId') {
                    $("#orderGlasses").attr('href', temp);
                } else if (formId === 'quickViewFormId') {
                    $("#quickViewInStock").attr('href', temp);
                }
            }
        },

        orderGlasses: function() {

            if ($(".checkout").length > 0) {
                var form = $("#lensShapeFormId");
                try {
                    var data = $('.frameFit:first').find('.currentItem .carouselItem.recently').find('var').text();
                    data = $.parseJSON(data);
                    form.find('#selectedFaceId').val(data.faceId);
                } catch (error) {

                }
                form.submit();
            }
        },

        calcPrice: function(id) {

            if ($(".checkout").length > 0) {
                $("#" + id + "qtyError").remove();
                var selectedCoatingSkuDisplayName = $('input:radio[class="coatingSkus"]:checked').attr("displayName");
                var selectedCoatingSkuId = $('input:radio[class="coatingSkus"]:checked').val();
                var subTotal = parseFloat($("#subtotal").val());
                var coatingPrice = 0.00;
                var clipOnPrice = 0.00;
                var personalizationPrice = 0.00;
                var tryOnImageUrl = $(".frameImg").css("background-image");

                if (typeof(selectedCoatingSkuId) !== 'undefined') {
                    var selectedTint = $('input:radio[class="coatingSkus"]:checked');
                    if (selectedCoatingSkuId !== 'ctsku100007') {
                        coatingPrice = parseFloat($("#" + selectedCoatingSkuId + "_price").val());
                        _this.appendToOrderSummary(coatingPrice.toFixed(2), selectedCoatingSkuDisplayName, 'coat');
                        if (tryOnImageUrl.indexOf("____") > 0 || tryOnImageUrl.indexOf("___") > 0) {
                            if ($('input:radio[class="coatingSkus"]:checked').length === 0) {
                                return;
                            }
                            $.FrameFitUtils.pdpTintTryon(selectedTint);
                        }
                    } else {
                        if (tryOnImageUrl.indexOf("____") > 0 || tryOnImageUrl.indexOf("___") > 0 || tryOnImageUrl.indexOf("ffffff") > 0) {
                            if ($('input:radio[class="coatingSkus"]:checked').length === 0) {
                                return;
                            }
                            selectedTint = $('input:radio[class="coatingSkus"]:checked');
                            $.FrameFitUtils.pdpTintTryon(selectedTint);
                        }
                        $("#coat").remove();
                    }
                }

                var selectedClipons = $('select[class="select150"]');
                selectedClipons.each(function() {
                    var id = $(this).attr('id');
                    var value = $(this).children('option:selected').val();
                    if (value !== '') {
                        var singalCliponPrice = parseFloat($("#" + id + "_price").val());
                        var cliponDisplayName = $(this).attr("displayName");
                        var subSum = singalCliponPrice * parseFloat(value);
                        _this.appendToOrderSummary(subSum.toFixed(2), cliponDisplayName, 'clipon' + id);
                        clipOnPrice += subSum;
                    } else {
                        $("#clipon" + id).remove();
                    }
                });

                // below is the personalization info
                var singalPersonalizationPrice;
                var personalizationDisplayName;
                var image = $('#persImageSkuId').children('option:selected');
                var imageCheckBox = $("#artOutside").is(":checked");
                personalizationDisplayName = $('#artOutside').attr("displayname");
                var imagePirce = image.attr('price');
                if (typeof(imagePirce) !== 'undefined' && imagePirce !== '' && imageCheckBox === true) {
                    $("#imagePrice").text("$" + imagePirce);
                    $("#imagePrice").show();
                    singalPersonalizationPrice = parseFloat(imagePirce);
                    personalizationPrice += singalPersonalizationPrice;
                    _this.appendToOrderSummary(singalPersonalizationPrice.toFixed(2), personalizationDisplayName, 'personalizationpersImageSkuId');
                    if (id === 'persImageSkuId') {
                        var targetSrc = $("#targetImage").attr("src");
                        if (typeof(targetSrc) !== 'undefined' && targetSrc !== '') {
                            var targetCode = image.attr('code');
                            if (typeof(targetCode) !== 'undefined' && targetCode !== '') {
                                processImage(targetCode, targetSrc);
                            }
                        }
                    }
                } else {
                    $("#imagePrice").hide();
                    $("#personalizationpersImageSkuId").remove();
                }
                var insideTextCheckBox = $("#textInside").is(":checked");
                personalizationDisplayName = $('#textInside').attr("displayname");
                var insideTextPrice = $("#textInside_price").val();
                if (typeof(insideTextPrice) !== 'undefined' && insideTextPrice !== '' && insideTextCheckBox === true) {
                    $("#insideTextPrice").show();
                    singalPersonalizationPrice = parseFloat(insideTextPrice);
                    personalizationPrice += singalPersonalizationPrice;
                    _this.appendToOrderSummary(singalPersonalizationPrice.toFixed(2), personalizationDisplayName, 'personalizationpersinsideTextSkuId');
                } else {
                    $("#personalizationpersinsideTextSkuId").remove();
                    $("#insideTextPrice").hide();
                }

                var outsideText = $('#outsideTextSkuId').children('option:selected');
                var artOutsideCheckBox = $("#textOutside").is(":checked");
                personalizationDisplayName = $('#outsideTextSkuId').attr("displayname");
                var outsideTextPrice = outsideText.attr('price');
                if (typeof(outsideTextPrice) !== 'undefined' && outsideTextPrice !== '' && artOutsideCheckBox === true) {
                    $("#outsideTextPrice").text("$" + outsideTextPrice);
                    singalPersonalizationPrice = parseFloat(outsideTextPrice);
                    personalizationPrice += singalPersonalizationPrice;
                    appendToOrderSummary(singalPersonalizationPrice.toFixed(2), personalizationDisplayName, 'personalizationpersinsoutsideTextSkuId');
                } else {
                    $("#personalizationpersinsoutsideTextSkuId").remove();
                }

                var total = subTotal + coatingPrice + clipOnPrice + personalizationPrice;
                $("#priceSection").text("PRICE WITH SELECTED OPTIONS: $" + total.toFixed(2));
                $("#subTotal").val(total.toFixed(2));
                $("#orderSummaryPrice").text("$" + total.toFixed(2));
            }
        },

        processImage: function(code, targetSrc) {

            if ($(".checkout").length > 0) {
                var begin = targetSrc.lastIndexOf("-");
                var url = targetSrc.substring(0, begin) + "-" + code + ".png";
                $("#targetImage").attr("src", url);
                $("#persImageCode").val(url);
            }
        },

        showWarningMessage: function() {

            if ($(".checkout").length > 0) {
                var warningData = warningMessage;
                var msgLength = warningData.msgs.length;
                var closePopNum = 0;
                var $errorBox = $('#AcsModal .errorBox');
                var $wraningBox = $('#AcsModal .warningBox');
                $wraningBox.show();
                $errorBox.hide();
                if (msgLength > 0) {

                    $wraningBox.find('p').text(warningData.msgs[0]);
                    console.log(warningData.msgs[0]);
                    (function() {
                        $(this).acsPopup({
                            popupSrc: '',
                            popupTitle: warningData.header,
                            maxWidth: 650,
                            maxHeight: 550,
                            popupID: 'warning0',
                            popupContentPreload: $wraningBox,
                            callBack: function(setting) {
                                $('#AcsModal').modal('show');
                                $('#AcsModal .btnCancel').on('click', function(e) {
                                    e.preventDefault();
                                    acsPopup.popupLayerClose(setting);
                                    $('#AcsModal').modal('hide');
                                });
                                $('#AcsModal .btnOK').on('click', function(e) {
                                    e.preventDefault();
                                    acsPopup.popupLayerClose(setting);
                                    _this.submitPrescription();
                                    $('#AcsModal').modal('hide');
                                });
                            }
                        });
                    })();

                }

            }
        },

        submitPrescription: function() {

            if ($(".checkout").length > 0) {
                var form = $("#prescriptionFormId"),
                    prescriptionType = commerceItemInfo.prescription.prescriptionType;

                $("#prescriptInfo").css('position', 'relative')
                    .append("<div class='loading'><span></span></div>");
                form.ajaxSubmit({
                    type: 'post',
                    url: "/productdetail/prescription.jsp",
                    success: function(data) {
                        if (data === 'error') {
                            _this.showSingalErrorMessage(prescriptionErrorContainer.backendErrorForPrescription, 'processPrescription', prescriptionErrorContainer.errorTitle);
                        } else {
                            var responseDate = $(data);
                            var prescriptInfo = responseDate.find("#prescriptInfo").html();
                            $("#prescriptInfo").html(prescriptInfo);
                            var lensInfo = responseDate.find("#lensInfo").html();
                            $("#lensInfo").html(lensInfo);
                            var orderSummary = responseDate.find("#orderItem").html();
                            $("#orderItem").html(orderSummary);
                            if (prescriptionType !== 'frameOnly') {
                                $("#lensInfo").removeClass("disable");
                                _this.addLensToOrderSummary();
                                _this.addTintToOrderSummary();

                                // add animate action
                                $.pdpCommonUtils.doAnimate($('#lensInfo'));

                            } else {
                                var addOnsInfo = responseDate.find("#addOnsInfo").html();
                                $("#addOnsInfo").html(addOnsInfo);
                                $("#addOnsInfo").removeClass("disable");

                                // add animate action
                                $.pdpCommonUtils.doAnimate($('#addOnsInfo'));
                            }

                        }

                    },
                    error: function(data) {

                    }
                });
            }
        },

        showPrescriptionErrorMessage: function() {

            if ($(".checkout").length > 0) {
                var errorData = errorMessage;
                var msgLength = errorData.msgs.length;
                var $errorBox = $('#AcsModal .errorBox');
                var $wraningBox = $('#AcsModal .warningBox');
                $wraningBox.hide();
                $errorBox.show();
                if (msgLength > 0) {
                    $errorBox.find('p').text(errorData.msgs[0]);
                    console.log(errorData.msgs[0]);
                    (function() {
                        $(this).acsPopup({
                            popupSrc: '',
                            popupTitle: errorData.header,
                            maxWidth: 650,
                            maxHeight: 550,
                            popupID: 'error0',
                            popupContentPreload: $errorBox,
                            callBack: function(setting) {

                                $('#AcsModal .btnOK').on('click', function(e) {
                                    e.preventDefault();
                                    acsPopup.popupLayerClose(setting);
                                    $('#AcsModal').modal('hide');
                                });
                                $('#AcsModal').modal('show');
                            }
                        });
                    })();
                }
            }

        },

        showLensShapeErrorMessage: function(message, id, title, targetParam) {

            if ($(".checkout").length > 0) {
                var $errorBox = $('#AcsModal .errorBox');
                var $wraningBox = $('#AcsModal .warningBox');
                $errorBox.find('p').text(message);
                $wraningBox.hide();
                $errorBox.show();
                (function() {
                    $(this).acsPopup({
                        popupSrc: '',
                        popupTitle: title,
                        maxWidth: 650,
                        maxHeight: 550,
                        popupID: 'error_' + id,
                        popupContentPreload: $errorBox,
                        callBack: function(setting) {

                            $('#error_' + id).on('click', '.btnOK, .popupClose', function(e) {
                                e.preventDefault();
                                acsPopup.popupLayerClose(setting);
                                $.get("/misc/ajax/productOrder/getOrderUrl.jsp", targetParam, function(data) {
                                    window.location.href = data;
                                });
                                $('#AcsModal').modal('hide');
                            });
                            $('#AcsModal').modal('show');
                        }
                    });
                })();
            }

        },

        showSingalErrorMessage: function(message, id, title) {

            if ($(".checkout").length > 0) {
                var $errorBox = $('#AcsModal .errorBox');
                var $wraningBox = $('#AcsModal .warningBox');
                $wraningBox.hide();
                $errorBox.show();
                $errorBox.find('p').html(message);
                console.log(message);
                (function() {
                    $(this).acsPopup({
                        popupSrc: '',
                        popupTitle: title,
                        maxWidth: 650,
                        maxHeight: 550,
                        popupID: 'error_' + id,
                        popupContentPreload: $errorBox,
                        callBack: function(setting) {

                            $('#error_' + id).find('.btnOK').on('click', function(e) {
                                e.preventDefault();
                                acsPopup.popupLayerClose(setting);
                                $('#AcsModal').modal('hide');
                            });
                            $('#AcsModal').modal('show');
                        }
                    });
                })();
            }
        },

        changeMainSku: function(mainProductId, mainSkuId, description, selected, backFrameLink) {

            if ($(".checkout").length > 0) {
                backFrameLink = encodeURIComponent(backFrameLink);
                var _windowId = $("#_windowId").val();
                $.get("/misc/ajax/productOrder/changeMainSku.jsp", {
                    'mainSkuId': mainSkuId,
                    '_windowid': _windowId,
                    'backFrameLink': backFrameLink
                }, function(data) {
                    if ($.trim(data) === 'outof_stock') {
                        $("a[name=" + description + "]").removeClass('recently');
                        $("a[name=" + selected + "]").addClass('recently');
                        _this.showSingalErrorMessage(prescriptionErrorContainer.outofStockInfo, 'frameoutofStock', prescriptionErrorContainer.outofStockTitle);
                    } else {
                        $("#selectedMainSku").val(mainSkuId);
                        var responseDate = $(data);
                        var orderSection = responseDate.find("#orderItem").html();
                        var seo = responseDate.find("#newSeo").val();
                        var heroImg = responseDate.find("#heroImage").val();
                        var selectedLensShapeId = $("#selectedLensShapeId").val();
                        var step = $("#currentStep").val();
                        var facedata = $('.frameFit:first').find('.currentItem .carouselItem.recently').find('var').text();
                        facedata = $.parseJSON(facedata);
                        var faceId = facedata.faceId;
                        if (selectedLensShapeId !== '') {
                            seo = seo + "?lensShapeId=" + selectedLensShapeId;
                            if (step !== '1') {
                                seo = seo + "&step=" + step;
                            }
                        } else if (step !== '1') {
                            seo = seo + "?step=" + step;
                        }
                        if (seo.indexOf('?') !== -1) {
                            seo = seo + "&curFaceId=" + faceId + "&_windowid=" + _windowId + "&backFrameLink=" + backFrameLink;
                        } else {
                            seo = seo + "?curFaceId=" + faceId + "&_windowid=" + _windowId + "&backFrameLink=" + backFrameLink;
                        }
                        window.location.href = seo;
                    }
                });

            }
        },

        importPrescriptionFromProfile: function() {

            if ($(".checkout").length > 0) {
                var prescriptionId = $("#perscriptionFromProfile").children('option:selected').val();
                if (prescriptionId === '') {
                    _this.showSingalErrorMessage(prescriptionErrorContainer.improtPrescriptionInfo, 'importPrescriptionError', prescriptionErrorContainer.improtPrescriptionTitle);
                } else {
                    var _windowId = $("#_windowId").val();
                    var rad = Math.floor((Math.random() * 1000) + 1);
                    $.get("/misc/ajax/productOrder/importPrescription.jsp", {
                        'prescriptionId': prescriptionId,
                        '_windowid': _windowId,
                        "rad": rad
                    }, function(data) {
                        _this.editSelectedAddonSection(1);
                    });
                }

            }
        },

        selectPrescriptionFromOrder: function(orderId, obj) {

            if ($(".checkout").length > 0) {
                $(obj).attr('onclick', 'return false;');
                var $importPre = $('.importPre');
                $.ajax({
                    url: '/cartridges/productOrder/importPrescript/step03.jsp',
                    data: {
                        "orderId": orderId
                    },
                    success: function(str) {
                        $importPre.append(str);
                        $importPre.find('.step02').hide();

                        /* calculate the carousel real height */
                        var realHeight = 0;
                        $('.prescriptCarousel .carouselContent li.carouselItem').each(function() {
                            var height = $(this).outerHeight();
                            if (height > realHeight) {
                                realHeight = height;
                            }
                        });

                        $('.prescriptCarousel .carouselContent').css('height', realHeight + 'px');

                        /* resize popup */
                        $importPre.find('.popResize').trigger('click');

                        /* carousel */
                        $('.importPre .prescriptCarousel').each(function() {
                            var $preCarousel = $(this);
                            $(this).acsCarousel({
                                sliderLoop: false,
                                sliderMoveNum: 1,
                                sliderList: 'carouselContent',
                                sliderButtonCov: 'carouselButton',
                                sliderButtonPrev: 'carouselPrev',
                                sliderButtonNext: 'carouselNext',
                                sliderCanDrag: false,
                                callBack: function(obj, setting) {
                                    setting.sliderContainer.find("." + setting.sliderButtonCov).find('a.carouselNext').on('mouseup', function(e) {
                                        var currentIndex = parseInt($('.importPre .tipMsg span').text(), 10);
                                        if (currentIndex + 1 <= $preCarousel.find('ul > li').length) {
                                            $('.importPre .tipMsg span').text(currentIndex + 1);
                                        }
                                    });

                                    setting.sliderContainer.find("." + setting.sliderButtonCov).find('a.carouselPrev').on('mouseup', function(e) {
                                        var currentIndex = parseInt($('.importPre .tipMsg span').text(), 10);
                                        if (currentIndex - 1 > 0) {
                                            $('.importPre .tipMsg span').text(currentIndex - 1);
                                        }
                                    });

                                }
                            });
                        });
                        $(obj).attr("onclick", "selectPrescriptionFromOrder('" + orderId + "',this)");
                    },
                    error: function() {}
                });
            }
        },

        importPrescriptionFromOrder: function(commerceItemId) {

            if ($(".checkout").length > 0) {
                $('#pop_importPre').prev('.popupLayerBg').detach();
                $('#pop_importPre').detach();
                var _windowId = $("#_windowId").val();
                var rad = Math.floor((Math.random() * 1000) + 1);
                $.get("/misc/ajax/productOrder/importPrescription.jsp", {
                    'commerceItemId': commerceItemId,
                    '_windowid': _windowId,
                    "rad": rad
                }, function(data) {
                    _this.editSelectedAddonSection(1);
                });
            }
        },

        validatePD: function(singalPd) {

            if ($(".checkout").length > 0) {
                if (singalPd) {
                    $("#pdSingle").parent().parent().find("span[class='select']").removeClass("error");
                } else {
                    $("#pdLeft").parent().removeClass("error");
                    $("#pdRight").parent().removeClass("error");
                }
                _this.getPrescription();
                for (var validateFunction in PrescriptionRules) {
                    if (PrescriptionRules) {
                        var functionBody = PrescriptionRules[validateFunction];
                        if (jQuery.isFunction(functionBody)) {
                            var targetElementName = PrescriptionRules[validateFunction][elementName];
                            var targetEventName = PrescriptionRules[validateFunction][eventName];
                            if (typeof(targetEventName) !== 'undefined' && typeof(targetElementName) !== 'undefined') {
                                if (targetElementName === 'pdSingle' && targetEventName === 'change') {
                                    var callFunction = "PrescriptionRules." + validateFunction + "(commerceItemInfo)";
                                    var evalValue = eval(callFunction);
                                    if (evalValue !== 'success') {
                                        var failedresult = getMessage(PrescriptionRules, validateFunction, evalValue);
                                        if (singalPd) {
                                            $("#pdSingle").parent().parent().find("span[class='select']").addClass("error");
                                        } else {
                                            $("#pdLeft").parent().parent().find("span[class='select']").addClass("error");
                                            $("#pdRight").parent().parent().find("span[class='select']").addClass("error");
                                        }
                                        _this.showSingalErrorMessage(failedresult.message, 'PDErrorSection', prescriptionErrorContainer.pdErrorTitle);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        removeVoteError: function(revieweeId) {

            if ($(".checkout").length > 0) {
                $('#' + revieweeId + '_emailAddress').attr('class', 'textInput');
            }
        },

        popup_artChange: function() {

            var persImageSkuId = $('#persImageSkuId').children('option:selected').val();
            if (persImageSkuId === '') {
                _this.showSingalErrorMessage(prescriptionErrorContainer.artColorInfo, 'perscriptionImageColor', prescriptionErrorContainer.artColorTitle);
                return;
            }
            var src = $("#popup_artChange").attr("layerSrc") + "?skuId=" + persImageSkuId;
            $("#popup_artChange").acsPopup({
                popMsg: $("#popup_artChangeDom").html(),
                popupTitle: $("#popup_artChange").attr("layerTitle"),
                maxWidth: 650,
                maxHeight: 550,
                popupID: 'changeArtPop',
                callBack: function(setting) {
                    if ($.touchUtil.isTouch) {
                        $('.' + setting.popupLayerContent).find('.artBox').css('overflow', 'auto');
                    } else {
                        $('.' + setting.popupLayerContent).find('.artBox').acsScrollBar({
                            scrollContainer: $('.' + setting.popupLayerContent).find('.artBox')
                        });
                    }

                    $('.' + setting.popupLayerContent).find('.artBox a').on('click', function(e) {
                        e.preventDefault();
                        var imgSrc = $(this).find('img').attr('src');
                        var skuId = $(this).find('img').attr('skuId');
                        var task = $(this).attr('task');
                        if (task === 'on') {
                            return;
                        }
                        $.get("/misc/ajax/productOrder/imageColor.jsp", {
                            'persImageSkuId': skuId
                        }, function(data) {
                            $("#imageCodeSection").html($(data).find("#mainSection").html());

                        });
                        $artShow = $('.personalization .artOutside .artShow');
                        $artShow.find('img').attr('src', imgSrc).show();
                        $("#persImageCode").val(imgSrc);
                        $artShow.find('span').remove();
                        _this.acsPopup.popupLayerClose(setting);
                    });
                }
            });

        },

        cleanInputError: function() {

            $("#outsideText").on("keydown", function(e) {
                $("#outsideText").removeClass("error");
            });
            $("#insideText").on("keydown", function(e) {
                $("#insideText").removeClass("error");
            });
            $('#prescriptionSavedName').on("keydown", function(e) {
                $("#prescriptionSavedName").removeClass("error");
            });
        },

        quickViewOrderGlass: function(formId) {

            var form = $("#" + formId);
            form.submit();
        },

        attachFaceIdToOrder: function() {

            $("#orderGlasses").hover(function() {
                var data,
                    dataObj = $('.frameFit:first').find('.currentItem .carouselItem.recently');
                if ($(dataObj).find('var').size() > 0) {
                    data = $(dataObj).find('var').text();
                    data = $.parseJSON(data);
                } else {
                    dataObj = $(dataObj).find('a');
                    data = {
                        "faceId": dataObj.data('faceid'),
                        "systemFace": dataObj.data('systemface'),
                        "pd": dataObj.data('pd'),
                        "heroImg": dataObj.data('heroimg'),
                        "zoomImg": dataObj.data('zoomimg')
                    };
                }
                var faceId = data.faceId;
                var curHref = $(this).attr('href');
                if (curHref.indexOf('?') < 0) {
                    $(this).attr('href', (curHref + "?curFaceId=" + faceId));
                    return;
                }

                var faceIdIndex = curHref.search(/curFaceId/ig);
                if (faceIdIndex < 0) {
                    $(this).attr('href', (curHref + "&curFaceId=" + faceId));
                } else {
                    $(this).attr('href', curHref.replace(/curFaceId=[\w\d]+/ig, 'curFaceId=' + faceId));
                }
            }, function() {});

        },

        checkInventory: function() {

            //loading layer
            if ($('#addOnsInfo .addToCart').length) {
                $('#addOnsInfo .addToCart').append('<div style="top:10px;left:0px;" class="loading"><span></span></div>');
            }
            //verify if terms and conditions are checked
            var fillAllOption = _this.validatePersonalization();
            if (!fillAllOption) {
                $('#addOnsInfo .addToCart .loading').remove();
                return;
            }

            var cliponParamter = {};
            var selectedClipons = $('select[class="select150"]');
            selectedClipons.each(function() {
                var id = $(this).attr('id');
                var value = $(this).children('option:selected').val();
                if (value !== '') {
                    cliponParamter["clipon" + id] = value;
                }
            });
            var rxQuantity = $("#rxQuantity").children('option:selected').val();
            var skuId = $("#selectedMainSku").val();
            cliponParamter.skuId = skuId;
            cliponParamter.rxQuantity = rxQuantity;
            $.get("/misc/ajax/productOrder/checkRXInventory.jsp", cliponParamter, function(data) {
                if ($.trim(data) === '') {
                    // add to cart
                    //			addToShoppingCart();
                    var form = $("#addonFormId");
                    form.submit();
                } else {
                    $('#addOnsInfo .addToCart .loading').remove();

                    // show the error message
                    var result = $.parseJSON($.trim(data));
                    if (result.rxQuantity !== undefined) {
                        $("#rxQuantity").closest('span').addClass('error');
                        $("#rxQuantity").parent().find('.qtyError').remove();
                        $("#rxQuantity").after("<span class=\"qtyError\">" + result.rxQuantity + "</span>");
                    }
                    for (var key in result) {
                        if (key !== "rxQuantity") {
                            $("#" + key).closest('span').addClass('error');
                            $("#" + key + "qtyError").remove();
                            $("#" + key).closest('span').after("<p id=\"" + key + "qtyError\" class=\"error qtyError\">" + result[key] + "</p>");
                        }
                    }

                    //animation of scrolling to error position
                    var errArray = $('.error'),
                        scrollTop = $(document).scrollTop(),
                        minOffset = scrollTop;

                    if (errArray.size() > 0) {
                        for (var index = 0; index < errArray.size(); index++) {
                            if (minOffset > $(errArray[index]).offset().top) {
                                minOffset = $(errArray[index]).offset().top;
                            }
                        }

                        $("html, body").animate({
                            scrollTop: minOffset
                        }, '500');
                    }

                }
            });
        }
    };
    console.log(_this);
    return _this;
})();

$(document).ready(function() {
    "use strict";
    console.log('type--->', typeof checkInventory);
    console.log(PrescriptionRules.validateSingleMinPDForFrame.error);
    var prescriptionSelectBox = $("#selectedPrescriptionSelectBox").val();
    var prescriptionRadio = $("#selectedPrescriptionRadio").val();
    var prescriptionCheckBox = $("#selectedPrescriptionCheckBox").val();
    var prescriptionText = $("#selectedPrescriptionText").val();
    zenni.prescription.selectedPrescriptionSelectBox = $.parseJSON(prescriptionSelectBox);
    zenni.prescription.selectedPrescriptionRadio = $.parseJSON(prescriptionRadio);
    zenni.prescription.selectedPrescriptionCheckBox = $.parseJSON(prescriptionCheckBox);
    zenni.prescription.selectedPrescriptionText = $.parseJSON(prescriptionText);
    zenni.prescription.processOptions();
    zenni.prescription.processDefaultValue();
    zenni.prescription.processSelectedPrescription();
    zenni.prescription.bindEvent();
    zenni.prescription.addLensToOrderSummary();
    zenni.prescription.addTintToOrderSummary();
    zenni.prescription.calcPrice();
    zenni.prescription.attachFaceIdToOrder();
    zenni.prescription.cleanInputError();
    $.ajaxSetup({
        async: false
    });
});