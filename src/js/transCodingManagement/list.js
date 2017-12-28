define(['jquery', 'text!tpls/mediaManagement/trnasCodingManagement.html', 'artTemplate', 'common/amdApi',
        'transCodingManagement/transCodeInit', 'transCodingManagement/transCodingInfo', 'transCodingManagement/getData', 'common/getPage',
        'mediaManagement/transCoding', 'transCodingManagement/delete', 'transCodingManagement/search',
        "bootstrap", "page"
    ],
    function($, trnasCodingManagementTpl, art, amdApi, transCodeInit, transCodingInfo, getData, getPage,
        transCoding, deleteById, search) {
        return function(transcodingManagementFlag) {
            var obj = getPage($('.kandao-transCodingManagement'), 10, transcodingManagementFlag.flag1);
            if ($('.kandao-transCodingManagement table tbody tr').length <= 1 && !transcodingManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            var id, m_type;
            amdApi.ajax({ url: "medias/transcode/task_list", type: "get", json: obj.json }, function(res) {
                // console.log(res)
                var trnasCodingManagement = art.render(trnasCodingManagementTpl, {});
                var $trnasCodingManagement = $(trnasCodingManagement)
                    .on('click', '.initSet', function() { //初始化转码设置
                        transCodeInit();
                    })
                    .on('click', '.btnInfo', function() { //详情
                        id = $(this).parents('tr').attr('id');
                        var type = $(this).parents('tr').children().eq(1).text();
                        m_type = $(this).parents('tr').children().eq(1).attr('m_type');
                        var name = $(this).parents('tr').children().eq(0).text();
                        // console.log(type + "===" + name);
                        transCodingInfo(id, name, type, m_type);
                    })
                    .on('click', '.btnTransCode', function() { //转码
                        transCoding();
                    })
                    .on('click', '.btnDelete', function() { //删除
                        transcodingManagementFlag.flag2 = false;
                        id = $(this).parents('tr').attr('id');
                        m_type = $(this).parents('tr').children().eq(1).attr('m_type');
                        deleteById(id);
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            var q = $(this).val();
                            q = $.trim(q);
                            search(q);
                        } else {
                            return;
                        }
                    });
                transcodingManagementFlag.flag2 = true;
                $(".kandao-contentBody").html($trnasCodingManagement);
                getData.myAjax(obj.json, res);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    $('.home').trigger('click');
                })
            });
        }
    })