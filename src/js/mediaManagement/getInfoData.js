define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res, resourceTpye) {
            var str = '';
            for (var i = 0; i < res.result.data.length; i++) {
                var codec = '';
                var warping = '';
                var btnStr = '';
                var obj = res.result.data[i];
                if (obj.codec == '4') { //视频编码格式
                    codec = "H264";
                } else if (obj.codec == '5') {
                    codec = "H265";
                } else if (obj.code == '9') {
                    codec = "VP9";
                }
                if (obj.warping == "C") { //视图类型
                    warping = "cubemap";
                } else if (obj.warping == 'O') {
                    warping = "offcenter-cubemap";
                } else if (obj.warping == 'S') {
                    warping = "sphere";
                }
                if (resourceTpye == "photo") {
                    btnStr = '<a href="' + obj.uri + '" target="_blank" type="button" class="btn btn-default infoView">查看</a>'
                } else {
                    btnStr = '<a class="btn btn-default infoPlay" href="' + obj.uri + '" target="_blank" type="button">播放</a>'
                }
                str += '<tr id="' + obj.link_id + '">' +
                    '<td>' + warping + '</td>' +
                    '<td>' + obj.resolution + '</td>' +
                    '<td>' + codec + '</td>' +
                    '<td>' + obj.vbr + '</td>' +
                    '<td>' + obj.original_size + '</td>' +
                    '<td>' + obj.uri + '' +
                    '<td>' + obj.author + '</td>' +
                    '<td>' + obj.date_created + '</td>' +
                    '<td>' +
                    btnStr +
                    '<button type="button" class="btn btn-default linkDelete">删除</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('.kandao-mediaLibraryInfo').find('.linkContainer tbody').html(str);
        },
        myAjax: function(json, resType, resourceTpye, media_id) { // 动态渲染某个资源格式链接列表
            // console.log(resType);
            var _this = this;
            _this.getListData(resType, resourceTpye);
            var num = 10;
            var index = Math.ceil(resType.result.count / num);
            resType.result.index = index;
            $('.mediaTypeInfo-bottom>p').text('每页显示10条信息,共' + index + '页');
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
            createPage(num, btnNum, resType.result.count);
            if (json.page > 6) {
                $(".pagination .goTo input").val(json.page);
                $('.go').click();
                $(".pagination .goTo input").val("");
            }
            $('.kandao-mediaLibraryInfo .pagination>li').removeClass("active");
            $('.kandao-mediaLibraryInfo .pagination>li>a').each(function(i, v) {
                if ($(v).attr('page') == json.page) {
                    $(v).parent().addClass('active');
                }
            })

            function createPage(pageSize, buttons, total) {
                $('.kandao-mediaLibraryInfo').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        localStorage.setItem("currentPage", "(pageIndex + 1)")
                            // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: 'medias/' + resourceTpye + '/' + media_id + '/links', type: "get", json: json }, function(resType) {
                            sessionStorage.removeItem("pageInfo");
                            sessionStorage.setItem("pageInfo", json.page);
                            _this.getListData(resType, resourceTpye);
                        })
                    }
                });
            }
        }

    }
})