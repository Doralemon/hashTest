define(["jquery", 'artTemplate', 'common/amdApi', 'fileinput'],
    function($, art, amdApi) {
        return function(seletor, seletorForm, headFlag, callback) {
            var flag = true;
            $(function() { //图片预览
                seletor.find('.uploadSubmit').click(function() {
                    if (!flag) {
                        return;
                    }
                    flag = false;
                    if (!$('#picID').val()) return;
                    var data = new FormData(seletorForm[0]);
                    headFlag.flag = false;
                    $.ajax({
                        url: amdApi.getFileUrl() + 'upload_action/',
                        type: 'post',
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(res) {
                            headFlag.flag = true;
                            callback && callback(res);
                            flag = true;
                        },
                        error: function(res) {
                            headFlag.flag = true;
                            alert("上传文件错误，请选择jpg格式的图片重新上传！");
                            flag = true;
                        }
                    });
                });
            })
        }
    });