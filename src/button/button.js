/* global Nya */
Nya.Button = Nya.extend({
    init: function(node, titleNode) {
        this.node = node;
        this.title = titleNode;
    },

    on: function(event, handler) {
        $B(this.node).on(event, handler);
    },

    title: function(value) {
        if (value === undefined) {
            return this.title.textContent;
        } else {
            this.title.textContent = value;
            return this;
        }
    }
});
