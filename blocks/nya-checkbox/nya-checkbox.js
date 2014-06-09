/* global Nya */
Nya.Checkbox = Nya.extend({
    init: function(node, cbNode, labelNode) {
        this.node = node;
        this.cbNode = cbNode;
        this.labelNode = labelNode;
    },

    on: function(event, handler) {
        $B(this.node).on(event, handler);
    },

    label: function(value) {
        if (value === undefined) {
            return this.labelNode.textContent;
        } else {
            this.labelNode.textContent = value;
            return this;
        }
    }
});
