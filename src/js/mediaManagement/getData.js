define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) { //模板文件
            var str = '';
            var strImg = '';
            var status = '';
            for (var i = 0; i < res.result.data.length; i++) {
                // console.log(res);
                var obj = res.result.data[i];
                var strTag = '';
                switch (obj.status) {
                    case "OF":
                        status = "下线";
                        break;
                    case "UP":
                        status = "上传成功";
                        break;
                    case "WT":
                        status = "等待转码";
                        break;
                    case "TI":
                        status = "转码中";
                        break;
                    case "TF":
                        status = "转码失败";
                        break;
                    case "QU":
                        status = "等待分发";
                        break;
                    case "DI":
                        status = "分发成功";
                        break;
                    case "DF":
                        status = "分发失败";
                        break;
                    case "In":
                        status = "发布成功";
                        break;
                    case "IF":
                        status = "发布失败";
                        break;
                    case "SU":
                        status = "正常";
                        break;
                    case "ON":
                        status = "正常";
                        break;
                }
                if (obj.thumbnail_uri) { //图片
                    strImg = '<img src="' + obj.thumbnail_uri + '">'
                } else {
                    strImg = '<img src="img/giveJpg.jpg">'
                }
                if (obj.tags.length) {
                    for (var j = 0; j < obj.tags.length; j++) {
                        strTag += '<span class="specificTag">' + obj.tags[j][0] + '</span>';
                    }
                } else {
                    strTag = '';
                }
                str += '<div class="col-sm-4 col-md-3 mediaBigBox" id="' + obj.id + '">' +
                    '<a href="#/media/mediaLibrary/detail?type='+obj.m_type+'&num='+obj.id+'" class="thumbnail">' +
                    '<div class="coverBox">' +
                    '</div>' +
                    '<div class="imgTop clearfix">' +
                    '<span class="imgNum pull-left">' + obj.index + '</span>' +
                    '<label class="checkbox-inline pull-right">' +
                    '<input type="checkbox" >' +
                    '</label>' +
                    '<span class="imgState pull-right ' + obj.status + '">' + status + '</span>' +
                    '</div>' +
                    strImg +
                    '<div class="caption clearfix">' +
                    '<h5 class="title">' + obj.name + '</h5>' +
                    '<p class="">' +
                    '<span class="resourceTpye pull-left">' + obj.m_type + '</span>' +
                    '<span class="time pull-right">' + obj.date_created + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="tags">' +
                    strTag +
                    '</div>' +
                    '</a>' +
                    '</div>'
            }
            $('.kandao-mediaManagement').find('.mediaInfoBody').html(str);
        },
        // 动态渲染媒资列表
        myAjax: function(json, res) {
            var _this = this;
            // console.log(res)
            _this.getListData(res);
            var num = 8;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
            $('.mediaContainer>p').text('总计' + res.result.count + '条结果');
            $('.mediaInfo-bottom>p').text('每页显示8条信息,共' + index + '页');
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
                $('.kandao-mediaManagement').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow:json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "medias", type: "get", json: json }, function(res) {
                            sessionStorage.removeItem("page");
                            sessionStorage.setItem("page", json.page);
                            _this.getListData(res);
                            _this.getSelMedia();
                        })
                    }
                });
            }
        },
        getSelMedia: function() { //获取选中媒资的数据
            var data = [];
            ($(".kandao-mediaManagement").find('.thumbnail input')).each(function(i, v) {
                if ($(v).prop('checked') == true) {
                    var type = $(v).parents('.mediaBigBox').find('.resourceTpye').text();
                    var id = $(v).parents('.mediaBigBox').attr('id');
                    data[data.length] = { type: type, id: id };
                }
            })
            if (!data[0]) {
                $(".kandao-mediaManagement").find('.dropdown-toggle').addClass('disabled');
                $(".kandao-mediaManagement").find('.transCode').addClass('disabled');
            } else {
                $(".kandao-mediaManagement").find('.dropdown-toggle').removeClass('disabled');
                $(".kandao-mediaManagement").find('.transCode').removeClass('disabled');
            }
            return data;
        }
    }
})