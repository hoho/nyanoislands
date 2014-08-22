/* global Nya */
/* global $B */
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
            $B(this._n).toggleClass('nya-input_disabled', !!val);
            ret = this;
        }
        return ret;
    },

    focus: function() {
        $B(this._i).emit('focus');
        return this;
    }
});
