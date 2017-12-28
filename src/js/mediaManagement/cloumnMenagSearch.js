define(['jquery', 'common/amdApi'],
    function($, amdApi) {
        return function(text) {
            $("#cloumnManagement").find('.sBox').each(function(i, v) {
                if ($(v).html().indexOf(text) == -1) {
                    $(this).css('display', 'none');
                } else {
                    $(this).css('display', 'inline-block');
                }
            });
        }
    })