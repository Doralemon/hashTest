define(["jquery", 'text!tpls/cameraManagementSearch.html', 'artTemplate', 'cameraManagement/batchAll',
    'cameraManagement/edit', 'cameraManagement/search', 'cameraManagement/delete', 'cameraManagement/deleteAll',
    'common/amdApi', 'common/checked', "bootstrap", "page"
], function($, cameraManagementSearchTpl, art, batchAll, edit, search, deleteById, deleteAll, amdApi, checked) {
    return function(res) {
        var url = amdApi.url + "productions/cameras";
        var q = $('.camera input[name = "q"]').val();
        var state = parseInt($('.camera select[name = "state"] option:selected').val());
        var project = parseInt($('.camera select[name = "project"] option:selected').val());
        var factory = parseInt($('.camera select[name = "factory"] option:selected').val());
        var year = parseInt($('.camera select[name = "year"] option:selected').val());
        var month = parseInt($('.camera select[name = "month"] option:selected').val());
        var json = {
                "q": q,
                "limit": 10,
                "page": 1,
                "state": state,
                "project": project,
                "factory": factory,
                "year": year,
                "month": month
            }
            // console.log(json);
        var selecter = $('.camera table tbody');
        amdApi.ajax({ url: 'productions/cameras', type: 'get', json: json }, function(resSeach) {
            var num = 10;
            var index = Math.ceil(resSeach.result.count / num);
            resSeach.result.index = index;
            var cameraManagementSearch = art.render(cameraManagementSearchTpl, resSeach.result);
            var $cameraManagementSearch = $(cameraManagementSearch);
            $(".camera .searchContent").html(cameraManagementSearch);
            var parCheck = $('.camera .allCheckbox');
            var sonCheck = $('.camera .sonCheckbox');
            checked.checkbox(parCheck, sonCheck);
            var btnNum;
            if (index < 6) {
                btnNum = index;
            } else {
                btnNum = 6;
            }
            if (index == 1) {
                $(".pagination").hide();
            } else {
                $(".pagination").show();
            }
            createPage(num, btnNum, resSeach.result.count);
            //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
            // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
            function createPage(pageSize, buttons, total) {
                $(".camera .searchContent").find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        json.page = pageIndex + 1
                        amdApi.ajax({ url: 'productions/cameras', type: "get", json: json }, function(resSeach) {
                            var parCheck = $('.camera .allCheckbox');
                            var sonCheck = $('.camera .sonCheckbox');
                            checked.checkbox(parCheck, sonCheck);
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
                                '</thead>';
                            var state = '';
                            for (var i = 0; i < resSeach.result.data.length; i++) {
                                var obj = resSeach.result.data[i];
                                if (obj.state == 1) {
                                    state = "未烧录"
                                } else if (obj.state == 2) {
                                    state = "烧录中"
                                } else if (obj.state == 3) {
                                    state = "已烧录"
                                } else if (obj.state == 4) {
                                    state = "已失效"
                                }
                                str +=
                                    '<tbody>' +
                                    '<tr  id="' + obj.id + '">' +
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
                                    '</tr>' +
                                    '</tbody>'
                            }
                            $('.camera .searchContent table').html(str);
                            var parCheck = $('.camera').find('.allCheckbox');
                            var sonCheck = $('.camera').find('.sonCheckbox');
                            checked.checkbox(parCheck, sonCheck);
                            // 如果状态为烧录中，禁止删除
                            var tr = $('.camera .searchContent').find('table tr');
                            for (var i = 0; i < tr.length; i++) {
                                if ($(tr[i]).children('td').eq(3).html() == "烧录中") {
                                    $(tr[i]).find('.btn-delete').addClass('disabledCli disabled');
                                }
                            }
                        })
                    }
                });
            }
            // 如果状态为烧录中，禁止删除
            var tr = $('.camera .searchContent').find('table tr');
            for (var i = 0; i < tr.length; i++) {
                if ($(tr[i]).children('td').eq(3).html() == "烧录中") {
                    $(tr[i]).find('.btn-delete').addClass('disabledCli disabled');
                }
            }
        })
    }
})