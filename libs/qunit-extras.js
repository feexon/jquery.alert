/**
 * Created by L.x on 14-4-22.
 */
$.extend(QUnit.assert, {
    timeout: function (timeout) {
        var tries = 20;
        var period = timeout / tries;
        var callback = arguments[arguments.length - 1];
        var self = this;
        setTimeout(function () {
            if (!callback.call(self)) {
                if (--tries <= 0) {
                    callback.call(self, 'timeout');
                    return;
                }
                setTimeout(arguments.callee, period);
                return;
            }
        }, period);
    }
});
