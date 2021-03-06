define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) {
            var arr = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var str = '<tr id="'+obj.id+'">'+
                '<td>'+obj.type_cn+'</td>'+
                '<td>'+(i+1)+'</td>'+
                '<td>'+obj.title+'</td>'+
                '<td>'+obj.answer+'</td>'+
                '<td>'+obj.creator+'</td>'+
                '<td>'+obj.date_created+'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-md btnEdit">编辑</button>'+
                    '<button type="button" class="btn btn-md btnDelete">删除</button>'+
                '</td>'+
            '</tr>';
                arr.push(str);
            }
            var html = arr.join("");
            $('.kandao-FAQ').find('.reportSearchContent tbody').html(html);
        },
        // 动态渲染播放列表
        myAjax: function(json, res) {
            var _this = this;
            // console.log(res)
            _this.getListData(res);
            var num = 10;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
            $('.reportSearchContent>p').text('总计' + res.result.count + '条信息');
            $('.reportList-bottom>p').text('每页显示10条信息,共' + index + '页');
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
                $('.kandao-FAQ').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "official/faq/list", type: "get", json: json }, function(res) {
                            _this.getListData(res);
                        })
                    }
                });
            }
        }
    }
})