define(['jquery', 'text!tpls/account/accoutManagementList.html', 'artTemplate', 'accoutManagement/newAdd',
        'accoutManagement/info', 'accoutManagement/secretKey', 'accoutManagement/delete',
        'accoutManagement/search', 'common/amdApi', 'common/getPage', "bootstrap", "page"
    ],
    function($, accoutManagementListTpl, art, newAdd, info, secretKey, deleteById, search, amdApi, getPage) {
        return function(accoutManagementFlag) {
            var page = 1;
            if (accoutManagementFlag.flag1) {
                $('.kandao-accout .pagination>li').each(function(i, v) {
                    if ($(v).hasClass("active")) {
                        page = $(v).children('a').attr('page');
                        page = parseInt(page);
                    }
                })
            } else {
                page = 1;
            }
            if ($('.kandao-accout table tbody tr').length == 1 && !accoutManagementFlag.flag2) {
                page = page - 1 || 1;
            }
            var json = {
                limit: 10,
                page: page
            }
            amdApi.ajax({ url: "customers", type: "get", json: json }, function(res) {
                // console.log(res);    
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var accoutManagementList = art.render(accoutManagementListTpl, res.result);
                var $accoutManagementList = $(accoutManagementList)
                    .on('click', '.newAdd', function() { //新建
                        accoutManagementFlag.flag1 = false
                        newAdd();
                    })
                    .on('click', '.btnInfo', function() { //详情
                        var id = $(this).parents('tr').attr('id');
                        info(id);
                    })
                    .on('click', '.btn-secretKey', function() { // 客户单个密钥
                        var id = $(this).parents('tr').attr('id');
                        secretKey(id);
                    })
                    .on('click', '.btn-delete', function() { //删除
                        accoutManagementFlag.flag2 = false;
                        var id = $(this).parents('tr').attr('id');
                        deleteById(id);
                    })
                    .on('click', '.accoutSearch', function() { //查询
                        search();
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $accoutManagementList.find('.accoutSearch').trigger('click');
                        } else {
                            return;
                        }
                    });
                accoutManagementFlag.flag1 = true;
                accoutManagementFlag.flag2 = true;
                $(".kandao-contentBody").html($accoutManagementList);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    console.log(123)
                    $('.home').trigger('click');
                })
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
                if (page > 6) {
                    $(".pagination .goTo input").val(page);
                    $('.go').click();
                    $(".pagination .goTo input").val("");
                }
                //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                function createPage(pageSize, buttons, total) {
                    $('.kandao-accout').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        pageNow: json.page,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            json.page = pageIndex + 1
                            amdApi.ajax({ url: "customers", type: "get", json: json }, function(res) {
                                // console.log(res)
                                var str = ' <thead>' +
                                    '<tr>' +
                                    '<th>公司</th>' +
                                    '<th>姓名</th>' +
                                    '<th>邮箱</th>' +
                                    '<th>手机</th>' +
                                    '<th>密钥有效期</th>' +
                                    '<th>激活设备数</th>' +
                                    '<th>创建者</th>' +
                                    '<th>操作</th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                                var state = '';
                                for (var i = 0; i < res.result.data.length; i++) {
                                    var obj = res.result.data[i];
                                    str +=
                                        '<tr id="' + obj.id + '">' +
                                        '<td>' + obj.company + '</td>' +
                                        '<td>' + obj.name + '</td>' +
                                        '<td>' + obj.email + '</td>' +
                                        '<td>' + obj.phone + '</td>' +
                                        '<td>' + obj.finaltime + '</td>' +
                                        '<td>' + obj.activatedN + '/' + obj.licenseN + '</td>' +
                                        '<td>' + obj.creator + '</td>' +
                                        '<td>' +
                                        '<span class="btnInfo">详情</span>' +
                                        '<span class="btn-secretKey">密钥</span>' +
                                        '<span class="btn-delete">删除</span>' +
                                        '</td>' +
                                        '</tr>'

                                }
                                str += '</tbody>';
                                $('.kandao-accout .accoutSearchContent table').html(str);
                            })
                        }
                    });
                }
            })

        }
    })