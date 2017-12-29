define(["jquery", "text!tpls/productionVersion/productionVersionManagementInfo.html", 'artTemplate', 'productionVersionManagement/versionAdd',
        'productionVersionManagement/versionEdit', 'productionVersionManagement/versionDelete', 'productionVersionManagement/versionRetry',
        'common/amdApi', 'productionVersionManagement/getData', "bootstrap", 'page'
    ],
    function($, productionVersionManagementInfoTpl, art, versionAdd, versionEdit, deleteById, versionRetry, amdApi, getData) {
        return function(id, usePlat) {
            amdApi.ajax({ url: "softwares/" + id, type: "get" }, function(resInfo) {
                var json = {
                    limit: 10,
                }
                amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: json }, function(res) {
                    // console.log(res);
                    var num = 10;
                    var index = Math.ceil(res.result.count / num);
                    res.result.index = index;
                    res.result.info = resInfo.result;
                    // console.log(res)
                    var productionVersionManagementInfo = art.render(productionVersionManagementInfoTpl, res.result);
                    var $productionVersionManagementInfo = $(productionVersionManagementInfo)
                        .on('click', '.goback,.toProduction', function() { // 返回按钮||面包屑
                            $('.productionVersionManagement').trigger('click');
                        })
                        .on('click', '.newAdd', function() { // 新增按钮
                            versionAdd(id, usePlat);
                        })
                        .on('click', '.btn-edit', function() { // 编辑按钮
                            var version_id = $(this).parents('tr').attr('id');
                            versionEdit(id, version_id);
                        })
                        .on('click', '.btn-retry', function() { // 重试按钮
                            var version_id = $(this).parents('tr').attr('id');
                            versionRetry(id, version_id);
                        })
                        .on('click', '.btn-delete', function() { // 删除按钮
                            var version_id = $(this).parents('tr').attr('id');
                            deleteById(id, version_id);
                        })
                    $(".kandao-contentBody").html($productionVersionManagementInfo);
                    getData.getInfoData(res);
                    $('.versionSon').on('click', function() { //版本管理
                            amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: json }, function(res) {
                                getData.getInfoData(res);
                            })
                        })
                        // 分页功能
                    var btnNum;
                    if (index < 6) {
                        btnNum = index;
                    } else {
                        btnNum = 6;
                    }
                    if (index == 1) {
                        $('.pagination').hide();
                    } else {
                        $('.pagination').show();
                    }
                    createPage(num, btnNum, res.result.count);
                    if (json.page > 6) {
                        $(".pagination .goTo input").val(json.page);
                        $('.go').click();
                        $(".pagination .goTo input").val("");
                    }

                    function createPage(pageSize, buttons, total) {
                        $('.kandao-versionManagement').find(".pagination").jBootstrapPage({
                            pageSize: pageSize,
                            total: total,
                            pageNow: json.page,
                            maxPageButton: buttons,
                            onPageClicked: function(obj, pageIndex) {
                                // alert((pageIndex + 1) + '页');
                                json.page = pageIndex + 1;
                                amdApi.ajax({ url: "softwares/" + id + "/versions", type: "get", json: json }, function(res) {
                                    getData.getInfoData(res);
                                })
                            }
                        });
                    }
                    getData.getInfoData(res);
                })
            })

        };
    });