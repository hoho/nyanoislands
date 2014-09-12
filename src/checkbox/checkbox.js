/* global Nya */
/* global $B */
(function(Nya) {
    'use strict';

    Nya.Checkbox = Nya.extend({
        init: function (node, checkbox, label) {
            node._nya = this;
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
