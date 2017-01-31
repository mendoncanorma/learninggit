/**
 * jquery.maske.js
 * @version: v1.14.0
 * @author: Igor Escobar
 *
 * Created by Igor Escobar on 2012-03-10. Please report any bug at http://blog.igorescobar.com
 *
 * Copyright (c) 2012 Igor Escobar http://blog.igorescobar.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* jshint laxbreak: true */
/* global define, jQuery, Zepto */

'use strict';

// UMD (Universal Module Definition) patterns for JavaScript modules that work everywhere.
// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
(function (factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery || Zepto);
    }

}(function ($) {

    var Maske = function (el, maske, options) {

        var p = {
            invalid: [],
            getCaret: function () {
                try {
                    var sel,
                        pos = 0,
                        ctrl = el.get(0),
                        dSel = document.selection,
                        cSelStart = ctrl.selectionStart;

                    // IE Support
                    if (dSel && navigator.appVersion.indexOf('MSIE 10') === -1) {
                        sel = dSel.createRange();
                        sel.moveStart('character', -p.val().length);
                        pos = sel.text.length;
                    }
                    // Firefox support
                    else if (cSelStart || cSelStart === '0') {
                        pos = cSelStart;
                    }

                    return pos;
                } catch (e) {}
            },
            setCaret: function(pos) {
                try {
                    if (el.is(':focus')) {
                        var range, ctrl = el.get(0);

                        // Firefox, WebKit, etc..
                        if (ctrl.setSelectionRange) {
                            ctrl.focus();
                            ctrl.setSelectionRange(pos, pos);
                        } else { // IE
                            range = ctrl.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', pos);
                            range.moveStart('character', pos);
                            range.select();
                        }
                    }
                } catch (e) {}
            },
            events: function() {
                el
                .on('keydown.maske', function(e) {
                    el.data('maske-keycode', e.keyCode || e.which);
                })
                .on($.jMaskeGlobals.useInput ? 'input.maske' : 'keyup.maske', p.behaviour)
                .on('paste.maske drop.maske', function() {
                    setTimeout(function() {
                        el.keydown().keyup();
                    }, 100);
                })
                .on('change.maske', function(){
                    el.data('changed', true);
                })
                .on('blur.maske', function(){
                    if (oldValue !== p.val() && !el.data('changed')) {
                        el.trigger('change');
                    }
                    el.data('changed', false);
                })
                // it's very important that this callback remains in this position
                // otherwhise oldValue it's going to work buggy
                .on('blur.maske', function() {
                    oldValue = p.val();
                })
                // select all text on focus
                .on('focus.maske', function (e) {
                    if (options.selectOnFocus === true) {
                        $(e.target).select();
                    }
                })
                // clear the value if it not complete the maske
                .on('focusout.maske', function() {
                    if (options.clearIfNotMatch && !regexMaske.test(p.val())) {
                       p.val('');
                   }
                });
            },
            getRegexMaske: function() {
                var maskeChunks = [], translation, pattern, optional, recursive, oRecursive, r;

                for (var i = 0; i < maske.length; i++) {
                    translation = jMaske.translation[maske.charAt(i)];

                    if (translation) {

                        pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, '');
                        optional = translation.optional;
                        recursive = translation.recursive;

                        if (recursive) {
                            maskeChunks.push(maske.charAt(i));
                            oRecursive = {digit: maske.charAt(i), pattern: pattern};
                        } else {
                            maskeChunks.push(!optional && !recursive ? pattern : (pattern + '?'));
                        }

                    } else {
                        maskeChunks.push(maske.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                    }
                }

                r = maskeChunks.join('');

                if (oRecursive) {
                    r = r.replace(new RegExp('(' + oRecursive.digit + '(.*' + oRecursive.digit + ')?)'), '($1)?')
                         .replace(new RegExp(oRecursive.digit, 'g'), oRecursive.pattern);
                }

                return new RegExp(r);
            },
            destroyEvents: function() {
                el.off(['input', 'keydown', 'keyup', 'paste', 'drop', 'blur', 'focusout', ''].join('.maske '));
            },
            val: function(v) {
                var isInput = el.is('input'),
                    method = isInput ? 'val' : 'text',
                    r;

                if (arguments.length > 0) {
                    if (el[method]() !== v) {
                        el[method](v);
                    }
                    r = el;
                } else {
                    r = el[method]();
                }

                return r;
            },
            getMCharsBeforeCount: function(index, onCleanVal) {
                for (var count = 0, i = 0, maskeL = maske.length; i < maskeL && i < index; i++) {
                    if (!jMaske.translation[maske.charAt(i)]) {
                        index = onCleanVal ? index + 1 : index;
                        count++;
                    }
                }
                return count;
            },
            caretPos: function (originalCaretPos, oldLength, newLength, maskeDif) {
                var translation = jMaske.translation[maske.charAt(Math.min(originalCaretPos - 1, maske.length - 1))];

                return !translation ? p.caretPos(originalCaretPos + 1, oldLength, newLength, maskeDif)
                                    : Math.min(originalCaretPos + newLength - oldLength - maskeDif, newLength);
            },
            behaviour: function(e) {
                e = e || window.event;
                p.invalid = [];

                var keyCode = el.data('maske-keycode');

                if ($.inArray(keyCode, jMaske.byPassKeys) === -1) {
                    var caretPos    = p.getCaret(),
                        currVal     = p.val(),
                        currValL    = currVal.length,
                        newVal      = p.getMaskeed(),
                        newValL     = newVal.length,
                        maskeDif     = p.getMCharsBeforeCount(newValL - 1) - p.getMCharsBeforeCount(currValL - 1),
                        changeCaret = caretPos < currValL;

                    p.val(newVal);

                    if (changeCaret) {
                        // Avoid adjusting caret on backspace or delete
                        if (!(keyCode === 8 || keyCode === 46)) {
                            caretPos = p.caretPos(caretPos, currValL, newValL, maskeDif);
                        }
                        p.setCaret(caretPos);
                    }

                    return p.callbacks(e);
                }
            },
            getMaskeed: function(skipMaskeChars, val) {
                var buf = [],
                    value = val === undefined ? p.val() : val + '',
                    m = 0, maskeLen = maske.length,
                    v = 0, valLen = value.length,
                    offset = 1, addMethod = 'push',
                    resetPos = -1,
                    lastMaskeChar,
                    check;

                if (options.reverse) {
                    addMethod = 'unshift';
                    offset = -1;
                    lastMaskeChar = 0;
                    m = maskeLen - 1;
                    v = valLen - 1;
                    check = function () {
                        return m > -1 && v > -1;
                    };
                } else {
                    lastMaskeChar = maskeLen - 1;
                    check = function () {
                        return m < maskeLen && v < valLen;
                    };
                }

                while (check()) {
                    var maskeDigit = maske.charAt(m),
                        valDigit = value.charAt(v),
                        translation = jMaske.translation[maskeDigit];

                    if (translation) {
                        if (valDigit.match(translation.pattern)) {
                            buf[addMethod](valDigit);
                             if (translation.recursive) {
                                if (resetPos === -1) {
                                    resetPos = m;
                                } else if (m === lastMaskeChar) {
                                    m = resetPos - offset;
                                }

                                if (lastMaskeChar === resetPos) {
                                    m -= offset;
                                }
                            }
                            m += offset;
                        } else if (translation.optional) {
                            m += offset;
                            v -= offset;
                        } else if (translation.fallback) {
                            buf[addMethod](translation.fallback);
                            m += offset;
                            v -= offset;
                        } else {
                          p.invalid.push({p: v, v: valDigit, e: translation.pattern});
                        }
                        v += offset;
                    } else {
                        if (!skipMaskeChars) {
                            buf[addMethod](maskeDigit);
                        }

                        if (valDigit === maskeDigit) {
                            v += offset;
                        }

                        m += offset;
                    }
                }

                var lastMaskeCharDigit = maske.charAt(lastMaskeChar);
                if (maskeLen === valLen + 1 && !jMaske.translation[lastMaskeCharDigit]) {
                    buf.push(lastMaskeCharDigit);
                }

                return buf.join('');
            },
            callbacks: function (e) {
                var val = p.val(),
                    changed = val !== oldValue,
                    defaultArgs = [val, e, el, options],
                    callback = function(name, criteria, args) {
                        if (typeof options[name] === 'function' && criteria) {
                            options[name].apply(this, args);
                        }
                    };

                callback('onChange', changed === true, defaultArgs);
                callback('onKeyPress', changed === true, defaultArgs);
                callback('onComplete', val.length === maske.length, defaultArgs);
                callback('onInvalid', p.invalid.length > 0, [val, e, el, p.invalid, options]);
            }
        };

        el = $(el);
        var jMaske = this, oldValue = p.val(), regexMaske;

        maske = typeof maske === 'function' ? maske(p.val(), undefined, el,  options) : maske;


        // public methods
        jMaske.maske = maske;
        jMaske.options = options;
        jMaske.remove = function() {
            var caret = p.getCaret();
            p.destroyEvents();
            p.val(jMaske.getCleanVal());
            p.setCaret(caret - p.getMCharsBeforeCount(caret));
            return el;
        };

        // get value without maske
        jMaske.getCleanVal = function() {
           return p.getMaskeed(true);
        };

        // get maskeed value without the value being in the input or element
        jMaske.getMaskeedVal = function(val) {
           return p.getMaskeed(false, val);
        };

       jMaske.init = function(onlyMaske) {
            onlyMaske = onlyMaske || false;
            options = options || {};

            jMaske.clearIfNotMatch  = $.jMaskeGlobals.clearIfNotMatch;
            jMaske.byPassKeys       = $.jMaskeGlobals.byPassKeys;
            jMaske.translation      = $.extend({}, $.jMaskeGlobals.translation, options.translation);

            jMaske = $.extend(true, {}, jMaske, options);

            regexMaske = p.getRegexMaske();

            if (onlyMaske === false) {

                if (options.placeholder) {
                    el.attr('placeholder' , options.placeholder);
                }

                // this is necessary, otherwise if the user submit the form
                // and then press the "back" button, the autocomplete will erase
                // the data. Works fine on IE9+, FF, Opera, Safari.
                if (el.data('maske')) {
                  el.attr('autocomplete', 'off');
                }

                p.destroyEvents();
                p.events();

                var caret = p.getCaret();
                p.val(p.getMaskeed());
                p.setCaret(caret + p.getMCharsBeforeCount(caret, true));

            } else {
                p.events();
                p.val(p.getMaskeed());
            }
        };

        jMaske.init(!el.is('input'));
    };

    $.maskeWatchers = {};
    var HTMLAttributes = function () {
        var input = $(this),
            options = {},
            prefix = 'data-maske-',
            maske = input.attr('data-maske');

        if (input.attr(prefix + 'reverse')) {
            options.reverse = true;
        }

        if (input.attr(prefix + 'clearifnotmatch')) {
            options.clearIfNotMatch = true;
        }

        if (input.attr(prefix + 'selectonfocus') === 'true') {
           options.selectOnFocus = true;
        }

        if (notSameMaskeObject(input, maske, options)) {
            return input.data('maske', new Maske(this, maske, options));
        }
    },
    notSameMaskeObject = function(field, maske, options) {
        options = options || {};
        var maskeObject = $(field).data('maske'),
            stringify = JSON.stringify,
            value = $(field).val() || $(field).text();
        try {
            if (typeof maske === 'function') {
                maske = maske(value);
            }
            return typeof maskeObject !== 'object' || stringify(maskeObject.options) !== stringify(options) || maskeObject.maske !== maske;
        } catch (e) {}
    },
    eventSupported = function(eventName) {
        var el = document.createElement('div'), isSupported;

        eventName = 'on' + eventName;
        isSupported = (eventName in el);

        if ( !isSupported ) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] === 'function';
        }
        el = null;

        return isSupported;
    };

    $.fn.maske = function(maske, options) {
        options = options || {};
        var selector = this.selector,
            globals = $.jMaskeGlobals,
            interval = globals.watchInterval,
            watchInputs = options.watchInputs || globals.watchInputs,
            maskeFunction = function() {
                if (notSameMaskeObject(this, maske, options)) {
                    return $(this).data('maske', new Maske(this, maske, options));
                }
            };

        $(this).each(maskeFunction);

        if (selector && selector !== '' && watchInputs) {
            clearInterval($.maskeWatchers[selector]);
            $.maskeWatchers[selector] = setInterval(function(){
                $(document).find(selector).each(maskeFunction);
            }, interval);
        }
        return this;
    };

    $.fn.maskeed = function(val) {
        return this.data('maske').getMaskeedVal(val);
    };

    $.fn.unmaske = function() {
        clearInterval($.maskeWatchers[this.selector]);
        delete $.maskeWatchers[this.selector];
        return this.each(function() {
            var dataMaske = $(this).data('maske');
            if (dataMaske) {
                dataMaske.remove().removeData('maske');
            }
        });
    };

    $.fn.cleanVal = function() {
        return this.data('maske').getCleanVal();
    };

    $.applyDataMaske = function(selector) {
        selector = selector || $.jMaskeGlobals.maskeElements;
        var $selector = (selector instanceof $) ? selector : $(selector);
        $selector.filter($.jMaskeGlobals.dataMaskeAttr).each(HTMLAttributes);
    };

    var globals = {
        maskeElements: 'input,td,span,div',
        dataMaskeAttr: '*[data-maske]',
        dataMaske: true,
        watchInterval: 300,
        watchInputs: true,
        useInput: eventSupported('input'),
        watchDataMaske: false,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: {
            '0': {pattern: /\d/},
            '9': {pattern: /\d/, optional: true},
            '#': {pattern: /\d/, recursive: true},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/}
        }
    };

    $.jMaskeGlobals = $.jMaskeGlobals || {};
    globals = $.jMaskeGlobals = $.extend(true, {}, globals, $.jMaskeGlobals);

    // looking for inputs with data-maske attribute
    if (globals.dataMaske) {
        $.applyDataMaske();
    }

    setInterval(function() {
        if ($.jMaskeGlobals.watchDataMaske) {
            $.applyDataMaske();
        }
    }, globals.watchInterval);
}));
