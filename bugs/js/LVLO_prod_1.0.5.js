(function (name, context, definition) {
    "use strict";
    if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
    else if (typeof define === "function" && define.amd) { define(definition); }
    else { context[name] = definition(); }
})("DPVCFG", this, function () {
    var DPVCfg = function (options) {       
    };

    DPVCfg.prototype = {        
        dpvServerUrl: '/api/DPVServices',
        excludeGeoLocation: true,
        excludeIPExternalFinding: true
    }

    return DPVCfg;
})
window.dpvCfg = new DPVCFG();(function (name, context, definition) {
    "use strict";
    if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
    else if (typeof define === "function" && define.amd) { define(definition); }
    else { context[name] = definition(); }
})("DPV", this, function () {
    // This will only be polyfilled for IE8 and older
    // Taken from Mozilla MDC
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError("'this' is null or undefined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
    var DPV = function(options) {
        var defaultOptions = {
            swfContainerId: "fingerprintjs2",
            swfPath: "flash/compiled/FontList.swf",
            sortPluginsFor: [/palemoon/i]
        };
        
    };

    DPV.prototype = {
        extend: function (source, target) {
            if (source == null) { return target; }
            for (var k in source) {
                if (source[k] != null && target[k] !== source[k]) {
                    target[k] = source[k];
                }
            }
            return target;
        },
        log: function (msg) {
            if (window.console) {
                console.log(msg);
            }
        },
        getUserAgent: function () {
            return navigator.userAgent;
        },
        getLanguage: function (options) {
            if (!options.excludeLanguage) {
                return navigator.language;
            }
            else
                return "";
        },
        getColorDepth: function (options) {
            if (!options.excludeColorDepth) {
                return screen.colorDepth;
            }
            else
                return "";
        },
        getScreenResolution: function(options) {
            var resolution;
            var available;
            if(options.detectScreenOrientation) {
                resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
            } else {
                resolution = [screen.height, screen.width];
            }
            if(typeof resolution !== "undefined") { // headless browsers
                return resolution;
            }
            if(screen.availWidth && screen.availHeight) {
                if(options.detectScreenOrientation) {
                    available = (screen.availHeight > screen.availWidth) ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight];
                } else {
                    available = [screen.availHeight, screen.availWidth];
                }
            }
            if(typeof available !== "undefined") { // headless browsers
                return available;
            }
            return ""
        },
        getTimezoneOffset: function(options){
            if(!options.excludeTimezoneOffset) {
                return new Date().getTimezoneOffset();
            }
        },
        getSessionStorageKey: function (options) {
            if (!options.excludeSessionStorage && this.hasSessionStorage()) {
                return true;
            }
            return false;
        },
        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it
								// exists
            }
        },
        hasLocalStorage: function () {
            try {
                return !!window.localStorage;
            } catch (e) {
                return true; // SecurityError when referencing it means it
								// exists
            }
        },
        hasIndexedDB: function () {
            return !!window.indexedDB;
        },
        touchSupportKey: function (options) {
            if (!options.excludeTouchSupport) {
                return (this.getTouchSupport());
            }
            return "";
        },
        // This is a crude and primitive touch screen detection.
        // It's not possible to currently reliably detect the availability of a
		// touch screen
        // with a JS, without actually subscribing to a touch event.
        // http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
        // https://github.com/Modernizr/Modernizr/issues/548
        // method returns an array of 3 values:
        // maxTouchPoints, the success or failure of creating a TouchEvent,
        // and the availability of the 'ontouchstart' property
        getTouchSupport: function () {
            var maxTouchPoints = 0;
            var touchEvent = false;
            if (typeof navigator.maxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.maxTouchPoints;
            } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.msMaxTouchPoints;
            }
            try {
                document.createEvent("TouchEvent");
                touchEvent = true;
            } catch (_) { /* squelch */ }
            var touchStart = "ontouchstart" in window;
            return [maxTouchPoints, touchEvent, touchStart];
        },
        getLocalStorageKey: function(options){
            if (!options.excludeSessionStorage && this.hasLocalStorage()) {
                return true;
            }
            return false;
        },
        hasIndexedDB: function () {
            return !!window.indexedDB;
        },
        getIndexedDbKey: function (options) {
            if (!options.excludeIndexedDB && this.hasIndexedDB()) {
                return true;
            }
            return false;
        },
        getBehaviourKey: function (options) {
            // body might not be defined at this point or removed
			// programmatically
            if(document.body && !options.excludeAddBehavior && document.body.addBehavior) {
                return true;
            }
            return false;
        },
        getOpenDatabaseKey: function(options){
            if(!options.excludeOpenDatabase && window.openDatabase) {
                return true;
            }
            return false;
        },
        getCpuClass: function (options) {
            if (!options.excludeCpuClass) {
                return this.getNavigatorCpuClass();
            }
            return "";
        },
        getNavigatorCpuClass: function () {
            if (navigator.cpuClass) {
                return navigator.cpuClass;
            } else {
                return "unknown";
            }
        },
        getNavigatorPlatform: function () {
            if (navigator.platform) {
                return navigator.platform;
            } else {
                return "unknown";
            }
        },
        getPlatformKey: function (options) {
            if (!options.excludePlatform) {
                return this.getNavigatorPlatform();
            }
            return keys;
        },
        getDoNotTrack: function () {
            if (navigator.doNotTrack) {
                return navigator.doNotTrack;
            } else {
                return "unknown";
            }
        },
        getDoNotTrackKey: function(options){
            if (!options.excludeDoNotTrack) {
                return this.getDoNotTrack();
            }
            return "";
        },
        isIE: function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true;
            } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) { // IE
																									// 11
                return true;
            }
            return false;
        },
        getRegularPluginsString: function (options) {
            var plugins = [];
            for (var i = 0, l = navigator.plugins.length; i < l; i++) {
                plugins.push(navigator.plugins[i]);
            }
            // sorting plugins only for those user agents, that we know
			// randomize the plugins
            // every time we try to enumerate them
            if (this.pluginsShouldBeSorted(options)) {
                plugins = plugins.sort(function (a, b) {
                    if (a.name > b.name) { return 1; }
                    if (a.name < b.name) { return -1; }
                    return 0;
                });
            }
            return plugins.map(function (p) {
                var s = "";
                var mimeTypes = Object.keys(p).forEach(function (key) {
                    var mt = p[key];
                    s = s + [mt.type, mt.suffixes].join("~");
                });                
                return [p.name, p.description, mimeTypes].join("::");
            }, this).join(";");
        },
        getIEPluginsString: function () {
            if (window.ActiveXObject) {
                var names = [
                  "AcroPDF.PDF", // Adobe PDF reader 7+
                  "Adodb.Stream",
                  "AgControl.AgControl", // Silverlight
                  "DevalVRXCtrl.DevalVRXCtrl.1",
                  "MacromediaFlashPaper.MacromediaFlashPaper",
                  "Msxml2.DOMDocument",
                  "Msxml2.XMLHTTP",
                  "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
                  "QuickTime.QuickTime", // QuickTime
                  "QuickTimeCheckObject.QuickTimeCheck.1",
                  "RealPlayer",
                  "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
                  "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
                  "Scripting.Dictionary",
                  "SWCtl.SWCtl", // ShockWave player
                  "Shell.UIHelper",
                  "ShockwaveFlash.ShockwaveFlash", // flash plugin
                  "Skype.Detection",
                  "TDCCtl.TDCCtl",
                  "WMPlayer.OCX", // Windows media player
                  "rmocx.RealPlayer G2 Control",
                  "rmocx.RealPlayer G2 Control.1"
                ];
                // starting to detect plugins in IE
                return names.map(function (name) {
                    try {
                        new ActiveXObject(name); // eslint-disable-no-new
                        return name;
                    } catch (e) {
                        return null;
                    }
                }).join(";");
            } else {
                return "";
            }
        },
        pluginsShouldBeSorted: function (options) {
            var should = false;
            if (options.sortPluginsFor != null)
                for (var i = 0, l = options.sortPluginsFor.length; i < l; i++) {
                    var re = this.options.sortPluginsFor[i];
                    if (navigator.userAgent.match(re)) {
                        should = true;
                        break;
                    }
                }
            return should;
        },

        pluginsKey: function (options) {
            if (this.isIE()) {
                return this.getIEPluginsString(options);
            } else {
                return this.getRegularPluginsString(options);
            }
            return "";
        },
        isCanvasSupported: function () {
            var elem = document.createElement("canvas");
            return !!(elem.getContext && elem.getContext("2d"));
        },
        // https://www.browserleaks.com/canvas#how-does-it-work
        getCanvasFp: function () {
            var result = [];
            // Very simple now, need to make it more complex (geo shapes etc)
            var canvas = document.createElement("canvas");
            canvas.width = 2000;
            canvas.height = 200;
            canvas.style.display = "inline";
            var ctx = canvas.getContext("2d");
            // detect browser support of canvas winding
            // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
            // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
            ctx.rect(0, 0, 10, 10);
            ctx.rect(2, 2, 6, 6);
            result.push("canvas winding:" + ((ctx.isPointInPath(5, 5, "evenodd") === false) ? "yes" : "no"));

            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = "#f60";
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = "#069";
            ctx.font = "11pt no-real-font-123";
            ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
            ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
            ctx.font = "18pt Arial";
            ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

            // canvas blending
            // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
            // http://jsfiddle.net/NDYV8/16/
            ctx.globalCompositeOperation = "multiply";
            ctx.fillStyle = "rgb(255,0,255)";
            ctx.beginPath();
            ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgb(0,255,255)";
            ctx.beginPath();
            ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgb(255,255,0)";
            ctx.beginPath();
            ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "rgb(255,0,255)";
            // canvas winding
            // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
            // http://jsfiddle.net/NDYV8/19/
            ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
            ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
            ctx.fill("evenodd");

            result.push("canvas fp:" + canvas.toDataURL());
            return result.join("~");
        },
        canvasKey: function (options) {
            if (!options.excludeCanvas && this.isCanvasSupported()) {
                return this.getCanvasFp();
            }
            return "";
        },
        webglKey: function (options) {
            if (options.excludeWebGL) {
                if (typeof NODEBUG === "undefined") {
                    this.log("Skipping WebGL fingerprinting per excludeWebGL configuration option");
                }
                return "";
            }
            if (!this.isWebGlSupported()) {
                if (typeof NODEBUG === "undefined") {
                    this.log("Skipping WebGL fingerprinting because it is not supported in this browser");
                }
                return "";
            }
            return this.getWebglFp();            
        },
        isWebGlSupported: function() {
            // code taken from Modernizr
            if (!this.isCanvasSupported()) {
                return false;
            }

            var canvas = document.createElement("canvas"),
                glContext;

            try {
                glContext = canvas.getContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
            } catch(e) {
                glContext = false;
            }

            return !!window.WebGLRenderingContext && !!glContext;
        },
        getWebglCanvas: function () {
            var canvas = document.createElement("canvas");
            var gl = null;
            try {
                gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            } catch (e) { /* squelch */ }
            if (!gl) { gl = null; }
            return gl;
        },
        getWebglFp: function () {
            var gl;
            var fa2s = function (fa) {
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                return "[" + fa[0] + ", " + fa[1] + "]";
            };
            var maxAnisotropy = function (gl) {
                var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
            };
            gl = this.getWebglCanvas();
            if (!gl) { return null; }
            // WebGL fingerprinting is a combination of techniques, found in
			// MaxMind antifraud script & Augur fingerprinting.
            // First it draws a gradient object with shaders and convers the
			// image to the Base64 string.
            // Then it enumerates all WebGL extensions & capabilities and
			// appends them to the Base64 string, resulting in a huge WebGL
			// string, potentially very unique on each device
            // Since iOS supports webgl starting from version 8.1 and 8.1 runs
			// on several graphics chips, the results may be different across
			// ios devices, but we need to verify it.
            var result = [];
            var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
            var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
            var vertexPosBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
            var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            vertexPosBuffer.itemSize = 3;
            vertexPosBuffer.numItems = 3;
            var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vshader, vShaderTemplate);
            gl.compileShader(vshader);
            var fshader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fshader, fShaderTemplate);
            gl.compileShader(fshader);
            gl.attachShader(program, vshader);
            gl.attachShader(program, fshader);
            gl.linkProgram(program);
            gl.useProgram(program);
            program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
            program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
            gl.enableVertexAttribArray(program.vertexPosArray);
            gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
            gl.uniform2f(program.offsetUniform, 1, 1);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
            if (gl.canvas != null) { result.push(gl.canvas.toDataURL()); }
            result.push("extensions:" + gl.getSupportedExtensions().join(";"));
            result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
            result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
            result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
            result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
            result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
            result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
            result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
            result.push("webgl max anisotropy:" + maxAnisotropy(gl));
            result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
            result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
            result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
            result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
            result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
            result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
            result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
            result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
            result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
            result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
            result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
            result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
            result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
            result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
            result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
            result.push("webgl version:" + gl.getParameter(gl.VERSION));

            if (!gl.getShaderPrecisionFormat) {
                if (typeof NODEBUG === "undefined") {
                    this.log("WebGL fingerprinting is incomplete, because your browser does not support getShaderPrecisionFormat");
                }
                return result.join("~");
            }

            result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision);
            result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin);
            result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax);
            result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision);
            result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin);
            result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax);
            result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision);
            result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin);
            result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax);
            result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision);
            result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin);
            result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax);
            result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision);
            result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMin);
            result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax);
            result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision);
            result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin);
            result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax);
            result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision);
            result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin);
            result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax);
            result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision);
            result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin);
            result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax);
            result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision);
            result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin);
            result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax);
            result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision);
            result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin);
            result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax);
            result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision);
            result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin);
            result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax);
            result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision);
            result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin);
            result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax);
            return result.join("~");
        },
        getAdBlock: function(){
            var ads = document.createElement("div");
            ads.setAttribute("id", "ads");
            document.getElementsByTagName("body")[0].appendChild(ads);
            return document.getElementById("ads") ? false : true;
        },
        adBlockKey: function(options){
            if(!options.excludeAdBlock) {
                return this.getAdBlock();
            }
            return "";
        },
        getHasLiedLanguages: function () {
            // We check if navigator.language is equal to the first language of
			// navigator.languages
            if (typeof navigator.languages !== "undefined") {
                try {
                    var firstLanguages = navigator.languages[0].substr(0, 2);
                    if (firstLanguages !== navigator.language.substr(0, 2)) {
                        return true;
                    }
                } catch (err) {
                    return true;
                }
            }
            return false;
        },
        hasLiedLanguagesKey: function (options) {
            if (!options.excludeHasLiedLanguages) {
                return this.getHasLiedLanguages();
            }
            return "";
        },
        getHasLiedResolution: function () {
            if (screen.width < screen.availWidth) {
                return true;
            }
            if (screen.height < screen.availHeight) {
                return true;
            }
            return false;
        },
        hasLiedResolutionKey: function (options) {
            if (!options.excludeHasLiedResolution) {
                return this.getHasLiedResolution();
            }
            return "";
        },
        getHasLiedOs: function () {
            var userAgent = navigator.userAgent;
            var oscpu = navigator.oscpu;
            var platform = navigator.platform;
            var os;
            // We extract the OS from the user agent (respect the order of the
			// if else if statement)
            if (userAgent.toLowerCase().indexOf("windows phone") >= 0) {
                os = "Windows Phone";
            } else if (userAgent.toLowerCase().indexOf("win") >= 0) {
                os = "Windows";
            } else if (userAgent.toLowerCase().indexOf("android") >= 0) {
                os = "Android";
            } else if (userAgent.toLowerCase().indexOf("linux") >= 0) {
                os = "Linux";
            } else if (userAgent.toLowerCase().indexOf("iPhone") >= 0 || userAgent.toLowerCase().indexOf("iPad") >= 0) {
                os = "iOS";
            } else if (userAgent.toLowerCase().indexOf("mac") >= 0) {
                os = "Mac";
            } else {
                os = "Other";
            }
            // We detect if the person uses a mobile device
            var mobileDevice;
            if (("ontouchstart" in window) ||
                 (navigator.maxTouchPoints > 0) ||
                 (navigator.msMaxTouchPoints > 0)) {
                mobileDevice = true;
            } else {
                mobileDevice = false;
            }

            if (mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other") {
                return true;
            }

            // We compare oscpu with the OS extracted from the UA
            if (typeof oscpu !== "undefined") {
                if (oscpu.toLowerCase().indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
                    return true;
                } else if (oscpu.toLowerCase().indexOf("linux") >= 0 && os !== "Linux" && os !== "Android") {
                    return true;
                } else if (oscpu.toLowerCase().indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
                    return true;
                } else if (oscpu.toLowerCase().indexOf("win") === 0 && oscpu.toLowerCase().indexOf("linux") === 0 && oscpu.toLowerCase().indexOf("mac") >= 0 && os !== "other") {
                    return true;
                }
            }

            // We compare platform with the OS extracted from the UA
            if (platform.toLowerCase().indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
                return true;
            } else if ((platform.toLowerCase().indexOf("linux") >= 0 || platform.toLowerCase().indexOf("android") >= 0 || platform.toLowerCase().indexOf("pike") >= 0) && os !== "Linux" && os !== "Android") {
                return true;
            } else if ((platform.toLowerCase().indexOf("mac") >= 0 || platform.toLowerCase().indexOf("ipad") >= 0 || platform.toLowerCase().indexOf("ipod") >= 0 || platform.toLowerCase().indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS") {
                return true;
            } else if (platform.toLowerCase().indexOf("win") === 0 && platform.toLowerCase().indexOf("linux") === 0 && platform.toLowerCase().indexOf("mac") >= 0 && os !== "other") {
                return true;
            }

            if (typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone") {
                // We are are in the case where the person uses ie, therefore we
				// can infer that it's windows
                return true;
            }

            return false;
        },
        hasLiedOsKey: function (options) {
            if (!options.excludeHasLiedOs) {
                return this.getHasLiedOs();
            }
            return "";
        },
        getHasLiedBrowser: function () {
            var userAgent = navigator.userAgent;
            var productSub = navigator.productSub;

            // we extract the browser from the user agent (respect the order of
			// the tests)
            var browser;
            if (userAgent.toLowerCase().indexOf("firefox") >= 0) {
                browser = "Firefox";
            } else if (userAgent.toLowerCase().indexOf("opera") >= 0 || userAgent.toLowerCase().indexOf("opr") >= 0) {
                browser = "Opera";
            } else if (userAgent.toLowerCase().indexOf("chrome") >= 0) {
                browser = "Chrome";
            } else if (userAgent.toLowerCase().indexOf("safari") >= 0) {
                browser = "Safari";
            } else if (userAgent.toLowerCase().indexOf("trident") >= 0) {
                browser = "Internet Explorer";
            } else {
                browser = "Other";
            }

            if ((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107") {
                return true;
            }

            var tempRes = eval.toString().length;
            if (tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other") {
                return true;
            } else if (tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other") {
                return true;
            } else if (tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other") {
                return true;
            }

            // We create an error to see how it is handled
            var errFirefox;
            try {
                throw "a";
            } catch (err) {
                try {
                    err.toSource();
                    errFirefox = true;
                } catch (errOfErr) {
                    errFirefox = false;
                }
            }
            if (errFirefox && browser !== "Firefox" && browser !== "Other") {
                return true;
            }
            return false;
        },
        hasLiedBrowserKey: function (options) {
            if (!options.excludeHasLiedBrowser) {
                return this.getHasLiedBrowser();
            }
            return options;
        },
        getTouchSupport: function () {
            var maxTouchPoints = 0;
            var touchEvent = false;
            if (typeof navigator.maxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.maxTouchPoints;
            } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
                maxTouchPoints = navigator.msMaxTouchPoints;
            }
            try {
                document.createEvent("TouchEvent");
                touchEvent = true;
            } catch (_) { /* squelch */ }
            var touchStart = "ontouchstart" in window;
            return [maxTouchPoints, touchEvent, touchStart];
        },
        touchSupportKey: function (options) {
            if (!options.excludeTouchSupport) {
                return this.getTouchSupport();
            }
            return "";
        },       
        localizeGeo: function (options, callback) {
            if (options.excludeGeoLocation)
                callback(null);
            else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        callback(position);
                    }, function (error) {
                        callback(error);
                    });
                }
                else {
                    callback(null);
                }
            }
        },
        isFunction: function(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        },
        findIP: function myIP(options, callback) {
            if (options.excludeIPExternalFinding) {
                callback(null);
            }
            else {
                var xmlhttp;
                if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
                else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

                xmlhttp.open("GET", "http://api.hostip.info/get_html.php", true);

                xmlhttp.onreadystatechange = function (obj) {
                    if (xmlhttp.readyState == 4) {
                        var ip = "";
                        if (xmlhttp.status === 200) {
                            hostipInfo = obj.srcElement.responseText.split("\n");

                            for (i = 0; hostipInfo.length > i; i++) {
                                ipAddress = hostipInfo[i].split(":");
                                if (ipAddress[0] == "IP") ip = ipAddress[1];
                            }
                        }
                        callback(ip.trim())
                    }
                };
                xmlhttp.send(null);
            }
        },
        getOperationIdFromHF: function(options){
            var hf = document.getElementsByName("dpv_operationID");
            var val = null;
            if(hf.length > 0)
                val = hf[0].value;

            return val;
        },
        getIpFromHF: function(options){            
            var hf = document.getElementsByName("dpv_ipAddress");
            var val = null;
            if (hf.length > 0)
                val = hf[0].value;

            return val;
        },
        getHmacFromHF: function(options){            
            var hf = document.getElementsByName("dpv_hmac");
            var val = null;
            if (hf.length > 0)
                val = hf[0].value;

            return val;
        },
        getCurrentTime: function(options){
            if (!options.excludeCurrentTime) {
                return new Date();
            }
            return null;
        },
        getClientProperties: function (options, callback) {
            if (options == null)
                options = {};

            var innerOptions = {};
            var o = {};
            o.userAgent = this.getUserAgent();
            o.language = this.getLanguage(options);
            o.colorDepth = this.getColorDepth(options);
            innerOptions.detectScreenOrientation = true;
            o.orientedScreenResolution = this.getScreenResolution(innerOptions);
            innerOptions.detectScreenOrientation = false;
            o.screenResolution = this.getScreenResolution(innerOptions);
            o.timezoneOffset = this.getTimezoneOffset(options);
            o.hasSessionStorage = this.getSessionStorageKey(options);
            o.hasLocalStorage = this.getLocalStorageKey(options);
            o.hasIndexedDb = this.getIndexedDbKey(options);
            o.hasBehaviour = this.getBehaviourKey(options);
            o.hasOpenDatabaseKey = this.getOpenDatabaseKey(options);
            o.cpuClassKey = this.getCpuClass(options);
            o.platformKey = this.getPlatformKey(options);
            o.doNotTrack = this.getDoNotTrackKey(options);
            o.plugins = this.pluginsKey(options);
            o.canvas = this.canvasKey(options);
            o.webgl = this.webglKey(options);
            o.adBlock = this.adBlockKey(options);
            o.hasLiedLanguagesKey = this.hasLiedLanguagesKey(options);
            o.hasLiedResolutionKey = this.hasLiedResolutionKey(options);
            o.hasLiedOsKey = this.hasLiedOsKey(options);
            o.hasLiedBrowserKey = this.hasLiedBrowserKey(options);
            o.touchSupport = this.touchSupportKey(options);
            o.operationId = this.getOperationIdFromHF(options);
            o.ip = this.getIpFromHF(options);
            o.hmac = this.getHmacFromHF(options);
            o.currentTime = this.getCurrentTime(options);
            var mainObj = this;
            if (this.isFunction(callback)) {
                // Do async stuff, like geolocalization and ip finding.
                o.geoLocation = this.localizeGeo(options, function (location) {
                    o.geoLocation = location;
                    if (o.ip == null) {
                        mainObj.findIP(options, function (ip) {
                            o.ip = ip;
                            callback(o);
                        });
                    }
                    else {
                        callback(o);
                    }
                });
            }
            else
                return o;
        },
        postClientProperties: function (options, onSuccess, onError) {
            var options = null;

            if(window["dpvCfg"] != null)
                options = window["dpvCfg"];

            if (options == null)
                options = {};

            this.getClientProperties(options, function (properties) {                
                if (options.dpvServerUrl == null) {
                    console.error("Post url not specified!!!")
                    return; 
                }

                var xmlhttp;

                if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
                else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

                xmlhttp.open("POST", options.dpvServerUrl + '/GenerateDPVId', true);
                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                xmlhttp.onreadystatechange = function (obj) {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status === 200) {
                            if (onSuccess != null)
                                onSuccess(obj);
                        }
                        else if (onError != null) {
                            onError(obj);
                        }
                    }
                };
                xmlhttp.send(JSON.stringify(properties));
            });            
        }
    }

    return DPV;    
});

$(document).ready(function(){
	var dpv = new DPV();
	dpv.postClientProperties(window[dpvCfg], 
		function (o) {
		   	console.log("DPV Id generated successfully");
		},
		function (e) {
			console.error("Unable to generate DPV Id", e);
		}
	);	
});
