define(["jquery", "text!tpls/camera/cameraManagementList.html", 'artTemplate', 'cameraManagement/batchAll',
        'cameraManagement/edit', 'cameraManagement/search', 'cameraManagement/delete', 'cameraManagement/deleteAll',
        'common/amdApi', 'common/checked', 'common/getPage', "bootstrap", "page"
    ],
    function($, cameraManagementListTpl, art, batchAll, edit, search, deleteById, deleteAll, amdApi, checked, getPage) {
        return function(cameraManagementFlag) {
            var obj = getPage($('.camera'), 10, cameraManagementFlag.flag1);
            var json = obj.json;
            var page = obj.json.page;
            if ($('.camera table tbody tr').length <= 1 && !cameraManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            amdApi.ajax({ url: 'productions/cameras', type: 'get', json: json }, function(res) {
                if (!res.result.data.length) {
                    obj.json.page = obj.json.page - 1 || 1;
                    amdApi.ajax({ url: 'productions/cameras', type: 'get', json: json }, function(res2) {
                        afterAjax(res2);
                    })
                    return;
                }
                afterAjax(res);
            });

            function afterAjax(res) {
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                // console.log(res);
                var cameraManagementList = art.render(cameraManagementListTpl, res.result);
                var $cameraManagementList = $(cameraManagementList)
                    .on('click', '.batchAll', function() { //添加
                        cameraManagementFlag.flag1 = false;
                        batchAll(res);
                    })
                    .on('click', '.btn-edit', function() { //编辑
                        var id = $(this).parents('tr').attr('id');
                        edit(id, res);
                    })
                    .on('click', '.btn-delete', function() { //删除
                        cameraManagementFlag.flag2 = false;
                        var id = $(this).parents('tr').attr('id');
                        // console.log(id);
                        deleteById(id);
                    })
                    .on('click', '.camraserach', function() {
                        search();
                        // $('.cameraManagement').trigger('click');
                    })
                    .on('click', '.kandao-reset', function() { //重置
                        $('form')[0].reset();
                        window.location.href = "#/product/camera";
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $cameraManagementList.find('.camraserach').trigger('click');
                        } else {
                            return;
                        }
                    });
                cameraManagementFlag.flag1 = true;
                cameraManagementFlag.flag2 = true;
                $(".kandao-contentBody").html($cameraManagementList);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
                    $('.home').trigger('click');
                })
                var parCheck = $('.camera .allCheckbox');
                var sonCheck = $('.camera .sonCheckbox');
                checked.checkbox(parCheck, sonCheck);

                $('.camera').on("click", '.deleteAll', function() { //批量删除
                    var sonChecked = $(".camera .searchContent :checkbox[name=sonCheckbox]:checked");
                    var cameraIds = [];
                    if (sonChecked.size() == 0) {
                        alert("请至少选择一条信息进行删除操作！");
                        return;
                    }
                    for (var i = 0; i < sonChecked.length; i++) {
                        if ($(sonChecked[i]).parents('tr').children().eq(3).text() == "烧录中") {
                            alert("您选择的sn有烧录中，无法删除！");
                            return;
                        }
                        cameraIds.push(parseInt($(sonChecked[i]).parents('tr').attr('id')));
                    }
                    deleteAll(cameraIds);
                });
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
                    $(".pagination .goTo input").val(json.page);
                    $('.go').click();
                    $(".pagination .goTo input").val("");
                }
                //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                function createPage(pageSize, buttons, total) {
                    $cameraManagementList.find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        pageNow: json.page,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            // alert((pageIndex + 1) + '页');
                            json.page = pageIndex + 1;
                            amdApi.ajax({ url: 'productions/cameras', type: 'get', json: json }, function(res) {
                                var str = '<thead>' +
                                    '<tr>' +
                                    '<th>' +
                                    '<form action="">' +
                                    '<div class="checkbox">' +
                                    '<label>' +
                                    '<input type="checkbox" class="allCheckbox">' +
                                    '</label>' +
                                    '</div>' +
                                    '</form>' +
                                    '</th>' +
                                    '<th>S/N</th>' +
                                    '<th>PIN</th>' +
                                    '<th>状态</th>' +
                                    '<th>关联邮箱</th>' +
                                    '<th>操作</th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                                var state = '';
                                for (var i = 0; i < res.result.data.length; i++) {
                                    var obj = res.result.data[i];
                                    if (obj.state == 1) {
                                        state = "未烧录"
                                    } else if (obj.state == 2) {
                                        state = "烧录中"
                                    } else if (obj.state == 3) {
                                        state = "已烧录"
                                    } else if (obj.state == 4) {
                                        state = "已失效"
                                    }
                                    str += '<tr id="' + obj.id + '">' +
                                        '<td>' +
                                        '<form action="">' +
                                        '<div class="checkbox">' +
                                        '<label>' +
                                        '<input type="checkbox" class="sonCheckbox" name="sonCheckbox">' +
                                        '</label>' +
                                        '</div>' +
                                        '</form>' +
                                        '</td>' +
                                        '<td>' + obj.sn + '</td>' +
                                        '<td>' + obj.pin + '</td>' +
                                        '<td>' + state + '</td>' +
                                        '<td>' + obj.email + '</td>' +
                                        '<td id="' + obj.id + '">' +
                                        '<button type="button" class="btn btn-edit btn-sm">编辑</button>' +
                                        '<button type="button" class="btn btn-delete btn-sm">删除</button>' +
                                        '</td>' +
                                        '</tr>'
                                }
                                str += '</tbody>';
                                $('.camera table').html(str);
                                var parCheck = $('.camera .allCheckbox');
                                var sonCheck = $('.camera .sonCheckbox');
                                checked.checkbox(parCheck, sonCheck);
                                // 如果状态为烧录中，禁止删除
                                var tr = $('.camera .searchContent').find('table tr');
                                for (var i = 0; i < tr.length; i++) {
                                    if ($(tr[i]).children('td').eq(3).html() == "烧录中") {
                                        $('.btn').removeClass("hover");
                                        $(tr[i]).find('.btn-delete').addClass('disabledCli disabled');
                                    }
                                }
                            });
                        }
                    });
                }

                // 如果状态为烧录中，禁止删除
                var tr = $('.camera .searchContent').find('table tr');
                for (var i = 0; i < tr.length; i++) {
                    if ($(tr[i]).children('td').eq(3).html() == "烧录中") {
                        $('.btn').removeClass("hover");
                        $(tr[i]).find('.btn-delete').addClass('disabledCli disabled');
                    }
                }
                parCheck = $('.camera .allCheckbox');
                sonCheck = $('.camera .sonCheckbox');
                checked.checkbox(parCheck, sonCheck);
            }

        };
    });