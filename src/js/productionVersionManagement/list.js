define(['jquery', 'text!tpls/productionVersionManagementList.html', 'artTemplate', 'productionVersionManagement/search', 'productionVersionManagement/add',
        'productionVersionManagement/edit', 'productionVersionManagement/info', 'productionVersionManagement/downLine',
        'common/amdApi', 'productionVersionManagement/getData', 'bootstrap', 'page'
    ],
    function($, productionVersionManagementListTpl, art, search, add, edit, info, downLine, amdApi, getData) {
        return function(productionVersionManagementFlag) {
            // 首先就请求第一页的页面
            var page = 1;
            if (productionVersionManagementFlag.flag1) {
                $('.kandao-productionVersion .pagination>li').each(function(i, v) {
                    if ($(v).hasClass("active")) {
                        page = $(v).attr('pnum');
                        page = parseInt(page);
                    }
                })
            }
            var json = {
                limit: 10,
                page: page
            }
            if ($('.kandao-productionVersion table tbody tr').length == 1 && !productionVersionManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                // console.log(res)
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var productionVersionManagementList = art.render(productionVersionManagementListTpl, res.result);
                var $productionVersionManagementList = $(productionVersionManagementList)
                    .on('click', '.softwaresSearch', function() {
                        search();
                    })
                    .on('click', '.newAdd', function() { //新增
                        productionVersionManagementFlag.flag1 = false;
                        add();
                    })
                    .on('click', '.btnEdit', function() { //编辑
                        var _this = this;
                        var id = $(this).parents('tr').attr('id');
                        edit(id, _this);
                    })
                    .on('click', '.btnVesion', function() { //版本管理
                        var id = $(this).parents('tr').attr('id');
                        var usePlat = $(this).parents('tr').children().eq(4).text();
                        info(id, usePlat);
                    })
                    .on('click', '.btnDownLine', function() {
                        var id = $(this).parents('tr').attr('id');
                        downLine(id);
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $productionVersionManagementList.find('.softwaresSearch').trigger('click');
                        } else {
                            return;
                        }
                    });
                productionVersionManagementFlag.flag1 = true;
                $(".kandao-contentBody").html($productionVersionManagementList);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    $('.home').trigger('click');
                })
                getData.getListData(res);
                // 分页功能
                amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                    var num = 10;
                    var index = Math.ceil(res.result.count / num);
                    res.result.index = index;
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
                        $('.kandao-productionVersion').find(".pagination").jBootstrapPage({
                            pageSize: pageSize,
                            total: total,
                            pageNow: json.page,
                            maxPageButton: buttons,
                            onPageClicked: function(obj, pageIndex) {
                                sessionStorage.setItem("currentPage", (pageIndex + 1));
                                // alert((pageIndex + 1) + '页');
                                var json = {
                                    limit: 10,
                                    page: pageIndex + 1
                                }
                                amdApi.ajax({ url: "softwares", type: "get", json: json }, function(res) {
                                    getData.getListData(res);
                                })
                            }
                        });
                    }
                })

            });
        }
    })