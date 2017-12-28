define(['jquery'], function($) {
    return {
        // 动态渲染产品表格
        getInfoData: function(res) {
            var str = '';
            var strIfedit = '';
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                var status = '';
                if (obj.status == "OF") {
                    status = '下线';
                } else if (obj.status == "PR") {
                    status = '预发布';
                } else if (obj.status == "RI") {
                    status = '发布中';
                } else if (obj.status == "RF") {
                    status = '发布失败';
                } else if (obj.status == "ON") {
                    status = '正式发布';
                } else if (obj.status == "DI") {
                    status = '无效';
                }
                if (obj.status == "RI") {
                    strIfedit = '<button type="button" class="btn btn-edit btn-sm disabledCli">编辑</button>';
                } else if (obj.status == "RF") {
                    strIfedit = '<button type="button" class="btn btn-retry btn-sm">重试</button>'
                } else {
                    strIfedit = '<button type="button" class="btn btn-edit btn-sm">编辑</button>'
                }
                str += '<tr id="' + obj.id + '">' +
                    '<td>' + obj.id + '</td>' +
                    '<td>' + obj.version_name + '</td>' +
                    '<td>' + obj.version_code + '</td>' +
                    '<td>' + obj.date_created + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + strIfedit +
                    '<button type="button" class="btn btn-delete btn-sm">删除</button>' +
                    '</td>' +
                    '</tr>';
            }
            $('.kandao-versionManagement').find('table tbody').html(str);
        },
        // 动态渲染版本管理表格
        getListData: function(res) {
            var str = '';
            for (var i = 0; i < res.result.data.length; i++) {
                var obj = res.result.data[i];
                str += '<tr id="' + obj.id + '">' +
                    '<td>' + obj.name + '</td>' +
                    '<td>' + obj.title + '</td>' +
                    '<td>' + obj.description + '</td>' +
                    '<td>' + obj.version + '</td>' +
                    '<td>' + obj.platform + '</td>' +
                    '<td>' +
                    '<span class="btnEdit">编辑</span>' +
                    '<span class="btnVesion">版本管理</span>' +
                    '<span class="btnDownLine" style="display:none">下线</span>' +
                    '</td>' +
                    '</tr>'
            }
            $('.kandao-productionVersion').find('table tbody').html(str);
        }
    }
})