define(['jquery', 'text!tpls/secreKey/secretKeyManagementSearch.html', 'artTemplate', 'common/amdApi', "bootstrap", "page"],
    function($, secretKeyManagementSearchTpl, art, amdApi) {
        return function() {
            var page = 1;
            $('.kandao-secrentKey .pagination>li').each(function(i, v) {
                if ($(v).hasClass("active")) {
                    page = $(v).attr('pnum');
                    page = parseInt(page);
                    // console.log(page);
                }
            })
            var q = $('.kandao-secrentKey input[name="q"]').val();
            var type = $('.kandao-secrentKey select[name="type"]').val();
            var state = $('.kandao-secrentKey select[name="state"]').val()
            var json = {
                limit: 10,
                q: q,
                type: type,
                state: state,
                page: page
            }
            if ($('.kandao-secrentKey table tbody tr').length == 1) {
                obj.json.page = obj.json.page - 1 || 1;
            }
            // console.log(json)
            amdApi.ajax({ url: 'licenses', type: 'get', json: json }, function(res) {
                // console.log(res)
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var secretKeyManagementSearch = art.render(secretKeyManagementSearchTpl, res.result);
                var $secretKeyManagementSearch = $(secretKeyManagementSearch)
                $(".kandao-secrentKey .secrentKeySearch").html($secretKeyManagementSearch);
                $('.kandao-secrentKey .secrentKeySearch table').addClass("table-bordered");
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
                    $('.kandao-secrentKey').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
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
                                    if (obj.state == 0) {
                                        state1 = "激活";
                                        state2 = "冻结"
                                    } else {
                                        state1 = "冻结";
                                        state2 = "激活"
                                    }
                                    str += '<tr id="' + obj.id + '">' +
                                        '<td>' + obj.company + '</td>' +
                                        '<td>' + obj.name + '</td>' +
                                        '<td>' + obj.email + '</td>' +
                                        '<td class="key">' + obj.key + '</td>' +
                                        '<td class="host">' + obj.host + '</td>' +
                                        '<td>' + obj.active_time + '</td>' +
                                        '<td state="' + obj.state + '">' + state1 + '</td>' +
                                        '<td>' +
                                        '<button class="btn btnIce">' + state2 + '</button>' +
                                        '</td>' +
                                        '</tr> '
                                }
                                str += '</tbody>';
                                $('.kandao-secrentKey .secrentKeySearch table').html(str);
                                $('.kandao-secrentKey .secrentKeySearch table').addClass("table-bordered");
                            })
                        }
                    });
                }
                $('.kandao-secrentKey .pagination>li').removeClass("active");
                $('.kandao-secrentKey .pagination>li').eq(page).addClass("active");
            })
        }
    })