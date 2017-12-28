define([
    'jquery',
], function($) {
    return {
        search: function() { //搜索
            var _this = this;
            $('.searchBox input').on('input', function() {
                var value = $(this).val();
                $('.noCloumn').find('.sBox').each(function(i, v) {
                    if ($(v).html().indexOf(value) == -1) {
                        $(this).css('display', 'none');
                    } else {
                        $(this).css('display', 'inline-block');
                    }
                });
                _this.moveCloumn();
            });
        },
        moveCloumn: function() { //栏目选择
            $('.noCloumn').on('click', '.sBox', function() {
                $(this).appendTo('.selCloumn .playColumn');
            });
            $('.selCloumn').on('click', '.sBox', function() {
                $(this).appendTo('.noCloumn .playColumn');
            })
        }
    }
});