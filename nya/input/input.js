/* global Nya */
/* global $B */
(function() {
    'use strict';

    Nya.Input = Nya.extend({
        init: function(node, inputNode) {
            this._n = node || inputNode;
            this._n._nya = this;
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
