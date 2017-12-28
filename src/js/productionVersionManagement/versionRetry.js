define(["jquery", 'artTemplate', 'common/amdApi',
        'productionVersionManagement/getData',
    ],
    function($, art, amdApi, getData) {
        return function(id, version_id) {
            var version_id = parseInt(version_id);
            amdApi.ajax({ url: "softwares/" + id + "/versions/" + version_id + "/republish", type: "post" }, function(res) {
                console.log(res)
                 var page = 1;
                            $('.kandao-versionManagement .pagination>li').each(function(i, v) {
                                if ($(v).hasClass("active")) {
                                    page = $(v).children('a').attr('page');
                                    page = parseInt(page);
                                    // console.log(page);
                                }
                            })
                            var json = {
                                    limit: 10,
                                    page: page
                                }
                                // 刷新所有版本信息
                            amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: json }, function(res) {
                                getData.getInfoData(res);
                                $productionVersionEdit.modal('hide');
                            })
            })
        };
    });