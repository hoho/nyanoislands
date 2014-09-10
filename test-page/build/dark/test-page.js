/*!
 * concat.js v0.9.5, https://github.com/hoho/concat.js
 * (c) 2013-2014 Marat Abdullin, MIT license
 */

(function(window, undefined) {
    // This code is being optimized for size, so some parts of it could be
    // a bit hard to read. But it is quite short anyway.
    var document = window.document,
        tags = 'div|span|p|a|ul|ol|li|table|tr|td|th|br|img|b|i|s|u'.split('|'),
        proto,
        i,
        curArgs = [],
        eachTarget,
        isFunction =
            function(func) {
                return typeof func === 'function';
            },

        blockFunc =
            function(prop, defaultValue) {
                return function(arg) {
                    var self = this,
                        item = Item(self);

                    item[prop] = arg === undefined ? defaultValue : arg;

                    self.c = item;

                    return self;
                };
            },

        constr =
            function(parent, replace, direct) {
                // Item:
                // D — node to append the result to (if any).
                // P — item's parent node.
                // A — item's parent item.
                // F — a function to call before processing subitems.
                // R — how many times to repeat this item.
                // E — an array for each().
                // T — test expression (for conditional subtree processing).
                // _ — subitems.
                // e — redefinition for end() return value.

                // self.c — current item.
                // self._ — first item.

                var self = this;

                self._ = self.c = {
                    D: parent && {p: parent, r: replace},
                    P: parent && ((self.d = direct)) ? parent : document.createDocumentFragment(),
                    _: []
                };
            },

        run =
            function(item) {
                var R,
                    i,
                    j,
                    oldArgs = curArgs,
                    oldEachTarget = eachTarget,
                    keys,
                    position = -1;

                if (item.E !== undefined) {
                    eachTarget = isFunction(item.E) ?
                        item.E.apply(item.A.P, curArgs)
                        :
                        item.E;

                    if (eachTarget) {
                        keys = [];
                        if (eachTarget instanceof Array) {
                            for (j = 0; j < eachTarget.length; j++) {
                                keys.push(j);
                            }
                        } else {
                            for (j in eachTarget) {
                                keys.push(j);
                            }
                        }

                        curArgs = [undefined, undefined, eachTarget];

                        R = function() {
                            curArgs[0] = eachTarget[(curArgs[1] = keys[++position])];
                            return position < keys.length;
                        };
                    }
                } else if (item.R !== undefined) {
                    curArgs = [-1];
                    eachTarget = undefined;

                    R = function() {
                        return isFunction(item.R) ?
                            item.R.call(item.A.P, ++curArgs[0])
                            :
                            ++curArgs[0] < item.R;
                    };
                } else {
                    i = isFunction(item.T) ?
                        (item.T.apply(item.A.P, curArgs) ? 1 : 0)
                        :
                        (item.T === undefined) || item.T ? 1 : 0;
                }

                while ((!R && i--) || (R && R())) {
                    if (R || item.T) {
                        item.P = item.A.P;
                    }

                    item.F && item.F();

                    for (j = 0; j < item._.length; j++) {
                        run(item._[j]);
                    }
                }

                curArgs = oldArgs;
                eachTarget = oldEachTarget;
            },

        Item =
            function(self, func, /**/ret) {
                ret = {
                    A: self.c,
                    F: func,
                    _: []
                };

                self.c._.push(ret);

                return ret;
            };

    proto = constr.prototype;

    proto.end = function(num) {
        var self = this,
            r,
            ret;

        if (num === undefined) { num = 1; }

        while (num > 0 && ((ret = self.c.e), (self.c = self.c.A))) {
            num--;
        }

        if (self.c) { return ret || self; }

        r = self._;

        run(r);

        if ((i = r.D)) {
            if (i.r) {
                i.p.innerHTML = '';
            }

            if (!self.d) {
                // It's a direct rendering, everything is already there.
                i.p.appendChild(r.P);
            }
        } else {
            return r.P;
        }
    };

    proto.elem = function(name, attr, close) {
        var self = this,
            item = Item(self, function(elem/**/, a, prop, val, tmp, attrVal) {
                elem = item.P = document.createElement(
                    isFunction(name) ? name.apply(item.A.P, curArgs) : name
                );

                attrVal = isFunction(attr) ? attr.apply(elem, curArgs) : attr;

                for (var i in attrVal) {
                    if (isFunction((a = attrVal[i]))) {
                        a = a.apply(elem, curArgs);
                    }

                    if (a !== undefined) {
                        if (i === 'style') {
                            if (typeof a === 'object') {
                                val = [];

                                for (prop in a) {
                                    if (isFunction((tmp = a[prop]))) {
                                        tmp = tmp.apply(elem, curArgs);
                                    }

                                    if (tmp !== undefined) {
                                        val.push(prop + ': ' + tmp);
                                    }
                                }

                                a = val.join('; ');
                            }

                            if (a) {
                                elem.style.cssText = a;
                            }
                        } else {
                            elem.setAttribute(i, a);
                        }
                    }
                }

                item.A.P.appendChild(elem);
            });

        self.c = item;

        // attr argument is optional, if it strictly equals to true,
        // use it as close, when close is not passed.
        return close || (close === undefined && attr === true) ?
            self.end()
            :
            self;
    };

    proto.mem = function(key, func) {
        var self = this,
            item = Item(self, function(/**/parentElem) {
                parentElem = item.A.P;
                window.$C.mem[isFunction(key) ? key.apply(parentElem, curArgs) : key] =
                    isFunction(func) ? func.apply(parentElem, curArgs) : func || parentElem;
            });

        return self;
    };

    proto.repeat = blockFunc('R', 0);
    proto.each = blockFunc('E', []);
    proto.test = blockFunc('T', false);
    proto.choose = function() {
        var self = this,
            item = Item(self, function() { skip = undefined; }),
            skip,
            choose = {},
            condFunc = function(isOtherwise/**/, val) {
                return function(test) {
                    val = blockFunc('T').call(self, function() {
                        return (!skip && (isOtherwise || (isFunction(test) ? test.apply(item.A.P, curArgs) : test))) ?
                            (skip = true)
                            :
                            false;
                    });
                    val.c.e = choose;
                    return val;
                };
            };

        item.T = true;
        self.c = item;

        choose.when = condFunc();
        choose.otherwise = condFunc(true);
        choose.end = function(num) { return proto.end.call(self, num); };

        return choose;
    };

    // Shortcuts for popular tags, to use .div() instead of .elem('div').
    for (i = 0; i < tags.length; i++) {
        proto[tags[i]] = (function(name) {
            return function(attr, close) {
                return this.elem(name, attr, close);
            };
        })(tags[i]);
    }

    window.$C = i = function(parent, replace, direct) {
        return new constr(parent, replace, direct);
    };

    i.mem = {};

    i.define = i = function(name, func) {
        proto[name] = function() {
            var args = arguments,
                item = Item(this, function() {
                    func.call(item.A.P, curArgs[0], curArgs[1], curArgs[2], args);
                });

            return this;
        };
    };

    // We're inside and we have an access to curArgs variable which is
    // [index, item], so we will use curArgs to shorten the code.
    i('act', function(item, index, arr, args) {
        args[0].apply(this, curArgs);
    });

    i('text', function(item, index, arr, args/**/, text, el) {
        text = args[0];
        text = isFunction(text) ? text.apply(this, curArgs) : text;

        if (text !== undefined) {
            if (args[1]) {
                el = document.createElement('p');
                el.innerHTML = text;
                el = el.firstChild;
                while (el) {
                    // Use text variable as a temporary variable.
                    text = el.nextSibling;
                    this.appendChild(el);
                    el = text;
                }
            } else {
                this.appendChild(document.createTextNode(text));
            }
        }

    });

    i('attr', function(item, index, arr, args/**/, self, name, val) {
        (self = this).setAttribute(
            isFunction((name = args[0])) ? name.call(self, item, index, arr) : name,
            isFunction((val = args[1])) ? val.call(self, item, index, arr) : val
        );
    });
})(window);


// Conkitty common functions.
(function($C, window) {

    $C.tpl = {};
    $C._tpl = {};


    var Node = window.Node,
        $ConkittyEventHandlers = [],
        whitespace = /[\x20\t\r\n\f]/;

    $C.on = function on(callback) {
        $ConkittyEventHandlers.push(callback);
    };

    $C.off = function off(callback) {
        if (callback) {
            var i = $ConkittyEventHandlers.length - 1;

            while (i >= 0) {
                if ($ConkittyEventHandlers[i] === callback) {
                    $ConkittyEventHandlers.splice(i, 1);
                } else {
                    i--;
                }
            }
        } else {
            $ConkittyEventHandlers = [];
        }
    };

    $C.define('trigger', function (val, key, obj, args) {
        var i,
            arg;

        for (i = 0; i < args.length; i++) {
            if (typeof ((arg = args[i])) === 'function') {
                args[i] = arg.call(this, val, key, obj);
            }
        }

        for (i = 0; i < $ConkittyEventHandlers.length; i++) {
            $ConkittyEventHandlers[i].apply(this, args);
        }
    });


    function EnvClass(parent, payload) {
        this.p = parent;
        this.d = payload;
    }

    EnvClass.prototype.l = function getPayload(parent) {
        var self = this,
            ret;

        if (self.d) {
            // Trying to get cached payload.
            if (!((ret = self._p))) {
                ret = self._p = self.d();
            }

            if (!parent) {
                return ret.firstChild ? ret : undefined;
            }

            ret && parent.appendChild(ret);
            delete self._p;
        }
    };


    $C._$args = [
        $C,

        EnvClass,

        function getEnv(obj) {
            return obj instanceof EnvClass ? obj : new EnvClass(obj instanceof Node ? obj : undefined);
        },

        function joinClasses() {
            var i, ret = [], arg;
            for (i = 0; i < arguments.length; i++) {
                if ((arg = arguments[i])) {
                    ret.push(arg);
                }
            }
            return ret.length ? ret.join(' ') : undefined;
        },

        function getModClass(name, val) {
            if (val) {
                return val === true ? name : name + '_' + val;
            }
        },

        function getChangedClass(node, classes, remove) {
            var cur = (node.getAttribute('class') || '').split(whitespace),
                change = (classes || '').split(whitespace),
                i,
                curObj = {};

            for (i = 0; i < cur.length; i++) {
                curObj[cur[i]] = true;
            }

            for (i = 0; i < change.length; i++) {
                if (remove) {
                    delete curObj[change[i]];
                } else {
                    curObj[change[i]] = true;
                }
            }

            cur = [];
            for (i in curObj) {
                cur.push(i);
            }

            return cur.join(' ');
        },

        window,

        Node
    ];

})($C, window);

// This file is autogenerated.
(function($C, $ConkittyEnvClass, $ConkittyGetEnv, $ConkittyClasses, $ConkittyMod, $ConkittyChange, window, Node, undefined) {

$C.tpl["page"] = function() {
    var $ConkittyEnv = $ConkittyGetEnv(this);
    return $C($ConkittyEnv.p)
        .act(function() {
            $C._tpl["nya::head"].call(new $ConkittyEnvClass(
                this,
                function() {
                    return $C()
                        .act(function() {
                            $C._tpl["nya::head__nav"].call(new $ConkittyEnvClass(this), ([
                                        {id: 'first', title: 'First', href: "javascript:alert('First');"},
                                        {id: 'second', title: 'Second', href: "javascript:alert('Second');"},
                                        {id: 'third', title: 'Third', href: "javascript:alert('Third');"}
                                    ]), "second");
                        })
                    .end(); }
            ), "Examples", "https://github.com/hoho/nyanoislands");
        })
        .div({"class": "container"})
            .div({"class": "row"})
                .div({"class": "col-lg-12"})
                    .elem("h1", {"id": "buttons"})
                        .text("Buttons")
            .end(3)
            .div({"class": "row"})
                .div({"class": "col-lg-6"})
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Default");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Action", "action");
                            })
                    .end(2)
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Primary", "primary");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Success", "success");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Info", "info");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Warning", "warning");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Danger", "danger");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Link", "link");
                            })
                    .end(2)
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Default", undefined, undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Action", "action", undefined, undefined, undefined, undefined, (true));
                            })
                    .end(2)
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Primary", "primary", undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Success", "success", undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Info", "info", undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Warning", "warning", undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Danger", "danger", undefined, undefined, undefined, undefined, (true));
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Link", "link", undefined, undefined, undefined, undefined, (true));
                            })
                    .end(2)
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Default");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                    this,
                                    function() {
                                        return $C()
                                            .span({"class": "nya-button__title"})
                                                .span({"class": "caret"})
                                        .end(3); }
                                ), undefined, undefined, undefined, undefined, undefined, "dropdown-toggle");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Primary", "primary");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                    this,
                                    function() {
                                        return $C()
                                            .span({"class": "nya-button__title"})
                                                .span({"class": "caret"})
                                        .end(3); }
                                ), undefined, "primary", undefined, undefined, undefined, "dropdown-toggle");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Success", "success");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                    this,
                                    function() {
                                        return $C()
                                            .span({"class": "nya-button__title"})
                                                .span({"class": "caret"})
                                        .end(3); }
                                ), undefined, "success", undefined, undefined, undefined, "dropdown-toggle");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Info", "info");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                    this,
                                    function() {
                                        return $C()
                                            .span({"class": "nya-button__title"})
                                                .span({"class": "caret"})
                                        .end(3); }
                                ), undefined, "info", undefined, undefined, undefined, "dropdown-toggle");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Warning", "warning");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                    this,
                                    function() {
                                        return $C()
                                            .span({"class": "nya-button__title"})
                                                .span({"class": "caret"})
                                        .end(3); }
                                ), undefined, "warning", undefined, undefined, undefined, "dropdown-toggle");
                            })
                    .end(2)
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Large button", undefined, "l");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Default button");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Small button", undefined, "s");
                            })
                            .text(" ")
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Mini button", undefined, "xs");
                            })
                .end(3)
                .div({"class": "col-lg-6"})
                    .elem("section")
                        .p()
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Block level button", undefined, "l", undefined, undefined, "btn-block");
                            })
                    .end(2)
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .div({"class": "btn-group btn-group-justified"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Left", undefined, undefined, undefined, "#");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Middle", undefined, undefined, undefined, "#");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Right", undefined, undefined, undefined, "#");
                            })
                    .end(2)
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "1");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "2");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "3");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "4");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "5");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "6");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "7");
                            })
                        .end()
                        .text(" ")
                        .div({"class": "btn-group"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "8");
                            })
                            .div({"class": "btn-group"})
                                .act(function() {
                                    $C._tpl["nya::button"].call(new $ConkittyEnvClass(
                                        this,
                                        function() {
                                            return $C()
                                                .span({"class": "nya-button__title"})
                                                    .span({"class": "caret"})
                                            .end(3); }
                                    ), "Dropdown ", undefined, undefined, undefined, undefined, "dropdown-toggle");
                                })
                    .end(3)
                    .elem("section")
                        .div({"class": "btn-group-vertical"})
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button");
                            })
                            .act(function() {
                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button");
                            })
            .end(4)
            .div({"class": "row"})
                .div({"class": "col-lg-12"})
                    .elem("h1", {"id": "checkables"})
                        .text("Checkboxes and radios")
            .end(3)
            .div({"class": "row"})
                .div({"class": "col-lg-6"})
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Block checkbox 1", "cb1", "val1");
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Block checkbox 2", "cb2", "val2", undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Block checkbox 3", "cb3", "val3", undefined, undefined, undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Block checkbox 4", "cb4", "val4", undefined, (true), undefined, undefined, undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Inline 1", "icb1", "val1", undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Inline 2", "icb2", "val2", undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Inline 3", "icb3", "val3", undefined, undefined, undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Inline 3", "icb4", "val4", undefined, (true), undefined, (true), undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small checkbox 1", "scb1", "val1", "s");
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small checkbox 2", "scb2", "val2", "s", (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small checkbox 3", "scb3", "val3", "s", undefined, undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small checkbox 4", "scb4", "val4", "s", (true), undefined, undefined, undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small inline 1", "sicb1", "val1", "s", undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small inline 2", "sicb2", "val2", "s", (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small inline 3", "sicb3", "val3", "s", undefined, undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Small inline 4", "sicb4", "val4", "s", (true), undefined, (true), undefined, (true));
                        })
                .end(2)
                .div({"class": "col-lg-6"})
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Block radio 1", "r", "val1");
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Block radio 2", "r", "val2", undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Block radio 3", "rd", "val3", undefined, undefined, undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Block radio 4", "rd", "val4", undefined, (true), undefined, undefined, undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Inline 1", "ir", "val1", undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Inline 2", "ir", "val2", undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Inline 3", "ird", "val3", undefined, undefined, undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Inline 4", "ird", "val4", undefined, (true), undefined, (true), undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small radio 1", "sr", "val1", "s");
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small radio 2", "sr", "val2", "s", (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small radio 3", "srd", "val3", "s", undefined, undefined, undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small radio 4", "srd", "val4", "s", (true), undefined, undefined, undefined, (true));
                        })
                    .end()
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small inline 1", "sir", "val1", "s", undefined, undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small inline 2", "sir", "val2", "s", (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small inline 3", "sird", "val3", "s", undefined, undefined, (true), undefined, (true));
                        })
                        .act(function() {
                            $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Small inline 4", "sird", "val4", "s", (true), undefined, (true), undefined, (true));
                        })
            .end(3)
            .div({"class": "row"})
                .div({"class": "col-lg-12"})
                    .elem("h1", {"id": "Forms"})
                        .text("Forms")
            .end(3)
            .div({"class": "row"})
                .div({"class": "col-lg-6"})
                    .elem("section", {"style": "margin-bottom: 15px;"})
                        .div({"class": "well"})
                            .elem("form", {"class": "form-horizontal"})
                                .elem("fieldset")
                                    .elem("legend")
                                        .text("Legend")
                                    .end()
                                    .div({"class": "form-group"})
                                        .elem("label", {"class": "col-lg-2 control-label", "for": "inputEmail"})
                                            .text("Email")
                                        .end()
                                        .div({"class": "col-lg-10"})
                                            .act(function() {
                                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, "Email", "inputEmail");
                                            })
                                    .end(2)
                                    .div({"class": "form-group"})
                                        .elem("label", {"class": "col-lg-2 control-label", "for": "inputPassword"})
                                            .text("Password")
                                        .end()
                                        .div({"class": "col-lg-10"})
                                            .act(function() {
                                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, "password", "Password", "inputPassword");
                                            })
                                            .act(function() {
                                                $C._tpl["nya::checkbox"].call(new $ConkittyEnvClass(this), "Checkbox");
                                            })
                                    .end(2)
                                    .div({"class": "form-group"})
                                        .elem("label", {"class": "col-lg-2 control-label", "for": "textArea"})
                                            .text("Textarea")
                                        .end()
                                        .div({"class": "col-lg-10"})
                                            .act(function() {
                                                $C._tpl["nya::textarea"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, "textArea", undefined, "3");
                                            })
                                            .span({"class": "help-block"})
                                                .text("A longer block of help text that breaks onto a new line and may extend beyond one line.")
                                    .end(3)
                                    .div({"class": "form-group"})
                                        .elem("label", {"class": "col-lg-2 control-label"})
                                            .text("Radios")
                                        .end()
                                        .div({"class": "col-lg-10"})
                                            .act(function() {
                                                $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Option one is this", "optionsRadios", "option1", undefined, (true), "optionsRadios1");
                                            })
                                            .act(function() {
                                                $C._tpl["nya::radio"].call(new $ConkittyEnvClass(this), "Option two can be something else", "optionsRadios", "option2", undefined, undefined, "optionsRadios2");
                                            })
                                    .end(2)
                                    .div({"class": "form-group"})
                                        .elem("label", {"class": "col-lg-2 control-label", "for": "select"})
                                            .text("Selects")
                                        .end()
                                        .div({"class": "col-lg-10"})
                                            .elem("select", {"class": "form-control", "id": "select"})
                                                .elem("option")
                                                    .text("1")
                                                .end()
                                                .elem("option")
                                                    .text("2")
                                                .end()
                                                .elem("option")
                                                    .text("3")
                                                .end()
                                                .elem("option")
                                                    .text("4")
                                                .end()
                                                .elem("option")
                                                    .text("5")
                                            .end(2)
                                            .br()
                                            .end()
                                            .elem("select", {"class": "form-control", "multiple": "multiple"})
                                                .elem("option")
                                                    .text("1")
                                                .end()
                                                .elem("option")
                                                    .text("2")
                                                .end()
                                                .elem("option")
                                                    .text("3")
                                                .end()
                                                .elem("option")
                                                    .text("4")
                                                .end()
                                                .elem("option")
                                                    .text("5")
                                    .end(4)
                                    .div({"class": "form-group"})
                                        .div({"class": "col-lg-10 col-lg-offset-2"})
                                            .act(function() {
                                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Cancel");
                                            })
                                            .text(" ")
                                            .act(function() {
                                                $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Submit", "action");
                                            })
                .end(7)
                .div({"class": "col-lg-4 col-lg-offset-1"})
                    .elem("form")
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "input"})
                                .text("Input")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, "This is input...", undefined, undefined, undefined, "input");
                            })
                        .end()
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "disabledInput"})
                                .text("Disabled input")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, "Disabled input here...", "disabledInput", undefined, undefined, (true));
                            })
                        .end()
                        .div({"class": "form-group has-warning"})
                            .elem("label", {"class": "control-label", "for": "inputWarning"})
                                .text("Input warning")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, undefined, "inputWarning");
                            })
                        .end()
                        .div({"class": "form-group has-error"})
                            .elem("label", {"class": "control-label", "for": "inputError"})
                                .text("Input error")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, undefined, "inputError");
                            })
                        .end()
                        .div({"class": "form-group has-success"})
                            .elem("label", {"class": "control-label", "for": "inputSuccess"})
                                .text("Input success")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, undefined, "inputSuccess");
                            })
                        .end()
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "inputReset"})
                                .text("Input with reset")
                            .end()
                            .act(function() {
                                $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, "Input with reset", undefined, undefined, undefined, "inputReset", (true));
                            })
                        .end()
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "inputTextarea"})
                                .text("Textarea")
                            .end()
                            .act(function() {
                                $C._tpl["nya::textarea"].call(new $ConkittyEnvClass(this), undefined, undefined, undefined, undefined, "inputTextarea");
                            })
                        .end()
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "textareaReset"})
                                .text("Textarea with reset")
                            .end()
                            .act(function() {
                                $C._tpl["nya::textarea"].call(new $ConkittyEnvClass(this), undefined, "Textarea with reset", undefined, undefined, "textareaReset", (true));
                            })
                        .end()
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "inputWithButton"})
                                .text("Input with button")
                            .end()
                            .div({"class": "input-group"})
                                .act(function() {
                                    $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, "Input with button", undefined, undefined, undefined, "inputWithButton");
                                })
                                .span({"class": "input-group-btn"})
                                    .act(function() {
                                        $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button", "action");
                                    })
                        .end(3)
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "inputWithButtonLarge"})
                                .text("Large input with button")
                            .end()
                            .div({"class": "input-group"})
                                .act(function() {
                                    $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, "Large input with button", "l", undefined, undefined, "inputWithButtonLarge");
                                })
                                .span({"class": "input-group-btn"})
                                    .act(function() {
                                        $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button", "action", "l");
                                    })
                        .end(3)
                        .div({"class": "form-group"})
                            .elem("label", {"class": "control-label", "for": "inputWithButtonSmall"})
                                .text("Small input with button")
                            .end()
                            .div({"class": "input-group"})
                                .act(function() {
                                    $C._tpl["nya::input"].call(new $ConkittyEnvClass(this), undefined, "Small input with button", "s", undefined, undefined, "inputWithButtonSmall");
                                })
                                .span({"class": "input-group-btn"})
                                    .act(function() {
                                        $C._tpl["nya::button"].call(new $ConkittyEnvClass(this), "Button", "action", "s");
                                    })
    .end(8);
};

$C._tpl["nya::head"] = function($title, $href, $avatar, $ahref) {
    ($href === undefined) && ($href = "/");
    var $ConkittyEnv = $ConkittyGetEnv(this);
    return $C($ConkittyEnv.p)
        .div({"class": "nya-head"})
            .a(function $C_head_4_9(){return{"class":"nya-head__title",href:$href}})
                .text(function $C_head_5_14() { return $title; })
            .end()
            .test(function $C_head_6_15() { return $avatar; })
                .a(function $C_head_7_13(){return{"class":"nya-head__avatar",style:"background-image: url("+$avatar+");",href:$ahref}})
            .end(2)
            .act(function() { $ConkittyEnv.l(this); })
    .end(2);
};

$C._tpl["nya::head__nav"] = function($items, $current) {
    var $ConkittyEnv = $ConkittyGetEnv(this), $hasCurrent, $item;
    return $C($ConkittyEnv.p)
        .ul({"class": "nya-head__nav"})
            .each(function $C_head__nav_18_21() { return $items; })
                .act(function($C_) { $item = $C_; })
                .li(function $C_head__nav_19_13(){return{"class":$ConkittyClasses("nya-head__nav-item",!$hasCurrent&&$item.id===$current&&($hasCurrent=true)?"nya-head__nav-item_current":undefined)}})
                    .choose()
                        .when(function $C_head__nav_21_26() { return ($item.template); })
                            .act(function() {
                                $C.tpl[($item.template)].call(new $ConkittyEnvClass(this), $item);
                            })
                        .end()
                        .otherwise()
                            .a(function $C_head__nav_24_25(){return{"class":"nya-head__nav-link",href:$item.href}})
                                .text(function $C_head__nav_25_29() { return ($item.title); })
    .end(7);
};

$C._tpl["nya::button"] = function($title, $theme, $size, $type, $href, $class, $disabled, $noAPI) {
    ($theme === undefined) && ($theme = "default");
    ($size === undefined) && ($size = "m");
    ($type === undefined) && ($type = "button");
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $node, $titleNode;
    $C($ConkittyEnv.p)
        .elem(function $C_button_4_5(){return $type==="span"?"span":$type==="a"||$href?"a":"button"}, function $C_button_4_5(){return{"class":$ConkittyClasses("nya-button btn",$disabled?"disabled":undefined),href:$href?$href:undefined,type:$href?undefined:$type==="span"?undefined:$type,disabled:$disabled?"disabled":undefined}})
            .act(function() { $node = this; })
            .attr("class", function() { return $ConkittyChange(this, (Nya.Button.getClass($theme, $size, $class))); })
            .span({"class": "nya-button__title"})
                .act(function() { $titleNode = this; })
                .text(function $C_button_7_14() { return $title; })
            .end()
            .act(function() { $ConkittyEnv.l(this); })
        .end()
        .act(function() { $ConkittyTemplateRet = ($noAPI ? undefined : new Nya.Button($node, $titleNode)); })
    .end();
    return $ConkittyTemplateRet;
};

$C._tpl["nya::checkbox"] = function($label, $name, $value, $size, $checked, $id, $inline, $class, $disabled, $noAPI) {
    ($size === undefined) && ($size = "m");
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $inner, $c, $l, $node;
    $C($ConkittyEnv.p)
        .act(function $C_checkbox_5_5() {
            $inner = $C()
                .elem("input", function $C_checkbox_6_9(){return{"class":"nya-checkbox__input",id:$id,type:"checkbox",name:$name,value:$value,checked:$checked?"checked":undefined,disabled:$disabled?"disabled":undefined}})
                    .act(function() { $c = this; })
                .end()
                .span({"class": "nya-checkbox__flag"})
                    .span({"class": "nya-checkbox__flag-icon"})
                .end(2)
                .span({"class": "nya-checkbox__label"})
                    .act(function() { $l = this; })
                    .text(function $C_checkbox_10_14() { return $label; })
            .end(2);
            $inner = $inner.firstChild ? $inner : undefined;
        })
        .choose()
            .when(function $C_checkbox_12_15() { return $inline; })
                .elem("label", function $C_checkbox_13_13(){return{"class":$ConkittyClasses("nya-checkbox checkbox-inline",$disabled?"disabled":undefined)}})
                    .act(function() { $node = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Checkbox.getClass($size, $class))); })
                    .act(function $C_checkbox_15_17($C_) {
                        if (($C_ = ($inner)) instanceof Node) { this.appendChild($C_); }
                        else { $C(this).text($C_, true).end(); }
                    })
            .end(2)
            .otherwise()
                .div(function $C_checkbox_17_13(){return{"class":$ConkittyClasses("nya-checkbox checkbox",$disabled?"disabled":undefined)}})
                    .act(function() { $node = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Checkbox.getClass($size, $class))); })
                    .elem("label")
                        .act(function $C_checkbox_20_21($C_) {
                            if (($C_ = ($inner)) instanceof Node) { this.appendChild($C_); }
                            else { $C(this).text($C_, true).end(); }
                        })
        .end(4)
        .act(function() { $ConkittyTemplateRet = ($noAPI ? undefined : new Nya.Checkbox($node, $c, $l)); })
    .end();
    return $ConkittyTemplateRet;
};

$C._tpl["nya::radio"] = function($label, $name, $value, $size, $checked, $id, $inline, $class, $disabled, $noAPI) {
    ($size === undefined) && ($size = "m");
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $inner, $r, $l, $node;
    $C($ConkittyEnv.p)
        .act(function $C_radio_6_5() {
            $inner = $C()
                .elem("input", function $C_radio_7_9(){return{"class":"nya-radio__input",id:$id,type:"radio",name:$name,value:$value,checked:$checked?"checked":undefined,disabled:$disabled?"disabled":undefined}})
                    .act(function() { $r = this; })
                .end()
                .span({"class": "nya-radio__flag"})
                    .span({"class": "nya-radio__flag-icon"})
                .end(2)
                .span({"class": "nya-radio__label"})
                    .act(function() { $l = this; })
                    .text(function $C_radio_11_14() { return $label; })
            .end(2);
            $inner = $inner.firstChild ? $inner : undefined;
        })
        .choose()
            .when(function $C_radio_13_15() { return $inline; })
                .elem("label", function $C_radio_14_13(){return{"class":$ConkittyClasses("nya-radio radio-inline",$disabled?"disabled":undefined)}})
                    .act(function() { $node = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Radio.getClass($size, $class))); })
                    .act(function $C_radio_16_17($C_) {
                        if (($C_ = ($inner)) instanceof Node) { this.appendChild($C_); }
                        else { $C(this).text($C_, true).end(); }
                    })
            .end(2)
            .otherwise()
                .div(function $C_radio_18_13(){return{"class":$ConkittyClasses("nya-radio radio",$disabled?"disabled":undefined)}})
                    .act(function() { $node = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Radio.getClass($size, $class))); })
                    .elem("label")
                        .act(function $C_radio_21_21($C_) {
                            if (($C_ = ($inner)) instanceof Node) { this.appendChild($C_); }
                            else { $C(this).text($C_, true).end(); }
                        })
        .end(4)
        .act(function() { $ConkittyTemplateRet = ($noAPI ? undefined : new Nya.Radio($node, $r, $l)); })
    .end();
    return $ConkittyTemplateRet;
};

$C._tpl["nya::input"] = function($name, $value, $size, $type, $placeholder, $id, $reset, $class, $disabled, $noAPI) {
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $ret;
    $C($ConkittyEnv.p)
        .act(function() {
            $ret = $C._tpl["nya::_input"].call(new $ConkittyEnvClass(this), $name, $value, $size, $type, $placeholder, $id, $reset, (false), $class, $disabled, $noAPI);
        })
        .act(function() { $ConkittyTemplateRet = $ret; })
    .end();
    return $ConkittyTemplateRet;
};

$C._tpl["nya::_input"] = function($name, $value, $size, $type, $placeholder, $id, $reset, $rows, $class, $disabled, $noAPI) {
    ($size === undefined) && ($size = "m");
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $node, $inputNode, $resetNode;
    $C($ConkittyEnv.p)
        .choose()
            .when(function $C__input_6_15() { return $reset; })
                .div({"class": "nya-input nya-input_reset"})
                    .act(function() { $node = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Input.getClass($size, $class))); })
                    .elem(function $C__input_10_17(){return $rows?"textarea":"input"}, function $C__input_10_17(){return{"class":$ConkittyClasses("nya-input__input form-control",$disabled?"disabled":undefined),name:$name,id:$id,placeholder:$placeholder,rows:$rows?$rows!==true?$rows:undefined:undefined,value:$rows?undefined:$value,type:$rows?undefined:$type,disabled:$disabled?"disabled":undefined}})
                        .act(function() { $inputNode = this; })
                        .test(function $C__input_11_27() { return $rows; })
                            .text(function $C__input_12_26() { return $value; })
                    .end(2)
                    .span({"class": "close"})
                        .act(function() { $resetNode = this; })
                        .span()
                            .text("&times;", true)
            .end(4)
            .otherwise()
                .elem(function $C__input_18_13(){return $rows?"textarea":"input"}, function $C__input_18_13(){return{"class":$ConkittyClasses("nya-input nya-input__input form-control",$disabled?"disabled":undefined),name:$name,id:$id,placeholder:$placeholder,rows:$rows?$rows!==true?$rows:undefined:undefined,value:$rows?undefined:$value,type:$rows?undefined:$type,disabled:$disabled?"disabled":undefined}})
                    .act(function() { $inputNode = this; })
                    .attr("class", function() { return $ConkittyChange(this, (Nya.Input.getClass($size, $class))); })
                    .test(function $C__input_21_23() { return $rows; })
                        .text(function $C__input_22_22() { return $value; })
        .end(4)
        .act(function() { $ConkittyTemplateRet = (function() {
            if ($resetNode) {
                $B($resetNode).on('click', function() {
                    $inputNode.value = '';
                    $B($inputNode).emit('focus');
                });
            }
            return $noAPI ? undefined : new Nya.Input($node, $inputNode);


        }).call(this); })
    .end();
    return $ConkittyTemplateRet;
};

$C._tpl["nya::textarea"] = function($name, $value, $size, $placeholder, $id, $reset, $rows, $class, $disabled, $noAPI) {
    var $ConkittyEnv = $ConkittyGetEnv(this), $ConkittyTemplateRet, $ret;
    $C($ConkittyEnv.p)
        .act(function() {
            $ret = $C._tpl["nya::_input"].call(new $ConkittyEnvClass(this), $name, $value, $size, (undefined), $placeholder, $id, $reset, ($rows || true), $class, $disabled, $noAPI);
        })
        .act(function() { $ConkittyTemplateRet = $ret; })
    .end();
    return $ConkittyTemplateRet;
};

}).apply(null, $C._$args);
/*!
 * babydom v0.0.4, https://github.com/hoho/babydom
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
                for (i = h.length; i--;) {
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
                e.initEvent(event, true, false);
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

window.Nya = (function(nyaProto) {
    'use strict';

    function Nya() {}

    nyaProto = Nya.prototype;

    nyaProto.extend = Nya.extend = function extend(obj) {
        var proto = this.prototype,
            key,
            Proxy = function() {},
            proxyProto,
            NyaDescendant = function() {
                if (this.init) { this.init.apply(this, arguments); }
            };

        Proxy.prototype = proto;
        NyaDescendant.prototype = proxyProto = new Proxy();
        NyaDescendant.extend = extend;
        proxyProto.constructor = NyaDescendant;

        for (key in obj) {
            proxyProto[key] = obj[key];
        }

        NyaDescendant.__super__ = proto;

        return NyaDescendant;
    };

    Nya.THEMES = {
        default: 'default',
        action:  'action',
        primary: 'primary',
        success: 'success',
        info:    'info',
        warning: 'warning',
        danger:  'danger'
    };

    Nya.SIZES = {
        l:  'lg',
        m:  '',
        s:  'sm',
        xs: 'xs'
    };

    return Nya;
})();

/* global Nya */
/* global $B */
(function(Nya) {
    'use strict';

    Nya.Button = Nya.extend({
        init: function(node, titleNode) {
            this._n = node;
            this._t = titleNode;
        },

        on: function(event, handler) {
            $B(this._n).on(event, handler);
            return this;
        },

        title: function(val) {
            var ret = $B(this._t).text(val);
            return val === undefined ? ret : this;
        },

        href: function(val) {
            var ret = $B(this._n).attr('href', val);
            return val === undefined ? ret : this;
        },

        disabled: function(val) {
            var n = $B(this._n),
                ret = n.attr('disabled', val);
            if (val !== undefined) {
                n.toggleClass('nya-button_disabled', !!val);
                ret = this;
            }
            return ret;
        },

        focus: function() {
            $B(this._n).emit('focus');
            return this;
        }
    });


    Nya.Button.getClass = function(theme, size, extra) {
        theme = theme === 'link' ? theme : (Nya.THEMES[theme] || 'default');
        size = Nya.SIZES[size];
        return 'btn-' + theme + (size ? ' btn-' + size : '') + (extra ? ' ' + extra : '');
    };
})(Nya);

/* global Nya */
/* global $B */
(function(Nya) {
    'use strict';

    Nya.Checkbox = Nya.extend({
        init: function (node, checkbox, label) {
            this._n = node;
            this._c = checkbox;
            this._l = label;
        },

        on: function (event, handler) {
            $B(this._n).on(event, handler);
            return this;
        },

        checked: function (val) {
            var ret = $B(this._c).attr('checked', val);
            return val === undefined ? ret : this;
        },

        val: function (val) {
            var ret = $B(this._c).attr('value', val);
            return val === undefined ? ret : this;
        },

        label: function (val) {
            var ret = $B(this._l).text(val);
            return val === undefined ? ret : this;
        },

        disabled: function (val) {
            var ret = $B(this._c).attr('disabled', val);
            if (val !== undefined) {
                $B(this._n).toggleClass('disabled', !!val);
                ret = this;
            }
            return ret;
        },

        focus: function () {
            $B(this._c).emit('focus');
            return this;
        }
    });

    Nya.Checkbox.getClass = function(size, extra) {
        return (size === 's' ? ' checkable-sm' : '') + (extra ? ' ' + extra : '');
    };
})(Nya);

/* global Nya */
Nya.Radio = Nya.Checkbox.extend();
Nya.Radio.getClass = Nya.Checkbox.getClass;

/* global Nya */
/* global $B */
(function() {
    'use strict';

    Nya.Input = Nya.extend({
        init: function(node, inputNode) {
            this._n = node || inputNode;
            this._i = inputNode;
        },

        on: function(event, handler) {
            $B(this._n).on(event, handler);
            return this;
        },

        val: function(val) {
            var ret = $B(this._i).attr('value', val);
            return val === undefined ? ret : this;
        },

        disabled: function(val) {
            var ret = $B(this._i).attr('disabled', val);
            if (val !== undefined) {
                $B(this._i).toggleClass('disabled', !!val);
                ret = this;
            }
            return ret;
        },

        focus: function() {
            $B(this._i).emit('focus');
            return this;
        }
    });

    Nya.Input.getClass = function(size, extra) {
        size = Nya.SIZES[size];
        return (size ? ' input-' + size : '') + (extra ? ' ' + extra : '');
    };
})();
