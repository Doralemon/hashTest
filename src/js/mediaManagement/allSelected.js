define(['jquery', 'common/amdApi', 'mediaManagement/getData',
        "bootstrap", "page"
    ],
    function($, amdApi, getData) {
        return {
            getSel: function(selecter) { //全选
                selecter.find('.coverBox').each(function(i, v) { //遮罩层
                    $(v).css('display', 'block');
                })
                selecter.find('input').each(function(i, v) { //check框
                    $(v).prop('checked', 'checked');
                })
            },
            getSelNot: function(selecter) { //清空
                selecter.find('.coverBox').each(function(i, v) { //遮罩层
                    $(v).css('display', 'none');
                })
                selecter.find('input').each(function(i, v) { //check框
                    $(v).prop('checked', '');
                })
            }
        }
    })