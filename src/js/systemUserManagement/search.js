define(['jquery', 'common/getPage',
        'systemUserManagement/getData', "bootstrap", "page"
    ],
    function($, getPage, getData) {
        return function() {
            var obj = getPage($('.kandao-systemUser'));
            var q = $('.kandao-systemUser input[name="q"]').val();
            var state = $('.kandao-systemUser select[name="state"]').val();
            (obj.json).q = q;
            (obj.json).state = state;
            if ($('.kandao-systemUser table tbody tr').length == 1) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            getData.myAjax(obj.json);
        }
    })