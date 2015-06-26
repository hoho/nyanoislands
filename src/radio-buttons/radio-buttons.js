/* global Nya */
/* global $B */
(function(Nya) {
    'use strict';

    Nya.RadioButtons = Nya.extend({
        init: function (node, btns) {
            node._nya = this;
            this._n = node;
            this._b = btns;
        },

        on: function (event, handler) {
            $B(this._n).on(event, handler);
            return this;
        },

        val: function (val) {
            var ret = this,
                i,
                btn,
                a;
            if (val === undefined) {
                ret = ret._val;
            } else {
                val += '';
                if (val !== ret._val) {
                    for (i = ret._b.length; i--; ) {
                        btn = ret._b[i];
                        a = val === btn[2].value;
                        btn[0].active(a);
                        btn[1].checked = a;
                    }
                    ret._val = val;
                }
            }
            return ret;
        }
    });
})(Nya);
