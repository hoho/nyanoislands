/* global Nya */
/* global $B */
'use strict';

Nya.Radio = Nya.extend({
    init: function(node, radio, label) {
        this._n = node;
        this._r = radio;
        this._l = label;
    },

    on: function(event, handler) {
        $B(this._n).on(event, handler);
        return this;
    },

    checked: function(val) {
        var ret = $B(this._r).attr('checked', val);
        return val === undefined ? ret : this;
    },

    label: function(val) {
        var ret = $B(this._l).text(val);
        return val === undefined ? ret : this;
    },

    disabled: function(val) {
        var c = $B(this._r),
            ret = c.attr('disabled', val);
        if (val !== undefined) {
            $B(this._n).toggleClass('nya-radio_disabled', !!val);
            ret = this;
        }
        return ret;
    }
});
