'use strict';

var Nya = (function(nyaProto) {
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

    return Nya;
})();