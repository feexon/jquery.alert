(function () {
    "use strict";
    var tpl = {
        format: function (variables) {
            return "<div class=\"alert-dialog\"><div class=\"dialog-mask\"></div><div class=\"dialog-panel\"><div class=\"content-view\"><div><div class=\"" +
                variables.type +
                "\"></div></div><div class=\"msg\">" +
                variables.message +
                "</div><div class=\"bg-mask\"></div></div></div></div>";
        }

    };

    var last = $('div');
    var defaults = { type: 'info', duration: 2000, sticky: false, cancellable: true};

    function Alert(msg, options) {
        if (!arguments.length) {
            return last;
        }
        var options = $.extend({message: msg}, defaults, typeof options == 'string' ? {type: options} : options);
        last.remove();
        var dialog = last = $(tpl.format(options)).appendTo("body");
        if (!options.cancellable) {
            return dialog;
        }

        function dispose() {
            $(this).empty().remove();
        }

        dialog.one('click', dispose);
        return options.sticky ? dialog : dialog.delay(options.duration).queue(dispose);
    }

    $.alert = $.extend(Alert, {
        messages: {loading: '正在加载...'},
        load: function (msg, options) {
            return $.alert(msg || $.alert.messages.loading, $.extend({type: 'loading', cancellable: false}, options));
        }
    });

})();