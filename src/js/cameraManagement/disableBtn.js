define([
    'jquery',
], function($) {
    return function() {
        // 如果状态为烧录中，禁止编辑
        var tr = $('.camera .searchContent').find('table tr');
        for (var i = 0; i < tr.length; i++) {
            if ($(tr[i]).children('td').eq(3).html() == "烧录中") {
                $(tr[i]).find('.btn-edit').addClass('disabledCli');
                $(tr[i]).find('.btn-delete').hide();
            }
        }
    }
});