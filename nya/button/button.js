/* global Nya */
/* global $B */
'use strict';

Nya.Button = Nya.extend({
    init: function(node, titleNode) {
        this._n = node;
        this._t = titleNode;
    },

    on: function(event, handler) {
        $B(this._n).on(event, handler);
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
    }
});
