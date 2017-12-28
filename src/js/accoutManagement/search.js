define(['jquery', 'text!tpls/account/accoutManagementSearch.html', 'artTemplate', 'common/amdApi', "bootstrap", "page"],
    function($, accoutManagementListTpl, art, amdApi) {
        return function() {
            var q = $('.kandao-accout input[name="q"]').val();
            var type = $('.kandao-accout select[name="type"]').val();
            var json = {
                limit: 10,
                q: q,
                type: type
            }
            amdApi.ajax({ url: "customers", type: "get", json: json }, function(res) {
                // console.log(res)
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                var accoutManagementList = art.render(accoutManagementListTpl, res.result);
                var $accoutManagementList = $(accoutManagementList)
                $(".kandao-contentBody .accoutSearchContent").html($accoutManagementList);
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
                    $('.kandao-accout').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                                // alert((pageIndex + 1) + '页');
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