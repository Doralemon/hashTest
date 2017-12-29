define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) {
            var arr = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var str = '<tr id="' + obj.id + '">' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.m_type + '</td>' +
                    '<td>' + (obj.number + '') + '</td>' +
                    '<td>' + obj.owner + '</td>' +
                    '<td>' + obj.date_created + '</td>' +
                    '<td>' +
                    '<a href="#/media/playList/detail?type=' + obj.m_type + '&num=' + obj.id + '" class="btn btn-md btnInfo">详情</a>' +
                    '<button type="button" class="btn btn-md btnDelete">删除</button>' +
                    '</td>' +
                    '</tr>';
                arr.push(str);
            }
            var html = arr.join("");
            $('.kandao-playList').find('.playSearchContent tbody').html(html);
        },
        getInfoListData: function(res) {
            var arrInfo = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var str = '<tr id="' + obj.column_id + '">' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.num + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-default infoDelete">移除</button>' +
                    '</td>' +
                    '</tr>';
                arrInfo.push(str);
            }
            var htmlInfo = arrInfo.join("");
            $('.kandao-mediaPlayInfo').find('.playInfoContainer tbody').html(htmlInfo);
        },
        // 动态渲染播放列表
        myAjax: function(json, res) {
            var _this = this;
            // console.log(res)
            _this.getListData(res);
            var num = 10;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
            if (res.result.data.length < 1) {
                $('.kandao-playList').find('.playSearchContent p').css('display', 'none');
                $('.kandao-playList').find('.playSearchContent table').css('display', 'none');
                $('.kandao-playList').find('.playSearchContent .playList-bottom').css('display', 'none');
                $('.kandao-playList').find('.playSearchContent').html('暂无数据');
            } else {
                $('.kandao-playList').find('.playSearchContent p').css('display', 'block');
                $('.kandao-playList').find('.playSearchContent table').css('display', 'table');
                $('.kandao-playList').find('.playSearchContent .playList-bottom').css('display', 'block');
                $('.playSearchContent>p').text('总计' + res.result.count + '条信息');
                $('.playList-bottom>p').text('每页显示10条信息,共' + index + '页');
            }
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
                $('.kandao-playList').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "medias/playlists", type: "get", json: json }, function(res) {
                            sessionStorage.removeItem("page");
                            sessionStorage.setItem("page", json.page);
                            _this.getListData(res);
                        })
                    }
                });
            }
        },
        // 动态渲染播放列表的栏目详情
        myInfoAjax: function(id, m_type) {
            var _this = this;
            amdApi.ajax({ url: 'medias/playlists/' + m_type + '/' + id + '/members', type: 'get' }, function(res) {
                // console.log(res)
                _this.getInfoListData(res);
                $('.playInfo-bottom>p').text('总计' + res.result.count + '条结果');
            })
        }
    }
})