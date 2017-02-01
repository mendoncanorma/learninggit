(function() {
    for (var b = "assert cd clear count countReset debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd select table time timeEnd timeStamp timeline timelineEnd trace warn".split(" "), c = b.length, d = window.console = window.console || {}, a, e = function() {}; c--;) a = b[c], d[a] || (d[a] = e)
})();
(function(v, n) {
    function wa(a) {
        var b = a.length,
            d = c.type(a);
        return c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === d || "function" !== d && (0 === b || "number" == typeof b && 0 < b && b - 1 in a)
    }

    function Vb(a) {
        var b = Sa[a] = {};
        return c.each(a.match(I) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function Ta(a, b, d, e) {
        if (c.acceptData(a)) {
            var f, g, h = c.expando,
                k = a.nodeType,
                l = k ? c.cache : a,
                p = k ? a[h] : a[h] && h;
            if (p && l[p] && (e || l[p].data) || d !== n || "string" != typeof b) return p || (p = k ? a[h] = U.pop() || c.guid++ : h), l[p] || (l[p] = k ? {} : {
                toJSON: c.noop
            }), ("object" ==
                typeof b || "function" == typeof b) && (e ? l[p] = c.extend(l[p], b) : l[p].data = c.extend(l[p].data, b)), g = l[p], e || (g.data || (g.data = {}), g = g.data), d !== n && (g[c.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[c.camelCase(b)])) : f = g, f
        }
    }

    function Ua(a, b, d) {
        if (c.acceptData(a)) {
            var e, f, g = a.nodeType,
                h = g ? c.cache : a,
                k = g ? a[c.expando] : c.expando;
            if (h[k]) {
                if (b && (e = d ? h[k] : h[k].data)) {
                    c.isArray(b) ? b = b.concat(c.map(b, c.camelCase)) : b in e ? b = [b] : (b = c.camelCase(b), b = b in e ? [b] : b.split(" "));
                    for (f = b.length; f--;) delete e[b[f]];
                    if (d ? !xa(e) : !c.isEmptyObject(e)) return
                }(d || (delete h[k].data, xa(h[k]))) && (g ? c.cleanData([a], !0) : c.support.deleteExpando || h != h.window ? delete h[k] : h[k] = null)
            }
        }
    }

    function Va(a, b, d) {
        if (d === n && 1 === a.nodeType) {
            var e = "data-" + b.replace(Wb, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : Xb.test(d) ? c.parseJSON(d) : d
                } catch (f) {}
                c.data(a, b, d)
            } else d = n
        }
        return d
    }

    function xa(a) {
        for (var b in a)
            if (("data" !== b || !c.isEmptyObject(a[b])) && "toJSON" !==
                b) return !1;
        return !0
    }

    function na() {
        return !0
    }

    function V() {
        return !1
    }

    function Wa() {
        try {
            return q.activeElement
        } catch (a) {}
    }

    function Xa(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function ya(a, b, d) {
        if (c.isFunction(b)) return c.grep(a, function(a, c) {
            return !!b.call(a, c, a) !== d
        });
        if (b.nodeType) return c.grep(a, function(a) {
            return a === b !== d
        });
        if ("string" == typeof b) {
            if (Yb.test(b)) return c.filter(b, a, d);
            b = c.filter(b, a)
        }
        return c.grep(a, function(a) {
            return 0 <= c.inArray(a, b) !== d
        })
    }

    function Ya(a) {
        var b = Za.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length;) a.createElement(b.pop());
        return a
    }

    function $a(a, b) {
        return c.nodeName(a, "table") && c.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function ab(a) {
        return a.type = (null !== c.find.attr(a, "type")) + "/" + a.type, a
    }

    function bb(a) {
        var b = Zb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function za(a, b) {
        for (var d, e = 0; null != (d = a[e]); e++) c._data(d,
            "globalEval", !b || c._data(b[e], "globalEval"))
    }

    function cb(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var d, e, f;
            e = c._data(a);
            var g = c._data(b, e),
                h = e.events;
            if (h)
                for (d in delete g.handle, g.events = {}, h) {
                    e = 0;
                    for (f = h[d].length; f > e; e++) c.event.add(b, d, h[d][e])
                }
            g.data && (g.data = c.extend({}, g.data))
        }
    }

    function y(a, b) {
        var d, e, f = 0,
            g = typeof a.getElementsByTagName !== C ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== C ? a.querySelectorAll(b || "*") : n;
        if (!g) {
            g = [];
            for (d = a.childNodes || a; null != (e = d[f]); f++) !b || c.nodeName(e,
                b) ? g.push(e) : c.merge(g, y(e, b))
        }
        return b === n || b && c.nodeName(a, b) ? c.merge([a], g) : g
    }

    function $b(a) {
        Aa.test(a.type) && (a.defaultChecked = a.checked)
    }

    function db(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), e = b, f = eb.length; f--;)
            if (b = eb[f] + c, b in a) return b;
        return e
    }

    function ha(a, b) {
        return a = b || a, "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }

    function fb(a, b) {
        for (var d, e, f, g = [], h = 0, k = a.length; k > h; h++) e = a[h], e.style && (g[h] = c._data(e, "olddisplay"), d = e.style.display, b ? (g[h] ||
            "none" !== d || (e.style.display = ""), "" === e.style.display && ha(e) && (g[h] = c._data(e, "olddisplay", gb(e.nodeName)))) : g[h] || (f = ha(e), (d && "none" !== d || !f) && c._data(e, "olddisplay", f ? d : c.css(e, "display"))));
        for (h = 0; k > h; h++) e = a[h], e.style && (b && "none" !== e.style.display && "" !== e.style.display || (e.style.display = b ? g[h] || "" : "none"));
        return a
    }

    function hb(a, b, c) {
        return (a = ac.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || "px") : b
    }

    function ib(a, b, d, e, f) {
        b = d === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var g = 0; 4 > b; b += 2) "margin" ===
            d && (g += c.css(a, d + F[b], !0, f)), e ? ("content" === d && (g -= c.css(a, "padding" + F[b], !0, f)), "margin" !== d && (g -= c.css(a, "border" + F[b] + "Width", !0, f))) : (g += c.css(a, "padding" + F[b], !0, f), "padding" !== d && (g += c.css(a, "border" + F[b] + "Width", !0, f)));
        return g
    }

    function jb(a, b, d) {
        var e = !0,
            f = "width" === b ? a.offsetWidth : a.offsetHeight,
            g = B(a),
            h = c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, g);
        if (0 >= f || null == f) {
            if (f = P(a, b, g), (0 > f || null == f) && (f = a.style[b]), W.test(f)) return f;
            e = h && (c.support.boxSizingReliable || f === a.style[b]);
            f = parseFloat(f) || 0
        }
        return f + ib(a, b, d || (h ? "border" : "content"), e, g) + "px"
    }

    function gb(a) {
        var b = q,
            d = kb[a];
        return d || (d = lb(a, b), "none" !== d && d || (X = (X || c("\x3ciframe frameborder\x3d'0' width\x3d'0' height\x3d'0'/\x3e").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (X[0].contentWindow || X[0].contentDocument).document, b.write("\x3c!doctype html\x3e\x3chtml\x3e\x3cbody\x3e"), b.close(), d = lb(a, b), X.detach()), kb[a] = d), d
    }

    function lb(a, b) {
        var d = c(b.createElement(a)).appendTo(b.body),
            e =
            c.css(d[0], "display");
        return d.remove(), e
    }

    function Ba(a, b, d, e) {
        var f;
        if (c.isArray(b)) c.each(b, function(b, c) {
            d || bc.test(a) ? e(a, c) : Ba(a + "[" + ("object" == typeof c ? b : "") + "]", c, d, e)
        });
        else if (d || "object" !== c.type(b)) e(a, b);
        else
            for (f in b) Ba(a + "[" + f + "]", b[f], d, e)
    }

    function mb(a) {
        return function(b, d) {
            "string" != typeof b && (d = b, b = "*");
            var e, f = 0,
                g = b.toLowerCase().match(I) || [];
            if (c.isFunction(d))
                for (; e = g[f++];) "+" === e[0] ? (e = e.slice(1) || "*", (a[e] = a[e] || []).unshift(d)) : (a[e] = a[e] || []).push(d)
        }
    }

    function nb(a, b, d,
        e) {
        function f(k) {
            var l;
            return g[k] = !0, c.each(a[k] || [], function(a, c) {
                var k = c(b, d, e);
                return "string" != typeof k || h || g[k] ? h ? !(l = k) : n : (b.dataTypes.unshift(k), f(k), !1)
            }), l
        }
        var g = {},
            h = a === Ca;
        return f(b.dataTypes[0]) || !g["*"] && f("*")
    }

    function Da(a, b) {
        var d, e, f = c.ajaxSettings.flatOptions || {};
        for (e in b) b[e] !== n && ((f[e] ? a : d || (d = {}))[e] = b[e]);
        return d && c.extend(!0, a, d), a
    }

    function ob() {
        try {
            return new v.XMLHttpRequest
        } catch (a) {}
    }

    function pb() {
        return setTimeout(function() {
            Y = n
        }), Y = c.now()
    }

    function qb(a, b, c) {
        for (var e,
                f = (ia[b] || []).concat(ia["*"]), g = 0, h = f.length; h > g; g++)
            if (e = f[g].call(c, b, a)) return e
    }

    function rb(a, b, d) {
        var e, f = 0,
            g = ba.length,
            h = c.Deferred().always(function() {
                delete k.elem
            }),
            k = function() {
                if (e) return !1;
                for (var b = Y || pb(), b = Math.max(0, l.startTime + l.duration - b), c = 1 - (b / l.duration || 0), d = 0, f = l.tweens.length; f > d; d++) l.tweens[d].run(c);
                return h.notifyWith(a, [l, c, b]), 1 > c && f ? b : (h.resolveWith(a, [l]), !1)
            },
            l = h.promise({
                elem: a,
                props: c.extend({}, b),
                opts: c.extend(!0, {
                    specialEasing: {}
                }, d),
                originalProperties: b,
                originalOptions: d,
                startTime: Y || pb(),
                duration: d.duration,
                tweens: [],
                createTween: function(b, d) {
                    var e = c.Tween(a, l.opts, b, d, l.opts.specialEasing[b] || l.opts.easing);
                    return l.tweens.push(e), e
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? l.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) l.tweens[c].run(1);
                    return b ? h.resolveWith(a, [l, b]) : h.rejectWith(a, [l, b]), this
                }
            });
        d = l.props;
        for (cc(d, l.opts.specialEasing); g > f; f++)
            if (b = ba[f].call(l, a, d, l.opts)) return b;
        return c.map(d, qb, l), c.isFunction(l.opts.start) && l.opts.start.call(a, l), c.fx.timer(c.extend(k, {
            elem: a,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function cc(a, b) {
        var d, e, f, g, h;
        for (d in a)
            if (e = c.camelCase(d), f = b[e], g = a[d], c.isArray(g) && (f = g[1], g = a[d] = g[0]), d !== e && (a[e] = g, delete a[d]), h = c.cssHooks[e], h && "expand" in h)
                for (d in g = h.expand(g), delete a[e], g) d in a || (a[d] = g[d], b[d] = f);
            else b[e] = f
    }

    function x(a, b, c, e, f) {
        return new x.prototype.init(a, b, c, e, f)
    }

    function oa(a, b) {
        var c, e = {
                height: a
            },
            f = 0;
        for (b = b ? 1 : 0; 4 >
            f; f += 2 - b) c = F[f], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function sb(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var pa, tb, C = typeof n,
        dc = v.location,
        q = v.document,
        ub = q.documentElement,
        ec = v.jQuery,
        fc = v.$,
        qa = {},
        U = [],
        vb = U.concat,
        Ea = U.push,
        Z = U.slice,
        wb = U.indexOf,
        gc = qa.toString,
        Q = qa.hasOwnProperty,
        Fa = "1.10.2".trim,
        c = function(a, b) {
            return new c.fn.init(a, b, tb)
        },
        ra = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        I = /\S+/g,
        hc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ic = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        xb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        jc = /^[\],:{}\s]*$/,
        kc = /(?:^|:|,)(?:\s*\[)+/g,
        lc = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        mc = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        nc = /^-ms-/,
        oc = /-([\da-z])/gi,
        pc = function(a, b) {
            return b.toUpperCase()
        },
        L = function(a) {
            (q.addEventListener || "load" === a.type || "complete" === q.readyState) && (yb(), c.ready())
        },
        yb = function() {
            q.addEventListener ? (q.removeEventListener("DOMContentLoaded", L, !1), v.removeEventListener("load",
                L, !1)) : (q.detachEvent("onreadystatechange", L), v.detachEvent("onload", L))
        };
    c.fn = c.prototype = {
        jquery: "1.10.2",
        constructor: c,
        init: function(a, b, d) {
            var e, f;
            if (!a) return this;
            if ("string" == typeof a) {
                if (e = "\x3c" === a.charAt(0) && "\x3e" === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : ic.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || d).find(a) : this.constructor(b).find(a);
                if (e[1]) {
                    if (b = b instanceof c ? b[0] : b, c.merge(this, c.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : q, !0)), xb.test(e[1]) && c.isPlainObject(b))
                        for (e in b) c.isFunction(this[e]) ?
                            this[e](b[e]) : this.attr(e, b[e]);
                    return this
                }
                if (f = q.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2]) return d.find(a);
                    this.length = 1;
                    this[0] = f
                }
                return this.context = q, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : c.isFunction(a) ? d.ready(a) : (a.selector !== n && (this.selector = a.selector, this.context = a.context), c.makeArray(a, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return Z.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a) {
            a = c.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, a
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            return c.ready.promise().done(a), this
        },
        slice: function() {
            return this.pushStack(Z.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length;
            a = +a + (0 > a ? b : 0);
            return this.pushStack(0 <= a && b > a ? [this[a]] : [])
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, c) {
                return a.call(b,
                    c, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Ea,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a, b, d, e, f, g, h = arguments[0] || {},
            k = 1,
            l = arguments.length,
            p = !1;
        "boolean" == typeof h && (p = h, h = arguments[1] || {}, k = 2);
        "object" == typeof h || c.isFunction(h) || (h = {});
        for (l === k && (h = this, --k); l > k; k++)
            if (null != (f = arguments[k]))
                for (e in f) a = h[e], d = f[e], h !== d && (p && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ?
                    a : {}, h[e] = c.extend(p, g, d)) : d !== n && (h[e] = d));
        return h
    };
    c.extend({
        expando: "jQuery" + ("1.10.2" + Math.random()).replace(/\D/g, ""),
        noConflict: function(a) {
            return v.$ === c && (v.$ = fc), a && v.jQuery === c && (v.jQuery = ec), c
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? c.readyWait++ : c.ready(!0)
        },
        ready: function(a) {
            if (!0 === a ? !--c.readyWait : !c.isReady) {
                if (!q.body) return setTimeout(c.ready);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (pa.resolveWith(q, [c]), c.fn.trigger && c(q).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" ===
                c.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === c.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? qa[gc.call(a)] || "object" : typeof a
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !Q.call(a, "constructor") && !Q.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (d) {
                return !1
            }
            if (c.support.ownLast)
                for (b in a) return Q.call(a,
                    b);
            for (b in a);
            return b === n || Q.call(a, b)
        },
        isEmptyObject: function(a) {
            for (var b in a) return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, d) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (d = b, b = !1);
            b = b || q;
            var e = xb.exec(a);
            d = !d && [];
            return e ? [b.createElement(e[1])] : (e = c.buildFragment([a], b, d), d && c(d).remove(), c.merge([], e.childNodes))
        },
        parseJSON: function(a) {
            return v.JSON && v.JSON.parse ? v.JSON.parse(a) : null === a ? a : "string" == typeof a && (a = c.trim(a), a && jc.test(a.replace(lc,
                "@").replace(mc, "]").replace(kc, ""))) ? Function("return " + a)() : (c.error("Invalid JSON: " + a), n)
        },
        parseXML: function(a) {
            var b, d;
            if (!a || "string" != typeof a) return null;
            try {
                v.DOMParser ? (d = new DOMParser, b = d.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
            } catch (e) {
                b = n
            }
            return b && b.documentElement && !b.getElementsByTagName("parsererror").length || c.error("Invalid XML: " + a), b
        },
        noop: function() {},
        globalEval: function(a) {
            a && c.trim(a) && (v.execScript || function(a) {
                v.eval.call(v,
                    a)
            })(a)
        },
        camelCase: function(a) {
            return a.replace(nc, "ms-").replace(oc, pc)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var e, f = 0,
                g = a.length,
                h = wa(a);
            if (c)
                if (h)
                    for (; g > f && !(e = b.apply(a[f], c), !1 === e); f++);
                else
                    for (f in a) {
                        if (e = b.apply(a[f], c), !1 === e) break
                    } else if (h)
                        for (; g > f && !(e = b.call(a[f], f, a[f]), !1 === e); f++);
                    else
                        for (f in a)
                            if (e = b.call(a[f], f, a[f]), !1 === e) break;
            return a
        },
        trim: Fa && !Fa.call("﻿ ") ? function(a) {
            return null == a ? "" : Fa.call(a)
        } : function(a) {
            return null == a ? "" : (a + "").replace(hc, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (wa(Object(a)) ? c.merge(d, "string" == typeof a ? [a] : a) : Ea.call(d, a)), d
        },
        inArray: function(a, b, c) {
            var e;
            if (b) {
                if (wb) return wb.call(b, a, c);
                e = b.length;
                for (c = c ? 0 > c ? Math.max(0, e + c) : c : 0; e > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            var c = b.length,
                e = a.length,
                f = 0;
            if ("number" == typeof c)
                for (; c > f; f++) a[e++] = b[f];
            else
                for (; b[f] !== n;) a[e++] = b[f++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            var e,
                f = [],
                g = 0,
                h = a.length;
            for (c = !!c; h > g; g++) e = !!b(a[g], g), c !== e && f.push(a[g]);
            return f
        },
        map: function(a, b, c) {
            var e, f = 0,
                g = a.length,
                h = [];
            if (wa(a))
                for (; g > f; f++) e = b(a[f], f, c), null != e && (h[h.length] = e);
            else
                for (f in a) e = b(a[f], f, c), null != e && (h[h.length] = e);
            return vb.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var d, e, f;
            return "string" == typeof b && (f = a[b], b = a, a = f), c.isFunction(a) ? (d = Z.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(Z.call(arguments)))
            }, e.guid = a.guid = a.guid || c.guid++, e) : n
        },
        access: function(a,
            b, d, e, f, g, h) {
            var k = 0,
                l = a.length,
                p = null == d;
            if ("object" === c.type(d))
                for (k in f = !0, d) c.access(a, b, k, d[k], !0, g, h);
            else if (e !== n && (f = !0, c.isFunction(e) || (h = !0), p && (h ? (b.call(a, e), b = null) : (p = b, b = function(a, b, d) {
                    return p.call(c(a), d)
                })), b))
                for (; l > k; k++) b(a[k], d, h ? e : e.call(a[k], k, b(a[k], d)));
            return f ? a : p ? b.call(a) : l ? b(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(a, b, c, e) {
            var f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            c = c.apply(a, e || []);
            for (f in b) a.style[f] = g[f];
            return c
        }
    });
    c.ready.promise = function(a) {
        if (!pa)
            if (pa = c.Deferred(), "complete" === q.readyState) setTimeout(c.ready);
            else if (q.addEventListener) q.addEventListener("DOMContentLoaded", L, !1), v.addEventListener("load", L, !1);
        else {
            q.attachEvent("onreadystatechange", L);
            v.attachEvent("onload", L);
            var b = !1;
            try {
                b = null == v.frameElement && q.documentElement
            } catch (d) {}
            b && b.doScroll && function f() {
                if (!c.isReady) {
                    try {
                        b.doScroll("left")
                    } catch (a) {
                        return setTimeout(f, 50)
                    }
                    yb();
                    c.ready()
                }
            }()
        }
        return pa.promise(a)
    };
    c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
        function(a, b) {
            qa["[object " + b + "]"] = b.toLowerCase()
        });
    tb = c(q);
    (function(a, b) {
        function d(a, b, c, d) {
            var e, f, g, h, k;
            if ((b ? b.ownerDocument || b : J) !== G && R(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (S && !d) {
                if (e = oa.exec(a))
                    if (g = e[1])
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else {
                            if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && z(b, f) && f.id === g) return c.push(f), c
                        } else {
                    if (e[2]) return ca.apply(c, b.getElementsByTagName(a)),
                        c;
                    if ((g = e[3]) && s.getElementsByClassName && b.getElementsByClassName) return ca.apply(c, b.getElementsByClassName(g)), c
                }
                if (s.qsa && (!A || !A.test(a))) {
                    if (f = e = D, g = b, k = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        h = t(a);
                        (e = b.getAttribute("id")) ? f = e.replace(ra, "\\$\x26"): b.setAttribute("id", f);
                        f = "[id\x3d'" + f + "'] ";
                        for (g = h.length; g--;) h[g] = f + r(h[g]);
                        g = X.test(a) && b.parentNode || b;
                        k = h.join(",")
                    }
                    if (k) try {
                        return ca.apply(c, g.querySelectorAll(k)), c
                    } catch (l) {} finally {
                        e || b.removeAttribute("id")
                    }
                }
            }
            var m;
            a: {
                a =
                    a.replace(O, "$1");
                var p, n;
                f = t(a);
                if (!d && 1 === f.length) {
                    if (m = f[0] = f[0].slice(0), 2 < m.length && "ID" === (p = m[0]).type && s.getById && 9 === b.nodeType && S && w.relative[m[1].type]) {
                        if (b = (w.find.ID(p.matches[0].replace(da, ea), b) || [])[0], !b) {
                            m = c;
                            break a
                        }
                        a = a.slice(m.shift().value.length)
                    }
                    for (h = W.needsContext.test(a) ? 0 : m.length; h-- && !(p = m[h], w.relative[e = p.type]);)
                        if ((n = w.find[e]) && (d = n(p.matches[0].replace(da, ea), X.test(m[0].type) && b.parentNode || b))) {
                            if (m.splice(h, 1), a = d.length && r(m), !a) {
                                m = (ca.apply(c, d), c);
                                break a
                            }
                            break
                        }
                }
                m =
                    (Ha(a, f)(d, b, !S, c, X.test(a)), c)
            }
            return m
        }

        function e() {
            function a(c, d) {
                return b.push(c += " ") > w.cacheLength && delete a[b.shift()], a[c] = d
            }
            var b = [];
            return a
        }

        function f(a) {
            return a[D] = !0, a
        }

        function g(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b)
            }
        }

        function h(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
        }

        function k(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || P) - (~a.sourceIndex || P);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function l(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function p(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function n(a) {
            return f(function(b) {
                return b = +b, f(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function m() {}

        function t(a, b) {
            var c, e, f, g, h, k, m;
            if (h = zb[a + " "]) return b ? 0 : h.slice(0);
            h = a;
            k = [];
            for (m = w.preFilter; h;) {
                (!c ||
                    (e = ga.exec(h))) && (e && (h = h.slice(e[0].length) || h), k.push(f = []));
                c = !1;
                (e = ha.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(O, " ")
                }), h = h.slice(c.length));
                for (g in w.filter) !(e = W[g].exec(h)) || m[g] && !(e = m[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? d.error(a) : zb(a, k).slice(0)
        }

        function r(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function q(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = M++;
            return b.first ? function(b,
                c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, k, Ga, m = K + " " + f;
                if (g)
                    for (; b = b[d];) {
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || e)
                                if (Ga = b[D] || (b[D] = {}), (k = Ga[d]) && k[0] === m) {
                                    if (!0 === (h = k[1]) || h === I) return !0 === h
                                } else if (k = Ga[d] = [m], k[1] = a(b, c, g) || I, !0 === k[1]) return !0
            }
        }

        function v(a) {
            return 1 < a.length ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ta(a, b, c, d, e) {
            for (var f, g = [], h = 0, k = a.length, m = null !=
                    b; k > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), m && b.push(h));
            return g
        }

        function y(a, b, c, e, g, h) {
            return e && !e[D] && (e = y(e)), g && !g[D] && (g = y(g, h)), f(function(f, h, k, m) {
                var l, p, n = [],
                    u = [],
                    t = h.length,
                    w;
                if (!(w = f)) {
                    w = b || "*";
                    for (var r = k.nodeType ? [k] : k, s = [], q = 0, v = r.length; v > q; q++) d(w, r[q], s);
                    w = s
                }
                w = !a || !f && b ? w : ta(w, n, a, k, m);
                r = c ? g || (f ? a : t || e) ? [] : h : w;
                if (c && c(w, r, k, m), e) {
                    l = ta(r, u);
                    e(l, [], k, m);
                    for (k = l.length; k--;)(p = l[k]) && (r[u[k]] = !(w[u[k]] = p))
                }
                if (f) {
                    if (g || a) {
                        if (g) {
                            l = [];
                            for (k = r.length; k--;)(p = r[k]) && l.push(w[k] = p);
                            g(null, r = [], l, m)
                        }
                        for (k = r.length; k--;)(p = r[k]) && -1 < (l = g ? ja.call(f, p) : n[k]) && (f[l] = !(h[l] = p))
                    }
                } else r = ta(r === h ? r.splice(t, r.length) : r), g ? g(null, h, r, m) : ca.apply(h, r)
            })
        }

        function x(a) {
            var b, c, d, e = a.length,
                f = w.relative[a[0].type];
            c = f || w.relative[" "];
            for (var g = f ? 1 : 0, h = q(function(a) {
                    return a === b
                }, c, !0), k = q(function(a) {
                    return -1 < ja.call(b, a)
                }, c, !0), m = [function(a, c, d) {
                    return !f && (d || c !== C) || ((b = c).nodeType ? h(a, c, d) : k(a, c, d))
                }]; e > g; g++)
                if (c = w.relative[a[g].type]) m = [q(v(m), c)];
                else {
                    if (c = w.filter[a[g].type].apply(null,
                            a[g].matches), c[D]) {
                        for (d = ++g; e > d && !w.relative[a[d].type]; d++);
                        return y(1 < g && v(m), 1 < g && r(a.slice(0, g - 1).concat({
                            value: " " === a[g - 2].type ? "*" : ""
                        })).replace(O, "$1"), c, d > g && x(a.slice(g, d)), e > d && x(a = a.slice(d)), e > d && r(a))
                    }
                    m.push(c)
                }
            return v(m)
        }

        function rc(a, b) {
            var c = 0,
                e = 0 < b.length,
                g = 0 < a.length,
                h = function(f, h, k, m, l) {
                    var p, n, u = [],
                        t = 0,
                        r = "0",
                        s = f && [],
                        q = null != l,
                        v = C,
                        qc = f || g && w.find.TAG("*", l && h.parentNode || h),
                        R = K += null == v ? 1 : Math.random() || 0.1;
                    for (q && (C = h !== G && h, I = c); null != (l = qc[r]); r++) {
                        if (g && l) {
                            for (p = 0; n = a[p++];)
                                if (n(l,
                                        h, k)) {
                                    m.push(l);
                                    break
                                }
                            q && (K = R, I = ++c)
                        }
                        e && ((l = !n && l) && t--, f && s.push(l))
                    }
                    if (t += r, e && r !== t) {
                        for (p = 0; n = b[p++];) n(s, u, h, k);
                        if (f) {
                            if (0 < t)
                                for (; r--;) s[r] || u[r] || (u[r] = $.call(m));
                            u = ta(u)
                        }
                        ca.apply(m, u);
                        q && !f && 0 < u.length && 1 < t + b.length && d.uniqueSort(m)
                    }
                    return q && (K = R, C = v), s
                };
            return e ? f(h) : h
        }
        var E, s, I, w, ua, Ab, Ha, C, ka, R, G, T, S, A, la, N, z, D = "sizzle" + -new Date,
            J = a.document,
            K = 0,
            M = 0,
            Bb = e(),
            zb = e(),
            L = e(),
            H = !1,
            F = function(a, b) {
                return a === b ? (H = !0, 0) : 0
            },
            B = typeof b,
            P = -2147483648,
            Z = {}.hasOwnProperty,
            fa = [],
            $ = fa.pop,
            aa = fa.push,
            ca = fa.push,
            U = fa.slice,
            ja = fa.indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (this[b] === a) return b;
                return -1
            },
            V = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w#"),
            Y = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?\x3d)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + V + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
            Q = ":((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + Y.replace(3, 8) + ")*)|.*)\\)|)",
            O = RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
                "g"),
            ga = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
            ha = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            X = /[\x20\t\r\n\f]*[+~]/,
            ia = RegExp("\x3d[\\x20\\t\\r\\n\\f]*([^\\]'\"]*)[\\x20\\t\\r\\n\\f]*\\]", "g"),
            ma = RegExp(Q),
            na = RegExp("^" + V + "$"),
            W = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: RegExp("^(" + "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: RegExp("^" + Y),
                PSEUDO: RegExp("^" + Q),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                    "i"),
                bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
                needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[\x3e+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?\x3d[^-]|$)", "i")
            },
            ba = /^[^{]+\{\s*\[native \w/,
            oa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            pa = /^(?:input|select|textarea|button)$/i,
            qa = /^h\d$/i,
            ra = /'|\\/g,
            da = RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)",
                "ig"),
            ea = function(a, b, c) {
                a = "0x" + b - 65536;
                return a !== a || c ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
            };
        try {
            ca.apply(fa = U.call(J.childNodes), J.childNodes), fa[J.childNodes.length].nodeType
        } catch (sa) {
            ca = {
                apply: fa.length ? function(a, b) {
                    aa.apply(a, U.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        Ab = d.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        };
        s = d.support = {};
        R = d.setDocument = function(a) {
            var c =
                a ? a.ownerDocument || a : J;
            a = c.defaultView;
            return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, T = c.documentElement, S = !Ab(c), a && a.attachEvent && a !== a.top && a.attachEvent("onbeforeunload", function() {
                R()
            }), s.attributes = g(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), s.getElementsByTagName = g(function(a) {
                return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
            }), s.getElementsByClassName = g(function(a) {
                return a.innerHTML = "\x3cdiv class\x3d'a'\x3e\x3c/div\x3e\x3cdiv class\x3d'a i'\x3e\x3c/div\x3e",
                    a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), s.getById = g(function(a) {
                return T.appendChild(a).id = D, !c.getElementsByName || !c.getElementsByName(D).length
            }), s.getById ? (w.find.ID = function(a, b) {
                if (typeof b.getElementById !== B && S) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(da, ea);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(da, ea);
                return function(a) {
                    return (a = typeof a.getAttributeNode !==
                        B && a.getAttributeNode("id")) && a.value === b
                }
            }), w.find.TAG = s.getElementsByTagName ? function(a, c) {
                return typeof c.getElementsByTagName !== B ? c.getElementsByTagName(a) : b
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, w.find.CLASS = s.getElementsByClassName && function(a, c) {
                return typeof c.getElementsByClassName !== B && S ? c.getElementsByClassName(a) : b
            }, la = [], A = [], (s.qsa = ba.test(c.querySelectorAll)) && (g(function(a) {
                a.innerHTML = "\x3cselect\x3e\x3coption selected\x3d''\x3e\x3c/option\x3e\x3c/select\x3e";
                a.querySelectorAll("[selected]").length || A.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                a.querySelectorAll(":checked").length || A.push(":checked")
            }), g(function(a) {
                var b = c.createElement("input");
                b.setAttribute("type", "hidden");
                a.appendChild(b).setAttribute("t", "");
                a.querySelectorAll("[t^\x3d'']").length && A.push("[*^$]\x3d[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                a.querySelectorAll(":enabled").length ||
                    A.push(":enabled", ":disabled");
                a.querySelectorAll("*,:x");
                A.push(",.*:")
            })), (s.matchesSelector = ba.test(N = T.webkitMatchesSelector || T.mozMatchesSelector || T.oMatchesSelector || T.msMatchesSelector)) && g(function(a) {
                s.disconnectedMatch = N.call(a, "div");
                N.call(a, "[s!\x3d'']:x");
                la.push("!\x3d", Q)
            }), A = A.length && RegExp(A.join("|")), la = la.length && RegExp(la.join("|")), z = ba.test(T.contains) || T.compareDocumentPosition ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !==
                    d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, F = T.compareDocumentPosition ? function(a, b) {
                if (a === b) return H = !0, 0;
                var d = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                return d ? 1 & d || !s.sortDetached && b.compareDocumentPosition(a) === d ? a === c || z(J, a) ? -1 : b === c || z(J, b) ? 1 : ka ? ja.call(ka, a) - ja.call(ka, b) : 0 : 4 & d ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            } : function(a,
                b) {
                var d, e = 0;
                d = a.parentNode;
                var f = b.parentNode,
                    g = [a],
                    h = [b];
                if (a === b) return H = !0, 0;
                if (!d || !f) return a === c ? -1 : b === c ? 1 : d ? -1 : f ? 1 : ka ? ja.call(ka, a) - ja.call(ka, b) : 0;
                if (d === f) return k(a, b);
                for (d = a; d = d.parentNode;) g.unshift(d);
                for (d = b; d = d.parentNode;) h.unshift(d);
                for (; g[e] === h[e];) e++;
                return e ? k(g[e], h[e]) : g[e] === J ? -1 : h[e] === J ? 1 : 0
            }, c) : G
        };
        d.matches = function(a, b) {
            return d(a, null, null, b)
        };
        d.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== G && R(a), b = b.replace(ia, "\x3d'$1']"), !(!s.matchesSelector || !S || la &&
                    la.test(b) || A && A.test(b))) try {
                var c = N.call(a, b);
                if (c || s.disconnectedMatch || a.document && 11 !== a.document.nodeType) return c
            } catch (e) {}
            return 0 < d(b, G, null, [a]).length
        };
        d.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && R(a), z(a, b)
        };
        d.attr = function(a, c) {
            (a.ownerDocument || a) !== G && R(a);
            var d = w.attrHandle[c.toLowerCase()],
                d = d && Z.call(w.attrHandle, c.toLowerCase()) ? d(a, c, !S) : b;
            return d === b ? s.attributes || !S ? a.getAttribute(c) : (d = a.getAttributeNode(c)) && d.specified ? d.value : null : d
        };
        d.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " +
                a);
        };
        d.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (H = !s.detectDuplicates, ka = !s.sortStable && a.slice(0), a.sort(F), H) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return a
        };
        ua = d.getText = function(a) {
            var b, c = "",
                d = 0;
            if (b = a.nodeType)
                if (1 === b || 9 === b || 11 === b) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += ua(a)
                } else {
                    if (3 === b || 4 === b) return a.nodeValue
                } else
                for (; b = a[d]; d++) c += ua(b);
            return c
        };
        w = d.selectors = {
            cacheLength: 50,
            createPseudo: f,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
                "\x3e": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(da, ea), a[3] = (a[4] || a[5] || "").replace(da, ea), "~\x3d" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || d.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && d.error(a[0]),
                        a
                },
                PSEUDO: function(a) {
                    var c, d = !a[5] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] && a[4] !== b ? a[2] = a[4] : d && ma.test(d) && (c = t(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(da, ea).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = Bb[a + " "];
                    return b || (b = RegExp("(^|[\\x20\\t\\r\\n\\f])" + a + "([\\x20\\t\\r\\n\\f]|$)")) && Bb(a, function(a) {
                        return b.test("string" ==
                            typeof a.className && a.className || typeof a.getAttribute !== B && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(e) {
                        e = d.attr(e, a);
                        return null == e ? "!\x3d" === b : b ? (e += "", "\x3d" === b ? e === c : "!\x3d" === b ? e !== c : "^\x3d" === b ? c && 0 === e.indexOf(c) : "*\x3d" === b ? c && -1 < e.indexOf(c) : "$\x3d" === b ? c && e.slice(-c.length) === c : "~\x3d" === b ? -1 < (" " + e + " ").indexOf(c) : "|\x3d" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" ===
                        b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, k) {
                        var m, l, p, n, u;
                        c = f !== g ? "nextSibling" : "previousSibling";
                        var r = b.parentNode,
                            t = h && b.nodeName.toLowerCase();
                        k = !k && !h;
                        if (r) {
                            if (f) {
                                for (; c;) {
                                    for (l = b; l = l[c];)
                                        if (h ? l.nodeName.toLowerCase() === t : 1 === l.nodeType) return !1;
                                    u = c = "only" === a && !u && "nextSibling"
                                }
                                return !0
                            }
                            if (u = [g ? r.firstChild : r.lastChild], g && k) {
                                k = r[D] || (r[D] = {});
                                m = k[a] || [];
                                n = m[0] === K && m[1];
                                p = m[0] === K && m[2];
                                for (l = n && r.childNodes[n]; l = ++n && l && l[c] || (p = n = 0) || u.pop();)
                                    if (1 === l.nodeType &&
                                        ++p && l === b) {
                                        k[a] = [K, n, p];
                                        break
                                    }
                            } else if (k && (m = (b[D] || (b[D] = {}))[a]) && m[0] === K) p = m[1];
                            else
                                for (;
                                    (l = ++n && l && l[c] || (p = n = 0) || u.pop()) && (!(h ? l.nodeName.toLowerCase() === t : 1 === l.nodeType) || !++p || !(k && ((l[D] || (l[D] = {}))[a] = [K, p]), l === b)););
                            return p -= e, p === d || 0 === p % d && 0 <= p / d
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = w.pseudos[a] || w.setFilters[a.toLowerCase()] || d.error("unsupported pseudo: " + a);
                    return e[D] ? e(b) : 1 < e.length ? (c = [a, a, "", b], w.setFilters.hasOwnProperty(a.toLowerCase()) ? f(function(a, c) {
                        for (var d, f = e(a, b), g =
                                f.length; g--;) d = ja.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: f(function(a) {
                    var b = [],
                        c = [],
                        d = Ha(a.replace(O, "$1"));
                    return d[D] ? f(function(a, b, c, e) {
                        var f;
                        c = d(a, null, e, []);
                        for (e = a.length; e--;)(f = c[e]) && (a[e] = !(b[e] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: f(function(a) {
                    return function(b) {
                        return 0 < d(a, b).length
                    }
                }),
                contains: f(function(a) {
                    return function(b) {
                        return -1 < (b.textContent || b.innerText || ua(b)).indexOf(a)
                    }
                }),
                lang: f(function(a) {
                    return na.test(a ||
                            "") || d.error("unsupported lang: " + a), a = a.replace(da, ea).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = S ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === T
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !(!a.type && !a.href && !~a.tabIndex)
                },
                enabled: function(a) {
                    return !1 ===
                        a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if ("@" < a.nodeName || 3 === a.nodeType || 4 === a.nodeType) return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                },
                first: n(function() {
                    return [0]
                }),
                last: n(function(a, b) {
                    return [b - 1]
                }),
                eq: n(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: n(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: n(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: n(function(a, b, c) {
                    for (b =
                        0 > c ? c + b : c; 0 <= --b;) a.push(b);
                    return a
                }),
                gt: n(function(a, b, c) {
                    for (c = 0 > c ? c + b : c; b > ++c;) a.push(c);
                    return a
                })
            }
        };
        w.pseudos.nth = w.pseudos.eq;
        for (E in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[E] = l(E);
        for (E in {
                submit: !0,
                reset: !0
            }) w.pseudos[E] = p(E);
        m.prototype = w.filters = w.pseudos;
        w.setFilters = new m;
        Ha = d.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = L[a + " "];
            if (!f) {
                b || (b = t(a));
                for (c = b.length; c--;) f = x(b[c]), f[D] ? d.push(f) : e.push(f);
                f = L(a, rc(e, d))
            }
            return f
        };
        s.sortStable = D.split("").sort(F).join("") ===
            D;
        s.detectDuplicates = H;
        R();
        s.sortDetached = g(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        });
        g(function(a) {
            return a.innerHTML = "\x3ca href\x3d'#'\x3e\x3c/a\x3e", "#" === a.firstChild.getAttribute("href")
        }) || h("type|href|height|width", function(a, c, d) {
            return d ? b : a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
        });
        s.attributes && g(function(a) {
            return a.innerHTML = "\x3cinput/\x3e", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || h("value", function(a, c, d) {
            return d ||
                "input" !== a.nodeName.toLowerCase() ? b : a.defaultValue
        });
        g(function(a) {
            return null == a.getAttribute("disabled")
        }) || h("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(a, c, d) {
            var e;
            return d ? b : (e = a.getAttributeNode(c)) && e.specified ? e.value : !0 === a[c] ? c.toLowerCase() : null
        });
        c.find = d;
        c.expr = d.selectors;
        c.expr[":"] = c.expr.pseudos;
        c.unique = d.uniqueSort;
        c.text = d.getText;
        c.isXMLDoc = d.isXML;
        c.contains = d.contains
    })(v);
    var Sa = {};
    c.Callbacks = function(a) {
        a = "string" == typeof a ? Sa[a] || Vb(a) : c.extend({}, a);
        var b, d, e, f, g, h, k = [],
            l = !a.once && [],
            p = function(c) {
                d = a.memory && c;
                e = !0;
                g = h || 0;
                h = 0;
                f = k.length;
                for (b = !0; k && f > g; g++)
                    if (!1 === k[g].apply(c[0], c[1]) && a.stopOnFalse) {
                        d = !1;
                        break
                    }
                b = !1;
                k && (l ? l.length && p(l.shift()) : d ? k = [] : u.disable())
            },
            u = {
                add: function() {
                    if (k) {
                        var e = k.length;
                        (function r(b) {
                            c.each(b, function(b, d) {
                                var e = c.type(d);
                                "function" === e ? a.unique && u.has(d) || k.push(d) : d && d.length && "string" !== e && r(d)
                            })
                        })(arguments);
                        b ? f = k.length : d && (h = e,
                            p(d))
                    }
                    return this
                },
                remove: function() {
                    return k && c.each(arguments, function(a, d) {
                        for (var e; - 1 < (e = c.inArray(d, k, e));) k.splice(e, 1), b && (f >= e && f--, g >= e && g--)
                    }), this
                },
                has: function(a) {
                    return a ? -1 < c.inArray(a, k) : !(!k || !k.length)
                },
                empty: function() {
                    return k = [], f = 0, this
                },
                disable: function() {
                    return k = l = d = n, this
                },
                disabled: function() {
                    return !k
                },
                lock: function() {
                    return l = n, d || u.disable(), this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(a, c) {
                    return !k || e && !l || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? l.push(c) : p(c)), this
                },
                fire: function() {
                    return u.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!e
                }
            };
        return u
    };
    c.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", c.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", c.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", c.Callbacks("memory")]
                ],
                d = "pending",
                e = {
                    state: function() {
                        return d
                    },
                    always: function() {
                        return f.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return c.Deferred(function(d) {
                            c.each(b, function(b, l) {
                                var p = l[0],
                                    n = c.isFunction(a[b]) &&
                                    a[b];
                                f[l[1]](function() {
                                    var a = n && n.apply(this, arguments);
                                    a && c.isFunction(a.promise) ? a.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[p + "With"](this === e ? d.promise() : this, n ? [a] : arguments)
                                })
                            });
                            a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? c.extend(a, e) : e
                    }
                },
                f = {};
            return e.pipe = e.then, c.each(b, function(a, c) {
                var k = c[2],
                    l = c[3];
                e[c[1]] = k.add;
                l && k.add(function() {
                    d = l
                }, b[1 ^ a][2].disable, b[2][2].lock);
                f[c[0]] = function() {
                    return f[c[0] + "With"](this === f ? e : this, arguments), this
                };
                f[c[0] + "With"] =
                    k.fireWith
            }), e.promise(f), a && a.call(f, f), f
        },
        when: function(a) {
            var b = 0,
                d = Z.call(arguments),
                e = d.length,
                f = 1 !== e || a && c.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : c.Deferred(),
                h = function(a, b, c) {
                    return function(d) {
                        b[a] = this;
                        c[a] = 1 < arguments.length ? Z.call(arguments) : d;
                        c === k ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                k, l, p;
            if (1 < e) {
                k = Array(e);
                l = Array(e);
                for (p = Array(e); e > b; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(h(b, p, d)).fail(g.reject).progress(h(b, l, k)) : --f
            }
            return f || g.resolveWith(p, d), g.promise()
        }
    });
    c.support = function(a) {
        var b, d, e, f, g, h, k = q.createElement("div");
        if (k.setAttribute("className", "t"), k.innerHTML = "  \x3clink/\x3e\x3ctable\x3e\x3c/table\x3e\x3ca href\x3d'/a'\x3ea\x3c/a\x3e\x3cinput type\x3d'checkbox'/\x3e", b = k.getElementsByTagName("*") || [], d = k.getElementsByTagName("a")[0], !d || !d.style || !b.length) return a;
        e = q.createElement("select");
        f = e.appendChild(q.createElement("option"));
        b = k.getElementsByTagName("input")[0];
        d.style.cssText = "top:1px;float:left;opacity:.5";
        a.getSetAttribute = "t" !==
            k.className;
        a.leadingWhitespace = 3 === k.firstChild.nodeType;
        a.tbody = !k.getElementsByTagName("tbody").length;
        a.htmlSerialize = !!k.getElementsByTagName("link").length;
        a.style = /top/.test(d.getAttribute("style"));
        a.hrefNormalized = "/a" === d.getAttribute("href");
        a.opacity = /^0.5/.test(d.style.opacity);
        a.cssFloat = !!d.style.cssFloat;
        a.checkOn = !!b.value;
        a.optSelected = f.selected;
        a.enctype = !!q.createElement("form").enctype;
        a.html5Clone = "\x3c:nav\x3e\x3c/:nav\x3e" !== q.createElement("nav").cloneNode(!0).outerHTML;
        a.inlineBlockNeedsLayout = !1;
        a.shrinkWrapBlocks = !1;
        a.pixelPosition = !1;
        a.deleteExpando = !0;
        a.noCloneEvent = !0;
        a.reliableMarginRight = !0;
        a.boxSizingReliable = !0;
        b.checked = !0;
        a.noCloneChecked = b.cloneNode(!0).checked;
        e.disabled = !0;
        a.optDisabled = !f.disabled;
        try {
            delete k.test
        } catch (l) {
            a.deleteExpando = !1
        }
        b = q.createElement("input");
        b.setAttribute("value", "");
        a.input = "" === b.getAttribute("value");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = "t" === b.value;
        b.setAttribute("checked", "t");
        b.setAttribute("name",
            "t");
        d = q.createDocumentFragment();
        d.appendChild(b);
        a.appendChecked = b.checked;
        a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
        k.attachEvent && (k.attachEvent("onclick", function() {
            a.noCloneEvent = !1
        }), k.cloneNode(!0).click());
        for (h in {
                submit: !0,
                change: !0,
                focusin: !0
            }) k.setAttribute(d = "on" + h, "t"), a[h + "Bubbles"] = d in v || !1 === k.attributes[d].expando;
        k.style.backgroundClip = "content-box";
        k.cloneNode(!0).style.backgroundClip = "";
        a.clearCloneStyle = "content-box" === k.style.backgroundClip;
        for (h in c(a)) break;
        return a.ownLast = "0" !== h, c(function() {
            var b, d, e, f = q.getElementsByTagName("body")[0];
            f && (b = q.createElement("div"), b.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", f.appendChild(b).appendChild(k), k.innerHTML = "\x3ctable\x3e\x3ctr\x3e\x3ctd\x3e\x3c/td\x3e\x3ctd\x3et\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e", e = k.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", g = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display =
                "none", a.reliableHiddenOffsets = g && 0 === e[0].offsetHeight, k.innerHTML = "", k.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", c.swap(f, null != f.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    a.boxSizing = 4 === k.offsetWidth
                }), v.getComputedStyle && (a.pixelPosition = "1%" !== (v.getComputedStyle(k, null) || {}).top, a.boxSizingReliable = "4px" === (v.getComputedStyle(k, null) || {
                        width: "4px"
                    }).width, d = k.appendChild(q.createElement("div")),
                    d.style.cssText = k.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", d.style.marginRight = d.style.width = "0", k.style.width = "1px", a.reliableMarginRight = !parseFloat((v.getComputedStyle(d, null) || {}).marginRight)), typeof k.style.zoom !== C && (k.innerHTML = "", k.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1",
                    a.inlineBlockNeedsLayout = 3 === k.offsetWidth, k.style.display = "block", k.innerHTML = "\x3cdiv\x3e\x3c/div\x3e", k.firstChild.style.width = "5px", a.shrinkWrapBlocks = 3 !== k.offsetWidth, a.inlineBlockNeedsLayout && (f.style.zoom = 1)), f.removeChild(b), b = k = e = d = null)
        }), b = e = d = f = d = b = null, a
    }({});
    var Xb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Wb = /([A-Z])/g;
    c.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando], !!a &&
                !xa(a)
        },
        data: function(a, b, c) {
            return Ta(a, b, c)
        },
        removeData: function(a, b) {
            return Ua(a, b)
        },
        _data: function(a, b, c) {
            return Ta(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return Ua(a, b, !0)
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d, e, f = null,
                g = 0,
                h = this[0];
            if (a === n) {
                if (this.length && (f = c.data(h), 1 === h.nodeType && !c._data(h, "parsedAttrs"))) {
                    for (d =
                        h.attributes; d.length > g; g++) e = d[g].name, 0 === e.indexOf("data-") && (e = c.camelCase(e.slice(5)), Va(h, e, f[e]));
                    c._data(h, "parsedAttrs", !0)
                }
                return f
            }
            return "object" == typeof a ? this.each(function() {
                c.data(this, a)
            }) : 1 < arguments.length ? this.each(function() {
                c.data(this, a, b)
            }) : h ? Va(h, a, c.data(h, a)) : null
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            var e;
            return a ? (b = (b || "fx") + "queue", e = c._data(a, b), d && (!e || c.isArray(d) ? e = c._data(a, b, c.makeArray(d)) :
                e.push(d)), e || []) : n
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                e = d.length,
                f = d.shift(),
                g = c._queueHooks(a, b),
                h = function() {
                    c.dequeue(a, b)
                };
            "inprogress" === f && (f = d.shift(), e--);
            f && ("fx" === b && d.unshift("inprogress"), delete g.stop, f.call(a, h, g));
            !e && g && g.empty.fire()
        },
        _queueHooks: function(a, b) {
            var d = b + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function() {
                    c._removeData(a, b + "queue");
                    c._removeData(a, d)
                })
            })
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            var d = 2;
            return "string" !=
                typeof a && (b = a, a = "fx", d--), d > arguments.length ? c.queue(this[0], a) : b === n ? this : this.each(function() {
                    var d = c.queue(this, a, b);
                    c._queueHooks(this, a);
                    "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
                })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = c.fx ? c.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var f = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(f)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var d, e = 1,
                f = c.Deferred(),
                g = this,
                h = this.length,
                k = function() {
                    --e || f.resolveWith(g, [g])
                };
            "string" != typeof a && (b = a, a = n);
            for (a = a || "fx"; h--;)(d = c._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(k));
            return k(), f.promise(b)
        }
    });
    var O, Cb, Ia = /[\t\r\n\f]/g,
        sc = /\r/g,
        tc = /^(?:input|select|textarea|button|object)$/i,
        uc = /^(?:a|area)$/i,
        Ja = /^(?:checked|selected)$/i,
        $ = c.support.getSetAttribute,
        sa = c.support.input;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, c.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this,
                    a)
            })
        },
        prop: function(a, b) {
            return c.access(this, c.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            return a = c.propFix[a] || a, this.each(function() {
                try {
                    this[a] = n, delete this[a]
                } catch (b) {}
            })
        },
        addClass: function(a) {
            var b, d, e, f, g, h = 0,
                k = this.length;
            b = "string" == typeof a && a;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).addClass(a.call(this, b, this.className))
            });
            if (b)
                for (b = (a || "").match(I) || []; k > h; h++)
                    if (d = this[h], e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Ia, " ") : " ")) {
                        for (g = 0; f =
                            b[g++];) 0 > e.indexOf(" " + f + " ") && (e += f + " ");
                        d.className = c.trim(e)
                    }
            return this
        },
        removeClass: function(a) {
            var b, d, e, f, g, h = 0,
                k = this.length;
            b = 0 === arguments.length || "string" == typeof a && a;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).removeClass(a.call(this, b, this.className))
            });
            if (b)
                for (b = (a || "").match(I) || []; k > h; h++)
                    if (d = this[h], e = 1 === d.nodeType && (d.className ? (" " + d.className + " ").replace(Ia, " ") : "")) {
                        for (g = 0; f = b[g++];)
                            for (; 0 <= e.indexOf(" " + f + " ");) e = e.replace(" " + f + " ", " ");
                        d.className = a ? c.trim(e) :
                            ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a;
            return "boolean" == typeof b && "string" === d ? b ? this.addClass(a) : this.removeClass(a) : c.isFunction(a) ? this.each(function(d) {
                c(this).toggleClass(a.call(this, d, this.className, b), b)
            }) : this.each(function() {
                if ("string" === d)
                    for (var b, f = 0, g = c(this), h = a.match(I) || []; b = h[f++];) g.hasClass(b) ? g.removeClass(b) : g.addClass(b);
                else(d === C || "boolean" === d) && (this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this,
                    "__className__") || "")
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, c = this.length; c > b; b++)
                if (1 === this[b].nodeType && 0 <= (" " + this[b].className + " ").replace(Ia, " ").indexOf(a)) return !0;
            return !1
        },
        val: function(a) {
            var b, d, e, f = this[0];
            if (arguments.length) return e = c.isFunction(a), this.each(function(b) {
                var f;
                1 === this.nodeType && (f = e ? a.call(this, b, c(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : c.isArray(f) && (f = c.map(f, function(a) {
                        return null == a ? "" : a + ""
                    })), d = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()],
                    d && "set" in d && d.set(this, f, "value") !== n || (this.value = f))
            });
            if (f) return d = c.valHooks[f.type] || c.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (b = d.get(f, "value")) !== n ? b : (b = f.value, "string" == typeof b ? b.replace(sc, "") : null == b ? "" : b)
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = c.find.attr(a, "value");
                    return null != b ? b : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, k = 0 > e ? h : f ? e : 0; h > k; k++)
                        if (b = d[k], !(!b.selected &&
                                k !== e || (c.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode, "optgroup"))) {
                            if (a = c(b).val(), f) return a;
                            g.push(a)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var d, e, f = a.options, g = c.makeArray(b), h = f.length; h--;) e = f[h], (e.selected = 0 <= c.inArray(c(e).val(), g)) && (d = !0);
                    return d || (a.selectedIndex = -1), g
                }
            }
        },
        attr: function(a, b, d) {
            var e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return typeof a.getAttribute === C ? c.prop(a, b, d) : (1 === g && c.isXMLDoc(a) || (b = b.toLowerCase(),
                e = c.attrHooks[b] || (c.expr.match.bool.test(b) ? Cb : O)), d === n ? e && "get" in e && null !== (f = e.get(a, b)) ? f : (f = c.find.attr(a, b), null == f ? n : f) : null !== d ? e && "set" in e && (f = e.set(a, d, b)) !== n ? f : (a.setAttribute(b, d + ""), d) : (c.removeAttr(a, b), n))
        },
        removeAttr: function(a, b) {
            var d, e, f = 0,
                g = b && b.match(I);
            if (g && 1 === a.nodeType)
                for (; d = g[f++];) e = c.propFix[d] || d, c.expr.match.bool.test(d) ? sa && $ || !Ja.test(d) ? a[e] = !1 : a[c.camelCase("default-" + d)] = a[e] = !1 : c.attr(a, d, ""), a.removeAttribute($ ? d : e)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!c.support.radioValue &&
                        "radio" === b && c.nodeName(a, "input")) {
                        var d = a.value;
                        return a.setAttribute("type", b), d && (a.value = d), b
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !c.isXMLDoc(a), g && (b = c.propFix[b] || b, f = c.propHooks[b]), d !== n ? f && "set" in f && (e = f.set(a, d, b)) !== n ? e : a[b] = d : f && "get" in f && null !== (e = f.get(a, b)) ? e : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = c.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : tc.test(a.nodeName) || uc.test(a.nodeName) &&
                        a.href ? 0 : -1
                }
            }
        }
    });
    Cb = {
        set: function(a, b, d) {
            return !1 === b ? c.removeAttr(a, d) : sa && $ || !Ja.test(d) ? a.setAttribute(!$ && c.propFix[d] || d, d) : a[c.camelCase("default-" + d)] = a[d] = !0, d
        }
    };
    c.each(c.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var d = c.expr.attrHandle[b] || c.find.attr;
        c.expr.attrHandle[b] = sa && $ || !Ja.test(b) ? function(a, b, g) {
            var h = c.expr.attrHandle[b];
            a = g ? n : (c.expr.attrHandle[b] = n) != d(a, b, g) ? b.toLowerCase() : null;
            return c.expr.attrHandle[b] = h, a
        } : function(a, b, d) {
            return d ? n : a[c.camelCase("default-" + b)] ?
                b.toLowerCase() : null
        }
    });
    sa && $ || (c.attrHooks.value = {
        set: function(a, b, d) {
            return c.nodeName(a, "input") ? (a.defaultValue = b, n) : O && O.set(a, b, d)
        }
    });
    $ || (O = {
        set: function(a, b, c) {
            var e = a.getAttributeNode(c);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(c)), e.value = b += "", "value" === c || b === a.getAttribute(c) ? b : n
        }
    }, c.expr.attrHandle.id = c.expr.attrHandle.name = c.expr.attrHandle.coords = function(a, b, c) {
        var e;
        return c ? n : (e = a.getAttributeNode(b)) && "" !== e.value ? e.value : null
    }, c.valHooks.button = {
        get: function(a,
            b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : n
        },
        set: O.set
    }, c.attrHooks.contenteditable = {
        set: function(a, b, c) {
            O.set(a, "" === b ? !1 : b, c)
        }
    }, c.each(["width", "height"], function(a, b) {
        c.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : n
            }
        }
    }));
    c.support.hrefNormalized || c.each(["href", "src"], function(a, b) {
        c.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || n
        },
        set: function(a, b) {
            return a.style.cssText =
                b + ""
        }
    });
    c.support.optSelected || (c.propHooks.selected = {
        get: function(a) {
            a = a.parentNode;
            return a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex), null
        }
    });
    c.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        c.propFix[this.toLowerCase()] = this
    });
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = {
            set: function(a, b) {
                return c.isArray(b) ? a.checked = 0 <= c.inArray(c(a).val(),
                    b) : n
            }
        };
        c.support.checkOn || (c.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var Ka = /^(?:input|select|textarea)$/i,
        vc = /^key/,
        wc = /^(?:mouse|contextmenu)|click/,
        Db = /^(?:focusinfocus|focusoutblur)$/,
        Eb = /^([^.]*)(?:\.(.+)|)$/;
    c.event = {
        global: {},
        add: function(a, b, d, e, f) {
            var g, h, k, l, p, u, m, t, r, q;
            if (k = c._data(a)) {
                d.handler && (l = d, d = l.handler, f = l.selector);
                d.guid || (d.guid = c.guid++);
                (h = k.events) || (h = k.events = {});
                (u = k.handle) || (u = k.handle = function(a) {
                    return typeof c === C ||
                        a && c.event.triggered === a.type ? n : c.event.dispatch.apply(u.elem, arguments)
                }, u.elem = a);
                b = (b || "").match(I) || [""];
                for (k = b.length; k--;) g = Eb.exec(b[k]) || [], r = q = g[1], g = (g[2] || "").split(".").sort(), r && (p = c.event.special[r] || {}, r = (f ? p.delegateType : p.bindType) || r, p = c.event.special[r] || {}, m = c.extend({
                    type: r,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && c.expr.match.needsContext.test(f),
                    namespace: g.join(".")
                }, l), (t = h[r]) || (t = h[r] = [], t.delegateCount = 0, p.setup && !1 !== p.setup.call(a, e, g, u) || (a.addEventListener ?
                    a.addEventListener(r, u, !1) : a.attachEvent && a.attachEvent("on" + r, u))), p.add && (p.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? t.splice(t.delegateCount++, 0, m) : t.push(m), c.event.global[r] = !0);
                a = null
            }
        },
        remove: function(a, b, d, e, f) {
            var g, h, k, l, p, n, m, t, r, q, v, y = c.hasData(a) && c._data(a);
            if (y && (n = y.events)) {
                b = (b || "").match(I) || [""];
                for (p = b.length; p--;)
                    if (k = Eb.exec(b[p]) || [], r = v = k[1], q = (k[2] || "").split(".").sort(), r) {
                        m = c.event.special[r] || {};
                        r = (e ? m.delegateType : m.bindType) || r;
                        t = n[r] || [];
                        k = k[2] && RegExp("(^|\\.)" +
                            q.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (l = g = t.length; g--;) h = t[g], !f && v !== h.origType || d && d.guid !== h.guid || k && !k.test(h.namespace) || e && e !== h.selector && ("**" !== e || !h.selector) || (t.splice(g, 1), h.selector && t.delegateCount--, m.remove && m.remove.call(a, h));
                        l && !t.length && (m.teardown && !1 !== m.teardown.call(a, q, y.handle) || c.removeEvent(a, r, y.handle), delete n[r])
                    } else
                        for (r in n) c.event.remove(a, r + b[p], d, e, !0);
                c.isEmptyObject(n) && (delete y.handle, c._removeData(a, "events"))
            }
        },
        trigger: function(a, b, d, e) {
            var f, g, h,
                k, l, p, u = [d || q],
                m = Q.call(a, "type") ? a.type : a;
            p = Q.call(a, "namespace") ? a.namespace.split(".") : [];
            if (h = f = d = d || q, 3 !== d.nodeType && 8 !== d.nodeType && !Db.test(m + c.event.triggered) && (0 <= m.indexOf(".") && (p = m.split("."), m = p.shift(), p.sort()), g = 0 > m.indexOf(":") && "on" + m, a = a[c.expando] ? a : new c.Event(m, "object" == typeof a && a), a.isTrigger = e ? 2 : 3, a.namespace = p.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, a.result = n, a.target || (a.target = d), b = null == b ? [a] : c.makeArray(b, [a]),
                    l = c.event.special[m] || {}, e || !l.trigger || !1 !== l.trigger.apply(d, b))) {
                if (!e && !l.noBubble && !c.isWindow(d)) {
                    k = l.delegateType || m;
                    for (Db.test(k + m) || (h = h.parentNode); h; h = h.parentNode) u.push(h), f = h;
                    f === (d.ownerDocument || q) && u.push(f.defaultView || f.parentWindow || v)
                }
                for (p = 0;
                    (h = u[p++]) && !a.isPropagationStopped();) a.type = 1 < p ? k : l.bindType || m, (f = (c._data(h, "events") || {})[a.type] && c._data(h, "handle")) && f.apply(h, b), (f = g && h[g]) && c.acceptData(h) && f.apply && !1 === f.apply(h, b) && a.preventDefault();
                if (a.type = m, !e && !a.isDefaultPrevented() &&
                    (!l._default || !1 === l._default.apply(u.pop(), b)) && c.acceptData(d) && g && d[m] && !c.isWindow(d)) {
                    (f = d[g]) && (d[g] = null);
                    c.event.triggered = m;
                    try {
                        d[m]()
                    } catch (t) {}
                    c.event.triggered = n;
                    f && (d[g] = f)
                }
                return a.result
            }
        },
        dispatch: function(a) {
            a = c.event.fix(a);
            var b, d, e, f, g, h = [],
                k = Z.call(arguments);
            b = (c._data(this, "events") || {})[a.type] || [];
            var l = c.event.special[a.type] || {};
            if (k[0] = a, a.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, a)) {
                h = c.event.handlers.call(this, a, b);
                for (b = 0;
                    (f = h[b++]) && !a.isPropagationStopped();) {
                    a.currentTarget =
                        f.elem;
                    for (g = 0;
                        (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((c.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, k), d !== n && !1 === (a.result = d) && (a.preventDefault(), a.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var d, e, f, g, h = [],
                k = b.delegateCount,
                l = a.target;
            if (k && l.nodeType && (!a.button || "click" !== a.type))
                for (; l != this; l = l.parentNode ||
                    this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== a.type)) {
                        f = [];
                        for (g = 0; k > g; g++) e = b[g], d = e.selector + " ", f[d] === n && (f[d] = e.needsContext ? 0 <= c(d, this).index(l) : c.find(d, this, null, [l]).length), f[d] && f.push(e);
                        f.length && h.push({
                            elem: l,
                            handlers: f
                        })
                    }
            return b.length > k && h.push({
                elem: this,
                handlers: b.slice(k)
            }), h
        },
        fix: function(a) {
            if (a[c.expando]) return a;
            var b, d, e;
            b = a.type;
            var f = a,
                g = this.fixHooks[b];
            g || (this.fixHooks[b] = g = wc.test(b) ? this.mouseHooks : vc.test(b) ? this.keyHooks : {});
            e = g.props ? this.props.concat(g.props) :
                this.props;
            a = new c.Event(f);
            for (b = e.length; b--;) d = e[b], a[d] = f[d];
            return a.target || (a.target = f.srcElement || q), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                    a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, e, f, g = b.button,
                    h = b.fromElement;
                return null == a.pageX && null != b.clientX && (e = a.target.ownerDocument || q, f = e.documentElement, c = e.body, a.pageX = b.clientX + (f && f.scrollLeft || c && c.scrollLeft || 0) - (f && f.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (f && f.scrollTop || c && c.scrollTop || 0) - (f && f.clientTop || c && c.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget =
                    h === a.target ? b.toElement : h), a.which || g === n || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== Wa() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === Wa() && this.blur ? (this.blur(), !1) : n
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return c.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : n
                },
                _default: function(a) {
                    return c.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !==
                        n && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, d, e) {
            a = c.extend(new c.Event, d, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() && d.preventDefault()
        }
    };
    c.removeEvent = q.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        b = "on" + b;
        a.detachEvent && (typeof a[b] === C && (a[b] = null), a.detachEvent(b, c))
    };
    c.Event = function(a, b) {
        return this instanceof c.Event ? (a && a.type ? (this.originalEvent =
            a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? na : V) : this.type = a, b && c.extend(this, b), this.timeStamp = a && a.timeStamp || c.now(), this[c.expando] = !0, n) : new c.Event(a, b)
    };
    c.Event.prototype = {
        isDefaultPrevented: V,
        isPropagationStopped: V,
        isImmediatePropagationStopped: V,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = na;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a =
                this.originalEvent;
            this.isPropagationStopped = na;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = na;
            this.stopPropagation()
        }
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var e, f = a.relatedTarget,
                    g = a.handleObj;
                return (!f || f !== this && !c.contains(this, f)) && (a.type = g.origType, e = g.handler.apply(this, arguments), a.type = b), e
            }
        }
    });
    c.support.submitBubbles ||
        (c.event.special.submit = {
            setup: function() {
                return c.nodeName(this, "form") ? !1 : (c.event.add(this, "click._submit keypress._submit", function(a) {
                    a = a.target;
                    (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : n) && !c._data(a, "submitBubbles") && (c.event.add(a, "submit._submit", function(a) {
                        a._submit_bubble = !0
                    }), c._data(a, "submitBubbles", !0))
                }), n)
            },
            postDispatch: function(a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
            },
            teardown: function() {
                return c.nodeName(this,
                    "form") ? !1 : (c.event.remove(this, "._submit"), n)
            }
        });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            return Ka.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (c.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), c.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1);
                c.event.simulate("change", this, a, !0)
            })), !1) : (c.event.add(this, "beforeactivate._change",
                function(a) {
                    a = a.target;
                    Ka.test(a.nodeName) && !c._data(a, "changeBubbles") && (c.event.add(a, "change._change", function(a) {
                        !this.parentNode || a.isSimulated || a.isTrigger || c.event.simulate("change", this.parentNode, a, !0)
                    }), c._data(a, "changeBubbles", !0))
                }), n)
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : n
        },
        teardown: function() {
            return c.event.remove(this, "._change"), !Ka.test(this.nodeName)
        }
    });
    c.support.focusinBubbles ||
        c.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var d = 0,
                e = function(a) {
                    c.event.simulate(b, a.target, c.event.fix(a), !0)
                };
            c.event.special[b] = {
                setup: function() {
                    0 === d++ && q.addEventListener(a, e, !0)
                },
                teardown: function() {
                    0 === --d && q.removeEventListener(a, e, !0)
                }
            }
        });
    c.fn.extend({
        on: function(a, b, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof b && (d = d || b, b = n);
                for (g in a) this.on(g, b, d, a[g], f);
                return this
            }
            if (null == d && null == e ? (e = b, d = b = n) : null == e && ("string" == typeof b ? (e = d, d = n) : (e = d, d = b, b = n)), !1 === e) e =
                V;
            else if (!e) return this;
            return 1 === f && (h = e, e = function(a) {
                return c().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = c.guid++)), this.each(function() {
                c.event.add(this, a, e, d, b)
            })
        },
        one: function(a, b, c, e) {
            return this.on(a, b, c, e, 1)
        },
        off: function(a, b, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) return e = a.handleObj, c(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a) this.off(f, b, a[f]);
                return this
            }
            return (!1 === b || "function" ==
                typeof b) && (d = b, b = n), !1 === d && (d = V), this.each(function() {
                c.event.remove(this, a, d, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var d = this[0];
            return d ? c.event.trigger(a, b, d, !0) : n
        }
    });
    var Yb = /^.[^:#\[\.,]*$/,
        xc = /^(?:parents|prev(?:Until|All))/,
        Fb = c.expr.match.needsContext,
        yc = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    c.fn.extend({
        find: function(a) {
            var b, d = [],
                e = this,
                f = e.length;
            if ("string" != typeof a) return this.pushStack(c(a).filter(function() {
                for (b =
                    0; f > b; b++)
                    if (c.contains(e[b], this)) return !0
            }));
            for (b = 0; f > b; b++) c.find(a, e[b], d);
            return d = this.pushStack(1 < f ? c.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        has: function(a) {
            var b, d = c(a, this),
                e = d.length;
            return this.filter(function() {
                for (b = 0; e > b; b++)
                    if (c.contains(this, d[b])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(ya(this, a || [], !0))
        },
        filter: function(a) {
            return this.pushStack(ya(this, a || [], !1))
        },
        is: function(a) {
            return !!ya(this, "string" == typeof a && Fb.test(a) ? c(a) : a || [], !1).length
        },
        closest: function(a, b) {
            for (var d, e = 0, f = this.length, g = [], h = Fb.test(a) || "string" != typeof a ? c(a, b || this.context) : 0; f > e; e++)
                for (d = this[e]; d && d !== b; d = d.parentNode)
                    if (11 > d.nodeType && (h ? -1 < h.index(d) : 1 === d.nodeType && c.find.matchesSelector(d, a))) {
                        g.push(d);
                        break
                    }
            return this.pushStack(1 < g.length ? c.unique(g) : g)
        },
        index: function(a) {
            return a ? "string" == typeof a ? c.inArray(this[0], c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            var d = "string" ==
                typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
                d = c.merge(this.get(), d);
            return this.pushStack(c.unique(d))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return Xa(a, "nextSibling")
        },
        prev: function(a) {
            return Xa(a, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a,
                "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, e) {
            var f = c.map(this, b, d);
            return "Until" !==
                a.slice(-5) && (e = d), e && "string" == typeof e && (f = c.filter(e, f)), 1 < this.length && (yc[a] || (f = c.unique(f)), xc.test(a) && (f = f.reverse())), this.pushStack(f)
        }
    });
    c.extend({
        filter: function(a, b, d) {
            var e = b[0];
            return d && (a = ":not(" + a + ")"), 1 === b.length && 1 === e.nodeType ? c.find.matchesSelector(e, a) ? [e] : [] : c.find.matches(a, c.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        },
        dir: function(a, b, d) {
            var e = [];
            for (a = a[b]; a && 9 !== a.nodeType && (d === n || 1 !== a.nodeType || !c(a).is(d));) 1 === a.nodeType && e.push(a), a = a[b];
            return e
        },
        sibling: function(a,
            b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Za = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        zc = / jQuery\d+="(?:null|\d+)"/g,
        Gb = RegExp("\x3c(?:" + Za + ")[\\s/\x3e]", "i"),
        La = /^\s+/,
        Hb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ib = /<([\w:]+)/,
        Jb = /<tbody/i,
        Ac = /<|&#?\w+;/,
        Bc = /<(?:script|style|link)/i,
        Aa = /^(?:checkbox|radio)$/i,
        Cc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Kb = /^$|\/(?:java|ecma)script/i,
        Zb = /^true\/(.*)/,
        Dc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        E = {
            option: [1, "\x3cselect multiple\x3d'multiple'\x3e", "\x3c/select\x3e"],
            legend: [1, "\x3cfieldset\x3e", "\x3c/fieldset\x3e"],
            area: [1, "\x3cmap\x3e", "\x3c/map\x3e"],
            param: [1, "\x3cobject\x3e", "\x3c/object\x3e"],
            thead: [1, "\x3ctable\x3e", "\x3c/table\x3e"],
            tr: [2, "\x3ctable\x3e\x3ctbody\x3e", "\x3c/tbody\x3e\x3c/table\x3e"],
            col: [2, "\x3ctable\x3e\x3ctbody\x3e\x3c/tbody\x3e\x3ccolgroup\x3e",
                "\x3c/colgroup\x3e\x3c/table\x3e"
            ],
            td: [3, "\x3ctable\x3e\x3ctbody\x3e\x3ctr\x3e", "\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e"],
            _default: c.support.htmlSerialize ? [0, "", ""] : [1, "X\x3cdiv\x3e", "\x3c/div\x3e"]
        },
        Ma = Ya(q).appendChild(q.createElement("div"));
    E.optgroup = E.option;
    E.tbody = E.tfoot = E.colgroup = E.caption = E.thead;
    E.th = E.td;
    c.fn.extend({
        text: function(a) {
            return c.access(this, function(a) {
                return a === n ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || q).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && $a(this, a).appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = $a(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode &&
                    this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var d, e = a ? c.filter(a, this) : this, f = 0; null != (d = e[f]); f++) b || 1 !== d.nodeType || c.cleanData(y(d)), d.parentNode && (b && c.contains(d.ownerDocument, d) && za(y(d, "script")), d.parentNode.removeChild(d));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && c.cleanData(y(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && c.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a,
            b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            return c.access(this, function(a) {
                var d = this[0] || {},
                    e = 0,
                    f = this.length;
                if (a === n) return 1 === d.nodeType ? d.innerHTML.replace(zc, "") : n;
                if (!("string" != typeof a || Bc.test(a) || !c.support.htmlSerialize && Gb.test(a) || !c.support.leadingWhitespace && La.test(a) || E[(Ib.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Hb, "\x3c$1\x3e\x3c/$2\x3e");
                    try {
                        for (; f > e; e++) d = this[e] || {}, 1 === d.nodeType && (c.cleanData(y(d, !1)),
                            d.innerHTML = a);
                        d = 0
                    } catch (g) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = c.map(this, function(a) {
                    return [a.nextSibling, a.parentNode]
                }),
                b = 0;
            return this.domManip(arguments, function(d) {
                var e = a[b++],
                    f = a[b++];
                f && (e && e.parentNode !== f && (e = this.nextSibling), c(this).remove(), f.insertBefore(d, e))
            }, !0), b ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, d) {
            a = vb.apply([], a);
            var e, f, g, h, k = 0,
                l = this.length,
                p = this,
                n = l - 1,
                m = a[0],
                t = c.isFunction(m);
            if (t || !(1 >= l || "string" != typeof m || c.support.checkClone) && Cc.test(m)) return this.each(function(c) {
                var e = p.eq(c);
                t && (a[0] = m.call(this, c, e.html()));
                e.domManip(a, b, d)
            });
            if (l && (h = c.buildFragment(a, this[0].ownerDocument, !1, !d && this), e = h.firstChild, 1 === h.childNodes.length && (h = e), e)) {
                g = c.map(y(h, "script"), ab);
                for (f = g.length; l > k; k++) e = h, k !== n && (e = c.clone(e, !0, !0), f && c.merge(g, y(e, "script"))), b.call(this[k], e, k);
                if (f) {
                    h = g[g.length - 1].ownerDocument;
                    c.map(g, bb);
                    for (k = 0; f > k; k++) e = g[k], Kb.test(e.type || "") && !c._data(e,
                        "globalEval") && c.contains(h, e) && (e.src ? c._evalUrl(e.src) : c.globalEval((e.text || e.textContent || e.innerHTML || "").replace(Dc, "")))
                }
                h = e = null
            }
            return this
        }
    });
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(a) {
            for (var e = 0, f = [], g = c(a), h = g.length - 1; h >= e; e++) a = e === h ? this : this.clone(!0), c(g[e])[b](a), Ea.apply(f, a.get());
            return this.pushStack(f)
        }
    });
    c.extend({
        clone: function(a, b, d) {
            var e, f, g, h, k, l = c.contains(a.ownerDocument,
                a);
            if (c.support.html5Clone || c.isXMLDoc(a) || !Gb.test("\x3c" + a.nodeName + "\x3e") ? g = a.cloneNode(!0) : (Ma.innerHTML = a.outerHTML, Ma.removeChild(g = Ma.firstChild)), !(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a))) {
                e = y(g);
                k = y(a);
                for (h = 0; null != (f = k[h]); ++h)
                    if (e[h]) {
                        var p = e[h],
                            n = void 0,
                            m = void 0,
                            t = void 0;
                        if (1 === p.nodeType) {
                            if (n = p.nodeName.toLowerCase(), !c.support.noCloneEvent && p[c.expando]) {
                                t = c._data(p);
                                for (m in t.events) c.removeEvent(p, m, t.handle);
                                p.removeAttribute(c.expando)
                            }
                            "script" ===
                            n && p.text !== f.text ? (ab(p).text = f.text, bb(p)) : "object" === n ? (p.parentNode && (p.outerHTML = f.outerHTML), c.support.html5Clone && f.innerHTML && !c.trim(p.innerHTML) && (p.innerHTML = f.innerHTML)) : "input" === n && Aa.test(f.type) ? (p.defaultChecked = p.checked = f.checked, p.value !== f.value && (p.value = f.value)) : "option" === n ? p.defaultSelected = p.selected = f.defaultSelected : ("input" === n || "textarea" === n) && (p.defaultValue = f.defaultValue)
                        }
                    }
            }
            if (b)
                if (d) {
                    k = k || y(a);
                    e = e || y(g);
                    for (h = 0; null != (f = k[h]); h++) cb(f, e[h])
                } else cb(a, g);
            return e =
                y(g, "script"), 0 < e.length && za(e, !l && y(a, "script")), g
        },
        buildFragment: function(a, b, d, e) {
            for (var f, g, h, k, l, n, u, m = a.length, t = Ya(b), r = [], q = 0; m > q; q++)
                if (g = a[q], g || 0 === g)
                    if ("object" === c.type(g)) c.merge(r, g.nodeType ? [g] : g);
                    else if (Ac.test(g)) {
                k = k || t.appendChild(b.createElement("div"));
                l = (Ib.exec(g) || ["", ""])[1].toLowerCase();
                u = E[l] || E._default;
                k.innerHTML = u[1] + g.replace(Hb, "\x3c$1\x3e\x3c/$2\x3e") + u[2];
                for (f = u[0]; f--;) k = k.lastChild;
                if (!c.support.leadingWhitespace && La.test(g) && r.push(b.createTextNode(La.exec(g)[0])), !c.support.tbody)
                    for (f = (g = "table" !== l || Jb.test(g) ? "\x3ctable\x3e" !== u[1] || Jb.test(g) ? 0 : k : k.firstChild) && g.childNodes.length; f--;) c.nodeName(n = g.childNodes[f], "tbody") && !n.childNodes.length && g.removeChild(n);
                c.merge(r, k.childNodes);
                for (k.textContent = ""; k.firstChild;) k.removeChild(k.firstChild);
                k = t.lastChild
            } else r.push(b.createTextNode(g));
            k && t.removeChild(k);
            c.support.appendChecked || c.grep(y(r, "input"), $b);
            for (q = 0; g = r[q++];)
                if ((!e || -1 === c.inArray(g, e)) && (h = c.contains(g.ownerDocument, g), k = y(t.appendChild(g),
                        "script"), h && za(k), d))
                    for (f = 0; g = k[f++];) Kb.test(g.type || "") && d.push(g);
            return t
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, k = c.expando, l = c.cache, n = c.support.deleteExpando, q = c.event.special; null != (d = a[h]); h++)
                if ((b || c.acceptData(d)) && (f = d[k], g = f && l[f])) {
                    if (g.events)
                        for (e in g.events) q[e] ? c.event.remove(d, e) : c.removeEvent(d, e, g.handle);
                    l[f] && (delete l[f], n ? delete d[k] : typeof d.removeAttribute !== C ? d.removeAttribute(k) : d[k] = null, U.push(f))
                }
        },
        _evalUrl: function(a) {
            return c.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    c.fn.extend({
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b =
                    c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(d) {
                c(this).wrapAll(b ? a.call(this, d) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var X, B, P, Na = /alpha\([^)]*\)/i,
        Ec = /opacity\s*=\s*([^)]*)/,
        Fc = /^(top|right|bottom|left)$/,
        Gc = /^(none|table(?!-c[ea]).+)/,
        Lb = /^margin/,
        ac = RegExp("^(" + ra + ")(.*)$", "i"),
        W = RegExp("^(" + ra + ")(?!px)[a-z%]+$", "i"),
        Hc =
        RegExp("^([+-])\x3d(" + ra + ")", "i"),
        kb = {
            BODY: "block"
        },
        Ic = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Mb = {
            letterSpacing: 0,
            fontWeight: 400
        },
        F = ["Top", "Right", "Bottom", "Left"],
        eb = ["Webkit", "O", "Moz", "ms"];
    c.fn.extend({
        css: function(a, b) {
            return c.access(this, function(a, b, f) {
                var g, h = {},
                    k = 0;
                if (c.isArray(b)) {
                    g = B(a);
                    for (f = b.length; f > k; k++) h[b[k]] = c.css(a, b[k], !1, g);
                    return h
                }
                return f !== n ? c.style(a, b, f) : c.css(a, b)
            }, a, b, 1 < arguments.length)
        },
        show: function() {
            return fb(this, !0)
        },
        hide: function() {
            return fb(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                ha(this) ? c(this).show() : c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = P(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f,
                    g, h, k = c.camelCase(b),
                    l = a.style;
                if (b = c.cssProps[k] || (c.cssProps[k] = db(l, k)), h = c.cssHooks[b] || c.cssHooks[k], d === n) return h && "get" in h && (f = h.get(a, !1, e)) !== n ? f : l[b];
                if (g = typeof d, "string" === g && (f = Hc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(c.css(a, b)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || c.cssNumber[k] || (d += "px"), c.support.clearCloneStyle || "" !== d || 0 !== b.indexOf("background") || (l[b] = "inherit"), h && "set" in h && (d = h.set(a, d, e)) === n))) try {
                    l[b] = d
                } catch (p) {}
            }
        },
        css: function(a, b, d, e) {
            var f,
                g, h, k = c.camelCase(b);
            return b = c.cssProps[k] || (c.cssProps[k] = db(a.style, k)), h = c.cssHooks[b] || c.cssHooks[k], h && "get" in h && (g = h.get(a, !0, d)), g === n && (g = P(a, b, e)), "normal" === g && b in Mb && (g = Mb[b]), "" === d || d ? (f = parseFloat(g), !0 === d || c.isNumeric(f) ? f || 0 : g) : g
        }
    });
    v.getComputedStyle ? (B = function(a) {
        return v.getComputedStyle(a, null)
    }, P = function(a, b, d) {
        var e, f, g, h = (d = d || B(a)) ? d.getPropertyValue(b) || d[b] : n,
            k = a.style;
        return d && ("" !== h || c.contains(a.ownerDocument, a) || (h = c.style(a, b)), W.test(h) && Lb.test(b) && (e = k.width,
            f = k.minWidth, g = k.maxWidth, k.minWidth = k.maxWidth = k.width = h, h = d.width, k.width = e, k.minWidth = f, k.maxWidth = g)), h
    }) : q.documentElement.currentStyle && (B = function(a) {
        return a.currentStyle
    }, P = function(a, b, c) {
        var e, f, g;
        c = (c = c || B(a)) ? c[b] : n;
        var h = a.style;
        return null == c && h && h[b] && (c = h[b]), W.test(c) && !Fc.test(b) && (e = h.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : c, c = h.pixelLeft + "px", h.left = e, g && (f.left = g)), "" === c ? "auto" : c
    });
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(a, e, f) {
                return e ? 0 === a.offsetWidth && Gc.test(c.css(a, "display")) ? c.swap(a, Ic, function() {
                    return jb(a, b, f)
                }) : jb(a, b, f) : n
            },
            set: function(a, e, f) {
                var g = f && B(a);
                return hb(a, e, f ? ib(a, b, f, c.support.boxSizing && "border-box" === c.css(a, "boxSizing", !1, g), g) : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return Ec.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style,
                e = a.currentStyle,
                f = c.isNumeric(b) ?
                "alpha(opacity\x3d" + 100 * b + ")" : "",
                g = e && e.filter || d.filter || "";
            d.zoom = 1;
            (1 <= b || "" === b) && "" === c.trim(g.replace(Na, "")) && d.removeAttribute && (d.removeAttribute("filter"), "" === b || e && !e.filter) || (d.filter = Na.test(g) ? g.replace(Na, f) : g + " " + f)
        }
    });
    c(function() {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function(a, b) {
                return b ? c.swap(a, {
                    display: "inline-block"
                }, P, [a, "marginRight"]) : n
            }
        });
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function(a, b) {
            c.cssHooks[b] = {
                get: function(a, e) {
                    return e ?
                        (e = P(a, b), W.test(e) ? c(a).position()[b] + "px" : e) : n
                }
            }
        })
    });
    c.expr && c.expr.filters && (c.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || c.css(a, "display"))
    }, c.expr.filters.visible = function(a) {
        return !c.expr.filters.hidden(a)
    });
    c.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        c.cssHooks[a + b] = {
            expand: function(c) {
                var e = 0,
                    f = {};
                for (c = "string" == typeof c ? c.split(" ") : [c]; 4 > e; e++) f[a + F[e] + b] = c[e] || c[e - 2] ||
                    c[0];
                return f
            }
        };
        Lb.test(a) || (c.cssHooks[a + b].set = hb)
    });
    var Jc = /%20/g,
        bc = /\[\]$/,
        Nb = /\r?\n/g,
        Kc = /^(?:submit|button|image|reset|file)$/i,
        Lc = /^(?:input|select|textarea|keygen)/i;
    c.fn.extend({
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = c.prop(this, "elements");
                return a ? c.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !c(this).is(":disabled") && Lc.test(this.nodeName) && !Kc.test(a) && (this.checked || !Aa.test(a))
            }).map(function(a,
                b) {
                var d = c(this).val();
                return null == d ? null : c.isArray(d) ? c.map(d, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Nb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: d.replace(Nb, "\r\n")
                }
            }).get()
        }
    });
    c.param = function(a, b) {
        var d, e = [],
            f = function(a, b) {
                b = c.isFunction(b) ? b() : null == b ? "" : b;
                e[e.length] = encodeURIComponent(a) + "\x3d" + encodeURIComponent(b)
            };
        if (b === n && (b = c.ajaxSettings && c.ajaxSettings.traditional), c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
            f(this.name, this.value)
        });
        else
            for (d in a) Ba(d, a[d], b, f);
        return e.join("\x26").replace(Jc, "+")
    };
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        c.fn[b] = function(a, c) {
            return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b)
        }
    });
    c.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a,
            b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, e) {
            return this.on(b, a, c, e)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var aa, H, Oa = c.now(),
        Pa = /\?/,
        Mc = /#.*$/,
        Ob = /([?&])_=[^&]*/,
        Nc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Oc = /^(?:GET|HEAD)$/,
        Pc = /^\/\//,
        Pb = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Qb = c.fn.load,
        Rb = {},
        Ca = {},
        Sb = "*/".concat("*");
    try {
        H = dc.href
    } catch (Tc) {
        H = q.createElement("a"), H.href = "", H = H.href
    }
    aa = Pb.exec(H.toLowerCase()) || [];
    c.fn.load =
        function(a, b, d) {
            if ("string" != typeof a && Qb) return Qb.apply(this, arguments);
            var e, f, g, h = this,
                k = a.indexOf(" ");
            return 0 <= k && (e = a.slice(k, a.length), a = a.slice(0, k)), c.isFunction(b) ? (d = b, b = n) : b && "object" == typeof b && (g = "POST"), 0 < h.length && c.ajax({
                url: a,
                type: g,
                dataType: "html",
                data: b
            }).done(function(a) {
                f = arguments;
                h.html(e ? c("\x3cdiv\x3e").append(c.parseHTML(a)).find(e) : a)
            }).complete(d && function(a, b) {
                h.each(d, f || [a.responseText, b, a])
            }), this
        };
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
        function(a, b) {
            c.fn[b] = function(a) {
                return this.on(b, a)
            }
        });
    c.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: H,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(aa[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset\x3dUTF-8",
            accepts: {
                "*": Sb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": c.parseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Da(Da(a, c.ajaxSettings), b) : Da(c.ajaxSettings, a)
        },
        ajaxPrefilter: mb(Rb),
        ajaxTransport: mb(Ca),
        ajax: function(a, b) {
            function d(a, b, d, e) {
                var f, q, u, G, x = b;
                if (2 !== B) {
                    B = 2;
                    k && clearTimeout(k);
                    p = n;
                    h = e || "";
                    s.readyState = 0 < a ? 4 : 0;
                    e = 200 <= a && 300 > a || 304 === a;
                    if (d) {
                        u = m;
                        for (var C = s, A, H, N, z, D = u.contents, J = u.dataTypes;
                            "*" === J[0];) J.shift(),
                            H === n && (H = u.mimeType || C.getResponseHeader("Content-Type"));
                        if (H)
                            for (z in D)
                                if (D[z] && D[z].test(H)) {
                                    J.unshift(z);
                                    break
                                }
                        if (J[0] in d) N = J[0];
                        else {
                            for (z in d) {
                                if (!J[0] || u.converters[z + " " + J[0]]) {
                                    N = z;
                                    break
                                }
                                A || (A = z)
                            }
                            N = N || A
                        }
                        u = N ? (N !== J[0] && J.unshift(N), d[N]) : n
                    }
                    var K;
                    a: {
                        d = m;
                        A = u;
                        H = s;
                        N = e;
                        var M, I, F;
                        u = {};
                        C = d.dataTypes.slice();
                        if (C[1])
                            for (M in d.converters) u[M.toLowerCase()] = d.converters[M];
                        for (z = C.shift(); z;)
                            if (d.responseFields[z] && (H[d.responseFields[z]] = A), !F && N && d.dataFilter && (A = d.dataFilter(A, d.dataType)), F =
                                z, z = C.shift())
                                if ("*" === z) z = F;
                                else if ("*" !== F && F !== z) {
                            if (M = u[F + " " + z] || u["* " + z], !M)
                                for (K in u)
                                    if (I = K.split(" "), I[1] === z && (M = u[F + " " + I[0]] || u["* " + I[0]])) {
                                        !0 === M ? M = u[K] : !0 !== u[K] && (z = I[0], C.unshift(I[1]));
                                        break
                                    }
                            if (!0 !== M)
                                if (M && d["throws"]) A = M(A);
                                else try {
                                    A = M(A)
                                } catch (L) {
                                    K = {
                                        state: "parsererror",
                                        error: M ? L : "No conversion from " + F + " to " + z
                                    };
                                    break a
                                }
                        }
                        K = {
                            state: "success",
                            data: A
                        }
                    }
                    u = K;
                    e ? (m.ifModified && (G = s.getResponseHeader("Last-Modified"), G && (c.lastModified[g] = G), G = s.getResponseHeader("etag"), G && (c.etag[g] =
                        G)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, f = u.data, q = u.error, e = !q)) : (q = x, (a || !x) && (x = "error", 0 > a && (a = 0)));
                    s.status = a;
                    s.statusText = (b || x) + "";
                    e ? v.resolveWith(t, [f, x, s]) : v.rejectWith(t, [s, x, q]);
                    s.statusCode(E);
                    E = n;
                    l && r.trigger(e ? "ajaxSuccess" : "ajaxError", [s, m, e ? f : q]);
                    y.fireWith(t, [s, x]);
                    l && (r.trigger("ajaxComplete", [s, m]), --c.active || c.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (b = a, a = n);
            b = b || {};
            var e, f, g, h, k, l, p, q, m = c.ajaxSetup({}, b),
                t = m.context || m,
                r = m.context &&
                (t.nodeType || t.jquery) ? c(t) : c.event,
                v = c.Deferred(),
                y = c.Callbacks("once memory"),
                E = m.statusCode || {},
                x = {},
                C = {},
                B = 0,
                F = "canceled",
                s = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === B) {
                            if (!q)
                                for (q = {}; b = Nc.exec(h);) q[b[1].toLowerCase()] = b[2];
                            b = q[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === B ? h : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return B || (a = C[c] = C[c] || a, x[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return B || (m.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > B)
                                for (b in a) E[b] = [E[b], a[b]];
                            else s.always(a[s.status]);
                        return this
                    },
                    abort: function(a) {
                        a = a || F;
                        return p && p.abort(a), d(0, a), this
                    }
                };
            if (v.promise(s).complete = y.add, s.success = s.done, s.error = s.fail, m.url = ((a || m.url || H) + "").replace(Mc, "").replace(Pc, aa[1] + "//"), m.type = b.method || b.type || m.method || m.type, m.dataTypes = c.trim(m.dataType || "*").toLowerCase().match(I) || [""], null == m.crossDomain && (e = Pb.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === aa[1] && e[2] === aa[2] && (e[3] || ("http:" === e[1] ? "80" :
                    "443")) === (aa[3] || ("http:" === aa[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = c.param(m.data, m.traditional)), nb(Rb, m, b, s), 2 === B) return s;
            (l = m.global) && 0 === c.active++ && c.event.trigger("ajaxStart");
            m.type = m.type.toUpperCase();
            m.hasContent = !Oc.test(m.type);
            g = m.url;
            m.hasContent || (m.data && (g = m.url += (Pa.test(g) ? "\x26" : "?") + m.data, delete m.data), !1 === m.cache && (m.url = Ob.test(g) ? g.replace(Ob, "$1_\x3d" + Oa++) : g + (Pa.test(g) ? "\x26" : "?") + "_\x3d" + Oa++));
            m.ifModified && (c.lastModified[g] &&
                s.setRequestHeader("If-Modified-Since", c.lastModified[g]), c.etag[g] && s.setRequestHeader("If-None-Match", c.etag[g]));
            (m.data && m.hasContent && !1 !== m.contentType || b.contentType) && s.setRequestHeader("Content-Type", m.contentType);
            s.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Sb + "; q\x3d0.01" : "") : m.accepts["*"]);
            for (f in m.headers) s.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (!1 === m.beforeSend.call(t, s, m) || 2 === B)) return s.abort();
            F = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) s[f](m[f]);
            if (p = nb(Ca, m, b, s)) {
                s.readyState = 1;
                l && r.trigger("ajaxSend", [s, m]);
                m.async && 0 < m.timeout && (k = setTimeout(function() {
                    s.abort("timeout")
                }, m.timeout));
                try {
                    B = 1, p.send(x, d)
                } catch (L) {
                    if (!(2 > B)) throw L;
                    d(-1, L)
                }
            } else d(-1, "No Transport");
            return s
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        getScript: function(a, b) {
            return c.get(a, n, b, "script")
        }
    });
    c.each(["get", "post"], function(a, b) {
        c[b] = function(a, e, f, g) {
            return c.isFunction(e) && (g = g || f, f = e, e =
                n), c.ajax({
                url: a,
                type: b,
                dataType: g,
                data: e,
                success: f
            })
        }
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return c.globalEval(a), a
            }
        }
    });
    c.ajaxPrefilter("script", function(a) {
        a.cache === n && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    c.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, d = q.head || c("head")[0] || q.documentElement;
            return {
                send: function(c,
                    f) {
                    b = q.createElement("script");
                    b.async = !0;
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, "success"))
                    };
                    d.insertBefore(b, d.firstChild)
                },
                abort: function() {
                    b && b.onload(n, !0)
                }
            }
        }
    });
    var Tb = [],
        Qa = /(=)\?(?=&|$)|\?\?/;
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Tb.pop() || c.expando + "_" + Oa++;
            return this[a] = !0, a
        }
    });
    c.ajaxPrefilter("json jsonp", function(a, b, d) {
        var e, f, g, h = !1 !== a.jsonp && (Qa.test(a.url) ? "url" : "string" == typeof a.data && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Qa.test(a.data) && "data");
        return h || "jsonp" === a.dataTypes[0] ? (e = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Qa, "$1" + e) : !1 !== a.jsonp && (a.url += (Pa.test(a.url) ? "\x26" : "?") + a.jsonp + "\x3d" + e), a.converters["script json"] = function() {
            return g || c.error(e +
                " was not called"), g[0]
        }, a.dataTypes[0] = "json", f = v[e], v[e] = function() {
            g = arguments
        }, d.always(function() {
            v[e] = f;
            a[e] && (a.jsonpCallback = b.jsonpCallback, Tb.push(e));
            g && c.isFunction(f) && f(g[0]);
            g = f = n
        }), "script") : n
    });
    var ga, ma, Qc = 0,
        Ra = v.ActiveXObject && function() {
            for (var a in ga) ga[a](n, !0)
        };
    c.ajaxSettings.xhr = v.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && ob())) a: {
            try {
                a = new v.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (b) {}
            a = void 0
        }
        return a
    } : ob;
    ma = c.ajaxSettings.xhr();
    c.support.cors = !!ma &&
        "withCredentials" in ma;
    (ma = c.support.ajax = !!ma) && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(d, e) {
                    var f, g, h = a.xhr();
                    if (a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async), a.xhrFields)
                        for (g in a.xhrFields) h[g] = a.xhrFields[g];
                    a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
                    a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (g in d) h.setRequestHeader(g, d[g])
                    } catch (k) {}
                    h.send(a.hasContent &&
                        a.data || null);
                    b = function(d, g) {
                        var k, m, q, r;
                        try {
                            if (b && (g || 4 === h.readyState))
                                if (b = n, f && (h.onreadystatechange = c.noop, Ra && delete ga[f]), g) 4 !== h.readyState && h.abort();
                                else {
                                    r = {};
                                    k = h.status;
                                    m = h.getAllResponseHeaders();
                                    "string" == typeof h.responseText && (r.text = h.responseText);
                                    try {
                                        q = h.statusText
                                    } catch (v) {
                                        q = ""
                                    }
                                    k || !a.isLocal || a.crossDomain ? 1223 === k && (k = 204) : k = r.text ? 200 : 404
                                }
                        } catch (x) {
                            g || e(-1, x)
                        }
                        r && e(k, q, r, m)
                    };
                    a.async ? 4 === h.readyState ? setTimeout(b) : (f = ++Qc, Ra && (ga || (ga = {}, c(v).unload(Ra)), ga[f] = b), h.onreadystatechange =
                        b) : b()
                },
                abort: function() {
                    b && b(n, !0)
                }
            }
        }
    });
    var Y, va, Rc = /^(?:toggle|show|hide)$/,
        Ub = RegExp("^(?:([+-])\x3d|)(" + ra + ")([a-z%]*)$", "i"),
        Sc = /queueHooks$/,
        ba = [function(a, b, d) {
            var e, f, g, h, k, l = this,
                n = {},
                q = a.style,
                m = a.nodeType && ha(a),
                t = c._data(a, "fxshow");
            d.queue || (h = c._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, k = h.empty.fire, h.empty.fire = function() {
                h.unqueued || k()
            }), h.unqueued++, l.always(function() {
                l.always(function() {
                    h.unqueued--;
                    c.queue(a, "fx").length || h.empty.fire()
                })
            }));
            1 === a.nodeType && ("height" in
                b || "width" in b) && (d.overflow = [q.overflow, q.overflowX, q.overflowY], "inline" === c.css(a, "display") && "none" === c.css(a, "float") && (c.support.inlineBlockNeedsLayout && "inline" !== gb(a.nodeName) ? q.zoom = 1 : q.display = "inline-block"));
            d.overflow && (q.overflow = "hidden", c.support.shrinkWrapBlocks || l.always(function() {
                q.overflow = d.overflow[0];
                q.overflowX = d.overflow[1];
                q.overflowY = d.overflow[2]
            }));
            for (e in b)
                if (f = b[e], Rc.exec(f))
                    if (!(delete b[e], g = g || "toggle" === f, f === (m ? "hide" : "show"))) n[e] = t && t[e] || c.style(a, e);
            if (!c.isEmptyObject(n))
                for (e in t ?
                    "hidden" in t && (m = t.hidden) : t = c._data(a, "fxshow", {}), g && (t.hidden = !m), m ? c(a).show() : l.done(function() {
                        c(a).hide()
                    }), l.done(function() {
                        var b;
                        c._removeData(a, "fxshow");
                        for (b in n) c.style(a, b, n[b])
                    }), n) b = qb(m ? t[e] : 0, e, l), e in t || (t[e] = b.start, m && (b.end = b.start, b.start = "width" === e || "height" === e ? 1 : 0))
        }],
        ia = {
            "*": [function(a, b) {
                var d = this.createTween(a, b),
                    e = d.cur(),
                    f = Ub.exec(b),
                    g = f && f[3] || (c.cssNumber[a] ? "" : "px"),
                    h = (c.cssNumber[a] || "px" !== g && +e) && Ub.exec(c.css(d.elem, a)),
                    k = 1,
                    l = 20;
                if (h && h[3] !== g) {
                    g = g || h[3];
                    f = f || [];
                    h = +e || 1;
                    do k = k || ".5", h /= k, c.style(d.elem, a, h + g); while (k !== (k = d.cur() / e) && 1 !== k && --l)
                }
                return f && (h = d.start = +h || +e || 0, d.unit = g, d.end = f[1] ? h + (f[1] + 1) * f[2] : +f[2]), d
            }]
        };
    c.Animation = c.extend(rb, {
        tweener: function(a, b) {
            c.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var d, e = 0, f = a.length; f > e; e++) d = a[e], ia[d] = ia[d] || [], ia[d].unshift(b)
        },
        prefilter: function(a, b) {
            b ? ba.unshift(a) : ba.push(a)
        }
    });
    c.Tween = x;
    x.prototype = {
        constructor: x,
        init: function(a, b, d, e, f, g) {
            this.elem = a;
            this.prop = d;
            this.easing = f || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = g || (c.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var a = x.propHooks[this.prop];
            return a && a.get ? a.get(this) : x.propHooks._default.get(this)
        },
        run: function(a) {
            var b, d = x.propHooks[this.prop];
            return this.pos = b = this.options.duration ? c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : x.propHooks._default.set(this),
                this
        }
    };
    x.prototype.init.prototype = x.prototype;
    x.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = c.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                c.fx.step[a.prop] ? c.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    x.propHooks.scrollTop = x.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode &&
                (a.elem[a.prop] = a.now)
        }
    };
    c.each(["toggle", "show", "hide"], function(a, b) {
        var d = c.fn[b];
        c.fn[b] = function(a, c, g) {
            return null == a || "boolean" == typeof a ? d.apply(this, arguments) : this.animate(oa(b, !0), a, c, g)
        }
    });
    c.fn.extend({
        fadeTo: function(a, b, c, e) {
            return this.filter(ha).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, e)
        },
        animate: function(a, b, d, e) {
            var f = c.isEmptyObject(a),
                g = c.speed(b, d, e);
            b = function() {
                var b = rb(this, c.extend({}, a), g);
                (f || c._data(this, "finish")) && b.stop(!0)
            };
            return b.finish = b, f || !1 === g.queue ?
                this.each(b) : this.queue(g.queue, b)
        },
        stop: function(a, b, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop;
                b(d)
            };
            return "string" != typeof a && (d = b, b = a, a = n), b && !1 !== a && this.queue(a || "fx", []), this.each(function() {
                var b = !0,
                    g = null != a && a + "queueHooks",
                    h = c.timers,
                    k = c._data(this);
                if (g) k[g] && k[g].stop && e(k[g]);
                else
                    for (g in k) k[g] && k[g].stop && Sc.test(g) && e(k[g]);
                for (g = h.length; g--;) h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(d), b = !1, h.splice(g, 1));
                (b || !d) && c.dequeue(this, a)
            })
        },
        finish: function(a) {
            return !1 !==
                a && (a = a || "fx"), this.each(function() {
                    var b, d = c._data(this),
                        e = d[a + "queue"];
                    b = d[a + "queueHooks"];
                    var f = c.timers,
                        g = e ? e.length : 0;
                    d.finish = !0;
                    c.queue(this, a, []);
                    b && b.stop && b.stop.call(this, !0);
                    for (b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) e[b] && e[b].finish && e[b].finish.call(this);
                    delete d.finish
                })
        }
    });
    c.each({
            slideDown: oa("show"),
            slideUp: oa("hide"),
            slideToggle: oa("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        },
        function(a, b) {
            c.fn[a] = function(a, c, f) {
                return this.animate(b, a, c, f)
            }
        });
    c.speed = function(a, b, d) {
        var e = a && "object" == typeof a ? c.extend({}, a) : {
            complete: d || !d && b || c.isFunction(a) && a,
            duration: a,
            easing: d && b || b && !c.isFunction(b) && b
        };
        return e.duration = c.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default, (null == e.queue || !0 === e.queue) && (e.queue = "fx"), e.old = e.complete, e.complete = function() {
            c.isFunction(e.old) && e.old.call(this);
            e.queue && c.dequeue(this,
                e.queue)
        }, e
    };
    c.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = x.prototype.init;
    c.fx.tick = function() {
        var a, b = c.timers,
            d = 0;
        for (Y = c.now(); b.length > d; d++) a = b[d], a() || b[d] !== a || b.splice(d--, 1);
        b.length || c.fx.stop();
        Y = n
    };
    c.fx.timer = function(a) {
        a() && c.timers.push(a) && c.fx.start()
    };
    c.fx.interval = 13;
    c.fx.start = function() {
        va || (va = setInterval(c.fx.tick, c.fx.interval))
    };
    c.fx.stop = function() {
        clearInterval(va);
        va = null
    };
    c.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    c.fx.step = {};
    c.expr && c.expr.filters && (c.expr.filters.animated = function(a) {
        return c.grep(c.timers, function(b) {
            return a === b.elem
        }).length
    });
    c.fn.offset = function(a) {
        if (arguments.length) return a === n ? this : this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        var b, d, e = {
                top: 0,
                left: 0
            },
            f = this[0],
            g = f && f.ownerDocument;
        if (g) return b = g.documentElement, c.contains(b, f) ? (typeof f.getBoundingClientRect !== C && (e = f.getBoundingClientRect()), d = sb(g), {
            top: e.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || 0),
            left: e.left +
                (d.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
        }) : e
    };
    c.offset = {
        setOffset: function(a, b, d) {
            var e = c.css(a, "position");
            "static" === e && (a.style.position = "relative");
            var f = c(a),
                g = f.offset(),
                h = c.css(a, "top"),
                k = c.css(a, "left"),
                l = {},
                n = {},
                q, m;
            ("absolute" === e || "fixed" === e) && -1 < c.inArray("auto", [h, k]) ? (n = f.position(), q = n.top, m = n.left) : (q = parseFloat(h) || 0, m = parseFloat(k) || 0);
            c.isFunction(b) && (b = b.call(a, d, g));
            null != b.top && (l.top = b.top - g.top + q);
            null != b.left && (l.left = b.left - g.left + m);
            "using" in b ? b.using.call(a, l) :
                f.css(l)
        }
    };
    c.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, d = {
                        top: 0,
                        left: 0
                    },
                    e = this[0];
                return "fixed" === c.css(e, "position") ? b = e.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), c.nodeName(a[0], "html") || (d = a.offset()), d.top += c.css(a[0], "borderTopWidth", !0), d.left += c.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - c.css(e, "marginTop", !0),
                    left: b.left - d.left - c.css(e, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || ub; a && !c.nodeName(a,
                        "html") && "static" === c.css(a, "position");) a = a.offsetParent;
                return a || ub
            })
        }
    });
    c.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var d = /Y/.test(b);
        c.fn[a] = function(e) {
            return c.access(this, function(a, e, h) {
                var k = sb(a);
                return h === n ? k ? b in k ? k[b] : k.document.documentElement[e] : a[e] : (k ? k.scrollTo(d ? c(k).scrollLeft() : h, d ? h : c(k).scrollTop()) : a[e] = h, n)
            }, a, e, arguments.length, null)
        }
    });
    c.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        c.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(d,
            e) {
            c.fn[e] = function(e, g) {
                var h = arguments.length && (d || "boolean" != typeof e),
                    k = d || (!0 === e || !0 === g ? "margin" : "border");
                return c.access(this, function(b, d, e) {
                    var f;
                    return c.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : e === n ? c.css(b, d, k) : c.style(b, d, e, k)
                }, b, h ? e : n, h, null)
            }
        })
    });
    c.fn.size = function() {
        return this.length
    };
    c.fn.andSelf = c.fn.addBack;
    "object" == typeof module && module &&
        "object" == typeof module.exports ? module.exports = c : (v.jQuery = v.$ = c, "function" == typeof define && define.amd && define("jquery", [], function() {
            return c
        }))
})(window);
if ("undefined" == typeof jQuery) throw Error("Bootstrap requires jQuery"); + function(b) {
    b.fn.emulateTransitionEnd = function(c) {
        var f = !1,
            a = this;
        b(this).one(b.support.transition.end, function() {
            f = !0
        });
        return setTimeout(function() {
            f || b(a).trigger(b.support.transition.end)
        }, c), this
    };
    b(function() {
        var c = b.support,
            f;
        a: {
            f = document.createElement("bootstrap");
            var a = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                },
                d;
            for (d in a)
                if (void 0 !== f.style[d]) {
                    f = {
                        end: a[d]
                    };
                    break a
                }
            f = void 0
        }
        c.transition =
            f
    })
}(jQuery); + function(b) {
    var c = function(a) {
        b(a).on("click", '[data-dismiss\x3d"alert"]', this.close)
    };
    c.prototype.close = function(a) {
        function d() {
            h.trigger("closed.bs.alert").remove()
        }
        var e = b(this),
            c = e.attr("data-target");
        c || (c = e.attr("href"), c = c && c.replace(/.*(?=#[^\s]*$)/, ""));
        var h = b(c);
        a && a.preventDefault();
        h.length || (h = e.hasClass("alert") ? e : e.parent());
        h.trigger(a = b.Event("close.bs.alert"));
        a.isDefaultPrevented() || (h.removeClass("in"), b.support.transition && h.hasClass("fade") ? h.one(b.support.transition.end, d).emulateTransitionEnd(150) :
            d())
    };
    var f = b.fn.alert;
    b.fn.alert = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.alert");
            e || d.data("bs.alert", e = new c(this));
            "string" == typeof a && e[a].call(d)
        })
    };
    b.fn.alert.Constructor = c;
    b.fn.alert.noConflict = function() {
        return b.fn.alert = f, this
    };
    b(document).on("click.bs.alert.data-api", '[data-dismiss\x3d"alert"]', c.prototype.close)
}(jQuery); + function(b) {
    var c = function(a, d) {
        this.$element = b(a);
        this.options = b.extend({}, c.DEFAULTS, d)
    };
    c.DEFAULTS = {
        loadingText: "loading..."
    };
    c.prototype.setState = function(a) {
        var b = this.$element,
            e = b.is("input") ? "val" : "html",
            c = b.data();
        a += "Text";
        c.resetText || b.data("resetText", b[e]());
        b[e](c[a] || this.options[a]);
        setTimeout(function() {
            "loadingText" == a ? b.addClass("disabled").attr("disabled", "disabled") : b.removeClass("disabled").removeAttr("disabled")
        }, 0)
    };
    c.prototype.toggle = function() {
        var a = this.$element.closest('[data-toggle\x3d"buttons"]'),
            b = !0;
        if (a.length) {
            var e = this.$element.find("input");
            "radio" === e.prop("type") && (e.prop("checked") && this.$element.hasClass("active") ? b = !1 : a.find(".active").removeClass("active"));
            b && e.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        b && this.$element.toggleClass("active")
    };
    var f = b.fn.button;
    b.fn.button = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.button"),
                g = "object" == typeof a && a;
            e || d.data("bs.button", e = new c(this, g));
            "toggle" == a ? e.toggle() : a && e.setState(a)
        })
    };
    b.fn.button.Constructor = c;
    b.fn.button.noConflict = function() {
        return b.fn.button = f, this
    };
    b(document).on("click.bs.button.data-api", "[data-toggle^\x3dbutton]", function(a) {
        var d = b(a.target);
        d.hasClass("btn") || (d = d.closest(".btn"));
        d.button("toggle");
        a.preventDefault()
    })
}(jQuery); + function(b) {
    var c = function(a, d) {
        this.$element = b(a);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = d;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        "hover" == this.options.pause && this.$element.on("mouseenter", b.proxy(this.pause, this)).on("mouseleave", b.proxy(this.cycle, this))
    };
    c.DEFAULTS = {
        interval: 5E3,
        pause: "hover",
        wrap: !0
    };
    c.prototype.cycle = function(a) {
        return a || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused &&
            (this.interval = setInterval(b.proxy(this.next, this), this.options.interval)), this
    };
    c.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    };
    c.prototype.to = function(a) {
        var d = this,
            e = this.getActiveIndex();
        return a > this.$items.length - 1 || 0 > a ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            d.to(a)
        }) : e == a ? this.pause().cycle() : this.slide(a > e ? "next" : "prev", b(this.$items[a]))
    };
    c.prototype.pause = function(a) {
        return a || (this.paused = !0), this.$element.find(".next, .prev").length && b.support.transition.end && (this.$element.trigger(b.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    };
    c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    };
    c.prototype.slide = function(a, d) {
        var e = this.$element.find(".item.active"),
            c = d || e[a](),
            h = this.interval,
            k = "next" ==
            a ? "left" : "right",
            l = "next" == a ? "first" : "last",
            f = this;
        if (!c.length) {
            if (!this.options.wrap) return;
            c = this.$element.find(".item")[l]()
        }
        this.sliding = !0;
        h && this.pause();
        l = b.Event("slide.bs.carousel", {
            relatedTarget: c[0],
            direction: k
        });
        if (!c.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
                    var a = b(f.$indicators.children()[f.getActiveIndex()]);
                    a && a.addClass("active")
                })), b.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(l),
                    l.isDefaultPrevented()) return;
                c.addClass(a);
                c[0].offsetWidth;
                e.addClass(k);
                c.addClass(k);
                e.one(b.support.transition.end, function() {
                    c.removeClass([a, k].join(" ")).addClass("active");
                    e.removeClass(["active", k].join(" "));
                    f.sliding = !1;
                    setTimeout(function() {
                        f.$element.trigger("slid.bs.carousel")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                e.removeClass("active");
                c.addClass("active");
                this.sliding = !1;
                this.$element.trigger("slid.bs.carousel")
            }
            return h &&
                this.cycle(), this
        }
    };
    var f = b.fn.carousel;
    b.fn.carousel = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.carousel"),
                g = b.extend({}, c.DEFAULTS, d.data(), "object" == typeof a && a),
                h = "string" == typeof a ? a : g.slide;
            e || d.data("bs.carousel", e = new c(this, g));
            "number" == typeof a ? e.to(a) : h ? e[h]() : g.interval && e.pause().cycle()
        })
    };
    b.fn.carousel.Constructor = c;
    b.fn.carousel.noConflict = function() {
        return b.fn.carousel = f, this
    };
    b(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(a) {
        var d,
            e = b(this),
            c = b(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        d = b.extend({}, c.data(), e.data());
        var h = e.attr("data-slide-to");
        h && (d.interval = !1);
        c.carousel(d);
        (h = e.attr("data-slide-to")) && c.data("bs.carousel").to(h);
        a.preventDefault()
    });
    b(window).on("load", function() {
        b('[data-ride\x3d"carousel"]').each(function() {
            var a = b(this);
            a.carousel(a.data())
        })
    })
}(jQuery); + function(b) {
    var c = function(a, d) {
        this.$element = b(a);
        this.options = b.extend({}, c.DEFAULTS, d);
        this.transitioning = null;
        this.options.parent && (this.$parent = b(this.options.parent));
        this.options.toggle && this.toggle()
    };
    c.DEFAULTS = {
        toggle: !0
    };
    c.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height"
    };
    c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var a = b.Event("show.bs.collapse");
            if (this.$element.trigger(a), !a.isDefaultPrevented()) {
                if ((a = this.$parent &&
                        this.$parent.find("\x3e .panel \x3e .in")) && a.length) {
                    var d = a.data("bs.collapse");
                    if (d && d.transitioning) return;
                    a.collapse("hide");
                    d || a.data("bs.collapse", null)
                }
                var e = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[e](0);
                this.transitioning = 1;
                a = function() {
                    this.$element.removeClass("collapsing").addClass("in")[e]("auto");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!b.support.transition) return a.call(this);
                d = b.camelCase(["scroll", e].join("-"));
                this.$element.one(b.support.transition.end,
                    b.proxy(a, this)).emulateTransitionEnd(350)[e](this.$element[0][d])
            }
        }
    };
    c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var a = b.Event("hide.bs.collapse");
            if (this.$element.trigger(a), !a.isDefaultPrevented()) {
                a = this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight;
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
                this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0;
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return b.support.transition ? (this.$element[a](0).one(b.support.transition.end, b.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this)
            }
        }
    };
    c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var f = b.fn.collapse;
    b.fn.collapse = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.collapse"),
                g = b.extend({}, c.DEFAULTS, d.data(), "object" == typeof a && a);
            e || d.data("bs.collapse", e = new c(this, g));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.collapse.Constructor = c;
    b.fn.collapse.noConflict =
        function() {
            return b.fn.collapse = f, this
        };
    b(document).on("click.bs.collapse.data-api", "[data-toggle\x3dcollapse]", function(a) {
        var d, e = b(this);
        a = e.attr("data-target") || a.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "");
        d = b(a);
        var c = (a = d.data("bs.collapse")) ? "toggle" : e.data(),
            h = e.attr("data-parent"),
            k = h && b(h);
        a && a.transitioning || (k && k.find('[data-toggle\x3dcollapse][data-parent\x3d"' + h + '"]').not(e).addClass("collapsed"), e[d.hasClass("in") ? "addClass" : "removeClass"]("collapsed"));
        d.collapse(c)
    })
}(jQuery); + function(b) {
    function c() {
        b(a).remove();
        b(d).each(function(a) {
            var d = f(b(this));
            d.hasClass("open") && (d.trigger(a = b.Event("hide.bs.dropdown")), a.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function f(a) {
        var d = a.attr("data-target");
        d || (d = a.attr("href"), d = d && /#/.test(d) && d.replace(/.*(?=#[^\s]*$)/, ""));
        return (d = d && b(d)) && d.length ? d : a.parent()
    }
    var a = ".dropdown-backdrop",
        d = "[data-toggle\x3ddropdown]",
        e = function(a) {
            b(a).on("click.bs.dropdown", this.toggle)
        };
    e.prototype.toggle =
        function(a) {
            var d = b(this);
            if (!d.is(".disabled, :disabled")) {
                var e = f(d),
                    g = e.hasClass("open");
                if (c(), !g) {
                    if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav").length && b('\x3cdiv class\x3d"dropdown-backdrop"/\x3e').insertAfter(b(this)).on("click", c), e.trigger(a = b.Event("show.bs.dropdown")), a.isDefaultPrevented()) return;
                    e.toggleClass("open").trigger("shown.bs.dropdown");
                    d.focus()
                }
                return !1
            }
        };
    e.prototype.keydown = function(a) {
        if (/(38|40|27)/.test(a.keyCode)) {
            var e = b(this);
            if (a.preventDefault(),
                a.stopPropagation(), !e.is(".disabled, :disabled")) {
                var c = f(e),
                    g = c.hasClass("open");
                if (!g || g && 27 == a.keyCode) return 27 == a.which && c.find(d).focus(), e.click();
                e = b("[role\x3dmenu] li:not(.divider):visible a", c);
                e.length && (c = e.index(e.filter(":focus")), 38 == a.keyCode && 0 < c && c--, 40 == a.keyCode && c < e.length - 1 && c++, ~c || (c = 0), e.eq(c).focus())
            }
        }
    };
    var g = b.fn.dropdown;
    b.fn.dropdown = function(a) {
        return this.each(function() {
            var d = b(this),
                c = d.data("bs.dropdown");
            c || d.data("bs.dropdown", c = new e(this));
            "string" == typeof a &&
                c[a].call(d)
        })
    };
    b.fn.dropdown.Constructor = e;
    b.fn.dropdown.noConflict = function() {
        return b.fn.dropdown = g, this
    };
    b(document).on("click.bs.dropdown.data-api", c).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", d, e.prototype.toggle).on("keydown.bs.dropdown.data-api", d + ", [role\x3dmenu]", e.prototype.keydown)
}(jQuery); + function(b) {
    var c = function(a, d) {
        this.options = d;
        this.$element = b(a);
        this.$backdrop = this.isShown = null;
        this.options.remote && this.$element.load(this.options.remote)
    };
    c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    c.prototype.toggle = function(a) {
        return this[this.isShown ? "hide" : "show"](a)
    };
    c.prototype.show = function(a) {
        var d = this,
            e = b.Event("show.bs.modal", {
                relatedTarget: a
            });
        this.$element.trigger(e);
        this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss\x3d"modal"]',
            b.proxy(this.hide, this)), this.backdrop(function() {
            var e = b.support.transition && d.$element.hasClass("fade");
            d.$element.parent().length || d.$element.appendTo(document.body);
            d.$element.show();
            e && d.$element[0].offsetWidth;
            d.$element.addClass("in").attr("aria-hidden", !1);
            d.enforceFocus();
            var c = b.Event("shown.bs.modal", {
                relatedTarget: a
            });
            e ? d.$element.find(".modal-dialog").one(b.support.transition.end, function() {
                d.$element.focus().trigger(c)
            }).emulateTransitionEnd(300) : d.$element.focus().trigger(c)
        }))
    };
    c.prototype.hide =
        function(a) {
            a && a.preventDefault();
            a = b.Event("hide.bs.modal");
            this.$element.trigger(a);
            this.isShown && !a.isDefaultPrevented() && (this.isShown = !1, this.escape(), b(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), b.support.transition && this.$element.hasClass("fade") ? this.$element.one(b.support.transition.end, b.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        };
    c.prototype.enforceFocus = function() {
        b(document).off("focusin.bs.modal").on("focusin.bs.modal",
            b.proxy(function(a) {
                this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
            }, this))
    };
    c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", b.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    };
    c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide();
        this.backdrop(function() {
            a.removeBackdrop();
            a.$element.trigger("hidden.bs.modal")
        })
    };
    c.prototype.removeBackdrop =
        function() {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null
        };
    c.prototype.backdrop = function(a) {
        var d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = b.support.transition && d;
            if (!(this.$backdrop = b('\x3cdiv class\x3d"modal-backdrop ' + d + '" /\x3e').appendTo(document.body), this.$element.on("click.dismiss.modal", b.proxy(function(a) {
                        a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                    },
                    this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !a)) e ? this.$backdrop.one(b.support.transition.end, a).emulateTransitionEnd(150) : a()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), b.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(b.support.transition.end, a).emulateTransitionEnd(150) : a()) : a && a()
    };
    var f = b.fn.modal;
    b.fn.modal = function(a, d) {
        return this.each(function() {
            var e = b(this),
                g = e.data("bs.modal"),
                h = b.extend({}, c.DEFAULTS, e.data(), "object" ==
                    typeof a && a);
            g || e.data("bs.modal", g = new c(this, h));
            "string" == typeof a ? g[a](d) : h.show && g.show(d)
        })
    };
    b.fn.modal.Constructor = c;
    b.fn.modal.noConflict = function() {
        return b.fn.modal = f, this
    };
    b(document).on("click.bs.modal.data-api", '[data-toggle\x3d"modal"]', function(a) {
        var d = b(this),
            e = d.attr("href"),
            c = b(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            e = c.data("modal") ? "toggle" : b.extend({
                remote: !/#/.test(e) && e
            }, c.data(), d.data());
        a.preventDefault();
        c.modal(e, this).one("hide", function() {
            d.is(":visible") &&
                d.focus()
        })
    });
    b(document).on("show.bs.modal", ".modal", function() {
        b(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        b(document.body).removeClass("modal-open")
    })
}(jQuery); + function(b) {
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init("tooltip", a, b)
    };
    c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '\x3cdiv class\x3d"tooltip"\x3e\x3cdiv class\x3d"tooltip-arrow"\x3e\x3c/div\x3e\x3cdiv class\x3d"tooltip-inner"\x3e\x3c/div\x3e\x3c/div\x3e',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    };
    c.prototype.init = function(a, d, e) {
        this.enabled = !0;
        this.type = a;
        this.$element = b(d);
        this.options = this.getOptions(e);
        a = this.options.trigger.split(" ");
        for (d = a.length; d--;)
            if (e = a[d], "click" == e) this.$element.on("click." + this.type, this.options.selector, b.proxy(this.toggle, this));
            else if ("manual" != e) {
            var c = "hover" == e ? "mouseleave" : "blur";
            this.$element.on(("hover" == e ? "mouseenter" : "focus") + "." + this.type, this.options.selector, b.proxy(this.enter, this));
            this.$element.on(c + "." + this.type, this.options.selector, b.proxy(this.leave, this))
        }
        this.options.selector ? this._options = b.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) :
            this.fixTitle()
    };
    c.prototype.getDefaults = function() {
        return c.DEFAULTS
    };
    c.prototype.getOptions = function(a) {
        return a = b.extend({}, this.getDefaults(), this.$element.data(), a), a.delay && "number" == typeof a.delay && (a.delay = {
            show: a.delay,
            hide: a.delay
        }), a
    };
    c.prototype.getDelegateOptions = function() {
        var a = {},
            d = this.getDefaults();
        return this._options && b.each(this._options, function(b, c) {
            d[b] != c && (a[b] = c)
        }), a
    };
    c.prototype.enter = function(a) {
        var d = a instanceof this.constructor ? a : b(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." +
            this.type);
        return clearTimeout(d.timeout), d.hoverState = "in", d.options.delay && d.options.delay.show ? (d.timeout = setTimeout(function() {
            "in" == d.hoverState && d.show()
        }, d.options.delay.show), void 0) : d.show()
    };
    c.prototype.leave = function(a) {
        var d = a instanceof this.constructor ? a : b(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(d.timeout), d.hoverState = "out", d.options.delay && d.options.delay.hide ? (d.timeout = setTimeout(function() {
                "out" == d.hoverState && d.hide()
            }, d.options.delay.hide),
            void 0) : d.hide()
    };
    c.prototype.show = function() {
        var a = b.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled && !(this.$element.trigger(a), a.isDefaultPrevented())) {
            var d = this.tip();
            this.setContent();
            this.options.animation && d.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
                e = /\s?auto?\s?/i,
                c = e.test(a);
            c && (a = a.replace(e, "") || "top");
            d.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a);
            this.options.container ?
                d.appendTo(this.options.container) : d.insertAfter(this.$element);
            var e = this.getPosition(),
                h = d[0].offsetWidth,
                f = d[0].offsetHeight;
            if (c) {
                var l = this.$element.parent(),
                    c = a,
                    m = document.documentElement.scrollTop || document.body.scrollTop,
                    n = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
                    p = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
                    l = "body" == this.options.container ? 0 : l.offset().left,
                    a = "bottom" == a && e.top + e.height + f - m > p ? "top" : "top" == a && 0 > e.top - m - f ? "bottom" : "right" == a && e.right +
                    h > n ? "left" : "left" == a && e.left - h < l ? "right" : a;
                d.removeClass(c).addClass(a)
            }
            d = this.getCalculatedOffset(a, e, h, f);
            this.applyPlacement(d, a);
            this.$element.trigger("shown.bs." + this.type)
        }
    };
    c.prototype.applyPlacement = function(a, b) {
        var e, c = this.tip(),
            h = c[0].offsetWidth,
            f = c[0].offsetHeight,
            l = parseInt(c.css("margin-top"), 10),
            m = parseInt(c.css("margin-left"), 10);
        isNaN(l) && (l = 0);
        isNaN(m) && (m = 0);
        a.top += l;
        a.left += m;
        c.offset(a).addClass("in");
        l = c[0].offsetWidth;
        m = c[0].offsetHeight;
        ("top" == b && m != f && (e = !0, a.top = a.top +
            f - m), /bottom|top/.test(b)) ? (f = 0, 0 > a.left && (f = -2 * a.left, a.left = 0, c.offset(a), l = c[0].offsetWidth), this.replaceArrow(f - h + l, l, "left")) : this.replaceArrow(m - f, m, "top");
        e && c.offset(a)
    };
    c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    };
    c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b);
        a.removeClass("fade in top bottom left right")
    };
    c.prototype.hide = function() {
        function a() {
            "in" != d.hoverState && c.detach()
        }
        var d = this,
            c = this.tip(),
            g = b.Event("hide.bs." + this.type);
        return this.$element.trigger(g), g.isDefaultPrevented() ? void 0 : (c.removeClass("in"), b.support.transition && this.$tip.hasClass("fade") ? c.one(b.support.transition.end, a).emulateTransitionEnd(150) : a(), this.$element.trigger("hidden.bs." + this.type), this)
    };
    c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    };
    c.prototype.hasContent =
        function() {
            return this.getTitle()
        };
    c.prototype.getPosition = function() {
        var a = this.$element[0];
        return b.extend({}, "function" == typeof a.getBoundingClientRect ? a.getBoundingClientRect() : {
            width: a.offsetWidth,
            height: a.offsetHeight
        }, this.$element.offset())
    };
    c.prototype.getCalculatedOffset = function(a, b, c, g) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - g,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - g / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - g / 2,
            left: b.left +
                b.width
        }
    };
    c.prototype.getTitle = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-original-title") || ("function" == typeof b.title ? b.title.call(a[0]) : b.title)
    };
    c.prototype.tip = function() {
        return this.$tip = this.$tip || b(this.options.template)
    };
    c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    };
    c.prototype.enable = function() {
        this.enabled = !0
    };
    c.prototype.disable = function() {
        this.enabled = !1
    };
    c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    c.prototype.toggle = function(a) {
        a = a ? b(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        a.tip().hasClass("in") ? a.leave(a) : a.enter(a)
    };
    c.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var f = b.fn.tooltip;
    b.fn.tooltip = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.tooltip"),
                g = "object" ==
                typeof a && a;
            e || d.data("bs.tooltip", e = new c(this, g));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.tooltip.Constructor = c;
    b.fn.tooltip.noConflict = function() {
        return b.fn.tooltip = f, this
    }
}(jQuery); + function(b) {
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!b.fn.tooltip) throw Error("Popover requires tooltip.js");
    c.DEFAULTS = b.extend({}, b.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '\x3cdiv class\x3d"popover"\x3e\x3cdiv class\x3d"arrow"\x3e\x3c/div\x3e\x3ch3 class\x3d"popover-title"\x3e\x3c/h3\x3e\x3cdiv class\x3d"popover-content"\x3e\x3c/div\x3e\x3c/div\x3e'
    });
    c.prototype = b.extend({}, b.fn.tooltip.Constructor.prototype);
    c.prototype.constructor = c;
    c.prototype.getDefaults =
        function() {
            return c.DEFAULTS
        };
    c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b);
        a.find(".popover-content")[this.options.html ? "html" : "text"](c);
        a.removeClass("fade top bottom left right in");
        a.find(".popover-title").html() || a.find(".popover-title").hide()
    };
    c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    };
    c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    c.prototype.tip = function() {
        return this.$tip || (this.$tip = b(this.options.template)), this.$tip
    };
    var f = b.fn.popover;
    b.fn.popover = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.popover"),
                g = "object" == typeof a && a;
            e || d.data("bs.popover", e = new c(this, g));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.popover.Constructor =
        c;
    b.fn.popover.noConflict = function() {
        return b.fn.popover = f, this
    }
}(jQuery); + function(b) {
    function c(a, d) {
        var e, g = b.proxy(this.process, this);
        this.$element = b(a).is("body") ? b(window) : b(a);
        this.$body = b("body");
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", g);
        this.options = b.extend({}, c.DEFAULTS, d);
        this.selector = (this.options.target || (e = b(a).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li \x3e a";
        this.offsets = b([]);
        this.targets = b([]);
        this.activeTarget = null;
        this.refresh();
        this.process()
    }
    c.DEFAULTS = {
        offset: 10
    };
    c.prototype.refresh = function() {
        var a =
            this.$element[0] == window ? "offset" : "position";
        this.offsets = b([]);
        this.targets = b([]);
        var c = this;
        this.$body.find(this.selector).map(function() {
            var e = b(this),
                e = e.data("target") || e.attr("href"),
                g = /^#\w/.test(e) && b(e);
            return g && g.length && [
                [g[a]().top + (!b.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            c.offsets.push(this[0]);
            c.targets.push(this[1])
        })
    };
    c.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() +
            this.options.offset,
            c = (this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight) - this.$scrollElement.height(),
            g = this.offsets,
            f = this.targets,
            k = this.activeTarget;
        if (b >= c) return k != (a = f.last()[0]) && this.activate(a);
        for (a = g.length; a--;) k != f[a] && b >= g[a] && (!g[a + 1] || b <= g[a + 1]) && this.activate(f[a])
    };
    c.prototype.activate = function(a) {
        this.activeTarget = a;
        b(this.selector).parents(".active").removeClass("active");
        a = b(this.selector + '[data-target\x3d"' + a + '"],' + this.selector + '[href\x3d"' + a + '"]').parents("li").addClass("active");
        a.parent(".dropdown-menu").length && (a = a.closest("li.dropdown").addClass("active"));
        a.trigger("activate.bs.scrollspy")
    };
    var f = b.fn.scrollspy;
    b.fn.scrollspy = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.scrollspy"),
                g = "object" == typeof a && a;
            e || d.data("bs.scrollspy", e = new c(this, g));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.scrollspy.Constructor = c;
    b.fn.scrollspy.noConflict = function() {
        return b.fn.scrollspy = f, this
    };
    b(window).on("load", function() {
        b('[data-spy\x3d"scroll"]').each(function() {
            var a =
                b(this);
            a.scrollspy(a.data())
        })
    })
}(jQuery); + function(b) {
    var c = function(a) {
        this.element = b(a)
    };
    c.prototype.show = function() {
        var a = this.element,
            c = a.closest("ul:not(.dropdown-menu)"),
            e = a.data("target");
        if (e || (e = a.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")), !a.parent("li").hasClass("active")) {
            var g = c.find(".active:last a")[0],
                f = b.Event("show.bs.tab", {
                    relatedTarget: g
                });
            if (a.trigger(f), !f.isDefaultPrevented()) e = b(e), this.activate(a.parent("li"), c), this.activate(e, e.parent(), function() {
                a.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: g
                })
            })
        }
    };
    c.prototype.activate =
        function(a, c, e) {
            function g() {
                f.removeClass("active").find("\x3e .dropdown-menu \x3e .active").removeClass("active");
                a.addClass("active");
                k ? (a[0].offsetWidth, a.addClass("in")) : a.removeClass("fade");
                a.parent(".dropdown-menu") && a.closest("li.dropdown").addClass("active");
                e && e()
            }
            var f = c.find("\x3e .active"),
                k = e && b.support.transition && f.hasClass("fade");
            k ? f.one(b.support.transition.end, g).emulateTransitionEnd(150) : g();
            f.removeClass("in")
        };
    var f = b.fn.tab;
    b.fn.tab = function(a) {
        return this.each(function() {
            var d =
                b(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.tab.Constructor = c;
    b.fn.tab.noConflict = function() {
        return b.fn.tab = f, this
    };
    b(document).on("click.bs.tab.data-api", '[data-toggle\x3d"tab"], [data-toggle\x3d"pill"]', function(a) {
        a.preventDefault();
        b(this).tab("show")
    })
}(jQuery); + function(b) {
    var c = function(a, d) {
        this.options = b.extend({}, c.DEFAULTS, d);
        this.$window = b(window).on("scroll.bs.affix.data-api", b.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", b.proxy(this.checkPositionWithEventLoop, this));
        this.$element = b(a);
        this.affixed = this.unpin = null;
        this.checkPosition()
    };
    c.RESET = "affix affix-top affix-bottom";
    c.DEFAULTS = {
        offset: 0
    };
    c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(b.proxy(this.checkPosition, this), 1)
    };
    c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var a =
                b(document).height(),
                d = this.$window.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                h = f.top,
                k = f.bottom;
            "object" != typeof f && (k = h = f);
            "function" == typeof h && (h = f.top());
            "function" == typeof k && (k = f.bottom());
            a = null != this.unpin && d + this.unpin <= e.top ? !1 : null != k && e.top + this.$element.height() >= a - k ? "bottom" : null != h && h >= d ? "top" : !1;
            this.affixed !== a && (this.unpin && this.$element.css("top", ""), this.affixed = a, this.unpin = "bottom" == a ? e.top - d : null, this.$element.removeClass(c.RESET).addClass("affix" + (a ? "-" + a :
                "")), "bottom" == a && this.$element.offset({
                top: document.body.offsetHeight - k - this.$element.height()
            }))
        }
    };
    var f = b.fn.affix;
    b.fn.affix = function(a) {
        return this.each(function() {
            var d = b(this),
                e = d.data("bs.affix"),
                f = "object" == typeof a && a;
            e || d.data("bs.affix", e = new c(this, f));
            "string" == typeof a && e[a]()
        })
    };
    b.fn.affix.Constructor = c;
    b.fn.affix.noConflict = function() {
        return b.fn.affix = f, this
    };
    b(window).on("load", function() {
        b('[data-spy\x3d"affix"]').each(function() {
            var a = b(this),
                c = a.data();
            c.offset = c.offset || {};
            c.offsetBottom && (c.offset.bottom = c.offsetBottom);
            c.offsetTop && (c.offset.top = c.offsetTop);
            a.affix(c)
        })
    })
}(jQuery);
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : c(jQuery)
})(function(c) {
    c.extend(c.fn, {
        validate: function(a) {
            if (this.length) {
                var b = c.data(this[0], "validator");
                if (b) return b;
                this.attr("novalidate", "novalidate");
                b = new c.validator(a, this[0]);
                c.data(this[0], "validator", b);
                b.settings.onsubmit && (this.validateDelegate(":submit", "click", function(a) {
                    b.settings.submitHandler && (b.submitButton = a.target);
                    c(a.target).hasClass("cancel") && (b.cancelSubmit = !0);
                    void 0 !== c(a.target).attr("formnovalidate") &&
                        (b.cancelSubmit = !0)
                }), this.submit(function(a) {
                    function e() {
                        var e, g;
                        return b.settings.submitHandler ? (b.submitButton && (e = c("\x3cinput type\x3d'hidden'/\x3e").attr("name", b.submitButton.name).val(c(b.submitButton).val()).appendTo(b.currentForm)), g = b.settings.submitHandler.call(b, b.currentForm, a), b.submitButton && e.remove(), void 0 !== g ? g : !1) : !0
                    }
                    b.settings.debug && a.preventDefault();
                    if (b.cancelSubmit) return b.cancelSubmit = !1, e();
                    if (b.form()) return b.pendingRequest ? (b.formSubmitted = !0, !1) : e();
                    b.focusInvalid();
                    return !1
                }));
                return b
            }
            a && (a.debug && window.console) && console.warn("Nothing selected, can't validate, returning nothing.")
        },
        valid: function() {
            var a, b;
            c(this[0]).is("form") ? a = this.validate().form() : (a = !0, b = c(this[0].form).validate(), this.each(function() {
                a = b.element(this) && a
            }));
            return a
        },
        removeAttrs: function(a) {
            var b = {},
                d = this;
            c.each(a.split(/\s/), function(a, c) {
                b[c] = d.attr(c);
                d.removeAttr(c)
            });
            return b
        },
        rules: function(a, b) {
            var d = this[0],
                e, f, g, h;
            if (a) switch (e = c.data(d.form, "validator").settings, f = e.rules,
                g = c.validator.staticRules(d), a) {
                case "add":
                    c.extend(g, c.validator.normalizeRule(b));
                    delete g.messages;
                    f[d.name] = g;
                    b.messages && (e.messages[d.name] = c.extend(e.messages[d.name], b.messages));
                    break;
                case "remove":
                    if (!b) return delete f[d.name], g;
                    h = {};
                    c.each(b.split(/\s/), function(a, b) {
                        h[b] = g[b];
                        delete g[b];
                        "required" === b && c(d).removeAttr("aria-required")
                    });
                    return h
            }
            e = c.validator.normalizeRules(c.extend({}, c.validator.classRules(d), c.validator.attributeRules(d), c.validator.dataRules(d), c.validator.staticRules(d)),
                d);
            e.required && (f = e.required, delete e.required, e = c.extend({
                required: f
            }, e), c(d).attr("aria-required", "true"));
            e.remote && (f = e.remote, delete e.remote, e = c.extend(e, {
                remote: f
            }));
            return e
        }
    });
    c.extend(c.expr[":"], {
        blank: function(a) {
            return !c.trim("" + c(a).val())
        },
        filled: function(a) {
            return !!c.trim("" + c(a).val())
        },
        unchecked: function(a) {
            return !c(a).prop("checked")
        }
    });
    c.validator = function(a, b) {
        this.settings = c.extend(!0, {}, c.validator.defaults, a);
        this.currentForm = b;
        this.init()
    };
    c.validator.format = function(a, b) {
        if (1 ===
            arguments.length) return function() {
            var b = c.makeArray(arguments);
            b.unshift(a);
            return c.validator.format.apply(this, b)
        };
        2 < arguments.length && b.constructor !== Array && (b = c.makeArray(arguments).slice(1));
        b.constructor !== Array && (b = [b]);
        c.each(b, function(b, c) {
            a = a.replace(RegExp("\\{" + b + "\\}", "g"), function() {
                return c
            })
        });
        return a
    };
    c.extend(c.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: c([]),
            errorLabelContainer: c([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) {
                this.lastActive = a;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function(a) {
                !this.checkable(a) && (a.name in this.submitted || !this.optional(a)) && this.element(a)
            },
            onkeyup: function(a, b) {
                9 === b.which && "" === this.elementValue(a) || (a.name in this.submitted || a === this.lastElement) && this.element(a)
            },
            onclick: function(a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function(a, b, d) {
                "radio" === a.type ? this.findByName(a.name).addClass(b).removeClass(d) : c(a).addClass(b).removeClass(d)
            },
            unhighlight: function(a, b, d) {
                "radio" === a.type ? this.findByName(a.name).removeClass(b).addClass(d) : c(a).removeClass(b).addClass(d)
            }
        },
        setDefaults: function(a) {
            c.extend(c.validator.defaults, a)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: c.validator.format("Please enter no more than {0} characters."),
            minlength: c.validator.format("Please enter at least {0} characters."),
            rangelength: c.validator.format("Please enter a value between {0} and {1} characters long."),
            range: c.validator.format("Please enter a value between {0} and {1}."),
            max: c.validator.format("Please enter a value less than or equal to {0}."),
            min: c.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function a(a) {
                    var b = c.data(this[0].form, "validator"),
                        d = "on" + a.type.replace(/^validate/, ""),
                        h = b.settings;
                    h[d] && !this.is(h.ignore) && h[d].call(b, this[0], a)
                }
                this.labelContainer = c(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length &&
                    this.labelContainer || c(this.currentForm);
                this.containers = c(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = this.groups = {},
                    d;
                c.each(this.settings.groups, function(a, d) {
                    "string" === typeof d && (d = d.split(/\s/));
                    c.each(d, function(c, d) {
                        b[d] = a
                    })
                });
                d = this.settings.rules;
                c.each(d, function(a, b) {
                    d[a] = c.validator.normalizeRule(b)
                });
                c(this.currentForm).validateDelegate(":text, [type\x3d'password'], [type\x3d'file'], select, textarea, [type\x3d'number'], [type\x3d'search'] ,[type\x3d'tel'], [type\x3d'url'], [type\x3d'email'], [type\x3d'datetime'], [type\x3d'date'], [type\x3d'month'], [type\x3d'week'], [type\x3d'time'], [type\x3d'datetime-local'], [type\x3d'range'], [type\x3d'color'], [type\x3d'radio'], [type\x3d'checkbox']",
                    "focusin focusout keyup", a).validateDelegate("select, option, [type\x3d'radio'], [type\x3d'checkbox']", "click", a);
                this.settings.invalidHandler && c(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                c(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                this.checkForm();
                c.extend(this.submitted, this.errorMap);
                this.invalid = c.extend({}, this.errorMap);
                this.valid() || c(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function(a) {
                var b = this.clean(a),
                    d = this.validationTargetFor(b),
                    e = !0;
                this.lastElement = d;
                void 0 === d ? delete this.invalid[b.name] : (this.prepareElement(d), this.currentElements = c(d), (e = !1 !== this.check(d)) ? delete this.invalid[d.name] : this.invalid[d.name] = !0);
                c(a).attr("aria-invalid", !e);
                this.numberOfInvalids() || (this.toHide =
                    this.toHide.add(this.containers));
                this.showErrors();
                return e
            },
            showErrors: function(a) {
                if (a) {
                    c.extend(this.errorMap, a);
                    this.errorList = [];
                    for (var b in a) this.errorList.push({
                        message: a[b],
                        element: this.findByName(b)[0]
                    });
                    this.successList = c.grep(this.successList, function(b) {
                        return !(b.name in a)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                c.fn.resetForm && c(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement =
                    null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(a) {
                var b = 0,
                    c;
                for (c in a) b++;
                return b
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(a) {
                a.not(this.containers).text("");
                this.addWrapper(a).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    c(this.findLastActive() ||
                        this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (a) {}
            },
            findLastActive: function() {
                var a = this.lastActive;
                return a && 1 === c.grep(this.errorList, function(b) {
                    return b.element.name === a.name
                }).length && a
            },
            elements: function() {
                var a = this,
                    b = {};
                return c(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    !this.name && (a.settings.debug && window.console) && console.error("%o has no name assigned",
                        this);
                    return this.name in b || !a.objectLength(c(this).rules()) ? !1 : b[this.name] = !0
                })
            },
            clean: function(a) {
                return c(a)[0]
            },
            errors: function() {
                var a = this.settings.errorClass.split(" ").join(".");
                return c(this.settings.errorElement + "." + a, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = c([]);
                this.toHide = c([]);
                this.currentElements = c([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(a) {
                this.reset();
                this.toHide = this.errorsFor(a)
            },
            elementValue: function(a) {
                var b = c(a),
                    d = a.type;
                if ("radio" === d || "checkbox" === d) return c("input[name\x3d'" + a.name + "']:checked").val();
                if ("number" === d && "undefined" !== typeof a.validity) return a.validity.badInput ? !1 : b.val();
                a = b.val();
                return "string" === typeof a ? a.replace(/\r/g, "") : a
            },
            check: function(a) {
                a = this.validationTargetFor(this.clean(a));
                var b = c(a).rules(),
                    d = c.map(b, function(a, b) {
                        return b
                    }).length,
                    e = !1,
                    f = this.elementValue(a),
                    g, h, m;
                for (h in b) {
                    m = {
                        method: h,
                        parameters: b[h]
                    };
                    try {
                        if (g = c.validator.methods[h].call(this, f, a, m.parameters), "dependency-mismatch" === g && 1 === d) e = !0;
                        else {
                            e = !1;
                            if ("pending" === g) {
                                this.toHide = this.toHide.not(this.errorsFor(a));
                                return
                            }
                            if (!g) return this.formatAndAdd(a, m), !1
                        }
                    } catch (k) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + a.id + ", check the '" + m.method + "' method.", k), k;
                    }
                }
                if (!e) return this.objectLength(b) && this.successList.push(a), !0
            },
            customDataMessage: function(a, b) {
                return c(a).data("msg" + b.charAt(0).toUpperCase() +
                    b.substring(1).toLowerCase()) || c(a).data("msg")
            },
            customMessage: function(a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(a, b) {
                return this.findDefined(this.customMessage(a.name, b), this.customDataMessage(a, b), !this.settings.ignoreTitle && a.title || void 0, c.validator.messages[b], "\x3cstrong\x3eWarning: No message defined for " + a.name + "\x3c/strong\x3e")
            },
            formatAndAdd: function(a, b) {
                var d = this.defaultMessage(a, b.method),
                    e = /\$?\{(\d+)\}/g;
                "function" === typeof d ? d = d.call(this, b.parameters, a) : e.test(d) && (d = c.validator.format(d.replace(e, "{$1}"), b.parameters));
                this.errorList.push({
                    message: d,
                    element: a,
                    method: b.method
                });
                this.errorMap[a.name] = d;
                this.submitted[a.name] = d
            },
            addWrapper: function(a) {
                this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper)));
                return a
            },
            defaultShowErrors: function() {
                var a, b;
                for (a = 0; this.errorList[a]; a++) b = this.errorList[a], this.settings.highlight &&
                    this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass), this.showLabel(b.element, b.message);
                this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                if (this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight) {
                    a = 0;
                    for (b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass)
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return c(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(a, b) {
                var d, e, f = this.errorsFor(a),
                    g = this.idOrName(a),
                    h = c(a).attr("aria-describedby");
                f.length ? (f.removeClass(this.settings.validClass).addClass(this.settings.errorClass), f.html(b)) : (d = f = c("\x3c" + this.settings.errorElement + "\x3e").attr("id", g + "-error").addClass(this.settings.errorClass).html(b ||
                    ""), this.settings.wrapper && (d = f.hide().show().wrap("\x3c" + this.settings.wrapper + "/\x3e").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, c(a)) : d.insertAfter(a), f.is("label") ? f.attr("for", g) : 0 === f.parents("label[for\x3d'" + g + "']").length && (d = f.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), h ? h.match(RegExp("\\b" + d + "\\b")) || (h += " " + d) : h = d, c(a).attr("aria-describedby", h), (e = this.groups[a.name]) && c.each(this.groups, function(a, b) {
                    b ===
                        e && c("[name\x3d'" + a + "']", this.currentForm).attr("aria-describedby", f.attr("id"))
                })));
                !b && this.settings.success && (f.text(""), "string" === typeof this.settings.success ? f.addClass(this.settings.success) : this.settings.success(f, a));
                this.toShow = this.toShow.add(f)
            },
            errorsFor: function(a) {
                var b = this.idOrName(a);
                a = c(a).attr("aria-describedby");
                b = "label[for\x3d'" + b + "'], label[for\x3d'" + b + "'] *";
                a && (b = b + ", #" + a.replace(/\s+/g, ", #"));
                return this.errors().filter(b)
            },
            idOrName: function(a) {
                return this.groups[a.name] ||
                    (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function(a) {
                this.checkable(a) && (a = this.findByName(a.name));
                return c(a).not(this.settings.ignore)[0]
            },
            checkable: function(a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function(a) {
                return c(this.currentForm).find("[name\x3d'" + a + "']")
            },
            getLength: function(a, b) {
                switch (b.nodeName.toLowerCase()) {
                    case "select":
                        return c("option:selected", b).length;
                    case "input":
                        if (this.checkable(b)) return this.findByName(b.name).filter(":checked").length
                }
                return a.length
            },
            depend: function(a, b) {
                return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
            },
            dependTypes: {
                "boolean": function(a) {
                    return a
                },
                string: function(a, b) {
                    return !!c(a, b.form).length
                },
                "function": function(a, b) {
                    return a(b)
                }
            },
            optional: function(a) {
                var b = this.elementValue(a);
                return !c.validator.methods.required.call(this, b, a) && "dependency-mismatch"
            },
            startRequest: function(a) {
                this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
            },
            stopRequest: function(a, b) {
                this.pendingRequest--;
                0 > this.pendingRequest &&
                    (this.pendingRequest = 0);
                delete this.pending[a.name];
                b && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (c(this.currentForm).submit(), this.formSubmitted = !1) : !b && (0 === this.pendingRequest && this.formSubmitted) && (c(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(a) {
                return c.data(a, "previousValue") || c.data(a, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(a, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(a, b) {
            a.constructor === String ? this.classRuleSettings[a] = b : c.extend(this.classRuleSettings, a)
        },
        classRules: function(a) {
            var b = {};
            (a = c(a).attr("class")) && c.each(a.split(" "), function() {
                this in c.validator.classRuleSettings && c.extend(b, c.validator.classRuleSettings[this])
            });
            return b
        },
        attributeRules: function(a) {
            var b = {},
                d = c(a),
                e = a.getAttribute("type"),
                f, g;
            for (f in c.validator.methods) {
                "required" ===
                f ? (g = a.getAttribute(f), "" === g && (g = !0), g = !!g) : g = d.attr(f);
                if (/min|max/.test(f) && (null === e || /number|range|text/.test(e))) g = Number(g);
                g || 0 === g ? b[f] = g : e === f && "range" !== e && (b[f] = !0)
            }
            b.maxlength && /-1|2147483647|524288/.test(b.maxlength) && delete b.maxlength;
            return b
        },
        dataRules: function(a) {
            var b, d = {},
                e = c(a);
            for (b in c.validator.methods) a = e.data("rule" + b.charAt(0).toUpperCase() + b.substring(1).toLowerCase()), void 0 !== a && (d[b] = a);
            return d
        },
        staticRules: function(a) {
            var b = {},
                d = c.data(a.form, "validator");
            d.settings.rules &&
                (b = c.validator.normalizeRule(d.settings.rules[a.name]) || {});
            return b
        },
        normalizeRules: function(a, b) {
            c.each(a, function(d, e) {
                if (!1 === e) delete a[d];
                else if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!c(e.depends, b.form).length;
                            break;
                        case "function":
                            f = e.depends.call(b, b)
                    }
                    f ? a[d] = void 0 !== e.param ? e.param : !0 : delete a[d]
                }
            });
            c.each(a, function(d, e) {
                a[d] = c.isFunction(e) ? e(b) : e
            });
            c.each(["minlength", "maxlength"], function() {
                a[this] && (a[this] = Number(a[this]))
            });
            c.each(["rangelength",
                "range"
            ], function() {
                var b;
                a[this] && (c.isArray(a[this]) ? a[this] = [Number(a[this][0]), Number(a[this][1])] : "string" === typeof a[this] && (b = a[this].replace(/[\[\]]/g, "").split(/[\s,]+/), a[this] = [Number(b[0]), Number(b[1])]))
            });
            c.validator.autoCreateRanges && (null != a.min && null != a.max && (a.range = [a.min, a.max], delete a.min, delete a.max), null != a.minlength && null != a.maxlength && (a.rangelength = [a.minlength, a.maxlength], delete a.minlength, delete a.maxlength));
            return a
        },
        normalizeRule: function(a) {
            if ("string" === typeof a) {
                var b = {};
                c.each(a.split(/\s/), function() {
                    b[this] = !0
                });
                a = b
            }
            return a
        },
        addMethod: function(a, b, d) {
            c.validator.methods[a] = b;
            c.validator.messages[a] = void 0 !== d ? d : c.validator.messages[a];
            3 > b.length && c.validator.addClassRules(a, c.validator.normalizeRule(a))
        },
        methods: {
            required: function(a, b, d) {
                return !this.depend(d, b) ? "dependency-mismatch" : "select" === b.nodeName.toLowerCase() ? (a = c(b).val()) && 0 < a.length : this.checkable(b) ? 0 < this.getLength(a, b) : 0 < c.trim(a).length
            },
            email: function(a, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
            },
            url: function(a, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
            },
            date: function(a, b) {
                return this.optional(b) || !/Invalid|NaN/.test((new Date(a)).toString())
            },
            dateISO: function(a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function(a, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function(a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            creditcard: function(a, b) {
                if (this.optional(b)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(a)) return !1;
                var c = 0,
                    e = 0,
                    f = !1,
                    g;
                a = a.replace(/\D/g,
                    "");
                if (13 > a.length || 19 < a.length) return !1;
                for (g = a.length - 1; 0 <= g; g--) {
                    e = a.charAt(g);
                    e = parseInt(e, 10);
                    if (f && 9 < (e *= 2)) e -= 9;
                    c += e;
                    f = !f
                }
                return 0 === c % 10
            },
            minlength: function(a, b, d) {
                a = c.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || a >= d
            },
            maxlength: function(a, b, d) {
                a = c.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || a <= d
            },
            rangelength: function(a, b, d) {
                a = c.isArray(a) ? a.length : this.getLength(a, b);
                return this.optional(b) || a >= d[0] && a <= d[1]
            },
            min: function(a, b, c) {
                return this.optional(b) ||
                    a >= c
            },
            max: function(a, b, c) {
                return this.optional(b) || a <= c
            },
            range: function(a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            equalTo: function(a, b, d) {
                d = c(d);
                this.settings.onfocusout && d.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    c(b).valid()
                });
                return a === d.val()
            },
            remote: function(a, b, d) {
                if (this.optional(b)) return "dependency-mismatch";
                var e = this.previousValue(b),
                    f, g;
                this.settings.messages[b.name] || (this.settings.messages[b.name] = {});
                e.originalMessage = this.settings.messages[b.name].remote;
                this.settings.messages[b.name].remote = e.message;
                d = "string" === typeof d && {
                    url: d
                } || d;
                if (e.old === a) return e.valid;
                e.old = a;
                f = this;
                this.startRequest(b);
                g = {};
                g[b.name] = a;
                c.ajax(c.extend(!0, {
                    url: d,
                    mode: "abort",
                    port: "validate" + b.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(d) {
                        var g = !0 === d || "true" === d,
                            k;
                        f.settings.messages[b.name].remote = e.originalMessage;
                        g ? (k = f.formSubmitted, f.prepareElement(b), f.formSubmitted = k, f.successList.push(b), delete f.invalid[b.name], f.showErrors()) : (k = {}, d = d ||
                            f.defaultMessage(b, "remote"), k[b.name] = e.message = c.isFunction(d) ? d(a) : d, f.invalid[b.name] = !0, f.showErrors(k));
                        e.valid = g;
                        f.stopRequest(b, g)
                    }
                }, d));
                return "pending"
            }
        }
    });
    c.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    };
    var l = {},
        n;
    c.ajaxPrefilter ? c.ajaxPrefilter(function(a, b, c) {
        b = a.port;
        "abort" === a.mode && (l[b] && l[b].abort(), l[b] = c)
    }) : (n = c.ajax, c.ajax = function(a) {
        var b = ("port" in a ? a : c.ajaxSettings).port;
        return "abort" === ("mode" in a ? a : c.ajaxSettings).mode ? (l[b] &&
            l[b].abort(), l[b] = n.apply(this, arguments), l[b]) : n.apply(this, arguments)
    });
    c.extend(c.fn, {
        validateDelegate: function(a, b, d) {
            return this.bind(b, function(b) {
                var f = c(b.target);
                if (f.is(a)) return d.apply(f, arguments)
            })
        }
    })
});
(function(d) {
    d.validator.setDefaults({
        onfocusout: !1,
        groups: {
            txtcountyCode: "txtcountyCode txtphone",
            txtComcountyCode: "txtccountyCode txtcphone",
            txtcountyCodeRes: "txtcountyCodeRes, txtrphone",
            txtcountyCodeCom: "txtcountyCodeCom, txtcphone",
            rechargeMobileAreaCode: "rechargeMobileAreaCode, rechargeMobileNumber"
        },
        errorPlacement: function(a, c) {
            if ("rdCardtype" == c.attr("name")) {
                var b = d(".rdCardtype").closest(".card-type").closest(".form-group").find("label:first");
                a.insertAfter(b)
            } else "rechargeMobileAreaCode" ==
                c.attr("name") || "rechargeMobileNumber" == c.attr("name") ? (b = d("#rechargeMobileAreaCode").closest(".form-group").find("label"), a.insertAfter(b)) : c.is(":checkbox") || c.is(":radio") ? (b = c.closest("label"), a.insertAfter(b)) : "txtcountyCode" == c.attr("name") || "txtphone" == c.attr("name") ? (b = d("#txtcountyCode").closest(".form-group").find("label"), a.insertAfter(b)) : "txtccountyCode" == c.attr("name") || "txtcphone" == c.attr("name") ? (b = d("#txtccountyCode").closest(".form-group").find("label"), a.insertAfter(b)) : "txtcountyCodeRes" ==
                c.attr("name") || "txtrphone" == c.attr("name") ? (b = d("#txtcountyCodeRes").closest(".form-group").find("label"), a.insertAfter(b)) : "txtcountyCodeCom" == c.attr("name") || "txtcphone" == c.attr("name") ? (b = d("#txtcountyCodeCom").closest(".form-group").find("label"), a.insertAfter(b)) : "txtCardCardtypedSecureCode" == c.attr("name") || "txtCardSecureCode" == c.attr("name") ? (b = c.closest(".secure-code-block").find(".secure-code-title"), a.insertAfter(b)) : a.insertBefore(c)
        }
    });
    d.validator.addMethod("password", function(a, c) {
            return /^\d{6}$/.test(a)
        },
        "");
    d.validator.addMethod("creditValidation", function(a, c) {
        d(c).closest("form");
        d("input[name\x3d'rdCardtype']:checked");
        var b = d(c).val(),
            e = d("#cardTypeAbbr").val();
        if ("EC" == e && (b.match(/^(636368|438935|504175|451416|636297|509074)/) || b.match(/^50904[0,2-3,5-9]{1}/) || b.match(/^50905[0-2]{1}/) || b.match(/^50906[4,6-9]{1}/) || b.match(/^(5067|4576|4011)[0-9]{2}/))) return 16 === a.length;
        if ("AX" == e && /^3[47][0-9]{13}/.test(b)) return 15 === a.length;
        if ("MC" == e && /^5[0-5][0-9]{14}/.test(b)) return 16 === a.length;
        if ("VI" == e) {
            if (/4[0-9]{15}/.test(b)) return 16 === a.length;
            if (/4[0-9]{12}/.test(b)) return 13 === a.length
        }
        return !1
    }, "");
    d.validator.addMethod("cardexpired", function(a, c) {
        var b = d(c).closest("form").find("#drpCardyear").val(),
            e = !0;
        if ("" !== b) {
            var f = new Date;
            f.getFullYear();
            f.getMonth();
            parseInt(a, 10);
            var e = f.getFullYear(),
                f = parseInt(f.getMonth()) + 1,
                g = parseInt(a) + 1,
                e = b > e ? !0 : e == b ? g >= f ? !0 : !1 : !1
        }
        e && d(".btn-continue").removeAttr("disabled");
        return e
    }, "");
    d.validator.addMethod("phonevalidation", function(a, c) {
        return this.optional(c) ||
            /^\d+$/.test(a) ? 10 === a.length : !1
    }, "");
    d.validator.addMethod("cpf", function(a, c) {
        return this.optional(c) || /^\d+$/.test(a) ? 11 === a.length : this.optional(c) || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(a) ? 14 === a.length : !1
    }, "");
    d.validator.addMethod("securecode", function(a, c) {
        return "AX" == d("#cardTypeAbbr").val() && /^\d{4}/.test(a) ? 4 === a.length : /^\d{3}/.test(a) ? 3 === a.length : !1
    }, "");
    d.validator.addMethod("countrycode", function(a, c, b) {
        return "" != d(b).val() ? "" != a ? !0 : !1 : !0
    }, "");
    d.validator.addMethod("phonenumber", function(a,
        c, b) {
        return "" != d(b).val() ? "" != a ? !0 : !1 : !0
    }, "")
})(jQuery);
var livelo = {},
    myAccount = {},
    pdp = {},
    cart = {};
(function(a) {
    livelo.common = {
        modules: [],
        init: function() {
            a('[data-toggle\x3d"tooltip"]').tooltip();
            livelo.common.formValidate();
            livelo.common.activateAccount();
            livelo.common.clearError();
            livelo.common.alterTelefonoCel();
            livelo.common.alterarEmail();
            livelo.common.alterarSenha();
            livelo.common.closePwdChangeSuccessBtn();
            livelo.common.signout();
            livelo.common.setMasks();
            livelo.common.closeLiveloModal();
            livelo.common.invokeLoginModal();
            livelo.common.quantityUpdate();
            livelo.common.saveItemQuantity();
            livelo.common.preventLinkDefault();
            livelo.common.carouselHideChevron("heroBannerCarousel");
            livelo.common.carouselHideChevron("product-spotlight-carousel");
            livelo.common.carouselHideChevron("featured-categories-carousel");
            livelo.common.carouselHideChevron("recently-viewed-carousel");
            livelo.common.carouselHideChevron("gallery-carousel");
            livelo.common.carouselHideChevron("parceiros-carousel");
            livelo.common.validateForDigitOnly();
            livelo.common.forgotPasswordModal();
            livelo.common.printPage();
            livelo.common.spinnerSetup();
            livelo.common.oamLogin();
            livelo.common.carouselInit();
            livelo.common.ellipsisSetup()
        },
        ellipsisSetup: function() {
            a(".prod-container .description") && a(".prod-container .description").dotdotdot({
                wrap: "word",
                ellipsis: "... "
            });
            a(".clpfeatureddesc .product-title") && a(".clpfeatureddesc .product-title").dotdotdot({
                wrap: "word",
                ellipsis: "... "
            });
            a(".cart-table .pdt-desc") && a(".cart-table .pdt-desc").dotdotdot({
                wrap: "word",
                ellipsis: "... "
            })
        },
        carouselInit: function() {
            0 < a("#recently-viewed-carousel").length && a("#recently-viewed-carousel div.slider").slick({
                dots: !0,
                infinite: !1,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 4,
                appendArrows: a("#recently-viewed-carousel"),
                prevArrow: '\x3ca href\x3d"#" class\x3d"slick-prev"\x3ePrevious\x3c/a\x3e',
                nextArrow: '\x3ca href\x3d"#" class\x3d"slick-next"\x3eNext\x3c/a\x3e'
            });
            0 < a("#product-spotlight-carousel").length && a("#product-spotlight-carousel div.slider").slick({
                dots: !0,
                infinite: !1,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 4,
                appendArrows: a("#product-spotlight-carousel"),
                prevArrow: '\x3ca href\x3d"#" class\x3d"slick-prev"\x3ePrevious\x3c/a\x3e',
                nextArrow: '\x3ca href\x3d"#" class\x3d"slick-next"\x3eNext\x3c/a\x3e'
            })
        },
        spinnerSetup: function() {
            a(document).ajaxStart(function() {
                livelo.common.ajaxLoader()
            });
            a(document).ajaxStop(function() {
                livelo.common.removeAjaxLoader()
            })
        },
        printPage: function() {
            a(".print-receipt-btn").on("click", function(a) {
                a.preventDefault();
                window.print()
            })
        },
        forgotPasswordModal: function() {
            a(".reset-password").on("click", function(b) {
                b.preventDefault();
                a("#mdlforgotPassword").modal("show");
                a("#mdlLogin").modal("hide")
            })
        },
        removeAjaxLoader: function() {
            a(".ldmain").hide()
        },
        ajaxLoader: function() {
            a(".ldmain").show()
        },
        validateForDigitOnly: function() {
            a(".col-3-digit").keydown(function(b) {
                -1 !== a.inArray(b.keyCode, [46, 8, 9, 27, 13, 110, 190]) || (65 == b.keyCode && (!0 === b.ctrlKey || !0 === b.metaKey) || 35 <= b.keyCode && 40 >= b.keyCode) || (b.shiftKey || 48 > b.keyCode || 57 < b.keyCode) && (96 > b.keyCode || 105 < b.keyCode) && b.preventDefault()
            });
            a(".js-digits-only").keydown(function(b) {
                -1 !== a.inArray(b.keyCode, [46, 8, 9, 27, 13, 110, 190]) || (65 == b.keyCode && (!0 === b.ctrlKey || !0 === b.metaKey) || 35 <= b.keyCode && 40 >= b.keyCode) ||
                    (b.shiftKey || 48 > b.keyCode || 57 < b.keyCode) && (96 > b.keyCode || 105 < b.keyCode) && b.preventDefault()
            })
        },
        carouselHideChevron: function(b) {
            a("#" + b).on("slid.bs.carousel", "", function() {
                var b;
                b = a(this);
                var e = b.attr("id");
                a("#" + e + " .carousel-inner .item:first").hasClass("active") ? (b.children(".left").hide(), b.children(".right").show()) : (a("#" + e + " .carousel-inner .item:last").hasClass("active") ? b.children(".right").hide() : b.children(".right").show(), b.children(".left").show())
            })
        },
        formValidate: function() {
            function b() {
                a(".global-error").find(".error-message").html(a("#globalErrorText").val());
                a(".global-error").show()
            }
            a(".default-prevented").find("a").click(function(a) {
                a.preventDefault()
            });
            a("#form-login #txtPasswordMdl, #form-activate-account #password, #form-activate-account #confirmpassword, #form-reset-password #textPassword, #form-reset-password #pass, #form-login-oam #txtPasswordMdl").on("keyup", function() {
                a(this).valid()
            });
            a("#form-login-main").validate({
                invalidHandler: function() {
                    b()
                }
            });
            a("#form-login-oam").validate({
                invalidHandler: function() {
                    b()
                }
            });
            var c = a("#form-login");
            c.validate({
                submitHandler: function(b) {
                    a.ajax({
                        url: c.attr("action"),
                        type: "POST",
                        dataType: "json",
                        data: c.serialize(),
                        success: function(b) {
                            livelo.common.removeAjaxLoader();
                            !0 == b.error ? (a(".global-error").find(".error-message").html(b.errorMessage), a(".global-error").show(), !0 == b.displayCaptcha && livelo.common.showRecaptcha("re-captha-panel")) : !0 == b.displayCaptcha ? livelo.common.showRecaptcha("re-captha-panel") : (a("#mdlLogin").modal("hide"), window.location.href = window.location.href)
                        },
                        error: function(b) {
                            a("#global-error .error-message").html(b.message)
                        }
                    })
                },
                invalidHandler: function() {
                    b()
                }
            });
            var e = a("#form-account-activate");
            e.validate({
                submitHandler: function(b) {
                    a.ajax({
                        type: "POST",
                        dataType: "json",
                        url: e.attr("action"),
                        data: e.serialize(),
                        success: function(b) {
                            livelo.common.removeAjaxLoader();
                            !0 == b.error ? (a(".global-error").find(".error-message").html(b.errorMessage), a(".global-error").show(), !0 == b.displayCaptcha && livelo.common.showRecaptcha("re-captha-panel")) : window.location.href = a("#successValidationURL").val()
                        },
                        error: function(b) {
                            a("#global-error .error-message").html(b.message)
                        }
                    })
                },
                invalidHandler: function() {
                    b()
                }
            });
            var d = a("#form-forgotpassword-modal");
            d.validate({
                invalidHandler: function() {
                    b()
                }
            });
            d.on("submit", function(b) {
                b.preventDefault();
                d.valid() && a.ajax({
                    url: d.attr("action"),
                    type: "POST",
                    dataType: "json",
                    data: d.serialize(),
                    success: function(b) {
                        !0 == b.error ? (a(".global-error").find(".error-message").html(b.errorMessage), a(".global-error").show(), !0 == b.displayCaptcha && livelo.common.showRecaptcha("re-captha-panel-forgot-password")) : (a(".global-error").hide(), a("#form-forgotpassword-modal").hide(), a("#mdlforgotPassword").find(".successMessage").html(b.successMessage),
                            a("#mdlforgotPassword").find(".successMessage").show())
                    },
                    error: function(b) {
                        a("#global-error .error-message").html(b.message)
                    }
                })
            })
        },
        checkCartAdded: function() {
            1 == a("#productaddedflag").val() && (a(".cart-summary").addClass("cart-summary-display"), a(".shoppingcarticon").addClass("shoppingcarticondisplay"));
            var b = setTimeout(function() {
                a(".cart-summary").removeClass("cart-summary-display");
                a(".shoppingcarticon").removeClass("shoppingcarticondisplay")
            }, 5E3);
            a(".cart-summary").bind("mouseleave", function() {
                b =
                    setTimeout(function() {
                        a(".cart-summary").removeClass("cart-summary-display");
                        a(".shoppingcarticon").removeClass("shoppingcarticondisplay")
                    }, 5E3)
            });
            a(".cart-summary").bind("mouseenter", function() {
                null !== b && clearTimeout(b)
            })
        },
        invokeLoginModal: function() {
            a(".btn-login").on("click", function() {
                a("#mdlLogin").modal("show");
                a("#mdlAccountActivate").modal("hide")
            });
            a("#travelAnonymousUser") && 1 == a("#travelAnonymousUser").val() && (a("#mdlLogin").modal("show"), a("#mdlAccountActivate").modal("hide"))
        },
        activateAccount: function() {
            if (0 <
                a(".account-active").length) a(".account-active").on("click", function(b) {
                b.preventDefault();
                a("#mdlAccountActivate").modal("show");
                a("#mdlLogin").modal("hide")
            })
        },
        openLiveloModal: function() {
            a(".modal").on("show.bs.modal", function() {
                var b = a(this).find("form");
                0 < b.length && (a(this).find(".global-error").hide(), b.data("validator").resetForm(), b.find(".error").removeClass("error"))
            })
        },
        closeLiveloModal: function() {
            a(".modal").on("hidden.bs.modal", function() {
                a(".global-error").hide();
                if (0 < a(this).find("form").length) {
                    var b =
                        a(this).find("form");
                    a(this).find(".global-error").hide();
                    b.data("validator") && b.data("validator").resetForm();
                    0 < b.find(".error").length && b.find(".error").removeClass("error")
                }
            })
        },
        clearError: function() {
            a(".form-control").on("change", function() {
                0 >= a(".form-control").closest("form").find(".form-control.error").length ? a(".global-error").hide() : a(".global-error").show()
            })
        },
        onClickBTTBtn: function() {
            a(".js-back-to-top").on("click", function(b) {
                a("html, body").animate({
                    scrollTop: 0
                }, 1800);
                return !1
            })
        },
        preventLinkDefault: function() {},
        alterTelefonoCel: function() {
            a("#telefonoCel").on("click", function(b) {
                b.preventDefault();
                a.ajax({
                    method: "POST",
                    cache: "false",
                    dataType: "json",
                    url: "/livelo/secure/myaccount/generateToken.jsp",
                    data: {
                        action: "phone"
                    },
                    success: function(b) {
                        "true" === b.success ? a("#mdlChangeTelefono").modal("show") : (a(".global-error").find(".error-message").html(b.message), a(".global-error").show())
                    },
                    error: function(b) {
                        a("#global-error .error-message").html(b.message)
                    }
                })
            })
        },
        alterarEmail: function() {
            a("#alterarEmail").on("click",
                function(b) {
                    b.preventDefault();
                    a.ajax({
                        method: "POST",
                        cache: "false",
                        dataType: "json",
                        url: "/livelo/secure/myaccount/generateToken.jsp",
                        data: {
                            action: "email"
                        },
                        success: function(b) {
                            "true" === b.success ? a("#mdlChangeEmail").modal("show") : (a(".global-error").find(".error-message").html(b.message), a(".global-error").show())
                        },
                        error: function(b) {
                            a("#global-error .error-message").html(b.message)
                        }
                    })
                })
        },
        alterarSenha: function() {
            a().toggle();
            a("#password-success").hide()
        },
        closePwdChangeSuccessBtn: function() {
            a("#closePwdChangeSuccessBtn").on("click",
                function(b) {
                    b.preventDefault();
                    a("#mdlChangePassword").modal("hide");
                    a("#password-success, #form-reset-password-div").toggle()
                })
        },
        signout: function() {
            a(".signout").on("click", function(b) {
                b.preventDefault();
                a(this).closest("form").submit()
            })
        },
        setMasks: function() {
            a(".txtCPF").on("paste", function() {
                a(this).val("")
            });
            0 < a(".txtCPF").length && a(".txtCPF").mask("999.999.999-99", {
                placeholder: ""
            })
        },
        quantityUpdate: function() {
            a(".cart-table .qtyminus, .cart-table .qtyplus").on("click", function(b) {
                b.preventDefault();
                b = a(this);
                var c = "";
                a(b).hasClass("qtyminus") ? c = "qtyminus" : a(b).hasClass("qtyplus") && (c = "qtyplus");
                livelo.common.updateMethod(b, c)
            })
        },
        saveItemQuantity: function() {
            a(".saveQuantity").on("click", function() {
                a(this).closest("form").submit()
            })
        },
        updateMethod: function(b, c) {
            var e = a(b).closest("form").find(".qty"),
                d = parseInt(a(e).val());
            "qtyplus" == c ? !isNaN(d) && 99 > d ? (a(e).val(d + 1), a(e).closest("form").submit()) : !isNaN(d) && 99 == d && a(e).val(d) : "qtyminus" == c && (!isNaN(d) && 1 < d ? (a(e).val(d - 1), a(e).closest("form").submit()) :
                !isNaN(d) && 1 == d && a(e).val(d))
        },
        oamLogin: function() {
            a(".form-login-oam").on("submit", function(b) {
                var c = a(this);
                c.valid() ? (b = c.find("[name\x3dusername]"), c = b.val(), c = c.replace(/\D/g, ""), b.val(c)) : b.preventDefault()
            })
        },
        showRecaptcha: function(b) {
            grecaptcha && (a("#" + b).html(""), grecaptcha.render(b, {
                sitekey: a("#publicKey").val()
            }))
        }
    };
    livelo.common.modules.push(livelo.common.init);
    a(document).ready(function() {
        livelo.common.checkCartAdded();
        a(window).scroll(function() {
            100 < a(this).scrollTop() ? a(".btt-btn").css("display",
                "inline-block") : a(".btt-btn").css("display", "none")
        });
        for (var b = 0; b < livelo.common.modules.length; b++) livelo.common.modules[b]()
    })
})(jQuery);
(function(a) {
    livelo.minicart = {
        container: ".cart-summary",
        cart_timer: 2E3,
        cart_timer1: 300,
        icon_timer: 2E3,
        cart_timeout: null,
        cart_timeout1: null,
        init: function() {
            livelo.minicart.onClickRemoveFromMiniCart();
            0 == a("#cart").length && livelo.minicart.carticon();
            livelo.minicart.validateForm();
            window.location.hash && a(window.location.hash).modal("toggle")
        },
        onClickRemoveFromMiniCart: function() {
            a(".js-remove-from-mini-cart").on("click", function() {
                var b = a(this).closest("js-minicart-product-container").attr("data-product-id");
                a.ajax({
                    url: "fragments/minicart_updated_html.php",
                    data: {
                        productID: b
                    },
                    success: function(b) {
                        a(".cart-summary").html(b)
                    }
                })
            })
        },
        validateForm: function() {
            a(".coupon-form").validate()
        },
        carticon: function() {
            var b = a(".shoppingcarticon"),
                c = a(".cart-summary");
            a(document).mouseup(function(a) {
                !b.is(a.target) && 0 === b.has(a.target).length && (clearTimeout(livelo.minicart.cart_timeout), b.removeClass("shoppingcarticondisplay"), c.removeClass("cart-summary-display"))
            });
            b.hover(function() {
                clearTimeout(livelo.minicart.cart_timeout);
                clearTimeout(livelo.minicart.cart_timeout1);
                a("#select-container select").trigger("focusout");
                livelo.minicart.cart_timeout1 = setTimeout(function() {
                    b.addClass("shoppingcarticondisplay");
                    c.addClass("cart-summary-display")
                }, livelo.minicart.cart_timer1)
            }, function() {
                clearTimeout(livelo.minicart.cart_timeout);
                clearTimeout(livelo.minicart.cart_timeout1);
                livelo.minicart.cart_timeout = setTimeout(function() {
                    b.removeClass("shoppingcarticondisplay");
                    c.removeClass("cart-summary-display")
                }, livelo.minicart.cart_timer)
            })
        },
        setNotifications: function() {
            a("#chkEMail, #chkSMS").each(function() {
                a(this).is(":checked") ? a(this).next("input[type\x3dhidden]").val("true") : a(this).next("input[type\x3dhidden]").val("false")
            })
        }
    };
    livelo.common.modules.push(livelo.minicart.init)
})(jQuery);
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : b("undefined" != typeof jQuery ? jQuery : window.Zepto)
})(function(b) {
    function y(a) {
        var h = a.data;
        a.isDefaultPrevented() || (a.preventDefault(), b(a.target).ajaxSubmit(h))
    }

    function u(a) {
        var h = a.target,
            d = b(h);
        if (!d.is("[type\x3dsubmit],[type\x3dimage]")) {
            h = d.closest("[type\x3dsubmit]");
            if (0 === h.length) return;
            h = h[0]
        }
        var c = this;
        c.clk = h;
        "image" == h.type && (void 0 !== a.offsetX ? (c.clk_x = a.offsetX, c.clk_y = a.offsetY) : "function" == typeof b.fn.offset ?
            (d = d.offset(), c.clk_x = a.pageX - d.left, c.clk_y = a.pageY - d.top) : (c.clk_x = a.pageX - h.offsetLeft, c.clk_y = a.pageY - h.offsetTop));
        setTimeout(function() {
            c.clk = c.clk_x = c.clk_y = null
        }, 100)
    }

    function r() {
        if (b.fn.ajaxSubmit.debug) {
            var a = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(a) : window.opera && window.opera.postError && window.opera.postError(a)
        }
    }
    var z, B;
    z = void 0 !== b("\x3cinput type\x3d'file'/\x3e").get(0).files;
    B = void 0 !== window.FormData;
    var D = !!b.fn.prop;
    b.fn.attr2 = function() {
        if (!D) return this.attr.apply(this, arguments);
        var a = this.prop.apply(this, arguments);
        return a && a.jquery || "string" === typeof a ? a : this.attr.apply(this, arguments)
    };
    b.fn.ajaxSubmit = function(a) {
        function h(c) {
            c = b.param(c, a.traditional).split("\x26");
            var f = c.length,
                h = [],
                g, d;
            for (g = 0; g < f; g++) c[g] = c[g].replace(/\+/g, " "), d = c[g].split("\x3d"), h.push([decodeURIComponent(d[0]), decodeURIComponent(d[1])]);
            return h
        }

        function d(c) {
            for (var f = new FormData, d = 0; d < c.length; d++) f.append(c[d].name, c[d].value);
            if (a.extraData) {
                c = h(a.extraData);
                for (d = 0; d < c.length; d++) c[d] && f.append(c[d][0], c[d][1])
            }
            a.data = null;
            d = b.extend(!0, {}, b.ajaxSettings, a, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: g || "POST"
            });
            a.uploadProgress && (d.xhr = function() {
                var c = b.ajaxSettings.xhr();
                c.upload && c.upload.addEventListener("progress", function(b) {
                    var e = 0,
                        c = b.loaded || b.position,
                        d = b.total;
                    b.lengthComputable && (e = Math.ceil(100 * (c / d)));
                    a.uploadProgress(b, c, d, e)
                }, !1);
                return c
            });
            d.data = null;
            var l = d.beforeSend;
            d.beforeSend = function(b, c) {
                c.data =
                    a.formData ? a.formData : f;
                l && l.call(this, b, c)
            };
            return b.ajax(d)
        }

        function c(c) {
            function d(a) {
                var b = null;
                try {
                    a.contentWindow && (b = a.contentWindow.document)
                } catch (c) {
                    r("cannot get iframe.contentWindow document: " + c)
                }
                if (b) return b;
                try {
                    b = a.contentDocument ? a.contentDocument : a.document
                } catch (e) {
                    r("cannot get iframe.contentDocument: " + e), b = a.document
                }
                return b
            }

            function f() {
                function a() {
                    try {
                        var b = d(v).readyState;
                        r("state \x3d " + b);
                        b && "uninitialized" == b.toLowerCase() && setTimeout(a, 50)
                    } catch (c) {
                        r("Server abort: ",
                            c, " (", c.name, ")"), h(z), u && clearTimeout(u), u = void 0
                    }
                }
                var c = n.attr2("target"),
                    k = n.attr2("action"),
                    m = n.attr("enctype") || n.attr("encoding") || "multipart/form-data";
                l.setAttribute("target", s);
                (!g || /post/i.test(g)) && l.setAttribute("method", "POST");
                k != e.url && l.setAttribute("action", e.url);
                !e.skipEncodingOverride && (!g || /post/i.test(g)) && n.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                });
                e.timeout && (u = setTimeout(function() {
                    y = !0;
                    h(A)
                }, e.timeout));
                var p = [];
                try {
                    if (e.extraData)
                        for (var q in e.extraData) e.extraData.hasOwnProperty(q) &&
                            (b.isPlainObject(e.extraData[q]) && e.extraData[q].hasOwnProperty("name") && e.extraData[q].hasOwnProperty("value") ? p.push(b('\x3cinput type\x3d"hidden" name\x3d"' + e.extraData[q].name + '"\x3e').val(e.extraData[q].value).appendTo(l)[0]) : p.push(b('\x3cinput type\x3d"hidden" name\x3d"' + q + '"\x3e').val(e.extraData[q]).appendTo(l)[0]));
                    e.iframeTarget || w.appendTo("body");
                    v.attachEvent ? v.attachEvent("onload", h) : v.addEventListener("load", h, !1);
                    setTimeout(a, 15);
                    try {
                        l.submit()
                    } catch (t) {
                        document.createElement("form").submit.apply(l)
                    }
                } finally {
                    l.setAttribute("action",
                        k), l.setAttribute("enctype", m), c ? l.setAttribute("target", c) : n.removeAttr("target"), b(p).remove()
                }
            }

            function h(a) {
                if (!k.aborted && !F)
                    if (q = d(v), q || (r("cannot access response document"), a = z), a === A && k) k.abort("timeout"), x.reject(k, "timeout");
                    else if (a == z && k) k.abort("server abort"), x.reject(k, "error", "server abort");
                else if (q && q.location.href != e.iframeSrc || y) {
                    v.detachEvent ? v.detachEvent("onload", h) : v.removeEventListener("load", h, !1);
                    a = "success";
                    var c;
                    try {
                        if (y) throw "timeout";
                        var f = "xml" == e.dataType || q.XMLDocument ||
                            b.isXMLDoc(q);
                        r("isXml\x3d" + f);
                        if (!f && (window.opera && (null === q.body || !q.body.innerHTML)) && --C) {
                            r("requeing onLoad callback, DOM not available");
                            setTimeout(h, 250);
                            return
                        }
                        var g = q.body ? q.body : q.documentElement;
                        k.responseText = g ? g.innerHTML : null;
                        k.responseXML = q.XMLDocument ? q.XMLDocument : q;
                        f && (e.dataType = "xml");
                        k.getResponseHeader = function(a) {
                            return {
                                "content-type": e.dataType
                            }[a.toLowerCase()]
                        };
                        g && (k.status = Number(g.getAttribute("status")) || k.status, k.statusText = g.getAttribute("statusText") || k.statusText);
                        var l = (e.dataType || "").toLowerCase(),
                            m = /(json|script|text)/.test(l);
                        if (m || e.textarea) {
                            var n = q.getElementsByTagName("textarea")[0];
                            if (n) k.responseText = n.value, k.status = Number(n.getAttribute("status")) || k.status, k.statusText = n.getAttribute("statusText") || k.statusText;
                            else if (m) {
                                var p = q.getElementsByTagName("pre")[0],
                                    s = q.getElementsByTagName("body")[0];
                                p ? k.responseText = p.textContent ? p.textContent : p.innerText : s && (k.responseText = s.textContent ? s.textContent : s.innerText)
                            }
                        } else "xml" == l && (!k.responseXML &&
                            k.responseText) && (k.responseXML = H(k.responseText));
                        try {
                            B = I(k, l, e)
                        } catch (G) {
                            a = "parsererror", k.error = c = G || a
                        }
                    } catch (E) {
                        r("error caught: ", E), a = "error", k.error = c = E || a
                    }
                    k.aborted && (r("upload aborted"), a = null);
                    k.status && (a = 200 <= k.status && 300 > k.status || 304 === k.status ? "success" : "error");
                    "success" === a ? (e.success && e.success.call(e.context, B, "success", k), x.resolve(k.responseText, "success", k), t && b.event.trigger("ajaxSuccess", [k, e])) : a && (void 0 === c && (c = k.statusText), e.error && e.error.call(e.context, k, a, c), x.reject(k,
                        "error", c), t && b.event.trigger("ajaxError", [k, e, c]));
                    t && b.event.trigger("ajaxComplete", [k, e]);
                    t && !--b.active && b.event.trigger("ajaxStop");
                    e.complete && e.complete.call(e.context, k, a);
                    F = !0;
                    e.timeout && clearTimeout(u);
                    setTimeout(function() {
                        e.iframeTarget ? w.attr("src", e.iframeSrc) : w.remove();
                        k.responseXML = null
                    }, 100)
                }
            }
            var l = n[0],
                m, e, t, s, w, v, k, y, u, x = b.Deferred();
            x.abort = function(a) {
                k.abort(a)
            };
            if (c)
                for (m = 0; m < p.length; m++) c = b(p[m]), D ? c.prop("disabled", !1) : c.removeAttr("disabled");
            e = b.extend(!0, {}, b.ajaxSettings,
                a);
            e.context = e.context || e;
            s = "jqFormIO" + (new Date).getTime();
            e.iframeTarget ? (w = b(e.iframeTarget), (m = w.attr2("name")) ? s = m : w.attr2("name", s)) : (w = b('\x3ciframe name\x3d"' + s + '" src\x3d"' + e.iframeSrc + '" /\x3e'), w.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            }));
            v = w[0];
            k = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(a) {
                    var c = "timeout" === a ? "timeout" : "aborted";
                    r("aborting upload... " +
                        c);
                    this.aborted = 1;
                    try {
                        v.contentWindow.document.execCommand && v.contentWindow.document.execCommand("Stop")
                    } catch (d) {}
                    w.attr("src", e.iframeSrc);
                    k.error = c;
                    e.error && e.error.call(e.context, k, c, a);
                    t && b.event.trigger("ajaxError", [k, e, c]);
                    e.complete && e.complete.call(e.context, k, c)
                }
            };
            (t = e.global) && 0 === b.active++ && b.event.trigger("ajaxStart");
            t && b.event.trigger("ajaxSend", [k, e]);
            if (e.beforeSend && !1 === e.beforeSend.call(e.context, k, e)) return e.global && b.active--, x.reject(), x;
            if (k.aborted) return x.reject(), x;
            if (c =
                l.clk)
                if ((m = c.name) && !c.disabled) e.extraData = e.extraData || {}, e.extraData[m] = c.value, "image" == c.type && (e.extraData[m + ".x"] = l.clk_x, e.extraData[m + ".y"] = l.clk_y);
            var A = 1,
                z = 2;
            c = b("meta[name\x3dcsrf-token]").attr("content");
            if ((m = b("meta[name\x3dcsrf-param]").attr("content")) && c) e.extraData = e.extraData || {}, e.extraData[m] = c;
            e.forceSync ? f() : setTimeout(f, 10);
            var B, q, C = 50,
                F, H = b.parseXML || function(a, b) {
                    window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a,
                        "text/xml");
                    return b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
                },
                J = b.parseJSON || function(a) {
                    return window.eval("(" + a + ")")
                },
                I = function(a, c, e) {
                    var d = a.getResponseHeader("content-type") || "",
                        f = "xml" === c || !c && 0 <= d.indexOf("xml");
                    a = f ? a.responseXML : a.responseText;
                    f && "parsererror" === a.documentElement.nodeName && b.error && b.error("parsererror");
                    e && e.dataFilter && (a = e.dataFilter(a, c));
                    "string" === typeof a && ("json" === c || !c && 0 <= d.indexOf("json") ? a = J(a) : ("script" === c || !c && 0 <= d.indexOf("javascript")) &&
                        b.globalEval(a));
                    return a
                };
            return x
        }
        if (!this.length) return r("ajaxSubmit: skipping submit process - no element selected"), this;
        var g, f, n = this;
        "function" == typeof a ? a = {
            success: a
        } : void 0 === a && (a = {});
        g = a.type || this.attr2("method");
        f = a.url || this.attr2("action");
        (f = (f = "string" === typeof f ? b.trim(f) : "") || window.location.href || "") && (f = (f.match(/^([^#]+)/) || [])[1]);
        a = b.extend(!0, {
            url: f,
            success: b.ajaxSettings.success,
            type: g || b.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, a);
        f = {};
        this.trigger("form-pre-serialize", [this, a, f]);
        if (f.veto) return r("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (a.beforeSerialize && !1 === a.beforeSerialize(this, a)) return r("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var m = a.traditional;
        void 0 === m && (m = b.ajaxSettings.traditional);
        var p = [],
            l, t = this.formToArray(a.semantic, p);
        a.data && (a.extraData = a.data, l = b.param(a.data, m));
        if (a.beforeSubmit && !1 === a.beforeSubmit(t, this, a)) return r("ajaxSubmit: submit aborted via beforeSubmit callback"),
            this;
        this.trigger("form-submit-validate", [t, this, a, f]);
        if (f.veto) return r("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        f = b.param(t, m);
        l && (f = f ? f + "\x26" + l : l);
        "GET" == a.type.toUpperCase() ? (a.url += (0 <= a.url.indexOf("?") ? "\x26" : "?") + f, a.data = null) : a.data = f;
        var s = [];
        a.resetForm && s.push(function() {
            n.resetForm()
        });
        a.clearForm && s.push(function() {
            n.clearForm(a.includeHidden)
        });
        if (!a.dataType && a.target) {
            var y = a.success || function() {};
            s.push(function(c) {
                var d = a.replaceTarget ? "replaceWith" :
                    "html";
                b(a.target)[d](c).each(y, arguments)
            })
        } else a.success && s.push(a.success);
        a.success = function(b, c, d) {
            for (var f = a.context || this, g = 0, h = s.length; g < h; g++) s[g].apply(f, [b, c, d || n, n])
        };
        if (a.error) {
            var u = a.error;
            a.error = function(b, c, d) {
                u.apply(a.context || this, [b, c, d, n])
            }
        }
        if (a.complete) {
            var C = a.complete;
            a.complete = function(b, c) {
                C.apply(a.context || this, [b, c, n])
            }
        }
        l = 0 < b("input[type\x3dfile]:enabled", this).filter(function() {
            return "" !== b(this).val()
        }).length;
        f = "multipart/form-data" == n.attr("enctype") || "multipart/form-data" ==
            n.attr("encoding");
        m = z && B;
        r("fileAPI :" + m);
        var A;
        !1 !== a.iframe && (a.iframe || (l || f) && !m) ? a.closeKeepAlive ? b.get(a.closeKeepAlive, function() {
            A = c(t)
        }) : A = c(t) : A = (l || f) && m ? d(t) : b.ajax(a);
        n.removeData("jqxhr").data("jqxhr", A);
        for (l = 0; l < p.length; l++) p[l] = null;
        this.trigger("form-submit-notify", [this, a]);
        return this
    };
    b.fn.ajaxForm = function(a) {
        a = a || {};
        a.delegation = a.delegation && b.isFunction(b.fn.on);
        if (!a.delegation && 0 === this.length) {
            var h = this.selector,
                d = this.context;
            if (!b.isReady && h) return r("DOM not ready, queuing ajaxForm"),
                b(function() {
                    b(h, d).ajaxForm(a)
                }), this;
            r("terminating; zero elements found by selector" + (b.isReady ? "" : " (DOM not ready)"));
            return this
        }
        return a.delegation ? (b(document).off("submit.form-plugin", this.selector, y).off("click.form-plugin", this.selector, u).on("submit.form-plugin", this.selector, a, y).on("click.form-plugin", this.selector, a, u), this) : this.ajaxFormUnbind().bind("submit.form-plugin", a, y).bind("click.form-plugin", a, u)
    };
    b.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    b.fn.formToArray = function(a, h) {
        var d = [];
        if (0 === this.length) return d;
        var c = this[0],
            g = this.attr("id"),
            f = a ? c.getElementsByTagName("*") : c.elements;
        f && !/MSIE [678]/.test(navigator.userAgent) && (f = b(f).get());
        g && (g = b(':input[form\x3d"' + g + '"]').get(), g.length && (f = (f || []).concat(g)));
        if (!f || !f.length) return d;
        var n, m, p, l, r;
        n = 0;
        for (r = f.length; n < r; n++)
            if (l = f[n], (g = l.name) && !l.disabled)
                if (a && c.clk && "image" == l.type) c.clk == l && (d.push({
                    name: g,
                    value: b(l).val(),
                    type: l.type
                }), d.push({
                    name: g + ".x",
                    value: c.clk_x
                }, {
                    name: g +
                        ".y",
                    value: c.clk_y
                }));
                else if ((p = b.fieldValue(l, !0)) && p.constructor == Array) {
            h && h.push(l);
            m = 0;
            for (l = p.length; m < l; m++) d.push({
                name: g,
                value: p[m]
            })
        } else if (z && "file" == l.type)
            if (h && h.push(l), p = l.files, p.length)
                for (m = 0; m < p.length; m++) d.push({
                    name: g,
                    value: p[m],
                    type: l.type
                });
            else d.push({
                name: g,
                value: "",
                type: l.type
            });
        else null !== p && "undefined" != typeof p && (h && h.push(l), d.push({
            name: g,
            value: p,
            type: l.type,
            required: l.required
        }));
        if (!a && c.clk && (f = b(c.clk), n = f[0], (g = n.name) && !n.disabled && "image" == n.type)) d.push({
            name: g,
            value: f.val()
        }), d.push({
            name: g + ".x",
            value: c.clk_x
        }, {
            name: g + ".y",
            value: c.clk_y
        });
        return d
    };
    b.fn.formSerialize = function(a) {
        return b.param(this.formToArray(a))
    };
    b.fn.fieldSerialize = function(a) {
        var h = [];
        this.each(function() {
            var d = this.name;
            if (d) {
                var c = b.fieldValue(this, a);
                if (c && c.constructor == Array)
                    for (var g = 0, f = c.length; g < f; g++) h.push({
                        name: d,
                        value: c[g]
                    });
                else null !== c && "undefined" != typeof c && h.push({
                    name: this.name,
                    value: c
                })
            }
        });
        return b.param(h)
    };
    b.fn.fieldValue = function(a) {
        for (var h = [], d = 0, c = this.length; d <
            c; d++) {
            var g = b.fieldValue(this[d], a);
            null === g || ("undefined" == typeof g || g.constructor == Array && !g.length) || (g.constructor == Array ? b.merge(h, g) : h.push(g))
        }
        return h
    };
    b.fieldValue = function(a, h) {
        var d = a.name,
            c = a.type,
            g = a.tagName.toLowerCase();
        void 0 === h && (h = !0);
        if (h && (!d || a.disabled || "reset" == c || "button" == c || ("checkbox" == c || "radio" == c) && !a.checked || ("submit" == c || "image" == c) && a.form && a.form.clk != a || "select" == g && -1 == a.selectedIndex)) return null;
        if ("select" == g) {
            var f = a.selectedIndex;
            if (0 > f) return null;
            for (var d = [], g = a.options, n = (c = "select-one" == c) ? f + 1 : g.length, f = c ? f : 0; f < n; f++) {
                var m = g[f];
                if (m.selected) {
                    var p = m.value;
                    p || (p = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value);
                    if (c) return p;
                    d.push(p)
                }
            }
            return d
        }
        return b(a).val()
    };
    b.fn.clearForm = function(a) {
        return this.each(function() {
            b("input,select,textarea", this).clearFields(a)
        })
    };
    b.fn.clearFields = b.fn.clearInputs = function(a) {
        var h = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var d =
                this.type,
                c = this.tagName.toLowerCase();
            if (h.test(d) || "textarea" == c) this.value = "";
            else if ("checkbox" == d || "radio" == d) this.checked = !1;
            else if ("select" == c) this.selectedIndex = -1;
            else if ("file" == d) /MSIE/.test(navigator.userAgent) ? b(this).replaceWith(b(this).clone(!0)) : b(this).val("");
            else if (a && (!0 === a && /hidden/.test(d) || "string" == typeof a && b(this).is(a))) this.value = ""
        })
    };
    b.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) &&
            this.reset()
        })
    };
    b.fn.enable = function(a) {
        void 0 === a && (a = !0);
        return this.each(function() {
            this.disabled = !a
        })
    };
    b.fn.selected = function(a) {
        void 0 === a && (a = !0);
        return this.each(function() {
            var h = this.type;
            "checkbox" == h || "radio" == h ? this.checked = a : "option" == this.tagName.toLowerCase() && (h = b(this).parent("select"), a && (h[0] && "select-one" == h[0].type) && h.find("option").selected(!1), this.selected = a)
        })
    };
    b.fn.ajaxSubmit.debug = !1
});
(function(a) {
    a.EndecaSearchSuggestor = function(b, c) {
        this._active = !0;
        this._options = c;
        this._lastValue = "";
        this._element = b;
        this._container = a('\x3cdiv class\x3d"' + this._options.containerClass + '"\x3e\x3c/\x3e');
        console.log("container " + this._container);
        this._timeOutId;
        this._hideTimeOutId;
        this._selectedIndex = -1;
        var d = this;
        a("body").append(this._container);
        d.handleRequest();
        b.blur(function(b) {
            d._hideTimeOutId = setTimeout(function() {
                d.hide()
            }, 200)
        })
    };
    a.EndecaSearchSuggestor.prototype.moveToPrev = function() {
        if (-1 ==
            this._selectedIndex) this._selectedIndex = 0;
        else {
            if (0 == this._selectedIndex) return;
            this._selectedIndex--
        }
        a("#dimResultType", this._container).removeClass("selected");
        a(a("#dimResultType", this._container).get(this._selectedIndex)).addClass("selected")
    };
    a.EndecaSearchSuggestor.prototype.moveToNext = function() {
        if (-1 == this._selectedIndex) this._selectedIndex = 0;
        else {
            if (this._selectedIndex == a("#dimResultType", this._container).size() - 1) return;
            this._selectedIndex++
        }
        a("#dimResultType", this._container).removeClass("selected");
        a(a("#dimResultType", this._container).get(this._selectedIndex)).addClass("selected")
    };
    a.EndecaSearchSuggestor.prototype.selectItem = function() {
        if (-1 != this._selectedIndex) {
            var b = a("a", a("#dimResult", this._container).get(this._selectedIndex)).attr("href");
            document.location.href = b
        }
    };
    a.EndecaSearchSuggestor.prototype.hide = function() {
        this._container.hide();
        this._active = !1
    };
    a.EndecaSearchSuggestor.prototype.show = function() {
        this._container.is(":hidden") && (this.setPosition(), this._container.show(), this._active = !0, this._selectedIndex = -1)
    };
    a.EndecaSearchSuggestor.prototype.handleRequest = function() {
        var b = this;
        this._timeOutId && clearTimeout(this._timeOutId);
        this._timeOutId = setTimeout(function() {
            var c = a.trim(b._element.val());
            c != b._lastValue && 3 <= c.length && b.requestData();
            b._lastValue = c
        }, this._options.delay)
    };
    a.EndecaSearchSuggestor.prototype.requestData = function() {
        var b = this;
        a.ajax({
            url: b.composeUrl(),
            dataType: "json",
            async: !0,
            success: function(a) {
                b.showSearchResult(a)
            }
        })
    };
    a.EndecaSearchSuggestor.prototype.composeUrl =
        function() {
            var b = this._options.autoSuggestServiceUrl,
                c = a.trim(this._element.val()),
                b = -1 == b.indexOf("?") ? b + "?" : b + "\x26";
            return b += "Dy\x3d1\x26collection\x3d" + this._options.collection + "\x26Ntt\x3d" + c + "*"
        };
    a.EndecaSearchSuggestor.prototype.showSearchResult = function(b) {
        b = this.processSearchResult(b);
        null != b ? (console.log("-----------" + b), a("#dimResultType").html(b), a("#dimResultType").show(), this.bindEventHandler()) : a("#dimResultType").hide()
    };
    a.EndecaSearchSuggestor.prototype.processSearchResult = function(b) {
        var a =
            null;
        b = b.contents[0].autoSuggest;
        if (null == b || 0 == b.length) return null;
        for (var d = 0; d < b.length; d++) {
            var f = b[d];
            if ("DimensionSearchAutoSuggestItem" == f["@type"]) {
                a = f;
                break
            }
        }
        return null != a ? this.generateHtmlContent(a) : null
    };
    a.EndecaSearchSuggestor.prototype.generateHtmlContent = function(b) {
        var c = null;
        if (null != b && 0 < b.dimensionSearchGroups.length) {
            c = a('\x3cdiv id\x3d"#typo"\x3e\x3c/div\x3e');
            b = b.dimensionSearchGroups;
            for (var d = 0; d < b.length; d++)
                for (var f = b[d], g = a("#search").val(), h = 0; h < f.dimensionSearchValues.length; h++) {
                    var e =
                        f.dimensionSearchValues[h],
                        l = e.contentPath + "?Ntt\x3d" + e.label,
                        m = e.label,
                        e = e.ancestors;
                    if (null != e && 0 < e.length)
                        for (var k = 0; k < e.length; k++);
                    c.append('\x3cdiv class\x3d"dimResult"\x3e\x3cdiv class\x3d"link"\x3e' + g + ' in \x3ca href\x3d"' + this._options.searchUrl + l + '"\x3e' + this.highlightMatched(m) + "\x3c/a\x3e\x3cdiv\x3e\x3c/div\x3e")
                }
        }
        return null != c ? c[0] : null
    };
    a.EndecaSearchSuggestor.prototype.highlightMatched = function(b) {
        var c = a.trim(this._element.val()).toLowerCase(),
            d = b.toLowerCase();
        if (-1 != d.indexOf(c)) var d =
            d.indexOf(c),
            f = b.substring(0, d),
            g = b.substring(d + c.length),
            c = b.substr(d, c.length),
            d = f + "\x3cspan\x3e" + c + "\x3c/span\x3e" + g;
        return d
    };
    a.EndecaSearchSuggestor.prototype.bindEventHandler = function() {
        var b = this;
        a("#dimResultType", this._container).mouseover(function(c) {
            a("#dimResultType", b._container).removeClass("selected");
            a(this).addClass("selected");
            b._selectedIndex = a("#dimResultType", b._container).index(a(this))
        });
        a("#dimResultType", this._container).click(function(a) {
            b.selectItem()
        });
        a("a", a("#dimResultType",
            this._container)).click(function(a) {
            a.preventDefault();
            b.selectItem()
        })
    };
    a.EndecaSearchSuggestor.prototype.setPosition = function() {
        var a = this._element.offset();
        this._container.css({
            top: a.top + this._element.outerHeight(),
            left: a.left,
            width: this._element.width()
        })
    };
    a.fn.endecaSearchSuggest = function(b) {
        var c = a.extend({}, a.fn.endecaSearchSuggest.defaults, b);
        this.each(function() {
            var b = a(this);
            console.log("element ", b);
            new a.EndecaSearchSuggestor(b, c)
        })
    };
    a.fn.endecaSearchSuggest.defaults = {
        minAutoSuggestInputLength: 2,
        displayImage: !1,
        delay: 250,
        autoSuggestServiceUrl: "",
        collection: "",
        searchUrl: "",
        containerClass: "dimSearchSuggContainer"
    }
})(jQuery);
$(document).ready(function(a) {
    $("#search").on("keyup", function() {
        if (3 <= $(this).val().length) $(this).endecaSearchSuggest({
            minAutoSuggestInputLength: 3,
            autoSuggestServiceUrl: livelo.urls.context + "/common/autoSuggest.jsp",
            collection: "/content/Shared/AutoSuggestPanel",
            searchUrl: livelo.urls.context,
            containerClass: "dimSearchSuggContainer"
        });
        else return $("#dimResultType").hide(), !1
    })
});
jQuery.fn.extend({
    animateRotate: function() {
        var c = function(a) {
            var b = a.attr("data-now") || 0,
                b = 360 == b ? 0 : b,
                d = 5.555 * (360 - b);
            console.log(d);
            $({
                deg: b
            }).animate({
                deg: 360
            }, {
                duration: d,
                easing: "linear",
                step: function(b) {
                    "1" == a.attr("data-animated") && (a.attr("data-now", Math.floor(b)), a.css({
                        transform: "rotate(" + b + "deg)"
                    }))
                },
                progress: function(b, c, d) {
                    "1" != a.attr("data-animated") && (a.css("transform"), b.stop())
                },
                complete: function() {
                    "1" == a.attr("data-animated") && c(a)
                }
            })
        };
        return this.each(function() {
            var a = $(this);
            a.attr("data-animated",
                "1");
            c(a)
        })
    },
    animateStop: function() {
        return this.each(function() {
            $(this).removeAttr("data-animated")
        })
    }
});
$(document).ready(function() {
    function c() {
        $("#btn-start").prop("disabled", !$("#btn-start").prop("disabled"));
        $("#btn-stop").prop("disabled", !$("#btn-stop").prop("disabled"))
    }
    $(document).on("click", "#btn-start", function(a) {
        a.preventDefault();
        $(".ldimg img").animateRotate();
        c()
    });
    $(document).on("click", "#btn-stop", function(a) {
        a.preventDefault();
        $(".ldimg img").animateStop();
        c()
    })
});
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
(function(f) {
    "function" === typeof define && define.amd ? define(["jquery"], f) : "undefined" !== typeof exports ? module.exports = f(require("jquery")) : f(jQuery)
})(function(f) {
    var e = window.Slick || {},
        e = function() {
            var a = 0;
            return function(b, d) {
                var c = this,
                    e, h;
                c.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: f(b),
                    appendDots: f(b),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '\x3cbutton type\x3d"button" data-role\x3d"none" class\x3d"slick-prev" aria-label\x3d"previous"\x3ePrevious\x3c/button\x3e',
                    nextArrow: '\x3cbutton type\x3d"button" data-role\x3d"none" class\x3d"slick-next" aria-label\x3d"next"\x3eNext\x3c/button\x3e',
                    autoplay: !1,
                    autoplaySpeed: 3E3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(a, b) {
                        return '\x3cbutton type\x3d"button" data-role\x3d"none"\x3e' + (b + 1) + "\x3c/button\x3e"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rtl: !1,
                    slide: "",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    variableWidth: !1,
                    vertical: !1,
                    waitForAnimate: !0
                };
                c.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1
                };
                f.extend(c, c.initials);
                c.activeBreakpoint = null;
                c.animType =
                    null;
                c.animProp = null;
                c.breakpoints = [];
                c.breakpointSettings = [];
                c.cssTransitions = !1;
                c.hidden = "hidden";
                c.paused = !1;
                c.positionProp = null;
                c.respondTo = null;
                c.shouldClick = !0;
                c.$slider = f(b);
                c.$slidesCache = null;
                c.transformType = null;
                c.transitionType = null;
                c.visibilityChange = "visibilitychange";
                c.windowWidth = 0;
                c.windowTimer = null;
                e = f(b).data("slick") || {};
                c.options = f.extend({}, c.defaults, e, d);
                c.currentSlide = c.options.initialSlide;
                c.originalSettings = c.options;
                if ((e = c.options.responsive || null) && -1 < e.length) {
                    c.respondTo =
                        c.options.respondTo || "window";
                    for (h in e) e.hasOwnProperty(h) && (c.breakpoints.push(e[h].breakpoint), c.breakpointSettings[e[h].breakpoint] = e[h].settings);
                    c.breakpoints.sort(function(a, b) {
                        return !0 === c.options.mobileFirst ? a - b : b - a
                    })
                }
                "undefined" !== typeof document.mozHidden ? (c.hidden = "mozHidden", c.visibilityChange = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (c.hidden = "msHidden", c.visibilityChange = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (c.hidden = "webkitHidden",
                    c.visibilityChange = "webkitvisibilitychange");
                c.autoPlay = f.proxy(c.autoPlay, c);
                c.autoPlayClear = f.proxy(c.autoPlayClear, c);
                c.changeSlide = f.proxy(c.changeSlide, c);
                c.clickHandler = f.proxy(c.clickHandler, c);
                c.selectHandler = f.proxy(c.selectHandler, c);
                c.setPosition = f.proxy(c.setPosition, c);
                c.swipeHandler = f.proxy(c.swipeHandler, c);
                c.dragHandler = f.proxy(c.dragHandler, c);
                c.keyHandler = f.proxy(c.keyHandler, c);
                c.autoPlayIterator = f.proxy(c.autoPlayIterator, c);
                c.instanceUid = a++;
                c.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
                c.init();
                c.checkResponsive(!0)
            }
        }();
    e.prototype.addSlide = e.prototype.slickAdd = function(a, b, d) {
        if ("boolean" === typeof b) d = b, b = null;
        else if (0 > b || b >= this.slideCount) return !1;
        this.unload();
        "number" === typeof b ? 0 === b && 0 === this.$slides.length ? f(a).appendTo(this.$slideTrack) : d ? f(a).insertBefore(this.$slides.eq(b)) : f(a).insertAfter(this.$slides.eq(b)) : !0 === d ? f(a).prependTo(this.$slideTrack) : f(a).appendTo(this.$slideTrack);
        this.$slides = this.$slideTrack.children(this.options.slide);
        this.$slideTrack.children(this.options.slide).detach();
        this.$slideTrack.append(this.$slides);
        this.$slides.each(function(a, b) {
            f(b).attr("data-slick-index", a)
        });
        this.$slidesCache = this.$slides;
        this.reinit()
    };
    e.prototype.animateHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var a = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.animate({
                height: a
            }, this.options.speed)
        }
    };
    e.prototype.animateSlide = function(a, b) {
        var d = {},
            c = this;
        c.animateHeight();
        !0 === c.options.rtl && !1 === c.options.vertical &&
            (a = -a);
        !1 === c.transformsEnabled ? !1 === c.options.vertical ? c.$slideTrack.animate({
            left: a
        }, c.options.speed, c.options.easing, b) : c.$slideTrack.animate({
            top: a
        }, c.options.speed, c.options.easing, b) : !1 === c.cssTransitions ? (!0 === c.options.rtl && (c.currentLeft = -c.currentLeft), f({
            animStart: c.currentLeft
        }).animate({
            animStart: a
        }, {
            duration: c.options.speed,
            easing: c.options.easing,
            step: function(a) {
                a = Math.ceil(a);
                d[c.animType] = !1 === c.options.vertical ? "translate(" + a + "px, 0px)" : "translate(0px," + a + "px)";
                c.$slideTrack.css(d)
            },
            complete: function() {
                b && b.call()
            }
        })) : (c.applyTransition(), a = Math.ceil(a), d[c.animType] = !1 === c.options.vertical ? "translate3d(" + a + "px, 0px, 0px)" : "translate3d(0px," + a + "px, 0px)", c.$slideTrack.css(d), b && setTimeout(function() {
            c.disableTransition();
            b.call()
        }, c.options.speed))
    };
    e.prototype.asNavFor = function(a) {
        var b = null !== this.options.asNavFor ? f(this.options.asNavFor).slick("getSlick") : null;
        null !== b && b.slideHandler(a, !0)
    };
    e.prototype.applyTransition = function(a) {
        var b = {};
        b[this.transitionType] = !1 === this.options.fade ?
            this.transformType + " " + this.options.speed + "ms " + this.options.cssEase : "opacity " + this.options.speed + "ms " + this.options.cssEase;
        !1 === this.options.fade ? this.$slideTrack.css(b) : this.$slides.eq(a).css(b)
    };
    e.prototype.autoPlay = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        this.slideCount > this.options.slidesToShow && !0 !== this.paused && (this.autoPlayTimer = setInterval(this.autoPlayIterator, this.options.autoplaySpeed))
    };
    e.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    };
    e.prototype.autoPlayIterator = function() {
        !1 === this.options.infinite ? 1 === this.direction ? (this.currentSlide + 1 === this.slideCount - 1 && (this.direction = 0), this.slideHandler(this.currentSlide + this.options.slidesToScroll)) : (0 === this.currentSlide - 1 && (this.direction = 1), this.slideHandler(this.currentSlide - this.options.slidesToScroll)) : this.slideHandler(this.currentSlide + this.options.slidesToScroll)
    };
    e.prototype.buildArrows = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow =
            f(this.options.prevArrow), this.$nextArrow = f(this.options.nextArrow), this.htmlExpr.test(this.options.prevArrow) && this.$prevArrow.appendTo(this.options.appendArrows), this.htmlExpr.test(this.options.nextArrow) && this.$nextArrow.appendTo(this.options.appendArrows), !0 !== this.options.infinite && this.$prevArrow.addClass("slick-disabled"))
    };
    e.prototype.buildDots = function() {
        var a, b;
        if (!0 === this.options.dots && this.slideCount > this.options.slidesToShow) {
            b = '\x3cul class\x3d"' + this.options.dotsClass + '"\x3e';
            for (a =
                0; a <= this.getDotCount(); a += 1) b += "\x3cli\x3e" + this.options.customPaging.call(this, this, a) + "\x3c/li\x3e";
            this.$dots = f(b + "\x3c/ul\x3e").appendTo(this.options.appendDots);
            this.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    };
    e.prototype.buildOut = function() {
        this.$slides = this.$slider.children(this.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
        this.slideCount = this.$slides.length;
        this.$slides.each(function(a, b) {
            f(b).attr("data-slick-index", a)
        });
        this.$slidesCache =
            this.$slides;
        this.$slider.addClass("slick-slider");
        this.$slideTrack = 0 === this.slideCount ? f('\x3cdiv class\x3d"slick-track"/\x3e').appendTo(this.$slider) : this.$slides.wrapAll('\x3cdiv class\x3d"slick-track"/\x3e').parent();
        this.$list = this.$slideTrack.wrap('\x3cdiv aria-live\x3d"polite" class\x3d"slick-list"/\x3e').parent();
        this.$slideTrack.css("opacity", 0);
        if (!0 === this.options.centerMode || !0 === this.options.swipeToSlide) this.options.slidesToScroll = 1;
        f("img[data-lazy]", this.$slider).not("[src]").addClass("slick-loading");
        this.setupInfinite();
        this.buildArrows();
        this.buildDots();
        this.updateDots();
        !0 === this.options.accessibility && this.$list.prop("tabIndex", 0);
        this.setSlideClasses("number" === typeof this.currentSlide ? this.currentSlide : 0);
        !0 === this.options.draggable && this.$list.addClass("draggable")
    };
    e.prototype.checkResponsive = function(a) {
        var b, d, c;
        d = this.$slider.width();
        var e = window.innerWidth || f(window).width();
        "window" === this.respondTo ? c = e : "slider" === this.respondTo ? c = d : "min" === this.respondTo && (c = Math.min(e, d));
        if (this.originalSettings.responsive &&
            -1 < this.originalSettings.responsive.length && null !== this.originalSettings.responsive) {
            d = null;
            for (b in this.breakpoints) this.breakpoints.hasOwnProperty(b) && (!1 === this.originalSettings.mobileFirst ? c < this.breakpoints[b] && (d = this.breakpoints[b]) : c > this.breakpoints[b] && (d = this.breakpoints[b]));
            null !== d ? null !== this.activeBreakpoint ? d !== this.activeBreakpoint && (this.activeBreakpoint = d, "unslick" === this.breakpointSettings[d] ? this.unslick() : (this.options = f.extend({}, this.originalSettings, this.breakpointSettings[d]), !0 === a && (this.currentSlide = this.options.initialSlide), this.refresh())) : (this.activeBreakpoint = d, "unslick" === this.breakpointSettings[d] ? this.unslick() : (this.options = f.extend({}, this.originalSettings, this.breakpointSettings[d]), !0 === a && (this.currentSlide = this.options.initialSlide), this.refresh())) : null !== this.activeBreakpoint && (this.activeBreakpoint = null, this.options = this.originalSettings, !0 === a && (this.currentSlide = this.options.initialSlide), this.refresh())
        }
    };
    e.prototype.changeSlide = function(a, b) {
        var d;
        f(a.target).is("a") && a.preventDefault();
        d = 0 !== this.slideCount % this.options.slidesToScroll ? 0 : (this.slideCount - this.currentSlide) % this.options.slidesToScroll;
        switch (a.data.message) {
            case "previous":
                d = 0 === d ? this.options.slidesToScroll : this.options.slidesToShow - d;
                this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide - d, !1, b);
                break;
            case "next":
                d = 0 === d ? this.options.slidesToScroll : d;
                this.slideCount > this.options.slidesToShow && this.slideHandler(this.currentSlide + d, !1, b);
                break;
            case "index":
                d =
                    0 === a.data.index ? 0 : a.data.index || f(a.target).parent().index() * this.options.slidesToScroll, this.slideHandler(this.checkNavigable(d), !1, b)
        }
    };
    e.prototype.checkNavigable = function(a) {
        var b, d;
        b = this.getNavigableIndexes();
        d = 0;
        if (a > b[b.length - 1]) a = b[b.length - 1];
        else
            for (var c in b) {
                if (a < b[c]) {
                    a = d;
                    break
                }
                d = b[c]
            }
        return a
    };
    e.prototype.clickHandler = function(a) {
        !1 === this.shouldClick && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    };
    e.prototype.destroy = function() {
        this.autoPlayClear();
        this.touchObject = {};
        f(".slick-cloned", this.$slider).remove();
        this.$dots && this.$dots.remove();
        this.$prevArrow && "object" !== typeof this.options.prevArrow && this.$prevArrow.remove();
        this.$nextArrow && "object" !== typeof this.options.nextArrow && this.$nextArrow.remove();
        this.$slides.removeClass("slick-slide slick-active slick-center slick-visible").attr("aria-hidden", "true").removeAttr("data-slick-index").css({
            position: "",
            left: "",
            top: "",
            zIndex: "",
            opacity: "",
            width: ""
        });
        this.$slider.removeClass("slick-slider");
        this.$slider.removeClass("slick-initialized");
        this.$list.off(".slick");
        f(window).off(".slick-" + this.instanceUid);
        f(document).off(".slick-" + this.instanceUid);
        this.$slider.html(this.$slides)
    };
    e.prototype.disableTransition = function(a) {
        var b = {};
        b[this.transitionType] = "";
        !1 === this.options.fade ? this.$slideTrack.css(b) : this.$slides.eq(a).css(b)
    };
    e.prototype.fadeSlide = function(a, b) {
        var d = this;
        !1 === d.cssTransitions ? (d.$slides.eq(a).css({
            zIndex: 1E3
        }), d.$slides.eq(a).animate({
            opacity: 1
        }, d.options.speed, d.options.easing, b)) : (d.applyTransition(a), d.$slides.eq(a).css({
            opacity: 1,
            zIndex: 1E3
        }), b && setTimeout(function() {
            d.disableTransition(a);
            b.call()
        }, d.options.speed))
    };
    e.prototype.filterSlides = e.prototype.slickFilter = function(a) {
        null !== a && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.filter(a).appendTo(this.$slideTrack), this.reinit())
    };
    e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    };
    e.prototype.getDotCount = function() {
        var a = 0,
            b = 0,
            d = 0;
        if (!0 === this.options.infinite) d = Math.ceil(this.slideCount /
            this.options.slidesToScroll);
        else if (!0 === this.options.centerMode) d = this.slideCount;
        else
            for (; a < this.slideCount;) ++d, a = b + this.options.slidesToShow, b += this.options.slidesToScroll <= this.options.slidesToShow ? this.options.slidesToScroll : this.options.slidesToShow;
        return d - 1
    };
    e.prototype.getLeft = function(a) {
        var b, d = 0;
        this.slideOffset = 0;
        b = this.$slides.first().outerHeight();
        !0 === this.options.infinite ? (this.slideCount > this.options.slidesToShow && (this.slideOffset = -1 * this.slideWidth * this.options.slidesToShow,
                d = -1 * b * this.options.slidesToShow), 0 !== this.slideCount % this.options.slidesToScroll && (a + this.options.slidesToScroll > this.slideCount && this.slideCount > this.options.slidesToShow) && (a > this.slideCount ? (this.slideOffset = -1 * (this.options.slidesToShow - (a - this.slideCount)) * this.slideWidth, d = -1 * (this.options.slidesToShow - (a - this.slideCount)) * b) : (this.slideOffset = -1 * this.slideCount % this.options.slidesToScroll * this.slideWidth, d = -1 * this.slideCount % this.options.slidesToScroll * b))) : a + this.options.slidesToShow > this.slideCount &&
            (this.slideOffset = (a + this.options.slidesToShow - this.slideCount) * this.slideWidth, d = (a + this.options.slidesToShow - this.slideCount) * b);
        this.slideCount <= this.options.slidesToShow && (d = this.slideOffset = 0);
        !0 === this.options.centerMode && !0 === this.options.infinite ? this.slideOffset += this.slideWidth * Math.floor(this.options.slidesToShow / 2) - this.slideWidth : !0 === this.options.centerMode && (this.slideOffset = 0, this.slideOffset += this.slideWidth * Math.floor(this.options.slidesToShow / 2));
        b = !1 === this.options.vertical ? -1 *
            a * this.slideWidth + this.slideOffset : -1 * a * b + d;
        !0 === this.options.variableWidth && (d = this.slideCount <= this.options.slidesToShow || !1 === this.options.infinite ? this.$slideTrack.children(".slick-slide").eq(a) : this.$slideTrack.children(".slick-slide").eq(a + this.options.slidesToShow), b = d[0] ? -1 * d[0].offsetLeft : 0, !0 === this.options.centerMode && (d = !1 === this.options.infinite ? this.$slideTrack.children(".slick-slide").eq(a) : this.$slideTrack.children(".slick-slide").eq(a + this.options.slidesToShow + 1), b = d[0] ? -1 * d[0].offsetLeft :
            0, b += (this.$list.width() - d.outerWidth()) / 2));
        return b
    };
    e.prototype.getOption = e.prototype.slickGetOption = function(a) {
        return this.options[a]
    };
    e.prototype.getNavigableIndexes = function() {
        var a = 0,
            b = 0,
            d = [],
            c;
        !1 === this.options.infinite ? (c = this.slideCount - this.options.slidesToShow + 1, !0 === this.options.centerMode && (c = this.slideCount)) : (a = -1 * this.slideCount, b = -1 * this.slideCount, c = 2 * this.slideCount);
        for (; a < c;) d.push(a), a = b + this.options.slidesToScroll, b += this.options.slidesToScroll <= this.options.slidesToShow ?
            this.options.slidesToScroll : this.options.slidesToShow;
        return d
    };
    e.prototype.getSlick = function() {
        return this
    };
    e.prototype.getSlideCount = function() {
        var a = this,
            b, d, c;
        c = !0 === a.options.centerMode ? a.slideWidth * Math.floor(a.options.slidesToShow / 2) : 0;
        return !0 === a.options.swipeToSlide ? (a.$slideTrack.find(".slick-slide").each(function(b, e) {
            if (e.offsetLeft - c + f(e).outerWidth() / 2 > -1 * a.swipeLeft) return d = e, !1
        }), b = Math.abs(f(d).attr("data-slick-index") - a.currentSlide) || 1) : a.options.slidesToScroll
    };
    e.prototype.goTo =
        e.prototype.slickGoTo = function(a, b) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(a)
                }
            }, b)
        };
    e.prototype.init = function() {
        f(this.$slider).hasClass("slick-initialized") || (f(this.$slider).addClass("slick-initialized"), this.buildOut(), this.setProps(), this.startLoad(), this.loadSlider(), this.initializeEvents(), this.updateArrows(), this.updateDots());
        this.$slider.trigger("init", [this])
    };
    e.prototype.initArrowEvents = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.on("click.slick", {
            message: "previous"
        }, this.changeSlide), this.$nextArrow.on("click.slick", {
            message: "next"
        }, this.changeSlide))
    };
    e.prototype.initDotEvents = function() {
        var a = this;
        if (!0 === a.options.dots && a.slideCount > a.options.slidesToShow) f("li", a.$dots).on("click.slick", {
            message: "index"
        }, a.changeSlide);
        if (!0 === a.options.dots && !0 === a.options.pauseOnDotsHover && !0 === a.options.autoplay) f("li", a.$dots).on("mouseenter.slick", function() {
            a.paused = !0;
            a.autoPlayClear()
        }).on("mouseleave.slick", function() {
            a.paused = !1;
            a.autoPlay()
        })
    };
    e.prototype.initializeEvents = function() {
        var a = this;
        a.initArrowEvents();
        a.initDotEvents();
        a.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, a.swipeHandler);
        a.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, a.swipeHandler);
        a.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, a.swipeHandler);
        a.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, a.swipeHandler);
        a.$list.on("click.slick", a.clickHandler);
        !0 === a.options.autoplay && (f(document).on(a.visibilityChange, function() {
            a.visibility()
        }), !0 === a.options.pauseOnHover && (a.$list.on("mouseenter.slick", function() {
            a.paused = !0;
            a.autoPlayClear()
        }), a.$list.on("mouseleave.slick", function() {
            a.paused = !1;
            a.autoPlay()
        })));
        if (!0 === a.options.accessibility) a.$list.on("keydown.slick", a.keyHandler);
        if (!0 === a.options.focusOnSelect) f(a.$slideTrack).children().on("click.slick", a.selectHandler);
        f(window).on("orientationchange.slick.slick-" + a.instanceUid, function() {
            a.checkResponsive();
            a.setPosition()
        });
        f(window).on("resize.slick.slick-" + a.instanceUid, function() {
            f(window).width() !==
                a.windowWidth && (clearTimeout(a.windowDelay), a.windowDelay = window.setTimeout(function() {
                    a.windowWidth = f(window).width();
                    a.checkResponsive();
                    a.setPosition()
                }, 50))
        });
        f("*[draggable!\x3dtrue]", a.$slideTrack).on("dragstart", function(a) {
            a.preventDefault()
        });
        f(window).on("load.slick.slick-" + a.instanceUid, a.setPosition);
        f(document).on("ready.slick.slick-" + a.instanceUid, a.setPosition)
    };
    e.prototype.initUI = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.show(),
            this.$nextArrow.show());
        !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.show();
        !0 === this.options.autoplay && this.autoPlay()
    };
    e.prototype.keyHandler = function(a) {
        37 === a.keyCode && !0 === this.options.accessibility ? this.changeSlide({
            data: {
                message: "previous"
            }
        }) : 39 === a.keyCode && !0 === this.options.accessibility && this.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    e.prototype.lazyLoad = function() {
        function a(a) {
            f("img[data-lazy]", a).each(function() {
                var a = f(this),
                    b = f(this).attr("data-lazy");
                a.load(function() {
                    a.animate({
                        opacity: 1
                    }, 200)
                }).css({
                    opacity: 0
                }).attr("src", b).removeAttr("data-lazy").removeClass("slick-loading")
            })
        }
        var b, d;
        !0 === this.options.centerMode ? !0 === this.options.infinite ? (b = this.currentSlide + (this.options.slidesToShow / 2 + 1), d = b + this.options.slidesToShow + 2) : (b = Math.max(0, this.currentSlide - (this.options.slidesToShow / 2 + 1)), d = 2 + (this.options.slidesToShow / 2 + 1) + this.currentSlide) : (b = this.options.infinite ? this.options.slidesToShow + this.currentSlide : this.currentSlide, d = b + this.options.slidesToShow, !0 === this.options.fade && (0 < b && b--, d <= this.slideCount && d++));
        b = this.$slider.find(".slick-slide").slice(b, d);
        a(b);
        this.slideCount <= this.options.slidesToShow ? (b = this.$slider.find(".slick-slide"), a(b)) : this.currentSlide >= this.slideCount - this.options.slidesToShow ? (b = this.$slider.find(".slick-cloned").slice(0, this.options.slidesToShow), a(b)) : 0 === this.currentSlide && (b = this.$slider.find(".slick-cloned").slice(-1 * this.options.slidesToShow), a(b))
    };
    e.prototype.loadSlider = function() {
        this.setPosition();
        this.$slideTrack.css({
            opacity: 1
        });
        this.$slider.removeClass("slick-loading");
        this.initUI();
        "progressive" === this.options.lazyLoad && this.progressiveLazyLoad()
    };
    e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    };
    e.prototype.pause = e.prototype.slickPause = function() {
        this.autoPlayClear();
        this.paused = !0
    };
    e.prototype.play = e.prototype.slickPlay = function() {
        this.paused = !1;
        this.autoPlay()
    };
    e.prototype.postSlide = function(a) {
        this.$slider.trigger("afterChange", [this, a]);
        this.animating = !1;
        this.setPosition();
        this.swipeLeft = null;
        !0 === this.options.autoplay && !1 === this.paused && this.autoPlay()
    };
    e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    };
    e.prototype.progressiveLazyLoad = function() {
        var a = this,
            b;
        0 < f("img[data-lazy]", a.$slider).length && (b = f("img[data-lazy]", a.$slider).first(), b.attr("src", b.attr("data-lazy")).removeClass("slick-loading").load(function() {
            b.removeAttr("data-lazy");
            a.progressiveLazyLoad();
            !0 === a.options.adaptiveHeight && a.setPosition()
        }).error(function() {
            b.removeAttr("data-lazy");
            a.progressiveLazyLoad()
        }))
    };
    e.prototype.refresh = function() {
        var a = this.currentSlide;
        this.destroy();
        f.extend(this, this.initials);
        this.init();
        this.changeSlide({
            data: {
                message: "index",
                index: a
            }
        }, !0)
    };
    e.prototype.reinit = function() {
        this.$slides = this.$slideTrack.children(this.options.slide).addClass("slick-slide");
        this.slideCount = this.$slides.length;
        this.currentSlide >= this.slideCount && 0 !== this.currentSlide && (this.currentSlide -= this.options.slidesToScroll);
        this.slideCount <= this.options.slidesToShow && (this.currentSlide =
            0);
        this.setProps();
        this.setupInfinite();
        this.buildArrows();
        this.updateArrows();
        this.initArrowEvents();
        this.buildDots();
        this.updateDots();
        this.initDotEvents();
        if (!0 === this.options.focusOnSelect) f(this.$slideTrack).children().on("click.slick", this.selectHandler);
        this.setSlideClasses(0);
        this.setPosition();
        this.$slider.trigger("reInit", [this])
    };
    e.prototype.removeSlide = e.prototype.slickRemove = function(a, b, d) {
        a = "boolean" === typeof a ? !0 === a ? 0 : this.slideCount - 1 : !0 === b ? --a : a;
        if (1 > this.slideCount || 0 > a || a > this.slideCount -
            1) return !1;
        this.unload();
        !0 === d ? this.$slideTrack.children().remove() : this.$slideTrack.children(this.options.slide).eq(a).remove();
        this.$slides = this.$slideTrack.children(this.options.slide);
        this.$slideTrack.children(this.options.slide).detach();
        this.$slideTrack.append(this.$slides);
        this.$slidesCache = this.$slides;
        this.reinit()
    };
    e.prototype.setCSS = function(a) {
        var b = {},
            d, c;
        !0 === this.options.rtl && (a = -a);
        d = "left" == this.positionProp ? Math.ceil(a) + "px" : "0px";
        c = "top" == this.positionProp ? Math.ceil(a) + "px" : "0px";
        b[this.positionProp] = a;
        !1 !== this.transformsEnabled && (b = {}, b[this.animType] = !1 === this.cssTransitions ? "translate(" + d + ", " + c + ")" : "translate3d(" + d + ", " + c + ", 0px)");
        this.$slideTrack.css(b)
    };
    e.prototype.setDimensions = function() {
        var a = this;
        !1 === a.options.vertical ? !0 === a.options.centerMode && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), !0 === a.options.centerMode && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        }));
        a.listWidth =
            a.$list.width();
        a.listHeight = a.$list.height();
        if (!1 === a.options.vertical && !1 === a.options.variableWidth) a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length));
        else if (!0 === a.options.variableWidth) {
            var b = 0;
            a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow);
            a.$slideTrack.children(".slick-slide").each(function() {
                b += a.listWidth
            });
            a.$slideTrack.width(Math.ceil(b) + 1)
        } else a.slideWidth = Math.ceil(a.listWidth),
            a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length));
        var d = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        !1 === a.options.variableWidth && a.$slideTrack.children(".slick-slide").width(a.slideWidth - d)
    };
    e.prototype.setFade = function() {
        var a = this,
            b;
        a.$slides.each(function(d, c) {
            b = -1 * a.slideWidth * d;
            !0 === a.options.rtl ? f(c).css({
                position: "relative",
                right: b,
                top: 0,
                zIndex: 800,
                opacity: 0
            }) : f(c).css({
                position: "relative",
                left: b,
                top: 0,
                zIndex: 800,
                opacity: 0
            })
        });
        a.$slides.eq(a.currentSlide).css({
            zIndex: 900,
            opacity: 1
        })
    };
    e.prototype.setHeight = function() {
        if (1 === this.options.slidesToShow && !0 === this.options.adaptiveHeight && !1 === this.options.vertical) {
            var a = this.$slides.eq(this.currentSlide).outerHeight(!0);
            this.$list.css("height", a)
        }
    };
    e.prototype.setOption = e.prototype.slickSetOption = function(a, b, d) {
        this.options[a] = b;
        !0 === d && (this.unload(), this.reinit())
    };
    e.prototype.setPosition = function() {
        this.setDimensions();
        this.setHeight();
        !1 === this.options.fade ?
            this.setCSS(this.getLeft(this.currentSlide)) : this.setFade();
        this.$slider.trigger("setPosition", [this])
    };
    e.prototype.setProps = function() {
        var a = document.body.style;
        this.positionProp = !0 === this.options.vertical ? "top" : "left";
        "top" === this.positionProp ? this.$slider.addClass("slick-vertical") : this.$slider.removeClass("slick-vertical");
        if ((void 0 !== a.WebkitTransition || void 0 !== a.MozTransition || void 0 !== a.msTransition) && !0 === this.options.useCSS) this.cssTransitions = !0;
        void 0 !== a.OTransform && (this.animType = "OTransform",
            this.transformType = "-o-transform", this.transitionType = "OTransition", void 0 === a.perspectiveProperty && void 0 === a.webkitPerspective && (this.animType = !1));
        void 0 !== a.MozTransform && (this.animType = "MozTransform", this.transformType = "-moz-transform", this.transitionType = "MozTransition", void 0 === a.perspectiveProperty && void 0 === a.MozPerspective && (this.animType = !1));
        void 0 !== a.webkitTransform && (this.animType = "webkitTransform", this.transformType = "-webkit-transform", this.transitionType = "webkitTransition", void 0 ===
            a.perspectiveProperty && void 0 === a.webkitPerspective && (this.animType = !1));
        void 0 !== a.msTransform && (this.animType = "msTransform", this.transformType = "-ms-transform", this.transitionType = "msTransition", void 0 === a.msTransform && (this.animType = !1));
        void 0 !== a.transform && !1 !== this.animType && (this.transformType = this.animType = "transform", this.transitionType = "transition");
        this.transformsEnabled = null !== this.animType && !1 !== this.animType
    };
    e.prototype.setSlideClasses = function(a) {
        var b, d, c;
        this.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden",
            "true").removeClass("slick-center");
        d = this.$slider.find(".slick-slide");
        !0 === this.options.centerMode ? (b = Math.floor(this.options.slidesToShow / 2), !0 === this.options.infinite && (a >= b && a <= this.slideCount - 1 - b ? this.$slides.slice(a - b, a + b + 1).addClass("slick-active").attr("aria-hidden", "false") : (c = this.options.slidesToShow + a, d.slice(c - b + 1, c + b + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - this.options.slidesToShow).addClass("slick-center") : a === this.slideCount - 1 && d.eq(this.options.slidesToShow).addClass("slick-center")),
            this.$slides.eq(a).addClass("slick-center")) : 0 <= a && a <= this.slideCount - this.options.slidesToShow ? this.$slides.slice(a, a + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= this.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (b = this.slideCount % this.options.slidesToShow, c = !0 === this.options.infinite ? this.options.slidesToShow + a : a, this.options.slidesToShow == this.options.slidesToScroll && this.slideCount - a < this.options.slidesToShow ? d.slice(c -
            (this.options.slidesToShow - b), c + b).addClass("slick-active").attr("aria-hidden", "false") : d.slice(c, c + this.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" === this.options.lazyLoad && this.lazyLoad()
    };
    e.prototype.setupInfinite = function() {
        var a, b, d;
        !0 === this.options.fade && (this.options.centerMode = !1);
        if (!0 === this.options.infinite && !1 === this.options.fade && (b = null, this.slideCount > this.options.slidesToShow)) {
            d = !0 === this.options.centerMode ? this.options.slidesToShow + 1 : this.options.slidesToShow;
            for (a = this.slideCount; a > this.slideCount - d; a -= 1) b = a - 1, f(this.$slides[b]).clone(!0).attr("id", "").attr("data-slick-index", b - this.slideCount).prependTo(this.$slideTrack).addClass("slick-cloned");
            for (a = 0; a < d; a += 1) b = a, f(this.$slides[b]).clone(!0).attr("id", "").attr("data-slick-index", b + this.slideCount).appendTo(this.$slideTrack).addClass("slick-cloned");
            this.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                f(this).attr("id", "")
            })
        }
    };
    e.prototype.selectHandler = function(a) {
        (a = parseInt(f(a.target).parents(".slick-slide").attr("data-slick-index"))) ||
        (a = 0);
        this.slideCount <= this.options.slidesToShow ? (this.$slider.find(".slick-slide").removeClass("slick-active").attr("aria-hidden", "true"), this.$slides.eq(a).addClass("slick-active").attr("aria-hidden", "false"), !0 === this.options.centerMode && (this.$slider.find(".slick-slide").removeClass("slick-center"), this.$slides.eq(a).addClass("slick-center")), this.asNavFor(a)) : this.slideHandler(a)
    };
    e.prototype.slideHandler = function(a, b, d) {
        var c, e, f = null,
            g = this;
        !(!0 === g.animating && !0 === g.options.waitForAnimate) &&
        (!(!0 === g.options.fade && g.currentSlide === a) && !(g.slideCount <= g.options.slidesToShow)) && (!1 === (b || !1) && g.asNavFor(a), c = a, f = g.getLeft(c), b = g.getLeft(g.currentSlide), g.currentLeft = null === g.swipeLeft ? b : g.swipeLeft, !1 === g.options.infinite && !1 === g.options.centerMode && (0 > a || a > g.getDotCount() * g.options.slidesToScroll) ? !1 === g.options.fade && (c = g.currentSlide, !0 !== d ? g.animateSlide(b, function() {
                g.postSlide(c)
            }) : g.postSlide(c)) : !1 === g.options.infinite && !0 === g.options.centerMode && (0 > a || a > g.slideCount - g.options.slidesToScroll) ?
            !1 === g.options.fade && (c = g.currentSlide, !0 !== d ? g.animateSlide(b, function() {
                g.postSlide(c)
            }) : g.postSlide(c)) : (!0 === g.options.autoplay && clearInterval(g.autoPlayTimer), e = 0 > c ? 0 !== g.slideCount % g.options.slidesToScroll ? g.slideCount - g.slideCount % g.options.slidesToScroll : g.slideCount + c : c >= g.slideCount ? 0 !== g.slideCount % g.options.slidesToScroll ? 0 : c - g.slideCount : c, g.animating = !0, g.$slider.trigger("beforeChange", [g, g.currentSlide, e]), g.currentSlide = e, g.setSlideClasses(g.currentSlide), g.updateDots(), g.updateArrows(), !0 === g.options.fade ? (!0 !== d ? g.fadeSlide(e, function() {
                g.postSlide(e)
            }) : g.postSlide(e), g.animateHeight()) : !0 !== d ? g.animateSlide(f, function() {
                g.postSlide(e)
            }) : g.postSlide(e)))
    };
    e.prototype.startLoad = function() {
        !0 === this.options.arrows && this.slideCount > this.options.slidesToShow && (this.$prevArrow.hide(), this.$nextArrow.hide());
        !0 === this.options.dots && this.slideCount > this.options.slidesToShow && this.$dots.hide();
        this.$slider.addClass("slick-loading")
    };
    e.prototype.swipeDirection = function() {
        var a;
        a = Math.atan2(this.touchObject.startY -
            this.touchObject.curY, this.touchObject.startX - this.touchObject.curX);
        a = Math.round(180 * a / Math.PI);
        0 > a && (a = 360 - Math.abs(a));
        return 45 >= a && 0 <= a || 360 >= a && 315 <= a ? !1 === this.options.rtl ? "left" : "right" : 135 <= a && 225 >= a ? !1 === this.options.rtl ? "right" : "left" : "vertical"
    };
    e.prototype.swipeEnd = function(a) {
        this.dragging = !1;
        this.shouldClick = 10 < this.touchObject.swipeLength ? !1 : !0;
        if (void 0 === this.touchObject.curX) return !1;
        !0 === this.touchObject.edgeHit && this.$slider.trigger("edge", [this, this.swipeDirection()]);
        if (this.touchObject.swipeLength >=
            this.touchObject.minSwipe) switch (this.swipeDirection()) {
            case "left":
                a = this.options.swipeToSlide ? this.checkNavigable(this.currentSlide + this.getSlideCount()) : this.currentSlide + this.getSlideCount();
                this.slideHandler(a);
                this.currentDirection = 0;
                this.touchObject = {};
                this.$slider.trigger("swipe", [this, "left"]);
                break;
            case "right":
                a = this.options.swipeToSlide ? this.checkNavigable(this.currentSlide - this.getSlideCount()) : this.currentSlide - this.getSlideCount(), this.slideHandler(a), this.currentDirection = 1, this.touchObject = {}, this.$slider.trigger("swipe", [this, "right"])
        } else this.touchObject.startX !== this.touchObject.curX && (this.slideHandler(this.currentSlide), this.touchObject = {})
    };
    e.prototype.swipeHandler = function(a) {
        if (!(!1 === this.options.swipe || "ontouchend" in document && !1 === this.options.swipe) && !(!1 === this.options.draggable && -1 !== a.type.indexOf("mouse"))) switch (this.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, this.touchObject.minSwipe = this.listWidth /
            this.options.touchThreshold, a.data.action) {
            case "start":
                this.swipeStart(a);
                break;
            case "move":
                this.swipeMove(a);
                break;
            case "end":
                this.swipeEnd(a)
        }
    };
    e.prototype.swipeMove = function(a) {
        var b, d, c;
        d = void 0 !== a.originalEvent ? a.originalEvent.touches : null;
        if (!this.dragging || d && 1 !== d.length) return !1;
        b = this.getLeft(this.currentSlide);
        this.touchObject.curX = void 0 !== d ? d[0].pageX : a.clientX;
        this.touchObject.curY = void 0 !== d ? d[0].pageY : a.clientY;
        this.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(this.touchObject.curX -
            this.touchObject.startX, 2)));
        d = this.swipeDirection();
        if ("vertical" !== d) {
            void 0 !== a.originalEvent && 4 < this.touchObject.swipeLength && a.preventDefault();
            c = (!1 === this.options.rtl ? 1 : -1) * (this.touchObject.curX > this.touchObject.startX ? 1 : -1);
            a = this.touchObject.swipeLength;
            this.touchObject.edgeHit = !1;
            if (!1 === this.options.infinite && (0 === this.currentSlide && "right" === d || this.currentSlide >= this.getDotCount() && "left" === d)) a = this.touchObject.swipeLength * this.options.edgeFriction, this.touchObject.edgeHit = !0;
            this.swipeLeft = !1 === this.options.vertical ? b + a * c : b + a * (this.$list.height() / this.listWidth) * c;
            if (!0 === this.options.fade || !1 === this.options.touchMove) return !1;
            if (!0 === this.animating) return this.swipeLeft = null, !1;
            this.setCSS(this.swipeLeft)
        }
    };
    e.prototype.swipeStart = function(a) {
        var b;
        if (1 !== this.touchObject.fingerCount || this.slideCount <= this.options.slidesToShow) return this.touchObject = {}, !1;
        void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]);
        this.touchObject.startX = this.touchObject.curX =
            void 0 !== b ? b.pageX : a.clientX;
        this.touchObject.startY = this.touchObject.curY = void 0 !== b ? b.pageY : a.clientY;
        this.dragging = !0
    };
    e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        null !== this.$slidesCache && (this.unload(), this.$slideTrack.children(this.options.slide).detach(), this.$slidesCache.appendTo(this.$slideTrack), this.reinit())
    };
    e.prototype.unload = function() {
        f(".slick-cloned", this.$slider).remove();
        this.$dots && this.$dots.remove();
        this.$prevArrow && "object" !== typeof this.options.prevArrow &&
            this.$prevArrow.remove();
        this.$nextArrow && "object" !== typeof this.options.nextArrow && this.$nextArrow.remove();
        this.$slides.removeClass("slick-slide slick-active slick-visible").attr("aria-hidden", "true").css("width", "")
    };
    e.prototype.unslick = function() {
        this.destroy()
    };
    e.prototype.updateArrows = function() {
        !0 === this.options.arrows && (!0 !== this.options.infinite && this.slideCount > this.options.slidesToShow) && (this.$prevArrow.removeClass("slick-disabled"), this.$nextArrow.removeClass("slick-disabled"), 0 === this.currentSlide ?
            (this.$prevArrow.addClass("slick-disabled"), this.$nextArrow.removeClass("slick-disabled")) : this.currentSlide >= this.slideCount - this.options.slidesToShow && !1 === this.options.centerMode ? (this.$nextArrow.addClass("slick-disabled"), this.$prevArrow.removeClass("slick-disabled")) : this.currentSlide >= this.slideCount - 1 && !0 === this.options.centerMode && (this.$nextArrow.addClass("slick-disabled"), this.$prevArrow.removeClass("slick-disabled")))
    };
    e.prototype.updateDots = function() {
        null !== this.$dots && (this.$dots.find("li").removeClass("slick-active").attr("aria-hidden",
            "true"), this.$dots.find("li").eq(Math.floor(this.currentSlide / this.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    };
    e.prototype.visibility = function() {
        document[this.hidden] ? (this.paused = !0, this.autoPlayClear()) : (this.paused = !1, this.autoPlay())
    };
    f.fn.slick = function() {
        var a = arguments[0],
            b = Array.prototype.slice.call(arguments, 1),
            d = this.length,
            c = 0,
            f;
        for (c; c < d; c++)
            if ("object" == typeof a || "undefined" == typeof a ? this[c].slick = new e(this[c], a) : f = this[c].slick[a].apply(this[c].slick,
                    b), "undefined" != typeof f) return f;
        return this
    };
    f(function() {
        f("[data-slick]").slick()
    })
});
! function(e, t) {
    function w(a, b, f, c, h) {
        var g = !1;
        return a.contents().detach().each(function() {
            var d = e(this);
            if ("undefined" == typeof this) return !0;
            if (d.is("script, .dotdotdot-keep")) a.append(d);
            else {
                if (g) return !0;
                a.append(d);
                !h || d.is(c.after) || d.find(c.after).length || a[a.is("a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style") ? "after" : "append"](h);
                f.innerHeight() > c.maxHeight && (g = 3 == this.nodeType ? A(d, b, f, c, h) :
                    w(d, b, f, c, h), g || (d.detach(), g = !0));
                g || h && h.detach()
            }
        }), b.addClass("is-truncated"), g
    }

    function A(a, b, f, c, h) {
        var g = a[0];
        if (!g) return !1;
        var d = x(g),
            l = -1 !== d.indexOf(" ") ? " " : "　",
            l = "letter" == c.wrap ? "" : l,
            n = d.split(l),
            v = -1,
            k = -1,
            r = 0,
            m = n.length - 1;
        for (c.fallbackToLetter && 0 == r && 0 == m && (l = "", n = d.split(l), m = n.length - 1); m >= r && (0 != r || 0 != m);) {
            var p = Math.floor((r + m) / 2);
            if (p == k) break;
            k = p;
            u(g, n.slice(0, k + 1).join(l) + c.ellipsis);
            f.children().each(function() {
                e(this).toggle().toggle()
            });
            f.innerHeight() > c.maxHeight ? (m = k, c.fallbackToLetter &&
                0 == r && 0 == m && (l = "", n = n[0].split(l), v = -1, k = -1, r = 0, m = n.length - 1)) : (v = k, r = k)
        } - 1 == v || 1 == n.length && 0 == n[0].length ? (f = a.parent(), a.detach(), a = h && h.closest(f).length ? h.length : 0, f.contents().length > a ? g = q(f.contents().eq(-1 - a), b) : (g = q(f, b, !0), a || f.detach()), g && (d = y(x(g), c), u(g, d), a && h && e(g).parent().append(h))) : (d = y(n.slice(0, v + 1).join(l), c), u(g, d));
        return !0
    }

    function y(a, b) {
        for (; - 1 < e.inArray(a.slice(-1), b.lastCharacter.remove);) a = a.slice(0, -1);
        return 0 > e.inArray(a.slice(-1), b.lastCharacter.noEllipsis) && (a +=
            b.ellipsis), a
    }

    function u(a, b) {
        a.innerText ? a.innerText = b : a.nodeValue ? a.nodeValue = b : a.textContent && (a.textContent = b)
    }

    function x(a) {
        return a.innerText ? a.innerText : a.nodeValue ? a.nodeValue : a.textContent ? a.textContent : ""
    }

    function z(a) {
        do a = a.previousSibling; while (a && 1 !== a.nodeType && 3 !== a.nodeType);
        return a
    }

    function q(a, b, f) {
        var c = a && a[0];
        if (c) {
            if (!f) {
                if (3 === c.nodeType) return c;
                if (e.trim(a.text())) return q(a.contents().last(), b)
            }
            for (f = z(c); !f;) {
                if (a = a.parent(), a.is(b) || !a.length) return !1;
                f = z(a[0])
            }
            if (f) return q(e(f),
                b)
        }
        return !1
    }

    function B(a, b) {
        return a ? "string" == typeof a ? (a = e(a, b), a.length ? a : !1) : a.jquery ? a : !1 : !1
    }
    if (!e.fn.dotdotdot) {
        e.fn.dotdotdot = function(a) {
            if (0 == this.length) return e.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
            if (1 < this.length) return this.each(function() {
                e(this).dotdotdot(a)
            });
            var b = this;
            b.data("dotdotdot") && b.trigger("destroy.dot");
            b.data("dotdotdot-style", b.attr("style") || "");
            b.css("word-wrap", "break-word");
            "nowrap" === b.css("white-space") && b.css("white-space", "normal");
            b.bind_events = function() {
                return b.bind("update.dot", function(a, d) {
                    switch (b.removeClass("is-truncated"), a.preventDefault(), a.stopPropagation(), typeof c.height) {
                        case "number":
                            c.maxHeight = c.height;
                            break;
                        case "function":
                            c.maxHeight = c.height.call(b[0]);
                            break;
                        default:
                            for (var k = c, g = b.innerHeight(), m = ["paddingTop", "paddingBottom"], p = 0, q = m.length; q > p; p++) {
                                var s = parseInt(b.css(m[p]), 10);
                                isNaN(s) && (s = 0);
                                g -= s
                            }
                            k.maxHeight = g
                    }
                    c.maxHeight += c.tolerance;
                    "undefined" != typeof d && (("string" == typeof d || "nodeType" in d &&
                        1 === d.nodeType) && (d = e("\x3cdiv /\x3e").append(d).contents()), d instanceof e && (f = d));
                    l = b.wrapInner('\x3cdiv class\x3d"dotdotdot" /\x3e').children();
                    l.contents().detach().end().append(f.clone(!0)).find("br").replaceWith("  \x3cbr /\x3e  ").end().css({
                        height: "auto",
                        width: "auto",
                        border: "none",
                        padding: 0,
                        margin: 0
                    });
                    k = m = !1;
                    h.afterElement && (m = h.afterElement.clone(!0), m.show(), h.afterElement.detach());
                    if (l.innerHeight() > c.maxHeight)
                        if ("children" == c.wrap) {
                            k = l;
                            g = c;
                            p = k.children();
                            q = !1;
                            k.empty();
                            for (var s = 0, u =
                                    p.length; u > s; s++) {
                                var t = p.eq(s);
                                if (k.append(t), m && k.append(m), k.innerHeight() > g.maxHeight) {
                                    t.remove();
                                    q = !0;
                                    break
                                }
                                m && m.detach()
                            }
                            k = q
                        } else k = w(l, b, l, c, m);
                    return l.replaceWith(l.contents()), l = null, e.isFunction(c.callback) && c.callback.call(b[0], k, f), h.isTruncated = k, k
                }).bind("isTruncated.dot", function(a, c) {
                    return a.preventDefault(), a.stopPropagation(), "function" == typeof c && c.call(b[0], h.isTruncated), h.isTruncated
                }).bind("originalContent.dot", function(a, c) {
                    return a.preventDefault(), a.stopPropagation(), "function" ==
                        typeof c && c.call(b[0], f), f
                }).bind("destroy.dot", function(a) {
                    a.preventDefault();
                    a.stopPropagation();
                    b.unwatch().unbind_events().contents().detach().end().append(f).attr("style", b.data("dotdotdot-style") || "").data("dotdotdot", !1)
                }), b
            };
            b.unbind_events = function() {
                return b.unbind(".dot"), b
            };
            b.watch = function() {
                if (b.unwatch(), "window" == c.watch) {
                    var a = e(window),
                        f = a.width(),
                        k = a.height();
                    a.bind("resize.dot" + h.dotId, function() {
                        f == a.width() && k == a.height() && c.windowResizeFix || (f = a.width(), k = a.height(), d && clearInterval(d),
                            d = setTimeout(function() {
                                b.trigger("update.dot")
                            }, 100))
                    })
                } else g = {
                    width: b.innerWidth(),
                    height: b.innerHeight()
                }, d = setInterval(function() {
                    if (b.is(":visible")) {
                        var a = {
                            width: b.innerWidth(),
                            height: b.innerHeight()
                        };
                        (g.width != a.width || g.height != a.height) && (b.trigger("update.dot"), g = a)
                    }
                }, 500);
                return b
            };
            b.unwatch = function() {
                return e(window).unbind("resize.dot" + h.dotId), d && clearInterval(d), b
            };
            var f = b.contents(),
                c = e.extend(!0, {}, e.fn.dotdotdot.defaults, a),
                h = {},
                g = {},
                d = null,
                l = null;
            return c.lastCharacter.remove instanceof
            Array || (c.lastCharacter.remove = e.fn.dotdotdot.defaultArrays.lastCharacter.remove), c.lastCharacter.noEllipsis instanceof Array || (c.lastCharacter.noEllipsis = e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), h.afterElement = B(c.after, b), h.isTruncated = !1, h.dotId = C++, b.data("dotdotdot", !0).bind_events().trigger("update.dot"), c.watch && b.watch(), b
        };
        e.fn.dotdotdot.defaults = {
            ellipsis: "... ",
            wrap: "word",
            fallbackToLetter: !0,
            lastCharacter: {},
            tolerance: 0,
            callback: null,
            after: null,
            height: null,
            watch: !1,
            windowResizeFix: !0
        };
        e.fn.dotdotdot.defaultArrays = {
            lastCharacter: {
                remove: " 　,;.!?".split(""),
                noEllipsis: []
            }
        };
        e.fn.dotdotdot.debug = function() {};
        var C = 1,
            D = e.fn.html;
        e.fn.html = function(a) {
            return a != t && !e.isFunction(a) && this.data("dotdotdot") ? this.trigger("update", [a]) : D.apply(this, arguments)
        };
        var E = e.fn.text;
        e.fn.text = function(a) {
            return a != t && !e.isFunction(a) && this.data("dotdotdot") ? (a = e("\x3cdiv /\x3e").text(a).html(), this.trigger("update", [a])) : E.apply(this, arguments)
        }
    }
}(jQuery);
