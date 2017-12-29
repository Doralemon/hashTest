define(['jquery', 'common/amdApi'], function($, amdApi) {
    return {
        getListData: function(res) { //转码管理列表模板
            var arr = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var status = "";
                var m_type = "";
                switch (obj.status) {
                    case "R":
                        status = "准备转码";
                        break;
                    case "W":
                        status = "等待转码";
                        break;
                    case "P":
                        status = "转码中";
                        break;
                    case "F":
                        status = "转码失败";
                        break;
                    case "S":
                        status = "转码成功";
                        break;
                }
                switch (obj.m_type) {
                    case "photo":
                        m_type = "图片";
                        break;
                    case "video":
                        m_type = "视频";
                        break;
                    case "live":
                        m_type = "直播";
                        break;
                }
                var str = '<tr id="' + obj.id + '">' +
                    '<td>' + obj.name + '</td>' +
                    '<td m_type="' + obj.m_type + '">' + m_type + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + obj.date_modified + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btnInfo btn-sm">详情</button>' +
                    '<button type="button" class="btn btnTransCode btn-sm" style="display:none">转码</button>' +
                    '<button type="button" class="btn btnDelete btn-sm">删除</button>' +
                    '</td>' +
                    '</tr>';
                arr.push(str);
            }
            var html = arr.join("");
            $('.kandao-transCodingManagement').find('.mediaContainer tbody').html(html);
        },

        myAjax: function(json, res) { // 动态渲染转码管理列表
            var _this = this;
            // console.log(res)
            _this.getListData(res);
            var num = 10;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
            if (res.result.data.length < 1) {
                $('.kandao-transCodingManagement').find('.mediaContainer p').css('display', 'none');
                $('.kandao-transCodingManagement').find('.mediaContainer table').css('display', 'none');
                $('.kandao-transCodingManagement').find('.mediaContainer .playList-bottom').css('display', 'none');
                $('.kandao-transCodingManagement').find('.mediaContainer').html('暂无数据');
            } else {
                $('.kandao-transCodingManagement').find('.mediaContainer p').css('display', 'block');
                $('.kandao-transCodingManagement').find('.mediaContainer table').css('display', 'table');
                $('.kandao-transCodingManagement').find('.mediaContainer .playList-bottom').css('display', 'block');
                $('.mediaContainer>p').text('总计' + res.result.count + '条信息');
                $('.transCoding-bottom>p').text('每页显示10条信息,共' + index + '页');
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
                $('.kandao-transCodingManagement').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "medias/transcode/task_list", type: "get", json: json }, function(res) {
                            _this.getListData(res);
                        })
                    }
                });
            }
        },
        getInfoData: function(res) { //转码管理详情列表模板
            var arr = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var str = "";
                var status = "";
                var obj = res.result.data[i];
                //   成功的状态不能重试，其他状态可以
                if (obj.status == "F") {
                    str = '<button type="button" class="btn btn-sm btnRetry">重试</button>' +
                        '<button type="button" class="btn btn-sm btnDelete">删除</button>'
                } else {
                    str = '<button type="button" class="btn btn-sm btnDelete">删除</button>'
                }
                switch (obj.status) {
                    case "R":
                        status = "准备转码";
                        break;
                    case "W":
                        status = "等待转码";
                        break;
                    case "P":
                        status = "转码中";
                        break;
                    case "F":
                        status = "转码失败";
                        break;
                    case "S":
                        status = "转码成功";
                        break;
                }
                var str = '<tr id="' + obj.id + '">' +
                    '<td>' + obj.warping + '</td>' +
                    '<td>' + obj.resolution + '</td>' +
                    '<td>' + obj.codec + '</td>' +
                    '<td>' + obj.vbr + '</td>' +
                    '<td>' + obj.creator + '</td>' +
                    '<td>' + obj.date_created + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' +
                    str +
                    '</td>' +
                    '</tr>';
                arr.push(str);
            }
            var html = arr.join("");
            $('#transCodeInfo').find('.codeInitContent tbody').html(html);
        },
        myInfoAjax: function(json, res, id) { // 动态渲染转码管理详情列表
            var _this = this;
            _this.getInfoData(res);
            var num = 10;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
            $('.codeInitContent>p').text('共计' + res.result.count + '条转码信息');
            $('.transCodeInfo-bottom>p').text('每页显示10条信息,共' + index + '页');
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
            $('#transCodeInfo .pagination>li').removeClass("active");
            $('#transCodeInfo .pagination>li>a').each(function(i, v) {
                if ($(v).attr('page') == json.page) {
                    $(v).parent().addClass('active');
                }
            })

            function createPage(pageSize, buttons, total) {
                $('#transCodeInfo').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "medias/transcode/" + id + "/line_info", type: "get", json: json }, function(res) {
                            _this.getInfoData(res);
                        })
                    }
                });
            }
        },
        getInitCodeData: function(res) { //初始化转码设置模板
            var arr = [];
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var str = '<tr>' +
                    '<td>视频</td>' +
                    '<td>Cubemap</td>' +
                    '<td>1920*1920</td>' +
                    '<td>H264</td>' +
                    '<td>4M</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-sm btnEdit">编辑</button>' +
                    '<button type="button" class="btn btn-sm btnDelete">删除</button>' +
                    '</td>' +
                    '</tr>';
                arr.push(str);
            }
            var html = arr.join("");
            $('#codeInit').find('.codeInitContent tbody').html(html);
        },
        myInitCodeAjax: function(json, res, id) { // 动态渲染初始化转码设置列表
            var _this = this;
            // console.log(res)
            _this.getInitCodeData(res);
            var num = 10;
            var index = Math.ceil(res.result.count / num);
            res.result.index = index;
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
            $('#codeInit .pagination>li').removeClass("active");
            $('#codeInit .pagination>li>a').each(function(i, v) {
                if ($(v).attr('page') == json.page) {
                    $(v).parent().addClass('active');
                }
            })

            function createPage(pageSize, buttons, total) {
                $('#codeInit').find(".pagination").jBootstrapPage({
                    pageSize: pageSize,
                    total: total,
                    pageNow: json.page,
                    maxPageButton: buttons,
                    onPageClicked: function(obj, pageIndex) {
                        // alert((pageIndex + 1) + '页');
                        json.page = pageIndex + 1;
                        amdApi.ajax({ url: "medias/transcode/" + id + "/line_info", type: "get", json: json }, function(res) {
                            sessionStorage.removeItem("page");
                            sessionStorage.setItem("page", json.page);
                            _this.getInitCodeData(res);
                        })
                    }
                });
            }
        },
    }
})