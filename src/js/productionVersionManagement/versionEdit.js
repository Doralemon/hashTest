define(["jquery", "text!tpls/productionVersionEdit.html", 'artTemplate', 'common/amdApi',
        'productionVersionManagement/getData', 'common/checked', 'productionVersionManagement/toggleLanguage',
    ],
    function($, productionVersionEditTpl, art, amdApi, getData, checked, toggleLanguage) {
        return function(id, version_id) {
            var version_id = parseInt(version_id);
            $('#editVersionSon').remove();
            amdApi.ajax({ url: "softwares/" + id + "/versions/" + version_id, type: "get" }, function(res) {
                // console.log(res)
                var status = res.result.status;
                var productionVersionEdit = art.render(productionVersionEditTpl, res.result);
                var $productionVersionEdit = $(productionVersionEdit)
                    .on('submit', 'form', function() {
                        var version_name = $('#editVersionSon input[name="version_name"]').val();
                        var version_code = $('#editVersionSon input[name="version_code"]').val();
                        version_code = parseInt(version_code);
                        var description = $('#editVersionSon textarea.textCh').val();
                        var description_en = $('#editVersionSon textarea.textEn').val();
                        var status = $('#editVersionSon select[name="status"]').val();
                        var json = {
                                "version_name": version_name,
                                "version_code": version_code,
                                "description": description,
                                "description_en": description_en,
                                "status": status
                            }
                            // console.log(json);
                        amdApi.ajax({ url: "softwares/" + id + "/versions/" + version_id + "/change", type: "post", json: JSON.stringify(json) }, function() {
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
                        return false;
                    })
                    .appendTo("body").modal();
                toggleLanguage($productionVersionEdit);
                //弹框状态选择
                var objState = $('#versionStatus option');
                checked.getSelected(objState, status);
            })
        };
    });