module("jquery alert dialog", {
    teardown: function () {
        $.alert().remove();
    }
});
function dialog() {
    return $("body>.alert-dialog");
}
$.extend(QUnit.assert, {
    dialog: {
        message: function (msg) {
            ok(dialog().text().indexOf(msg) != -1, "expected message: \"" + msg + "\"\nbut was: \"" + dialog().text() + "\"");
        },
        size: function (expectedSize) {
            equal(dialog().length, expectedSize, "dialog size");
        }
    }

});

test('dialog should append to body', function (assert) {
    $.alert('');
    assert.dialog.size(1);
});

test('retrieve the last dialog', function (assert) {
    $.alert('message');
    equal($('.info', $.alert()).length, 1);
});

test('return dialog instance', function (assert) {
    equal($.alert('message'), $.alert());
    equal($.alert('message', {sticky: true}), $.alert());
    equal($.alert('message', {cancellable: false}), $.alert());
});

test('alert message', function (assert) {
    $.alert('ok');
    assert.dialog.message('ok');
});

test('must show one dialog at the same time', function (assert) {
    $.alert('message');
    $.alert('message');
    assert.dialog.size(1);
});

test('alert info message as default', function () {
    $.alert('message');
    equal($('.info', dialog()).length, 1);
});

test('alert loading message', function (assert) {
    $.alert('加载中', 'loading');
    equal($('.loading', dialog()).length, 1);
    assert.dialog.message('加载中');
});

asyncTest('close automatically after duration seconds', function (assert) {
    expect(1);
    $.alert('message', {duration: 100});
    setTimeout(function () {
        assert.dialog.size(0);
        start();
    }, 100);
});

asyncTest("can't closing sticky dialog automatically", function (assert) {
    expect(1);
    $.alert('message', {duration: 100, sticky: true});
    setTimeout(function () {
        assert.dialog.size(1);
        start();
    }, 100);
});

test('closing dialog after it was clicked!', function (assert) {
    $.alert('message', {sticky: true}).click();
    assert.dialog.size(0);
});

test("can't closing modal dialog even if it was clicked!", function (assert) {
    $.alert('message', {sticky: true, cancellable: false}).click();
    assert.dialog.size(1);
});

asyncTest("can't closing modal dialog automatically", function (assert) {
    expect(1);
    $.alert('message', {duration: 100, cancellable: false});
    setTimeout(function () {
        assert.dialog.size(1);
        start();
    }, 200);
});

asyncTest('alert a loading dialog fast', function (assert) {
    expect(2);
    var dialog = $.alert.load('msg', {duration: 100});
    equal($('.loading', dialog).length, 1);
    setTimeout(function () {
        assert.dialog.size(1);
        start();
    }, 200);
});

test('alert fast loading dialog by default message', function (assert) {
    $.alert.load();
    assert.dialog.message($.alert.messages.loading);
});