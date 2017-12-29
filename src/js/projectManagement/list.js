define(["jquery", "text!tpls/project/projectManagementList.html", 'artTemplate', 'projectManagement/newAdd',
        'projectManagement/edit', 'projectManagement/delete', 'projectManagement/search', 'common/amdApi', 'common/getPage', 'bootstrap', "page"
    ],
    function($, projectManagementListTpl, art, newAdd, edit, deletebyId, search, amdApi, getPage) {
        return function(projectManagementFlag) {
            var obj = getPage($('.kandao-project'), 10, projectManagementFlag.flag1);
            var json = obj.json;
            var page = obj.page;
            if ($('.kandao-project table tbody tr').length == 1 && !projectManagementFlag.flag2) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            amdApi.ajax({
                url: 'productions/projects',
                type: 'get',
                json: json
            }, function(res) {
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var projectManagementList = art.render(projectManagementListTpl, res.result);
                var $projectManagementList = $(projectManagementList)
                    .on('click', '.newAdd', function() { //新增
                        projectManagementFlag.flag1 = false;
                        newAdd();
                    })
                    .on('click', '.btn-edit', function() { //编辑
                        var id = $(this).parent().attr('id')
                        edit(id);
                    })
                    .on('click', '.btn-delete', function() { //删除
                        projectManagementFlag.flag2 = false;
                        var id = $(this).parent().attr('id');
                        deletebyId(id);
                    })
                    .on('click', '.projectserach', function() {
                        var q = $('.kandao-project input[name = "q"]').val();
                        search();
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $projectManagementList.find('.projectserach').trigger('click');
                        } else {
                            return;
                        }
                    });
                projectManagementFlag.flag1 = true;
                projectManagementFlag.flag2 = true;
                $(".kandao-contentBody").html($projectManagementList);
                $('.breadcrumb li').eq(0).on('click', function() { //回首页
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
                if (page > 6) {
                    $(".pagination .goTo input").val(json.page);
                    $('.go').click();
                    $(".pagination .goTo input").val("");
                }
                createPage(num, btnNum, res.result.count);
                //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                function createPage(pageSize, buttons, total) {
                    $projectManagementList.find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        pageNow: json.page,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            // alert((pageIndex + 1) + '页');
                            json.page = pageIndex + 1;
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
                            });
                        }
                    });
                }
            });
        };
    });