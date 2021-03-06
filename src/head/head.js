/* global $B */
/* global Nya */
(function() {
    'use strict';

    var initialized;
    var DROPDOWN_OPEN_CLASS = 'nya-head__title_open';
    var KEY_ESC = 27;

    var dropdownLink,
        dropdownElem;

    Nya.Head = {
        dropdown: function(link, elem) {
            if (!initialized) {
                // Update max height on resize.
                window.addEventListener('resize', setMaxHeight, false);

                var doc = $B(document);
                doc.on('click', function() { hideDropdown(); });
                // Handle keyboard events.
                doc.on('keydown', function(e) {
                    if (!dropdownLink || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
                        return;
                    }

                    if (e.which === KEY_ESC) {
                        hideDropdown();
                    }
                });

                initialized = true;
            }

            elem = $B(elem);

            link = $B(link);
            link.on('click', function(e) {
                if (link.hasClass(DROPDOWN_OPEN_CLASS)) {
                    hideDropdown();
                } else {
                    showDropdown(link, elem);
                }
                e.stopImmediatePropagation();
                // Nested links are evil, but let's support them.
                for (var i = e.target; i && (i !== link[0]); i = i.parentNode) {
                    if (i.tagName === 'A') {
                        return;
                    }
                }
                e.preventDefault();
            });
        }
    };


    function showDropdown(link, elem) {
        hideDropdown();

        link.addClass(DROPDOWN_OPEN_CLASS);

        dropdownLink = link;
        dropdownElem = elem;

        setMaxHeight();

        elem.emit('nya-dropdown');
    }


    function hideDropdown() {
        if (dropdownLink) {
            dropdownLink.removeClass(DROPDOWN_OPEN_CLASS);
            dropdownLink = dropdownElem = undefined;
        }
    }


    function setMaxHeight() {
        if (!dropdownElem) { return; }

        var MIN_MAX_HEIGHT = 100,
            maxHeight = Math.round((window.innerHeight - 50) * 0.9);

        if (maxHeight < MIN_MAX_HEIGHT) {
            maxHeight = MIN_MAX_HEIGHT;
        }

        dropdownElem[0].style.maxHeight = maxHeight + 'px';
    }
})();
