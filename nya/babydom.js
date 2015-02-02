/*!
 * babydom v0.0.6, https://github.com/hoho/babydom
 * (c) 2014 Marat Abdullin, MIT license
 */
var $B = (function(document, encodeURIComponent, undefined) {
    'use strict';

    function select(selector, context) {
        context = context || document;

        return /:first$/.test(selector) ?
            (context = context.querySelector(selector.slice(0, -6))) ?
                [context]
                :
                []
            :
            Array.prototype.slice.call(context.querySelectorAll(selector));
    }


    function BabyDOM(nodeOrSelector, context) {
        var i,
            nodes = nodeOrSelector instanceof Node ?
                [nodeOrSelector]
                :
                (nodeOrSelector ? select(nodeOrSelector, context) : []);

        for (i = 0; i < nodes.length; i++) {
            this[i] = nodes[i];
        }

        this.length = nodes.length;
    }


    var proto = BabyDOM.prototype,
        properties = {disabled: false, checked: false, style: null, value: ''},
        captureEvents = {focus: 1, blur: 1},
        emitByMethodCall = {focus: 1, blur: 1, reset: 1},
        eventHandlers = {},
        whitespace = /[\x20\t\r\n\f]+/,
        classStr = 'class',
        styleStr = 'style';


    function eventHandler(e) {
        var node,
            $b,
            h,
            i,
            next = 0,
            origStopPropagation = e.stopPropagation,
            origStopImmediatePropagation = e.stopImmediatePropagation;

        node = e.target;

        e.stopPropagation = function() {
            next |= 1;
            origStopPropagation.call(e);
        };

        e.stopImmediatePropagation = function() {
            next |= 2;
            origStopImmediatePropagation.call(e);
        };

        while (node) {
            if ((($b = node.$b)) && ((h = $b[e.type]))) {
                // Make a copy of current handlers (because the original list
                // might change during callbacks execution).
                h = h.slice(0);
                for (i = 0; i < h.length; i++) {
                    h[i].call(node, e);
                    if (next & 2) { return; }
                }
            }
            if (next & 1) { return; }
            node = node.parentNode;
        }
    }


    function classToObject(val) {
        var ret = {},
            i,
            cls;

        val = (val || '').split(whitespace);

        for (i = 0; i < val.length; i++) {
            if ((cls = val[i])) {
                ret[cls] = 1; // `1` is shorter than `true` and we need just keys.
            }
        }

        return ret;
    }


    function __attr(node, name, val) {
        var key,
            ret;

        if (val === undefined) {
            return name in properties ?
                (name === styleStr ? node.style.cssText : node[name])
                :
                node.getAttribute(name);
        } else {
            if (name in properties) {
                if (name === styleStr) {
                    if (typeof val === 'object') {
                        ret = [];
                        for (key in val) {
                            ret.push(key + ': ' + val[key]);
                        }
                        val = ret.join('; ');
                    }

                    if (val !== undefined) {
                        node.style.cssText = val || null;
                    }
                } else {
                    node[name] = val === null ? properties[name] : val;
                }
            } else {
                if (val === null) {
                    node.removeAttribute(name);
                } else {
                    node.setAttribute(name, val);
                }
            }
        }
    }


    function modifyClass(self, val, addOrRemove, force) {
        var i,
            node,
            obj1,
            obj2 = classToObject(val),
            cls;

        if (force !== undefined) { force = !!force; }

        for (i = 0; i < self.length; i++) {
            node = self[i];
            obj1 = classToObject(__attr(node, classStr));

            for (cls in obj2) {
                if (addOrRemove === true || force === true) {
                    // Add class or toggle true.
                    obj1[cls] = 1; // `1` is shorter than `true` and we need just keys.
                } else if (addOrRemove === false || force === false) {
                    // Remove class or toggle false.
                    delete obj1[cls];
                } else {
                    // Toggle class.
                    if (cls in obj1) {
                        delete obj1[cls];
                    } else {
                        obj1[cls] = 1; // `1` is shorter than `true` and we need just keys.
                    }
                }
            }

            __attr(node, classStr, Object.keys(obj1).join(' ') || null);
        }

        return self;
    }


    proto.attr = function attr(name, val) {
        var self = this,
            i,
            ret;

        for (i = 0; i < self.length; i++) {
            ret = __attr(self[i], name, val);
            if (val === undefined) { return ret; }
        }

        if (val !== undefined) {
            return self;
        }
    };


    proto.emit = function emit(event, detail) {
        var self = this,
            i,
            node,
            e;

        for (i = 0; i < self.length; i++) {
            node = self[i];

            if ((event in emitByMethodCall) && node[event]) {
                node[event]();
            } else {
                // TODO: It would probably be needed to distinguish event types.
                //       For now we're not trying to follow standards much.
                e = document.createEvent('HTMLEvents');
                e.initEvent(event, true, true);
                if (detail) {
                    e.detail = detail;
                }
                node.dispatchEvent(e);
            }
        }

        return self;
    };


    proto.on = function on(event, handler) {
        var $b,
            h,
            self = this,
            i,
            node;

        if (event) {
            event = event.split(whitespace);

            if (event.length === 1) {
                event += '';

                if (!(event in eventHandlers)) {
                    document.body.addEventListener(event, eventHandler, event in captureEvents);
                    eventHandlers[event] = true;
                }

                for (i = 0; i < self.length; i++) {
                    node = self[i];

                    if (!(($b = node.$b))) {
                        $b = node.$b = {};
                    }

                    if (!((h = $b[event]))) {
                        h = $b[event] = [];
                    }

                    h.push(handler);
                }
            } else {
                for (i = 0; i < event.length; i++) {
                    self.on(event[i], handler);
                }
            }
        }

        return self;
    };


    proto.off = function(event, handler) {
        var i,
            self = this,
            $b,
            handlers;

        for (i = 0; i < self.length; i++) {
            $b = self[i].$b;

            if (event && $b) {
                event = event.split(whitespace);

                if (event.length === 1) {
                    event += '';

                    if (((handlers = $b[event])) && handler) {
                        i = 0;
                        while (i < handlers.length) {
                            if (handlers[i] === handler) {
                                handlers.splice(i, 1);
                            } else {
                                i++;
                            }
                        }
                    }

                    if (handlers && (!handlers.length || !handler)) {
                        delete $b[event];
                    }
                } else {
                    for (i = 0; i < event.length; i++) {
                        self.off(event[i], handler);
                    }
                }
            }
        }

        return self;
    };


    proto.text = function text(val) {
        var self = this,
            i,
            node;

        for (i = 0; i < self.length; i++) {
            node = self[i];

            if (val === undefined) {
                return node.textContent;
            } else {
                node.textContent = val;
            }
        }

        if (val !== undefined) {
            return self;
        }
    };


    proto.addClass = function addClass(val) {
        return modifyClass(this, val, true);
    };


    proto.removeClass = function removeClass(val) {
        return modifyClass(this, val, false);
    };


    proto.toggleClass = function toggleClass(val, force) {
        return modifyClass(this, val, undefined, force);
    };


    proto.hasClass = function hasClass(val) {
        return val in classToObject(this.attr(classStr));
    };


    proto.serialize = function serialize(type) {
        var self = this,
            i,
            j,
            k,
            node,
            elems,
            elem,
            name,
            opts,
            ret = [];

        for (i = 0; i < self.length; i++) {
            node = self[i];

            if (node instanceof HTMLFormElement) {
                elems = node.elements;

                for (j = 0; j < elems.length; j++) {
                    elem = elems[j];

                    if ((name = elem.name)) {
                        switch (elem.type) {
                            case 'submit':
                            case 'reset':
                            case 'button':
                            case 'file':
                                break;

                            case 'checkbox':
                            case 'radio':
                                if (elem.checked) {
                                    ret.push({name: name, value: elem.value});
                                }
                                break;

                            case 'select-multiple':
                                opts = elem.options;
                                for (k = 0; k < opts.length; k++) {
                                    if (opts[k].selected) {
                                        ret.push({name: name, value: opts[k].value});
                                    }
                                }
                                break;

                            default:
                                ret.push({name: name, value: elem.value});
                        }
                    }
                }
            }
        }

        if (type === 'map') {
            opts = {};
            for (i = ret.length; i--;) {
                opts[ret[i].name] = ret[i].value;
            }
            ret = opts;
        }

        if (type === 'qs') {
            opts = [];
            for (i = 0; i < ret.length; i++) {
                opts.push(encodeURIComponent(ret[i].name) + '=' + encodeURIComponent(ret[i].value));
            }
            ret = opts.join('&');
        }

        return ret;
    };


    return function(node, context) {
        return new BabyDOM(node, context);
    };
})(document, encodeURIComponent);
