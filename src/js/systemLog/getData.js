define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) {
            var str = '';
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                str += '<tr>' +
                    '<td>' + obj.username + '</td>' +
                    '<td>' + obj.email + '</td>' +
                    '<td>' + obj.label + '</td>' +
                    '<td>' + obj.record + '</td>' +
                    '<td>' + obj.create_time + '</td>' +
                    '</tr>'
            }
            $('.kandao-systemLog').find('table tbody').html(str);
        },
        // 动态渲染操作日志列表
        myAjax: function(json) {
            var _this = this;
            amdApi.ajax({ url: 'action', type: 'get', json: json }, function(res) {
                // console.log(res)
                _this.getListData(res);
                var num = 10;
                var index = Math.ceil(res.result.count / num);
                res.result.index = index;
                $('.LogSearchContent>p').text('总计' + res.result.count + '条信息');
                $('.operationLog-bottom>p').text('每页显示10条信息,共' + index + '页');
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

                function createPage(pageSize, buttons, total) {
                    $('.kandao-systemLog').find(".pagination").jBootstrapPage({
                        pageSize: pageSize,
                        total: total,
                        maxPageButton: buttons,
                        onPageClicked: function(obj, pageIndex) {
                            localStorage.setItem("currentPage", "(pageIndex + 1)")
                                // alert((pageIndex + 1) + '页');
                            json.page = pageIndex + 1;
                            amdApi.ajax({ url: "action", type: "get", json: json }, function(res) {
                                _this.getListData(res);
                            })
                        }
                    });
                }

            })
        }

    }
})