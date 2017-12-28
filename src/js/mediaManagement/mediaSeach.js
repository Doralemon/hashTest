define(['jquery', 'artTemplate', 'common/amdApi',
        'mediaManagement/getData', 'common/getPage',
        "bootstrap", "page"
    ],
    function($, art, amdApi, getData, getPage) {
        return function(q, m_type, id,_self) {
            var obj = getPage($('.kandao-mediaManagement'), 8);
            (obj.json).q = q;
            (obj.json).type = m_type;
            (obj.json).column = id + '';
            amdApi.ajax({ url: 'medias', type: 'get', json: obj.json }, function(res) {
                if (res.result.data.length < 1) {
                    $('.kandao-mediaManagement').find('.mediaContainer p').css('display', 'none');
                    $('.kandao-mediaManagement').find('.mediaContainer .mediaInfo-bottom').css('display', 'none');
                    $('.kandao-mediaManagement').find('.mediaInfoBody').html('暂无数据');
                } else {
                    $('.kandao-mediaManagement').find('.mediaContainer p').css('display', 'block');
                    $('.kandao-mediaManagement').find('.mediaContainer .mediaInfo-bottom').css('display', 'block');
                    getData.myAjax(obj.json, res);
                }
            })
        }
    })