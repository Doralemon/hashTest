define(["jquery", "text!tpls/projectManagementSeach.html", 'artTemplate', 'projectManagement/newAdd',
        'projectManagement/edit', 'projectManagement/delete', 'projectManagement/search', 'common/amdApi', 'bootstrap', "page"
    ],
    function($, projectManagementSeachTpl, art, newAdd, edit, deletebyId, search, amdApi) {
        return function(token) {
            var q = $('.kandao-project input[name = "q"]').val();
            var json = {
                "q": q,
                "limit": 10,
            }
            amdApi.ajax({ url: 'productions/projects', type: 'get', json: json }, function(res) {
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var projectManagementSeach = art.render(projectManagementSeachTpl, res.result);
                var $projectManagementSeach = $(projectManagementSeach);
                $(".kandao-project .projectSerachContent").html($projectManagementSeach);
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
                //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                function createPage(pageSize, buttons, total) {
                    $('.kandao-project .projectSerachContent').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            // alert((pageIndex + 1) + '页');
                            var json = {
                                "q": q,
                                limit: 10,
                                page: pageIndex + 1
                            }
                            amdApi.ajax({ url: 'productions/projects', type: 'get', json: json }, function(res) {
                                var str = '';
                                for (var i = 0; i < res.result.data.length; i++) {
                                    var obj = res.result.data[i];
                                    // console.log(obj)
                                    str += '<tr id="' + obj.id + '">' +
                                        '<td>' + obj.no + '</td>' +
                                        '<td>' + obj.name + '</td>' +
                                        '<td>' + obj.description + '</td>' +
                                        '<td>' + obj.creator + '</td>' +
                                        '<td>' + obj.date_created + '</td>' +
                                        '<td id="' + obj.id + '">' +
                                        '<button type="button" class="btn btn-edit btn-sm">编辑</button>' +
                                        '<button type="button" class="btn btn-delete btn-sm">删除</button>' +
                                        '</td>' +
                                        '</tr>'
                                }
                                $('.kandao-project table tbody').html(str);
                            })
                        }
                    });
                }
            })
        };
    });