define(['jquery', 'text!tpls/secreKey/secretKeyManagementList.html', 'artTemplate', 'secretKeyManagement/search', 'common/amdApi', "bootstrap", "page"],
    function($, secretKeyManagementListTpl, art, search, amdApi) {
        return function() {
            var page = 1;
            $('.kandao-secrentKey .pagination>li').each(function(i, v) {
                if ($(v).hasClass("active")) {
                    console.log(i)
                    page = $(v).children('a').attr('page');
                    page = parseInt(page);
                }
            })
            var json = {
                limit: 10,
                page: page
            }
            amdApi.ajax({ url: 'licenses', type: 'get', json: json }, function(res) {
                // console.log(res)
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var secretKeyManagementList = art.render(secretKeyManagementListTpl, res.result);
                var $secretKeyManagementList = $(secretKeyManagementList)
                    .on('click', '.secretKeySearch', function() {
                        search();
                    })
                    .on('click', '.btnIce', function() {
                        var id = $(this).parents('tr').attr('id');
                        id = parseInt(id);
                        var key = $(this).parent().siblings('.key').text();
                        var host = $(this).parent().siblings('.host').text();
                        var state = $(this).parent().prev().attr('state');
                        // console.log(state)
                        state = parseInt(state);
                        var json = {
                            "id": id,
                            "host": host,
                            "key": key,
                            "state": state
                        };
                        // console.log(json)
                        amdApi.ajax({ url: "licenses/" + id, type: "post", json: JSON.stringify(json) }, function(res) {
                            $('.keyManagement').trigger('click');
                        })
                    })
                    .on('keydown', 'input[name="q"]', function(e) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            $secretKeyManagementList.find('.secretKeySearch').trigger('click');
                        } else {
                            return;
                        }
                    });
                $(".kandao-contentBody").html($secretKeyManagementList);
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
                createPage(num, btnNum, res.result.count);
                if (page > 6) {
                    $(".pagination .goTo input").val(page);
                    $('.go').click();
                    $(".pagination .goTo input").val("");
                }
                //每页显示多少条数据(pageSize),显示多少个分页按钮(buttons),传入数据总行数(total)即可
                // 如果需要在选中某一页，然后去请求服务器端，可以在onPageClicked回调函数中完成。
                function createPage(pageSize, buttons, total) {
                    $('.kandao-secrentKey').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        pageNow: json.page,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            // alert((pageIndex + 1) + '页');
                            json.page = pageIndex + 1;
                            amdApi.ajax({ url: "licenses", type: "get", json: json }, function(res) {
                                // console.log(res)
                                var str = ' <thead>' +
                                    '<tr>' +
                                    '<th>公司</th>' +
                                    '<th>姓名</th>' +
                                    '<th>邮箱</th>' +
                                    '<th>密钥</th>' +
                                    '<th>主机</th>' +
                                    '<th>激活时间</th>' +
                                    '<th>状态</th>' +
                                    '<th>操作</th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                                var state1 = '';
                                var state2 = '';
                                for (var i = 0; i < res.result.data.length; i++) {
                                    var obj = res.result.data[i];
                                    str += '<tr id="' + obj.id + '">' +
                                        '<td>' + obj.company + '</td>' +
                                        '<td>' + obj.name + '</td>' +
                                        '<td>' + obj.email + '</td>' +
                                        '<td class="key">' + obj.key + '</td>' +
                                        '<td class="host">' + obj.host + '</td>' +
                                        '<td>' + obj.active_time + '</td>' +
                                        '<td state="' + obj.state + '">' + (obj.state == 0 ? "激活" : "冻结") + '</td>' +
                                        '<td>' +
                                        '<button class="btn btnIce">' + (obj.state == 0 ? "冻结" : "激活") + '</button>' +
                                        '</td>' +
                                        '</tr> '
                                }
                                str += '</tbody>';
                                $('.kandao-secrentKey .secrentKeySearch table').html(str);
                            })
                        }
                    });
                }
            });
        }
    })