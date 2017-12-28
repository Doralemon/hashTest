define(['jquery', 'text!tpls/mediaManagement/transCodingInfo.html', 'artTemplate', 'common/amdApi',
        'common/getPage', 'transCodingManagement/getData', 'transCodingManagement/deleteInfo',
        'transCodingManagement/retryTransCode'
    ],
    function($, transCodingInfoTpl, art, amdApi, getPage, getData, deleteInfo, retryTransCode) {
        return function(id, name, type, m_type) {
            $('#transCodeInfo').remove();
            var line_id;
            var json = {
                type: m_type
            }
            amdApi.ajax({ url: "medias/transcode/" + id + "/line_info", type: "get", json: json }, function(res) {
                // console.log(res)
                var transCodingInfo = $(transCodingInfoTpl);
                $transCodingInfo = $(transCodingInfo)
                    .on('click', '.btnRetry', function() { //重试
                        line_id = $(this).parents('tr').attr('id');
                        retryTransCode(id, line_id);
                    })
                    .on('click', '.btnDelete', function() { //删除
                        line_id = $(this).parents('tr').attr('id');
                        deleteInfo(id, line_id);
                    })
                    .appendTo('body').modal();
                getData.myInfoAjax(json, res, id);
                $('.kandao-trnasCodeInfo-top>p').text('名称：' + name);
                $('.kandao-trnasCodeInfo-top>div').text('类型：' + type);
                if ($('.kandao-transCodingManagement').find('.pagination>li').length < 5) { //解决详情弹框分页按钮会出现的bug
                    $('.kandao-transCodingManagement').find('.pagination').hide();
                } else {
                    $('.kandao-transCodingManagement').find('.pagination').show();
                }
            })
        }
    })