(function(a) {
    livelo.checkout = {
        container: "#checkout",
        init: function() {
            try {
                livelo.common.ajaxLoader(), livelo.checkout.formSubmits(), livelo.checkout.setMasks(), livelo.checkout.panelSlide(), livelo.checkout.deleteSavedAddress(), livelo.checkout.MakePrimaryCardNo(), livelo.checkout.continueCheckout(), livelo.checkout.selectCardType(), livelo.checkout.mergeCart(), livelo.checkout.makePrimaryAddress(), livelo.checkout.manageCVV(), livelo.checkout.optInstallmentType(), livelo.checkout.setInstallmentValue(), livelo.checkout.browserBackButton(),
                    livelo.checkout.setPaymentMethodStatus(), livelo.checkout.onClickOAMRadio(), livelo.checkout.OAMRecapchaButtonHadlers(), livelo.checkout.redirectToCart(), livelo.checkout.changeCardExpiry(), livelo.checkout.onLoad()
            } finally {
                livelo.common.removeAjaxLoader();
                var b = a("[data-enable\x3dtrue]");
                b.removeClass("btn-disabled");
                b.prop("disabled", !1)
            }
        },
        onLoad: function() {
            var b = a("#mdlOAMReCapcha");
            b.length && b.modal("show");
            b = a(".postCodePrimary");
            b.length && b.focus();
            b = a(".postCodeAddressBook");
            b.length && b.focus()
        },
        redirectToCart: function() {
            "true" == a("#isRedirect").val() && (window.location = a("#cartRedirectUrl").val())
        },
        onClickOAMRadio: function() {
            a(".js-communication-select").click(function(b) {
                a("#mdlOAMReCapcha").find(".choices").find("select").attr("disabled", !0);
                a("#mdlOAMReCapcha").find(".choices").find("select").removeClass("js-active-select");
                a(this).closest(".choices").find("select").attr("disabled", !1);
                a(this).closest(".choices").find("select").addClass("js-active-select");
                a("#recapcha-comm-type").val(a(this).closest(".choices").attr("data-comm-type"));
                a("#recapcha-comm-number").val(a(this).closest(".choices").find("select option:selected").val())
            });
            a("#mdlOAMReCapcha").find("select").change(function(b) {
                b = a("option:selected", this);
                a("#recapcha-comm-number").val(b.val())
            });
            a("#recapcha-comm-number").val(a("div[data-comm-type\x3d'sms']").find("select option:selected").val())
        },
        browserBackButton: function() {
            0 < a("#orderConfirmRedirectURL").length && (window.history && window.history.pushState) && (window.history.pushState(null, null, "./orderConfirmation.jsp"),
                a(window).on("popstate", function() {
                    window.history.pushState(null, null, "./orderConfirmation.jsp")
                }))
        },
        getRequestCode: function() {
            var b = a("#recapcha-comm-number").val(),
                c = a("#recapcha-comm-type").val();
            a.ajax({
                url: livelo.urls.context + "/secure/checkout/includes/createTransactionTokenAjax.jsp?ph_num\x3d" + b + "\x26comm_type\x3d" + c,
                type: "POST",
                dataType: "json",
                success: function(b) {
                    b.error ? (a("#mdlOAMReCapcha").find(".global-error").show(), a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(b.errorMessage)) :
                        (a(".js-init-content").addClass("hider"), a(".js-authorize-code-entry").removeClass("hider"))
                },
                error: function(b) {
                    a("#mdlOAMReCapcha").find(".global-error").show();
                    a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html(b.responseText)
                }
            })
        },
        resetOAMModal: function() {
            a("#mdlOAMReCapcha").find(".global-error").hide();
            a("#mdlOAMReCapcha").find("#verification-code").val("")
        },
        OAMRecapchaButtonHadlers: function() {
            a(".js-oam-enviar").click(function(a) {
                livelo.checkout.resetOAMModal();
                livelo.checkout.getRequestCode()
            });
            a(".js-solicitar-enviar").click(function(a) {
                livelo.checkout.resetOAMModal();
                livelo.checkout.getRequestCode()
            });
            a(".js-choose-another-ph").click(function(b) {
                livelo.checkout.resetOAMModal();
                a(".js-authorize-code-entry").addClass("hider");
                a(".js-init-content").removeClass("hider")
            });
            a(".js-verify-enviar").click(function(a) {
                livelo.checkout.verifyRequestCode()
            })
        },
        verifyRequestCode: function() {
            var b = a("#verification-code").val(),
                c = livelo.urls.context + "/secure/checkout/includes/validateTransactionTokenAjax.jsp";
            if (0 === a.trim(b).length) a("#mdlOAMReCapcha").find(".error-container").find(".error-message").html("VocÃª nÃ£o inseriu um cÃ³digo");
            else {
                var d = a("#mdlOAMReCapcha");
                a.post(c, {
                    verification_code: b
                }).done(function(a) {
                    a.error ? (d.find(".global-error").show(), d.find(".error-container").find(".error-message").html(a.errorMessage)) : d.modal("hide")
                }).fail(function(a, b, c) {
                    d.find(".global-error").show();
                    d.find(".error-container").find(".error-message").html(e.responseText)
                })
            }
        },
        onClickChooseAnotherPh: function() {
            a(".js-choose-another-ph").click(function(b) {
                a(".js-authorize-code-entry").addClass("hider");
                a(".js-init-content").removeClass("hider")
            })
        },
        changeCardExpiry: function() {
            a("#drpCardMonth, #drpCardyear").on("change", function() {
                a("#checkout .global-error").is(":hidden") || a("#form-chekout-newpayment").valid()
            })
        },
        getCreditCardExpiry: function() {
            var b = parseInt(a("#drpCardMonth").val()),
                c = a("#drpCardyear").val(),
                b = 10 > parseInt(b) ? "0" + b : b;
            a(".bp-sop-cardexpirationdate").val(b + "/" + c);
            console.log("card value " + b + "/" + c)
        },
        checkAccessToken: function(b) {
            a.ajax({
                url: livelo.urls.context + "/secure/checkout/includes/queryAccessTokenAjax.jsp",
                type: "POST",
                dataType: "JSON",
                success: function(c) {
                    if ("" != c.accessToken || "" != c.environment) a("#accessToken").val(c.accessToken), a("#environment").val(c.environment), livelo.checkout.sendCardData(function() {
                        b && b()
                    })
                },
                error: function(a) {
                    console.log("error in checkAccessToken()")
                }
            })
        },
        sendCardData: function(b) {
            var c = {
                accessToken: document.getElementById("accessToken").value,
                onSuccess: function(c) {
                    a("#paymentToken").val(c.PaymentToken);
                    b && b()
                },
                onError: function(b) {
                    a(".global-error").find(".error-message").html(b.Text);
                    a(".global-error").show();
                    a("#form-chekout-newpayment").valid()
                },
                onInvalid: function(b) {
                    for (var c = 0; c < b.length; c++) a(".global-error").find(".error-message").html(b[c].Message), a(".global-error").show();
                    a("#form-chekout-newpayment").valid()
                },
                environment: document.getElementById("environment").value,
                language: "PT"
            };
            bpSop_silentOrderPost(c)
        },
        setInstallmentValue: function() {
            a("#drppaywithInstallments").on("change", function() {
                a("#form-chekout-payment, #form-chekout-newpayment").find("#noOfPayments").val(a(this).val())
            })
        },
        optInstallmentType: function() {
            a("input[name\x3d'optpaymentOption']").on("click", function() {
                console.log("---- " + a(this).data("value"));
                "installments" == a(this).data("value") ? a(".installment-block").show() : a(".installment-block").hide()
            })
        },
        manageCVV: function() {
            a("input[name\x3d'optAddress']").each(function() {
                var b = a("input[name\x3d'optAddress']").closest(".address").find(".secure-code-block");
                a(this).on("click", function() {
                    a(b).hasClass("hidden") && a(b).addClass("hidden");
                    a(this).closest(".address").find(".secure-code-block").removeClass("hidden")
                })
            })
        },
        mergeCart: function() {
            "true" == a("#displayFlag").val() ? a("#mdlMergeCart").modal("show") : a("#mdlMergeCart").modal("hide");
            a(".mergecart-modal").on("click", ".mergecart-row-item .merge-action", function() {
                a(this).closest(".mergecart-row-item").find(".mergeAction").val(a(this).data("value"));
                a("#mergeItemIndex").val(a(this).closest(".mergecart-row-item").find(".itemIndex").val());
                a("#itemAction").val(a(this).data("value"));
                livelo.checkout.manageMergeCart()
            })
        },
        manageMergeCart: function() {
            a("#mergeItemForm").ajaxSubmit({
                url: livelo.urls.context +
                    "/secure/checkout/includes/mergeCartContents.jsp",
                type: "POST",
                dataType: "html",
                success: function(b) {
                    a("#dynamicData").load(livelo.urls.context + "/secure/checkout/includes/mergeCartContents.jsp", function() {
                        "true" == a("#displayFlag").val() ? a("#mdlMergeCart").modal("show") : (a("#dynamicOrderSummary").load(livelo.urls.context + "/secure/checkout/orderSummary.jsp"), a("#pointsBalaneRedirect").load(livelo.urls.context + "/secure/checkout/pointsBalanceValidationRedirection.jsp", function() {
                            a("#ajaxLoaderImage").show();
                            a("#mdlMergeCart").modal("hide");
                            "true" == a("#isRedirect").val() && (a("#ajaxLoaderImage").hide(), window.location = a("#cartRedirectUrl").val())
                        }))
                    })
                },
                error: function(b) {
                    a("#global-error .error-message").html(b.message);
                    a("#mdlMergeCart").modal("show")
                }
            })
        },
        submitPayment: function() {
            var b = a("#form-chekout-newpayment");
            b.valid() && b.submit()
        },
        continueCheckout: function() {
            a(".btn-continue").on("click", function() {
                if (0 == a("#paymentMethodList").length && a("#paymentAddNewAddress").hasClass("collapse")) return !1;
                a("#paymentAddNewAddress").is(":hidden") ?
                    (a("#form-chekout-newpayment").validate(), a("input[name\x3d'optAddress']:checked").closest(".radio").find("input[name\x3d'txtCardSecureCode']").val(), a("#cvvId").val(a("input[name\x3d'optAddress']:checked").closest(".radio").find("input[name\x3d'txtCardSecureCode']").val()), console.log("cvv id" + a("#cvvId").val()), a("#form-chekout-payment").submit()) : (a("#form-chekout-payment").validate(), livelo.checkout.getCreditCardExpiry(), livelo.checkout.checkAccessToken(livelo.checkout.submitPayment))
            })
        },
        MakePrimaryCardNo: function() {
            a(".primary").on("click",
                function(b) {
                    b.preventDefault();
                    a(this).closest("form").find("#makePrimary").val(a(this).data("cardkey"));
                    a("input[name\x3d'txtCardSecureCode']").removeAttr("data-rule-required");
                    a(this).closest("form").submit()
                })
        },
        makePrimaryAddress: function() {
            a(".make-primary-address").on("click", function(b) {
                b.preventDefault();
                a("#form-make-primary").find("#addressId").val(a(this).data("addresskey"));
                a("#form-make-primary").submit()
            })
        },
        setMasks: function() {
            0 < a("[name\x3dtxtCPF]").length && a("[name\x3dtxtCPF]").mask("999.999.999-99");
            0 < a("#txtrphone").length && a("#txtrphone").mask("9999-9999");
            0 < a("#txtcphone").length && a("#txtcphone").mask("9999-9999");
            0 < a("#txtmphone").length && a("#txtmphone").mask("9999-9999");
            a(".postCodePrimary").length && 5 < a(".postCodePrimary").val().length && a(".postCodePrimary").mask("99999?-999");
            a(".postCodeAddressBook").length && a(".postCodeAddressBook").val().length && a(".postCodeAddressBook").mask("99999?-999");
            if (0 < a(".pagementoCardNumber").length) {
                var b = a(".pagementoCardNumber").text(),
                    b = b.substr(b.length -
                        4, 4);
                a(".pagementoCardNumber").text(b)
            }
        },
        formSubmits: function() {
            function b() {
                a(".global-error").find(".error-message").html(a("#globalErrorText").val());
                a(".global-error").show()
            }
            0 < a("#form-chekout-payment").length && a("#form-chekout-payment").validate({
                invalidHandler: function() {
                    b()
                }
            });
            0 < a("#form-chekout-newpayment").length && a("#form-chekout-newpayment").validate({
                invalidHandler: function() {
                    b()
                }
            });
            0 < a("#mergeItemForm").length && a("#mergeItemForm").validate({
                submitHandler: function() {
                    livelo.checkout.manageMergeCart()
                }
            });
            a("#btnContinuar").on("click", function() {
                a("#continue").trigger("click")
            });
            a("#btnSummaryContinuar").on("click", function() {
                a("#continue").trigger("click")
            });
            a(".selectPrimaryAddress").on("click", function(b) {
                b.preventDefault();
                b = a(this).data("addressid");
                a("#address").val(b);
                a("#mdlMakePrimary").modal("show")
            });
            a(".global-promo").find("#hide").on("click", function(b) {
                a(".global-promo").hide()
            })
        },
        selectCardType: function() {
            function b(a) {
                a = a.replace(/[^\d]/g, "");
                return a.match(/^(636368|438935|504175|451416|636297|509074)/) ||
                    a.match(/^50904[0,2-3,5-9]{1}/) || a.match(/^50905[0-2]{1}/) || a.match(/^50906[4,6-9]{1}/) || a.match(/^(5067|4576|4011)[0-9]{2}/) ? "EC" : a.match(/^5[0-5][0-9]{4}/) ? "MC" : a.match(/^4[0-9]{5}/) ? "VI" : a.match(/^3[47][0-9]{3}/) ? "AX" : "UNKNOWN"
            }!a("#checkout .global-error").is(":hidden") && null !== a("#cardType") && (a("#cardType").val(), a(".card-type li").each(function() {
                a(this).attr("value") === a("#cardType").val() && a(this).addClass("selected")
            }));
            a("#txtCreditCardNo").keyup(function() {
                var c = "";
                a(this).hasClass("error") &&
                    a("#txtCreditCardNo").valid();
                6 <= a(this).val().length && (c = b(a(this).val()));
                a(".card-type li").each(function() {
                    a(this).find(".rdCardtype").prop("checked", !1);
                    a(this).data("cardabbr") === c ? (a(this).addClass("selected"), a(this).find(".rdCardtype").trigger("click"), a(this).closest("form").find("#cardType").val(a(this).attr("value")), a(this).closest("form").find("#cardTypeAbbr").val(a(this).data("cardabbr")), a(".btn-continue").removeAttr("disabled")) : "UNKNOWN" === c ? (a(this).removeClass("selected"), a(".btn-continue").attr("disabled",
                        "disabled")) : a(this).removeClass("selected")
                });
                ("EC" == c || "MC" == c || "VI" == c) && 16 == a(this).val().length && a("#txtCreditCardNo").valid();
                "AX" == c && 15 == a(this).val().length && a("#txtCreditCardNo").valid();
                "UNKNOWN" == c && 6 == a(this).val().length && a("#txtCreditCardNo").valid()
            })
        },
        setPaymentMethodStatus: function() {
            a("#chkSave").on("click", function() {
                this.checked ? a("#saveNewCard").val("true") : a("#saveNewCard").val("false")
            })
        },
        deleteSavedAddress: function() {
            a(".remove").on("click", function(b) {
                b.preventDefault();
                a("#mdlDeletePaymentMethod").find(".removecardkey").val(a(this).closest(".addres-details").find(".removecardkey").val());
                console.log("cardno", a("#mdlDeletePaymentMethod").find(".removecardkey").val());
                a("#mdlDeletePaymentMethod").find("address").html(a(this).closest(".addres-details").find(".address-data").html());
                a("#mdlDeletePaymentMethod").find("input[type\x3dradio]").remove();
                a("#mdlDeletePaymentMethod").modal("show")
            })
        },
        panelSlide: function() {
            a("#paymentAddNewAddress").collapse({
                toggle: !1
            });
            a("#paymentMethodList").collapse({
                toggle: !1
            });
            if (1 <= a(".add-new-address").length) a(".add-new-address").on("click", function() {
                a("#paymentMethodList").collapse("toggle")
            });
            0 == a("#paymentMethodList").length && (a(".btn-continue").prop("disabled", !0), a("#paymentAddNewAddress").collapse("toggle"));
            1 <= a(".saved-payment").length && (a("#paymentMethodList").on("hidden.bs.collapse", function() {
                a("#txtCreditCardNo").val().trim() || a(".btn-continue").prop("disabled", !0)
            }), a("#paymentMethodList").on("shown.bs.collapse", function() {
                a(".btn-continue").prop("disabled", !1)
            }), a(".saved-payment").on("click", function() {
                a("#paymentAddNewAddress").collapse("toggle")
            }), 0 < a(".payment-page-error-span").length && "" !== a("#txtCreditCardNo").val() && (a(".btn-continue").prop("disabled", !0), a("#paymentAddNewAddress").removeClass("collapse"), a("#paymentMethodList").addClass("collapse").removeClass("in")))
        }
    };
    livelo.common.modules.push(livelo.checkout.init)
})(jQuery);
! function(d) {
    "function" == typeof define && define.amd ? define(["jquery"], d) : d("object" == typeof exports ? require("jquery") : jQuery)
}(function(d) {
    var A, q = navigator.userAgent,
        F = /iphone/i.test(q),
        G = /chrome/i.test(q),
        B = /android/i.test(q);
    d.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    };
    d.fn.extend({
        caret: function(d, g) {
            var e;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof d ? (g = "number" == typeof g ? g : d, this.each(function() {
                this.setSelectionRange ?
                    this.setSelectionRange(d, g) : this.createTextRange && (e = this.createTextRange(), e.collapse(!0), e.moveEnd("character", g), e.moveStart("character", d), e.select())
            })) : (this[0].setSelectionRange ? (d = this[0].selectionStart, g = this[0].selectionEnd) : document.selection && document.selection.createRange && (e = document.selection.createRange(), d = 0 - e.duplicate().moveStart("character", -1E5), g = d + e.text.length), {
                begin: d,
                end: g
            })
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(w, g) {
            var e, x, h, u, n, q, l, C;
            return !w &&
                0 < this.length ? (e = d(this[0]), (e = e.data(d.mask.dataName)) ? e() : void 0) : (g = d.extend({
                    autoclear: d.mask.autoclear,
                    placeholder: d.mask.placeholder,
                    completed: null
                }, g), x = d.mask.definitions, h = [], u = l = w.length, n = null, d.each(w.split(""), function(d, g) {
                    "?" == g ? (l--, u = d) : x[g] ? (h.push(RegExp(x[g])), null === n && (n = h.length - 1), u > d && (q = h.length - 1)) : h.push(null)
                }), this.trigger("unmask").each(function() {
                    function e() {
                        if (g.completed) {
                            for (var b = n; q >= b; b++)
                                if (h[b] && k[b] === r(b)) return;
                            g.completed.call(c)
                        }
                    }

                    function r(b) {
                        return g.placeholder.charAt(b <
                            g.placeholder.length ? b : 0)
                    }

                    function s(b) {
                        for (; ++b < l && !h[b];);
                        return b
                    }

                    function D(b, a) {
                        var p, f;
                        if (!(0 > b)) {
                            p = b;
                            for (f = s(a); l > p; p++)
                                if (h[p]) {
                                    if (!(l > f && h[p].test(k[f]))) break;
                                    k[p] = k[f];
                                    k[f] = r(f);
                                    f = s(f)
                                }
                            v();
                            c.caret(Math.max(n, b))
                        }
                    }

                    function H(b) {
                        var a, p, c;
                        a = b;
                        for (b = r(b); l > a; a++)
                            if (h[a]) {
                                if (p = s(a), c = k[a], k[a] = b, !(l > p && h[p].test(c))) break;
                                b = c
                            }
                    }

                    function I() {
                        var b = c.val(),
                            a = c.caret();
                        if (b.length < C.length) {
                            for (t(!0); 0 < a.begin && !h[a.begin - 1];) a.begin--;
                            if (0 === a.begin)
                                for (; a.begin < n && !h[a.begin];) a.begin++
                        } else
                            for (t(!0); a.begin <
                                l && !h[a.begin];) a.begin++;
                        c.caret(a.begin, a.begin);
                        e()
                    }

                    function E() {
                        t();
                        c.val() != z && c.change()
                    }

                    function y(b, a) {
                        var c;
                        for (c = b; a > c && l > c; c++) h[c] && (k[c] = r(c))
                    }

                    function v() {
                        c.val(k.join(""))
                    }

                    function t(b) {
                        var a, d, f, e = c.val(),
                            m = -1;
                        for (f = a = 0; l > a; a++)
                            if (h[a]) {
                                for (k[a] = r(a); f++ < e.length;)
                                    if (d = e.charAt(f - 1), h[a].test(d)) {
                                        k[a] = d;
                                        m = a;
                                        break
                                    }
                                if (f > e.length) {
                                    y(a + 1, l);
                                    break
                                }
                            } else k[a] === e.charAt(f) && f++, u > a && (m = a);
                        return b ? v() : u > m + 1 ? g.autoclear || k.join("") === J ? (c.val() && c.val(""), y(0, l)) : v() : (v(), c.val(c.val().substring(0,
                            m + 1))), u ? a : n
                    }
                    var c = d(this),
                        k = d.map(w.split(""), function(b, a) {
                            return "?" != b ? x[b] ? r(a) : b : void 0
                        }),
                        J = k.join(""),
                        z = c.val();
                    c.data(d.mask.dataName, function() {
                        return d.map(k, function(b, a) {
                            return h[a] && b != r(a) ? b : null
                        }).join("")
                    });
                    c.one("unmask", function() {
                        c.off(".mask").removeData(d.mask.dataName)
                    }).on("focus.mask", function() {
                        if (!c.prop("readonly")) {
                            clearTimeout(A);
                            var b;
                            z = c.val();
                            b = t();
                            A = setTimeout(function() {
                                v();
                                b == w.replace("?", "").length ? c.caret(0, b) : c.caret(b)
                            }, 10)
                        }
                    }).on("blur.mask", E).on("keydown.mask",
                        function(b) {
                            if (!c.prop("readonly")) {
                                var a, d, f, e = b.which || b.keyCode;
                                C = c.val();
                                if (8 === e || 46 === e || F && 127 === e) {
                                    a = c.caret();
                                    d = a.begin;
                                    f = a.end;
                                    if (0 === f - d) {
                                        if (46 !== e)
                                            for (a = d; 0 <= --a && !h[a];);
                                        else a = f = s(d - 1);
                                        d = a;
                                        f = 46 === e ? s(f) : f
                                    }
                                    y(d, f);
                                    D(d, f - 1);
                                    b.preventDefault()
                                } else 13 === e ? E.call(this, b) : 27 === e && (c.val(z), c.caret(0, t()), b.preventDefault())
                            }
                        }).on("keypress.mask", function(b) {
                        if (!c.prop("readonly")) {
                            var a, g, f, n = b.which || b.keyCode,
                                m = c.caret();
                            if (!b.ctrlKey && !b.altKey && !(b.metaKey || 32 > n) && n && 13 !== n) {
                                if (0 !== m.end -
                                    m.begin && (y(m.begin, m.end), D(m.begin, m.end - 1)), a = s(m.begin - 1), l > a && (g = String.fromCharCode(n), h[a].test(g)))(H(a), k[a] = g, v(), f = s(a), B) ? setTimeout(function() {
                                    d.proxy(d.fn.caret, c, f)()
                                }, 0) : c.caret(f), m.begin <= q && e();
                                b.preventDefault()
                            }
                        }
                    }).on("input.mask paste.mask", function() {
                        c.prop("readonly") || setTimeout(function() {
                            var b = t(!0);
                            c.caret(b);
                            e()
                        }, 0)
                    });
                    G && B && c.off("input.mask").on("input.mask", I);
                    t()
                }))
        }
    })
});
