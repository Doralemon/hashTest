define(["jquery", 'common/amdApi', 'text!tpls/deletModal.html', 'productionVersionManagement/getData'],
    function($, amdApi, deletModalTpl, getData) {
        return function(id, version_id) {
            // 获取当前页面
            $('#deleteMassage').remove();
            $deletModal = $(deletModalTpl)
                .on('click', '.btn-comfirm', function() {
                    amdApi.ajax({ url: "softwares/" + id + "/versions/" + version_id + "/delete", type: 'post' }, function(res) {
                        var page = 1;
                        $('.kandao-versionManagement .pagination>li').each(function(i, v) {
                            if ($(v).hasClass("active")) {
                                page = $(v).attr('pnum');
                                page = parseInt(page);
                                console.log(page);
                            }
                        })
                        var json = {
                                limit: 10,
                                page: page
                            }
                            // 刷新所有版本信息
                        amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: json }, function(res) {
                            getData.getInfoData(res);
                            $deletModal.modal('hide');
                        })
                    })
                })
                .appendTo('body').modal();
        };
    });