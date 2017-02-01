"function" !== typeof Object.create && (Object.create = function(c) {
    function e() {}
    e.prototype = c;
    return new e
});
(function(c) {
    var e = {
        init: function(a, b) {
            var d = this;
            d.elem = b;
            d.$elem = c(b);
            d.imageSrc = d.$elem.data("zoom-image") ? d.$elem.data("zoom-image") : d.$elem.attr("src");
            d.options = c.extend({}, c.fn.elevateZoom.options, a);
            d.options.tint && (d.options.lensColour = "none", d.options.lensOpacity = "1");
            "inner" == d.options.zoomType && (d.options.showLens = !1);
            d.$elem.parent().removeAttr("title").removeAttr("alt");
            d.zoomImage = d.imageSrc;
            d.refresh(1);
            c("#" + d.options.gallery + " a").click(function(a) {
                d.options.galleryActiveClass &&
                    (c("#" + d.options.gallery + " a").removeClass(d.options.galleryActiveClass), c(this).addClass(d.options.galleryActiveClass));
                a.preventDefault();
                d.zoomImagePre = c(this).data("zoom-image") ? c(this).data("zoom-image") : c(this).data("image");
                d.swaptheimage(c(this).data("image"), d.zoomImagePre);
                return !1
            })
        },
        refresh: function(a) {
            var b = this;
            setTimeout(function() {
                b.fetch(b.imageSrc)
            }, a || b.options.refresh)
        },
        fetch: function(a) {
            var b = this,
                d = new Image;
            d.onload = function() {
                b.largeWidth = d.width;
                b.largeHeight = d.height;
                b.startZoom();
                b.currentImage = b.imageSrc;
                b.options.onZoomedImageLoaded()
            };
            d.src = a
        },
        startZoom: function() {
            var a = this;
            a.nzWidth = a.$elem.width();
            a.nzHeight = a.$elem.height();
            a.nzOffset = a.$elem.offset();
            a.widthRatio = a.largeWidth / a.options.zoomLevel / a.nzWidth;
            a.heightRatio = a.largeHeight / a.options.zoomLevel / a.nzHeight;
            "window" == a.options.zoomType && (a.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " + String(a.options.zoomWindowBgColour) + ";width: " + String(a.options.zoomWindowWidth) +
                "px;height: " + String(a.options.zoomWindowHeight) + "px;float: left;background-size: " + a.largeWidth / a.options.zoomLevel + "px " + a.largeHeight / a.options.zoomLevel + "px;display: none;z-index:100px;border: " + String(a.options.borderSize) + "px solid " + a.options.borderColour + ";background-repeat: no-repeat;position: absolute;");
            "inner" == a.options.zoomType && (a.zoomWindowStyle = "overflow: hidden;background-position: 0px 0px;width: " + String(a.nzWidth) + "px;height: " + String(a.nzHeight) + "px;float: left;display: none;cursor:" +
                a.options.cursor + ";px solid " + a.options.borderColour + ";background-repeat: no-repeat;position: absolute;");
            "window" == a.options.zoomType && (lensHeight = a.nzHeight < a.options.zoomWindowWidth / a.widthRatio ? a.nzHeight : String(a.options.zoomWindowHeight / a.heightRatio), lensWidth = a.largeWidth < a.options.zoomWindowWidth ? a.nzHWidth : a.options.zoomWindowWidth / a.widthRatio, a.lensStyle = "background-position: 0px 0px;width: " + String(a.options.zoomWindowWidth / a.widthRatio) + "px;height: " + String(a.options.zoomWindowHeight /
                a.heightRatio) + "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" + a.options.lensOpacity + ";filter: alpha(opacity \x3d " + 100 * a.options.lensOpacity + "); zoom:1;width:" + lensWidth + "px;height:" + lensHeight + "px;background-color:" + a.options.lensColour + ";cursor:" + a.options.cursor + ";border: " + a.options.lensBorderSize + "px solid " + a.options.lensBorderColour + ";background-repeat: no-repeat;position: absolute;");
            a.tintStyle = "display: block;position: absolute;background-color: " +
                a.options.tintColour + ";filter:alpha(opacity\x3d0);opacity: 0;width: " + a.nzWidth + "px;height: " + a.nzHeight + "px;";
            a.lensRound = "";
            "lens" == a.options.zoomType && (a.lensStyle = "background-position: 0px 0px;float: left;display: none;border: " + String(a.options.borderSize) + "px solid " + a.options.borderColour + ";width:" + String(a.options.lensSize) + "px;height:" + String(a.options.lensSize) + "px;background-repeat: no-repeat;position: absolute;");
            "round" == a.options.lensShape && (a.lensRound = "border-top-left-radius: " + String(a.options.lensSize /
                2 + a.options.borderSize) + "px;border-top-right-radius: " + String(a.options.lensSize / 2 + a.options.borderSize) + "px;border-bottom-left-radius: " + String(a.options.lensSize / 2 + a.options.borderSize) + "px;border-bottom-right-radius: " + String(a.options.lensSize / 2 + a.options.borderSize) + "px;");
            a.zoomContainer = c('\x3cdiv class\x3d"zoomContainer" style\x3d"-webkit-transform: translateZ(0);position:absolute;left:' + a.nzOffset.left + "px;top:" + a.nzOffset.top + "px;height:" + a.nzHeight + "px;width:" + a.nzWidth + 'px;"\x3e\x3c/div\x3e');
            c("body").append(a.zoomContainer);
            a.options.containLensZoom && "lens" == a.options.zoomType && a.zoomContainer.css("overflow", "hidden");
            "inner" != a.options.zoomType && (a.zoomLens = c("\x3cdiv class\x3d'zoomLens' style\x3d'" + a.lensStyle + a.lensRound + "'\x3e\x26nbsp;\x3c/div\x3e").appendTo(a.zoomContainer).click(function() {
                a.$elem.trigger("click")
            }));
            a.options.tint && (a.tintContainer = c("\x3cdiv/\x3e").addClass("tintContainer"), a.zoomTint = c("\x3cdiv class\x3d'zoomTint' style\x3d'" + a.tintStyle + "'\x3e\x3c/div\x3e"),
                a.zoomLens.wrap(a.tintContainer), a.zoomTintcss = a.zoomLens.after(a.zoomTint), a.zoomTintImage = c('\x3cimg style\x3d"position: absolute; left: 0px; top: 0px; max-width: none; width: ' + a.nzWidth + "px; height: " + a.nzHeight + 'px;" src\x3d"' + a.imageSrc + '"\x3e').appendTo(a.zoomLens).click(function() {
                    a.$elem.trigger("click")
                }));
            a.zoomWindow = isNaN(a.options.zoomWindowPosition) ? c("\x3cdiv style\x3d'z-index:999;left:" + a.windowOffsetLeft + "px;top:" + a.windowOffsetTop + "px;" + a.zoomWindowStyle + "' class\x3d'zoomWindow'\x3e\x26nbsp;\x3c/div\x3e").appendTo("body").click(function() {
                    a.$elem.trigger("click")
                }) :
                c("\x3cdiv style\x3d'z-index:999;left:" + a.windowOffsetLeft + "px;top:" + a.windowOffsetTop + "px;" + a.zoomWindowStyle + "' class\x3d'zoomWindow'\x3e\x26nbsp;\x3c/div\x3e").appendTo(a.zoomContainer).click(function() {
                    a.$elem.trigger("click")
                });
            a.zoomWindowContainer = c("\x3cdiv/\x3e").addClass("zoomWindowContainer").css("width", a.options.zoomWindowWidth);
            a.zoomWindow.wrap(a.zoomWindowContainer);
            "lens" == a.options.zoomType && a.zoomLens.css({
                backgroundImage: "url('" + a.imageSrc + "')"
            });
            "window" == a.options.zoomType &&
                a.zoomWindow.css({
                    backgroundImage: "url('" + a.imageSrc + "')"
                });
            "inner" == a.options.zoomType && a.zoomWindow.css({
                backgroundImage: "url('" + a.imageSrc + "')"
            });
            a.$elem.bind("touchmove", function(b) {
                b.preventDefault();
                a.setPosition(b.originalEvent.touches[0] || b.originalEvent.changedTouches[0])
            });
            a.zoomContainer.bind("touchmove", function(b) {
                "inner" == a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                b.preventDefault();
                a.setPosition(b.originalEvent.touches[0] ||
                    b.originalEvent.changedTouches[0])
            });
            a.zoomContainer.bind("touchend", function() {
                a.zoomWindow.hide();
                a.options.showLens && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            });
            a.$elem.bind("touchend", function() {
                a.zoomWindow.hide();
                a.options.showLens && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            });
            a.options.showLens && (a.zoomLens.bind("touchmove", function(b) {
                b.preventDefault();
                a.setPosition(b.originalEvent.touches[0] || b.originalEvent.changedTouches[0])
            }), a.zoomLens.bind("touchend", function() {
                a.zoomWindow.hide();
                a.options.showLens && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            }));
            a.$elem.bind("mousemove", function(b) {
                (a.lastX !== b.clientX || a.lastY !== b.clientY) && a.setPosition(b);
                a.lastX = b.clientX;
                a.lastY = b.clientY
            });
            a.zoomContainer.bind("mousemove", function(b) {
                (a.lastX !== b.clientX || a.lastY !== b.clientY) && a.setPosition(b);
                a.lastX = b.clientX;
                a.lastY = b.clientY
            });
            "inner" != a.options.zoomType && a.zoomLens.bind("mousemove", function(b) {
                (a.lastX !== b.clientX || a.lastY !== b.clientY) && a.setPosition(b);
                a.lastX = b.clientX;
                a.lastY = b.clientY
            });
            a.options.tint && a.zoomTint.bind("mousemove", function(b) {
                (a.lastX !== b.clientX || a.lastY !== b.clientY) && a.setPosition(b);
                a.lastX = b.clientX;
                a.lastY = b.clientY
            });
            "inner" == a.options.zoomType && a.zoomWindow.bind("mousemove", function(b) {
                (a.lastX !== b.clientX || a.lastY !== b.clientY) && a.setPosition(b);
                a.lastX = b.clientX;
                a.lastY = b.clientY
            });
            a.zoomContainer.mouseenter(function() {
                "inner" == a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                "window" == a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                a.options.showLens && (a.options.lensFadeIn ? a.zoomLens.stop(!0, !0).fadeIn(a.options.lensFadeIn) : a.zoomLens.show());
                a.options.tint && (a.options.zoomTintFadeIn ? a.zoomTint.stop(!0, !0).fadeIn(a.options.zoomTintFadeIn) : a.zoomTint.show())
            }).mouseleave(function() {
                a.zoomWindow.hide();
                a.options.showLens && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            });
            a.$elem.mouseenter(function() {
                "inner" ==
                a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                "window" == a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                a.options.showLens && (a.options.lensFadeIn ? a.zoomLens.stop(!0, !0).fadeIn(a.options.lensFadeIn) : a.zoomLens.show());
                a.options.tint && (a.options.zoomTintFadeIn ? a.zoomTint.stop(!0, !0).fadeIn(a.options.zoomTintFadeIn) : a.zoomTint.show())
            }).mouseleave(function() {
                a.zoomWindow.hide();
                a.options.showLens && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            });
            "inner" != a.options.zoomType && a.zoomLens.mouseenter(function() {
                "inner" == a.options.zoomType && (a.options.zoomWindowFadeIn ? a.zoomWindow.stop(!0, !0).fadeIn(a.options.zoomWindowFadeIn) : a.zoomWindow.show());
                "window" == a.options.zoomType && a.zoomWindow.show();
                a.options.showLens && a.zoomLens.show();
                a.options.tint && a.zoomTint.show()
            }).mouseleave(function() {
                a.options.zoomWindowFadeOut ? a.zoomWindow.stop(!0, !0).fadeOut(a.options.zoomWindowFadeOut) :
                    a.zoomWindow.hide();
                "inner" != a.options.zoomType && a.zoomLens.hide();
                a.options.tint && a.zoomTint.hide()
            });
            a.options.tint && a.zoomTint.mouseenter(function() {
                "inner" == a.options.zoomType && a.zoomWindow.show();
                "window" == a.options.zoomType && a.zoomWindow.show();
                a.options.showLens && a.zoomLens.show();
                a.zoomTint.show()
            }).mouseleave(function() {
                a.zoomWindow.hide();
                "inner" != a.options.zoomType && a.zoomLens.hide();
                a.zoomTint.hide()
            });
            "inner" == a.options.zoomType && a.zoomWindow.mouseenter(function() {
                "inner" == a.options.zoomType &&
                    a.zoomWindow.show();
                "window" == a.options.zoomType && a.zoomWindow.show();
                a.options.showLens && a.zoomLens.show()
            }).mouseleave(function() {
                a.options.zoomWindowFadeOut ? a.zoomWindow.stop(!0, !0).fadeOut(a.options.zoomWindowFadeOut) : a.zoomWindow.hide();
                "inner" != a.options.zoomType && a.zoomLens.hide()
            })
        },
        setPosition: function(a) {
            this.nzHeight = this.$elem.height();
            this.nzWidth = this.$elem.width();
            this.nzOffset = this.$elem.offset();
            this.options.tint && (this.zoomTint.css({
                top: 0
            }), this.zoomTint.css({
                left: 0
            }));
            this.options.responsive &&
                (lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio), lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzHWidth : this.options.zoomWindowWidth / this.widthRatio, this.widthRatio = this.largeWidth / this.nzWidth, this.heightRatio = this.largeHeight / this.nzHeight, this.zoomLens.css({
                    width: String(this.options.zoomWindowWidth / this.widthRatio) + "px",
                    height: String(this.options.zoomWindowHeight / this.heightRatio) + "px"
                }));
            this.zoomContainer.css({
                top: this.nzOffset.top
            });
            this.zoomContainer.css({
                left: this.nzOffset.left
            });
            this.mouseLeft = parseInt(a.pageX - this.nzOffset.left);
            this.mouseTop = parseInt(a.pageY - this.nzOffset.top);
            "window" == this.options.zoomType && (this.Etoppos = this.mouseTop < this.zoomLens.height() / 2, this.Eboppos = this.mouseTop > this.nzHeight - this.zoomLens.height() / 2 - 2 * this.options.lensBorderSize, this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2, this.Eroppos = this.mouseLeft > this.nzWidth - this.zoomLens.width() / 2 - 2 * this.options.lensBorderSize);
            "inner" == this.options.zoomType &&
                (this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio, this.Eboppos = this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio, this.Eloppos = this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio, this.Eroppos = this.mouseLeft > this.nzWidth - this.nzWidth / 2 / this.widthRatio - 2 * this.options.lensBorderSize);
            0 > this.mouseLeft || 0 >= this.mouseTop || this.mouseLeft > this.nzWidth || this.mouseTop > this.nzHeight ? (this.zoomWindow.hide(), this.options.showLens && this.zoomLens.hide(), this.options.tint && this.zoomTint.hide()) :
                ("window" == this.options.zoomType && this.zoomWindow.show(), this.options.tint && this.zoomTint.show(), this.options.showLens && (this.zoomLens.show(), this.lensLeftPos = String(this.mouseLeft - this.zoomLens.width() / 2), this.lensTopPos = String(this.mouseTop - this.zoomLens.height() / 2)), this.Etoppos && (this.lensTopPos = 0), this.Eloppos && (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0), "window" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize,
                    0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize)), "inner" == this.options.zoomType && (this.Eboppos && (this.lensTopPos = Math.max(this.nzHeight - 2 * this.options.lensBorderSize, 0)), this.Eroppos && (this.lensLeftPos = this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)), "lens" == this.options.zoomType && (this.windowLeftPos = String(-1 * ((a.pageX - this.nzOffset.left) * this.widthRatio - this.zoomLens.width() / 2)), this.windowTopPos = String(-1 * ((a.pageY - this.nzOffset.top) *
                    this.heightRatio - this.zoomLens.height() / 2)), this.zoomLens.css({
                    backgroundPosition: this.windowLeftPos + "px " + this.windowTopPos + "px"
                }), this.setWindowPostition(a)), this.options.tint && this.setTintPosition(a), "window" == this.options.zoomType && this.setWindowPostition(a), "inner" == this.options.zoomType && this.setWindowPostition(a), this.options.showLens && this.zoomLens.css({
                    left: this.lensLeftPos + "px",
                    top: this.lensTopPos + "px"
                }))
        },
        setLensPostition: function() {},
        setWindowPostition: function(a) {
            var b = this;
            if (isNaN(b.options.zoomWindowPosition)) b.externalContainer =
                c("#" + b.options.zoomWindowPosition), b.externalContainerWidth = b.externalContainer.width(), b.externalContainerHeight = b.externalContainer.height(), b.externalContainerOffset = b.externalContainer.offset(), b.windowOffsetTop = b.externalContainerOffset.top, b.windowOffsetLeft = b.externalContainerOffset.left;
            else switch (b.options.zoomWindowPosition) {
                case 1:
                    b.windowOffsetTop = b.options.zoomWindowOffety;
                    b.windowOffsetLeft = +b.nzWidth;
                    break;
                case 2:
                    b.options.zoomWindowHeight > b.nzHeight && (b.windowOffsetTop = -1 * (b.options.zoomWindowHeight /
                        2 - b.nzHeight / 2), b.windowOffsetLeft = b.nzWidth);
                    break;
                case 3:
                    b.windowOffsetTop = b.nzHeight - b.zoomWindow.height() - 2 * b.options.borderSize;
                    b.windowOffsetLeft = b.nzWidth;
                    break;
                case 4:
                    b.windowOffsetTop = b.nzHeight;
                    b.windowOffsetLeft = b.nzWidth;
                    break;
                case 5:
                    b.windowOffsetTop = b.nzHeight;
                    b.windowOffsetLeft = b.nzWidth - b.zoomWindow.width() - 2 * b.options.borderSize;
                    break;
                case 6:
                    b.options.zoomWindowHeight > b.nzHeight && (b.windowOffsetTop = b.nzHeight, b.windowOffsetLeft = -1 * (b.options.zoomWindowWidth / 2 - b.nzWidth / 2 + 2 * b.options.borderSize));
                    break;
                case 7:
                    b.windowOffsetTop = b.nzHeight;
                    b.windowOffsetLeft = 0;
                    break;
                case 8:
                    b.windowOffsetTop = b.nzHeight;
                    b.windowOffsetLeft = -1 * (b.zoomWindow.width() + 2 * b.options.borderSize);
                    break;
                case 9:
                    b.windowOffsetTop = b.nzHeight - b.zoomWindow.height() - 2 * b.options.borderSize;
                    b.windowOffsetLeft = -1 * (b.zoomWindow.width() + 2 * b.options.borderSize);
                    break;
                case 10:
                    b.options.zoomWindowHeight > b.nzHeight && (b.windowOffsetTop = -1 * (b.options.zoomWindowHeight / 2 - b.nzHeight / 2), b.windowOffsetLeft = -1 * (b.zoomWindow.width() + 2 * b.options.borderSize));
                    break;
                case 11:
                    b.windowOffsetTop = b.options.zoomWindowOffety;
                    b.windowOffsetLeft = -1 * (b.zoomWindow.width() + 2 * b.options.borderSize);
                    break;
                case 12:
                    b.windowOffsetTop = -1 * (b.zoomWindow.height() + 2 * b.options.borderSize);
                    b.windowOffsetLeft = -1 * (b.zoomWindow.width() + 2 * b.options.borderSize);
                    break;
                case 13:
                    b.windowOffsetTop = -1 * (b.zoomWindow.height() + 2 * b.options.borderSize);
                    b.windowOffsetLeft = 0;
                    break;
                case 14:
                    b.options.zoomWindowHeight > b.nzHeight && (b.windowOffsetTop = -1 * (b.zoomWindow.height() + 2 * b.options.borderSize),
                        b.windowOffsetLeft = -1 * (b.options.zoomWindowWidth / 2 - b.nzWidth / 2 + 2 * b.options.borderSize));
                    break;
                case 15:
                    b.windowOffsetTop = -1 * (b.zoomWindow.height() + 2 * b.options.borderSize);
                    b.windowOffsetLeft = b.nzWidth - b.zoomWindow.width() - 2 * b.options.borderSize;
                    break;
                case 16:
                    b.windowOffsetTop = -1 * (b.zoomWindow.height() + 2 * b.options.borderSize);
                    b.windowOffsetLeft = b.nzWidth;
                    break;
                default:
                    b.windowOffsetTop = b.options.zoomWindowOffety, b.windowOffsetLeft = b.nzWidth
            }
            b.windowOffsetTop += b.options.zoomWindowOffety;
            b.windowOffsetLeft +=
                b.options.zoomWindowOffetx;
            b.zoomWindow.css({
                top: b.windowOffsetTop
            });
            b.zoomWindow.css({
                left: b.windowOffsetLeft
            });
            "inner" == b.options.zoomType && (b.zoomWindow.css({
                top: 0
            }), b.zoomWindow.css({
                left: 0
            }));
            b.windowLeftPos = String(-1 * ((a.pageX - b.nzOffset.left) * b.widthRatio - b.zoomWindow.width() / 2));
            b.windowTopPos = String(-1 * ((a.pageY - b.nzOffset.top) * b.heightRatio - b.zoomWindow.height() / 2));
            b.Etoppos && (b.windowTopPos = 0);
            b.Eloppos && (b.windowLeftPos = 0);
            b.Eboppos && (b.windowTopPos = -1 * (b.largeHeight / b.options.zoomLevel -
                b.zoomWindow.height()));
            b.Eroppos && (b.windowLeftPos = -1 * (b.largeWidth / b.options.zoomLevel - b.zoomWindow.width()));
            if ("window" == b.options.zoomType || "inner" == b.options.zoomType) 1 >= b.widthRatio && (b.windowLeftPos = 0), 1 >= b.heightRatio && (b.windowTopPos = 0), b.largeHeight < b.options.zoomWindowHeight && (b.windowTopPos = 0), b.largeWidth < b.options.zoomWindowWidth && (b.windowLeftPos = 0), b.options.easing ? (b.xp || (b.xp = 0), b.yp || (b.yp = 0), b.loop || (b.loop = setInterval(function() {
                b.xp += (b.windowLeftPos - b.xp) / b.options.easingAmount;
                b.yp += (b.windowTopPos - b.yp) / b.options.easingAmount;
                b.zoomWindow.css({
                    backgroundPosition: b.xp + "px " + b.yp + "px"
                })
            }, 16))) : b.zoomWindow.css({
                backgroundPosition: b.windowLeftPos + "px " + b.windowTopPos + "px"
            })
        },
        setTintPosition: function(a) {
            this.nzOffset = this.$elem.offset();
            this.tintpos = String(-1 * (a.pageX - this.nzOffset.left - this.zoomLens.width() / 2));
            this.tintposy = String(-1 * (a.pageY - this.nzOffset.top - this.zoomLens.height() / 2));
            this.Etoppos && (this.tintposy = 0);
            this.Eloppos && (this.tintpos = 0);
            this.Eboppos && (this.tintposy = -1 * (this.nzHeight - this.zoomLens.height() - 2 * this.options.lensBorderSize));
            this.Eroppos && (this.tintpos = -1 * (this.nzWidth - this.zoomLens.width() - 2 * this.options.lensBorderSize));
            this.options.tint && (this.zoomTint.css({
                opacity: this.options.tintOpacity
            }).animate().fadeIn("slow"), this.zoomTintImage.css({
                left: this.tintpos - this.options.lensBorderSize + "px"
            }), this.zoomTintImage.css({
                top: this.tintposy - this.options.lensBorderSize + "px"
            }))
        },
        swaptheimage: function(a, b) {
            var d = this,
                c = new Image;
            d.options.onImageSwap(d.$elem);
            c.onload = function() {
                d.largeWidth = c.width;
                d.largeHeight = c.height;
                d.zoomImage = b;
                d.swapAction(a, b)
            };
            c.src = b
        },
        swapAction: function(a, b) {
            var d = this,
                c = new Image;
            c.onload = function() {
                d.nzHeight = c.height;
                d.nzWidth = c.width;
                d.options.onImageSwapComplete(d.$elem);
                d.doneCallback()
            };
            c.src = a;
            d.zoomWindow.css({
                backgroundImage: "url('" + b + "')"
            });
            d.currentImage = b;
            d.$elem.attr("src", a)
        },
        doneCallback: function() {
            this.options.tint && (this.zoomTintImage.attr("src", largeimage), this.zoomTintImage.attr("height", this.$elem.height()),
                this.zoomTintImage.css({
                    height: this.$elem.height()
                }), this.zoomTint.css({
                    height: this.$elem.height()
                }));
            this.nzOffset = this.$elem.offset();
            this.nzWidth = this.$elem.width();
            this.nzHeight = this.$elem.height();
            this.widthRatio = this.largeWidth / this.nzWidth;
            this.heightRatio = this.largeHeight / this.nzHeight;
            lensHeight = this.nzHeight < this.options.zoomWindowWidth / this.widthRatio ? this.nzHeight : String(this.options.zoomWindowHeight / this.heightRatio);
            lensWidth = this.largeWidth < this.options.zoomWindowWidth ? this.nzHWidth :
                this.options.zoomWindowWidth / this.widthRatio;
            this.zoomLens.css("width", lensWidth);
            this.zoomLens.css("height", lensHeight)
        },
        getCurrentImage: function() {
            return this.zoomImage
        },
        getGalleryList: function() {
            var a = this;
            a.gallerylist = [];
            a.options.gallery ? c("#" + a.options.gallery + " a").each(function() {
                var b = "";
                c(this).data("zoom-image") ? b = c(this).data("zoom-image") : c(this).data("image") && (b = c(this).data("image"));
                b == a.zoomImage ? a.gallerylist.unshift({
                    href: "" + b + "",
                    title: c(this).find("img").attr("title")
                }) : a.gallerylist.push({
                    href: "" +
                        b + "",
                    title: c(this).find("img").attr("title")
                })
            }) : a.gallerylist.push({
                href: "" + a.zoomImage + "",
                title: c(this).find("img").attr("title")
            });
            return a.gallerylist
        },
        changeZoomLevel: function(a) {
            this.widthRatio = this.largeWidth / a / this.nzWidth;
            this.heightRatio = this.largeHeight / a / this.nzHeight;
            this.zoomWindow.css({
                "background-size": this.largeWidth / a + "px " + this.largeHeight / a + "px"
            });
            this.zoomLens.css({
                width: String(this.options.zoomWindowWidth / this.widthRatio) + "px",
                height: String(this.options.zoomWindowHeight / this.heightRatio) +
                    "px"
            });
            this.options.zoomLevel = a
        },
        closeAll: function() {
            self.zoomWindow && self.zoomWindow.hide();
            self.zoomLens && self.zoomLens.hide();
            self.zoomTint && self.zoomTint.hide()
        }
    };
    c.fn.elevateZoom = function(a) {
        return this.each(function() {
            var b = Object.create(e);
            b.init(a, this);
            c.data(this, "elevateZoom", b)
        })
    };
    c.fn.elevateZoom.options = {
        zoomLevel: 1,
        easing: !1,
        easingAmount: 12,
        lensSize: 200,
        zoomWindowWidth: 400,
        zoomWindowHeight: 400,
        zoomWindowOffetx: 0,
        zoomWindowOffety: 0,
        zoomWindowPosition: 1,
        zoomWindowBgColour: "#fff",
        lensFadeIn: !1,
        lensFadeOut: !1,
        debug: !1,
        zoomWindowFadeIn: !1,
        zoomWindowFadeOut: !1,
        zoomWindowAlwaysShow: !1,
        zoomTintFadeIn: !1,
        zoomTintFadeOut: !1,
        borderSize: 4,
        showLens: !0,
        borderColour: "#888",
        lensBorderSize: 1,
        lensBorderColour: "#000",
        lensShape: "square",
        zoomType: "window",
        containLensZoom: !1,
        lensColour: "white",
        lensOpacity: 0.4,
        lenszoom: !1,
        tint: !1,
        tintColour: "#333",
        tintOpacity: 0.4,
        gallery: !1,
        galleryActiveClass: "zoomGalleryActive",
        cursor: "default",
        responsive: !1,
        onComplete: c.noop,
        onZoomedImageLoaded: function() {},
        onImageSwap: c.noop,
        onImageSwapComplete: c.noop
    }
})(jQuery, window, document);
(function(w, s, f, J) {
    var r = f(w),
        p = f(s),
        b = f.fancybox = function() {
            b.open.apply(this, arguments)
        },
        I = navigator.userAgent.match(/msie/),
        C = null,
        t = void 0 !== s.createTouch,
        z = function(a) {
            return a && a.hasOwnProperty && a instanceof f
        },
        q = function(a) {
            return a && "string" === f.type(a)
        },
        F = function(a) {
            return q(a) && 0 < a.indexOf("%")
        },
        m = function(a, d) {
            var e = parseInt(a, 10) || 0;
            d && F(a) && (e *= b.getViewport()[d] / 100);
            return Math.ceil(e)
        },
        x = function(a, b) {
            return m(a, b) + "px"
        };
    f.extend(b, {
        version: "2.1.4",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !t,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '\x3cdiv class\x3d"fancybox-wrap" tabIndex\x3d"-1"\x3e\x3cdiv class\x3d"fancybox-skin"\x3e\x3cdiv class\x3d"fancybox-outer"\x3e\x3cdiv class\x3d"fancybox-inner"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e',
                image: '\x3cimg class\x3d"fancybox-image" src\x3d"{href}" alt\x3d"" /\x3e',
                iframe: '\x3ciframe id\x3d"fancybox-frame{rnd}" name\x3d"fancybox-frame{rnd}" class\x3d"fancybox-iframe" frameborder\x3d"0" vspace\x3d"0" hspace\x3d"0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (I ? ' allowtransparency\x3d"true"' : "") + "\x3e\x3c/iframe\x3e",
                error: '\x3cp class\x3d"fancybox-error"\x3eThe requested content cannot be loaded.\x3cbr/\x3ePlease try again later.\x3c/p\x3e',
                closeBtn: '\x3ca title\x3d"Close" class\x3d"fancybox-item fancybox-close" href\x3d"javascript:;"\x3e\x3c/a\x3e',
                next: '\x3ca title\x3d"Next" class\x3d"fancybox-nav fancybox-next" href\x3d"javascript:;"\x3e\x3cspan\x3e\x3c/span\x3e\x3c/a\x3e',
                prev: '\x3ca title\x3d"Previous" class\x3d"fancybox-nav fancybox-prev" href\x3d"javascript:;"\x3e\x3cspan\x3e\x3c/span\x3e\x3c/a\x3e'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, d) {
            if (a && (f.isPlainObject(d) ||
                    (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = z(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                var l = {},
                    g, h, k, n, m;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), z(c) ? (l = {
                    href: c.data("fancybox-href") || c.attr("href"),
                    title: c.data("fancybox-title") || c.attr("title"),
                    isDom: !0,
                    element: c
                }, f.metadata && f.extend(!0, l, c.metadata())) : l = c);
                g = d.href || l.href || (q(c) ? c : null);
                h = void 0 !== d.title ? d.title : l.title || "";
                n = (k = d.content || l.content) ? "html" : d.type || l.type;
                !n && l.isDom && (n = c.data("fancybox-type"), n || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ?
                    n[1] : null));
                q(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : q(c) && (n = "html", k = c)), "ajax" === n && (m = g.split(/\s+/, 2), g = m.shift(), m = m.shift()));
                k || ("inline" === n ? g ? k = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (k = c) : "html" === n ? k = g : !n && (!g && l.isDom) && (n = "inline", k = c));
                f.extend(l, {
                    href: g,
                    type: n,
                    content: k,
                    title: h,
                    selector: m
                });
                a[e] = l
            }), b.opts = f.extend(!0, {}, b.defaults, d), void 0 !== d.keys && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function() {
            var a = b.coming;
            a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current || b._afterZoomOut(a))
        },
        close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1,
                b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
        },
        play: function(a) {
            var d = function() {
                    clearTimeout(b.player.timer)
                },
                e = function() {
                    d();
                    b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
                },
                c = function() {
                    d();
                    f("body").unbind(".player");
                    b.player.isActive = !1;
                    b.trigger("onPlayEnd")
                };
            if (!0 === a || !b.player.isActive && !1 !== a) {
                if (b.current && (b.current.loop || b.current.index < b.group.length -
                        1)) b.player.isActive = !0, f("body").bind({
                    "afterShow.player onUpdate.player": e,
                    "onCancel.player beforeClose.player": c,
                    "beforeLoad.player": d
                }), e(), b.trigger("onPlayStart")
            } else c()
        },
        next: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function(a) {
            var d = b.current;
            d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = m(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop &&
                (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), void 0 !== c.group[a] && (b.cancel(), b._start(a)))
        },
        reposition: function(a, d) {
            var e = b.current,
                c = e ? e.wrap : null,
                l;
            c && (l = b._getPosition(d), a && "scroll" === a.type ? (delete l.position, c.stop(!0, !0).animate(l, 200)) : (c.css(l), e.pos = f.extend({}, e.dim, l)))
        },
        update: function(a) {
            var d = a && a.type,
                e = !d || "orientationchange" === d;
            e && (clearTimeout(C), C = null);
            b.isOpen && !C && (C = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), C = null)
            }, e && !t ? 0 : 300))
        },
        toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")), b.update())
        },
        hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('\x3cdiv id\x3d"fancybox-loading"\x3e\x3cdiv\x3e\x3c/div\x3e\x3c/div\x3e').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel()
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }))
        },
        getViewport: function() {
            var a = b.current && b.current.locked || !1,
                d = {
                    x: r.scrollLeft(),
                    y: r.scrollTop()
                };
            a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = t && w.innerWidth ? w.innerWidth : r.width(), d.h = t && w.innerHeight ? w.innerHeight : r.height());
            return d
        },
        unbindEvents: function() {
            b.wrap && z(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            r.unbind(".fb")
        },
        bindEvents: function() {
            var a = b.current,
                d;
            a && (r.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c = e.which || e.keyCode,
                    l = e.target || e.srcElement;
                if (27 === c && b.coming) return !1;
                !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!l || !l.type && !f(l).is("[contenteditable]"))) && f.each(d, function(d, l) {
                    if (1 < a.group.length && void 0 !== l[c]) return b[d](l[c]), e.preventDefault(), !1;
                    if (-1 <
                        f.inArray(c, l)) return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, l, g) {
                for (var h = f(d.target || null), k = !1; h.length && !k && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");) k = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                if (0 !== c && !k && 1 < b.group.length && !a.canShrink) {
                    if (0 < g || 0 < l) b.prev(0 < g ? "down" : "left");
                    else if (0 > g || 0 > l) b.next(0 > g ? "up" : "right");
                    d.preventDefault()
                }
            }))
        },
        trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e) return !1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    e && (b.helpers[d] && f.isFunction(b.helpers[d][a])) && (e = f.extend(!0, {}, b.helpers[d].defaults, e), b.helpers[d][a](e, c))
                });
                f.event.trigger(a + ".fb")
            }
        },
        isImage: function(a) {
            return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var d = {},
                e, c;
            a = m(a);
            e = b.group[a] || null;
            if (!e) return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c, c, c]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height &&
                (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad")) b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" === c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && t && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " +
                    d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, x(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length) return b._error("content")
                } else if (!e) return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function(a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width = this.width;
                b.coming.height = this.height;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({},
                a.ajax, {
                    url: a.href,
                    error: function(a, e) {
                        b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                    },
                    success: function(d, e) {
                        "success" === e && (a.content = d, b._afterLoad())
                    }
                }))
        },
        _loadIframe: function() {
            var a = b.coming,
                d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (b.showLoading(), d.one("load",
                function() {
                    f(this).data("ready", 1);
                    t || f(this).bind("load.fb", b.update);
                    f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                    b._afterLoad()
                }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload || b._afterLoad()
        },
        _preloadImages: function() {
            var a = b.group,
                d = b.current,
                e = a.length,
                c = d.preload ? Math.min(d.preload, e - 1) : 0,
                f, g;
            for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function() {
            var a = b.coming,
                d = b.current,
                e, c, l, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    l = a.scrolling;
                    f.extend(b, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: d
                    });
                    g = a.href;
                    switch (c) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ? e = f("\x3cdiv\x3e").html(e).find(a.selector) : z(e) &&
                                (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('\x3cdiv class\x3d"fancybox-placeholder"\x3e\x3c/div\x3e').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                    f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                                }));
                            break;
                        case "image":
                            e = a.tpl.image.replace("{href}", g);
                            break;
                        case "swf":
                            e = '\x3cobject id\x3d"fancybox-swf" classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width\x3d"100%" height\x3d"100%"\x3e\x3cparam name\x3d"movie" value\x3d"' +
                                g + '"\x3e\x3c/param\x3e', h = "", f.each(a.swf, function(a, b) {
                                    e += '\x3cparam name\x3d"' + a + '" value\x3d"' + b + '"\x3e\x3c/param\x3e';
                                    h += " " + a + '\x3d"' + b + '"'
                                }), e += '\x3cembed src\x3d"' + g + '" type\x3d"application/x-shockwave-flash" width\x3d"100%" height\x3d"100%"' + h + "\x3e\x3c/embed\x3e\x3c/object\x3e"
                    }(!z(e) || !e.parent().is(a.inner)) && a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (b.isOpened) {
                        if (d.prevMethod) b.transitions[d.prevMethod]()
                    } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        },
        _setDimension: function() {
            var a = b.getViewport(),
                d = 0,
                e = !1,
                c = !1,
                e = b.wrap,
                l = b.skin,
                g = b.inner,
                h = b.current,
                c = h.width,
                k = h.height,
                n = h.minWidth,
                u = h.minHeight,
                p = h.maxWidth,
                v = h.maxHeight,
                t = h.scrolling,
                r = h.scrollOutside ? h.scrollbarWidth : 0,
                y = h.margin,
                q = m(y[1] + y[3]),
                s = m(y[0] + y[2]),
                z, A, w, D, B, G, C, E, H;
            e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            y = m(l.outerWidth(!0) - l.width());
            z = m(l.outerHeight(!0) - l.height());
            A = q + y;
            w = s + z;
            D = F(c) ? (a.w - A) * m(c) / 100 : c;
            B = F(k) ? (a.h - w) * m(k) / 100 : k;
            if ("iframe" === h.type) {
                if (H = h.content, h.autoHeight && 1 === H.data("ready")) try {
                    H[0].contentWindow.document.location && (g.width(D).height(9999), G = H.contents().find("body"), r && G.css("overflow-x", "hidden"), B = G.height())
                } catch (I) {}
            } else if (h.autoWidth || h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight &&
                (B = g.height()), g.removeClass("fancybox-tmp");
            c = m(D);
            k = m(B);
            E = D / B;
            n = m(F(n) ? m(n, "w") - A : n);
            p = m(F(p) ? m(p, "w") - A : p);
            u = m(F(u) ? m(u, "h") - w : u);
            v = m(F(v) ? m(v, "h") - w : v);
            G = p;
            C = v;
            h.fitToView && (p = Math.min(a.w - A, p), v = Math.min(a.h - w, v));
            A = a.w - q;
            s = a.h - s;
            h.aspectRatio ? (c > p && (c = p, k = m(c / E)), k > v && (k = v, c = m(k * E)), c < n && (c = n, k = m(c / E)), k < u && (k = u, c = m(k * E))) : (c = Math.max(n, Math.min(c, p)), h.autoHeight && "iframe" !== h.type && (g.width(c), k = g.height()), k = Math.max(u, Math.min(k, v)));
            if (h.fitToView)
                if (g.width(c).height(k), e.width(c + y),
                    a = e.width(), q = e.height(), h.aspectRatio)
                    for (;
                        (a > A || q > s) && (c > n && k > u) && !(19 < d++);) k = Math.max(u, Math.min(v, k - 10)), c = m(k * E), c < n && (c = n, k = m(c / E)), c > p && (c = p, k = m(c / E)), g.width(c).height(k), e.width(c + y), a = e.width(), q = e.height();
                else c = Math.max(n, Math.min(c, c - (a - A))), k = Math.max(u, Math.min(k, k - (q - s)));
            r && ("auto" === t && k < B && c + y + r < A) && (c += r);
            g.width(c).height(k);
            e.width(c + y);
            a = e.width();
            q = e.height();
            e = (a > A || q > s) && c > n && k > u;
            c = h.aspectRatio ? c < G && k < C && c < D && k < B : (c < G || k < C) && (c < D || k < B);
            f.extend(h, {
                dim: {
                    width: x(a),
                    height: x(q)
                },
                origWidth: D,
                origHeight: B,
                canShrink: e,
                canExpand: c,
                wPadding: y,
                hPadding: z,
                wrapSpace: q - l.outerHeight(!0),
                skinSpace: l.height() - k
            });
            !H && (h.autoHeight && k > u && k < v && !c) && g.height("auto")
        },
        _getPosition: function(a) {
            var d = b.current,
                e = b.getViewport(),
                c = d.margin,
                f = b.wrap.width() + c[1] + c[3],
                g = b.wrap.height() + c[0] + c[2],
                c = {
                    position: "absolute",
                    top: c[0],
                    left: c[3]
                };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = x(Math.max(c.left,
                c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function() {
            var a = b.current;
            a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                    !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
                }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                    a.preventDefault();
                    b.close()
                }), a.arrows &&
                1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        },
        _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function() {
            var a = b.current,
                d = a.element,
                e = a.orig,
                c = {},
                f = 50,
                g = 50,
                h = a.hPadding,
                k = a.wPadding,
                n = b.getViewport();
            !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
            z(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio, c.left = n.x + (n.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked) c.top -= n.y, c.left -= n.x;
            return c = {
                top: x(c.top - h * a.topRatio),
                left: x(c.left - k * a.leftRatio),
                width: x(f + k),
                height: x(g + h)
            }
        },
        step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace,
                h = c.skinSpace;
            if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](m("width" === f ? c : c - g * e)), b.inner[f](m("width" === f ? c : c - g * e - h * e))
        },
        zoomIn: function() {
            var a = b.current,
                d = a.pos,
                e = a.openEffect,
                c = "elastic" === e,
                l = f.extend({
                    opacity: 1
                }, d);
            delete l.position;
            c ? (d =
                this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(l, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = b.current,
                d = a.closeEffect,
                e = "elastic" === d,
                c = {
                    opacity: 0.1
                };
            e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null,
                complete: b._afterZoomOut
            })
        },
        changeIn: function() {
            var a =
                b.current,
                d = a.nextEffect,
                e = a.pos,
                c = {
                    opacity: 1
                },
                f = b.direction,
                g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(m(e[g]) - 200), c[g] = "+\x3d200px") : (e[g] = x(m(e[g]) + 200), c[g] = "-\x3d200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        },
        changeOut: function() {
            var a = b.previous,
                d = a.prevEffect,
                e = {
                    opacity: 0.1
                },
                c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c ||
                "left" === c ? "-" : "+") + "\x3d200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !t,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        create: function(a) {
            a = f.extend({}, this.defaults, a);
            this.overlay && this.close();
            this.overlay = f('\x3cdiv class\x3d"fancybox-overlay"\x3e\x3c/div\x3e').appendTo("body");
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"),
                this.fixed = !0)
        },
        open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (r.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay", function(a) {
                f(a.target).hasClass("fancybox-overlay") && (b.isActive ? b.close() : d.close())
            });
            this.overlay.css(a.css).show()
        },
        close: function() {
            f(".fancybox-overlay").remove();
            r.unbind("resize.overlay");
            this.overlay =
                null;
            !1 !== this.margin && (f("body").css("margin-right", this.margin), this.margin = !1);
            this.el && this.el.removeClass("fancybox-lock")
        },
        update: function() {
            var a = "100%",
                b;
            this.overlay.width(a).height("100%");
            I ? (b = Math.max(s.documentElement.offsetWidth, s.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > r.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        },
        onReady: function(a, b) {
            f(".fancybox-overlay").stop(!0, !0);
            this.overlay || (this.margin = p.height() > r.height() || "scroll" === f("body").css("overflow-y") ?
                f("body").css("margin-right") : !1, this.el = s.all && !s.querySelector ? f("html") : f("body"), this.create(a));
            a.locked && this.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            b.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && f("body").css("margin-right", m(this.margin) + b.scrollbarWidth));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !b.isActive && this.overlay.fadeOut(a.speedOut,
                f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var d = b.current,
                e = d.title,
                c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (q(e) && "" !== f.trim(e)) {
                d = f('\x3cdiv class\x3d"fancybox-title fancybox-title-' + c + '-wrap"\x3e' + e + "\x3c/div\x3e");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('\x3cspan class\x3d"child"\x3e\x3c/span\x3e'),
                            b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function(a) {
        var d, e = f(this),
            c = this.selector || "",
            l = function(g) {
                var h = f(this).blur(),
                    k = d,
                    l, m;
                !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (l = a.groupAttr || "data-fancybox-group", m = h.attr(l), m || (l = "rel", m = h.get(0)[l]), m && ("" !== m && "nofollow" !== m) && (h = c.length ? f(c) : e, h = h.filter("[" + l + '\x3d"' + m + '"]'), k = h.index(this)), a.index = k, !1 !== b.open(h, a) && g.preventDefault())
            };
        a = a || {};
        d = a.index || 0;
        !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", l) : p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", l);
        this.filter("[data-fancybox-start\x3d1]").trigger("click");
        return this
    };
    p.ready(function() {
        void 0 === f.scrollbarWidth && (f.scrollbarWidth = function() {
            var a = f('\x3cdiv style\x3d"width:50px;height:50px;overflow:auto"\x3e\x3cdiv/\x3e\x3c/div\x3e').appendTo("body"),
                b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        void 0 === f.support.fixedPosition && (f.support.fixedPosition = function() {
            var a = f('\x3cdiv style\x3d"position:fixed;top:20px;"\x3e\x3c/div\x3e').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            a.remove();
            return b
        }());
        f.extend(b.defaults, {
            scrollbarWidth: f.scrollbarWidth(),
            fixed: f.support.fixedPosition,
            parent: f("body")
        })
    })
})(window, document, jQuery);
