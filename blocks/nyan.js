var Nyan = new (function(undefined) {

    var self = this,
        whitespace = /[\x20\t\r\n\f]/,
        handlers = {};


    function eventHandler(e) {
        var node,
            nya,
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
            if (((nya = node._nya)) && ((h = nya[e.type]))) {
                for (i = 0; i < h.length; i++) {
                    h[i].call(node, e);
                    if (next & 2) { return; }
                }
            }
            if (next & 1) { return; }
            node = node.parentNode;
        }
    }


    self.on = function on(node, event, handler) {
        if (event) {
            event = (event || '').split(whitespace);

            var i,
                nya,
                h;

            if (event.length === 1) {
                if (!(event in handlers)) {
                    document.body.addEventListener(event, eventHandler, false);
                    handlers[event] = true;
                }

                if (!((nya = node._nya))) {
                    nya = node._nya = {};
                }

                if (!((h = nya[event]))) {
                    h = nya[event] = [];
                }

                h.push(handler);
            } else {
                for (i = 0; i < event.length; i++) {
                    on(node, event[i], handler);
                }
            }
        }
    };

})();
