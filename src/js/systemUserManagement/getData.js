define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) {
            var str = '';
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                str += '<tr id="' + obj.id + '" state="' + obj.state + '">' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.email + '</td>' +
                    '<td>' + obj.roles.join(",") + '</td>' +
                    '<td>' + obj.date_created + '</td>' +
                    '<td>' + (obj.state == '0' ? '有效' : '冻结') + '</td>' +
                    '<td>' +
                    '<span class="btnEdit">编辑</span>' +
                    '<span class="btnResetPass">重置密码</span>' +
                    '<span class="btnIce" >' + (obj.state == '0' ? '冻结' : '激活') + '</span>' +
                    '<span class="btnDelete">删除</span>' +
                    '</td>' +
                    '</tr>'
            }
            $('.kandao-systemUser').find('table tbody').html(str);
        },
        // 动态渲染系统角色列表
        myAjax: function(json) {
            var _this = this;
            amdApi.ajax({ url: 'backend/users', type: 'get', json: json }, function(res) {
                // console.log(res)
                _this.getListData(res);
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                $('.accoutSearchContent>p').text('总计' + res.result.count + '条信息');
                $('.accoutList-bottom>p').text('每页显示10条信息,共' + index + '页');
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
                    $('.kandao-systemUser').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        pageNow: json.page,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                                // alert((pageIndex + 1) + '页');
                            json.page = pageIndex + 1;
                            amdApi.ajax({ url: "backend/users", type: "get", json: json }, function(res) {
                                _this.getListData(res);
                            })
                        }
                    });
                }

            })
        }
    }
})