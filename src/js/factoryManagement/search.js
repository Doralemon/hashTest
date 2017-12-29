define(['jquery', 'text!tpls/factory/factoryManagementSeach.html', 'artTemplate',
        'factoryManagement/newAdd', 'factoryManagement/edit', 'factoryManagement/delete',
        'factoryManagement/search', 'common/amdApi'
    ],
    function($, factoryManagementSeachTpl, art, newAdd, edit, deletevById, search, amdApi) {
        return function() {
            var q = $('.kandao-factory input[name = "q"]').val();
            var json = {
                "q": q,
                "limit": 10,
            }
            amdApi.ajax({
                    url: 'productions/factory',
                    type: 'get',
                    json: json,
                }, function(res) {
                    var num = 10;
                    var index = Math.ceil(res.result.count / num);
                    res.result.index = index;
                    var factoryManagementSeach = art.render(factoryManagementSeachTpl, res.result);
                    var $factoryManagementSeach = $(factoryManagementSeach)
                    $(".kandao-factory .factorySeachContent").html($factoryManagementSeach);
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
                        $(".kandao-factory .factorySeachContent").find(".pagination").jBootstrapPage({
                            pageSize: pageSize,
                            total: total,
                            maxPageButton: buttons,
                            onPageClicked: function(obj, pageIndex) {
                                // alert((pageIndex + 1) + '页');
                                json.page = pageIndex + 1;
                                amdApi.ajax({
                                    url: 'productions/factory',
                                    type: 'get',
                                    json: json
                                }, function(res) {
                                    var str = '';
                                    for (var i = 0; i < res.result.data.length; i++) {
                                        var obj = res.result.data[i];
                                        str += '<tr id="' + obj.id + '">' +
                                            '<td>' + obj.no + '</td>' +
                                            '<td>' + obj.name + '</td>' +
                                            '<td>' + obj.description + '</td>' +
                                            '<td>' + obj.creator + '</td>' +
                                            '<td>' + obj.date_created + '</td>' +
                                            '<td id="' + obj.id + '">' +
                                            '<button type="button" class="btn btn-edit btn-sm">编辑</button>' +
                                            '<button type="button" class="btn btn-delete btn-sm">删除</button>' +
                                            '</td>'
                                        '</tr>'
                                    }
                                    $('.kandao-factory table tbody').html(str);
                                })
                            }
                        });
                    }
                })
                // $.ajax({
                //     url: amdApi.url + 'productions/factory',
                //     type: 'get',
                //     dataType: "json",
                //     data: json,
                //     success: function(res) {
                //         if (res.code != '0') {
                //             alert(res.code);
                //             return;
                //         }
                //         var num = 10;
                //         var index = Math.ceil(res.result.count / num);
                //         res.result.index = index;
                //         var factoryManagementSeach = art.render(factoryManagementSeachTpl, res.result);
                //         var $factoryManagementSeach = $(factoryManagementSeach)
                //         $(".kandao-factory .factorySeachContent").html($factoryManagementSeach);
                //         var btnNum;
                //         if (index < 6) {
                //             btnNum = index;
                //         } else {
                //             btnNum = 6;
                //         }
                //         if (index == 1) {
                //             $('.pagination').hide();
                //         } else {
                //             $('.pagination').show();
                //         }
                //         createPage(num, btnNum, res.result.count);
                //         //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                //         // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                //         function createPage(pageSize, buttons, total) {
                //             $(".kandao-factory .factorySeachContent").find(".pagination").jBootstrapPage({
                //                 pageSize: pageSize,
                //                 total: total,
                //                 maxPageButton: buttons,
                //                 onPageClicked: function(obj, pageIndex) {
                //                     // alert((pageIndex + 1) + '页');
                //                     json.page = pageIndex + 1;
                //                     $.ajax({
                //                         url: amdApi.url + 'productions/factory',
                //                         type: 'get',
                //                         dataType: "json",
                //                         data: json,
                //                         success: function(res) {
                //                             if (res.code != '0') {
                //                                 alert(res.code);
                //                                 return;
                //                             }
                //                             var str = '';
                //                             for (var i = 0; i < res.result.data.length; i++) {
                //                                 var obj = res.result.data[i];
                //                                 str += '<tr id="' + obj.id + '">' +
                //                                     '<td>' + obj.no + '</td>' +
                //                                     '<td>' + obj.name + '</td>' +
                //                                     '<td>' + obj.description + '</td>' +
                //                                     '<td>' + obj.creator + '</td>' +
                //                                     '<td>' + obj.date_created + '</td>' +
                //                                     '<td id="' + obj.id + '">' +
                //                                     '<button type="button" class="btn btn-edit btn-sm">编辑</button>' +
                //                                     '<button type="button" class="btn btn-delete btn-sm">删除</button>' +
                //                                     '</td>'
                //                                 '</tr>'
                //                             }
                //                             $('.kandao-factory table tbody').html(str);
                //                         }
                //                     })
                //                 }
                //             });
                //         }

            //     }
            // })

        }
    })