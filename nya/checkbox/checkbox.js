/* global Nya */
/* global $B */
'use strict';

Nya.Checkbox = Nya.extend({
    init: function(node, checkbox, label) {
        this._n = node;
        this._c = checkbox;
        this._l = label;
    },

    on: function(event, handler) {
        $B(this._n).on(event, handler);
        return this;
    },

    checked: function(val) {
        var ret = $B(this._c).attr('checked', val);
        return val === undefined ? ret : this;
    },

    label: function(val) {
        var ret = $B(this._l).text(val);
        return val === undefined ? ret : this;
    },

    disabled: function(val) {
        var c = $B(this._c),
            ret = c.attr('disabled', val);
        if (val !== undefined) {
            $B(this._n).toggleClass('nya-checkbox_disabled', !!val);
            ret = this;
        }
        return ret;
    }
});
